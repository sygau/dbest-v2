import { NextApiRequest, NextApiResponse } from 'next';
import { csvToCutoffData, dataToTableFormat } from '../../../utils/cutoffData';

interface TableConfig {
  id: string;
  title: string;
  title_zh: string;
  file: string;
  description: string;
  description_zh: string;
}

interface SubjectConfig {
  tables: TableConfig[];
}

interface CutoffConfig {
  [subject: string]: SubjectConfig;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { subject } = req.query;
  const { method } = req;

  if (method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Ensure subject is a string
  const subjectString = Array.isArray(subject) ? subject[0] : subject;
  
  if (!subjectString) {
    return res.status(400).json({ 
      message: 'Subject parameter is required',
      error: 'Missing subject parameter'
    });
  }

  try {
    // Load configuration using fetch
    const configResponse = await fetch(`${req.headers.origin}/config/cutoff-config.json`);
    if (!configResponse.ok) {
      throw new Error(`Failed to load config: ${configResponse.statusText}`);
    }
    const config: CutoffConfig = await configResponse.json();

    // Check if subject exists in config
    if (!config[subjectString]) {
      return res.status(404).json({ 
        message: `Subject configuration not found: ${subjectString}`,
        error: 'Subject not configured'
      });
    }

    const subjectConfig = config[subjectString];
    const allData: any[] = [];
    const availableTables: string[] = [];

    // Process each table configuration
    for (const tableConfig of subjectConfig.tables) {
      try {
        // Fetch CSV file
        const csvResponse = await fetch(`${req.headers.origin}/data/cutoff/${subjectString}/${tableConfig.file}`);
        if (!csvResponse.ok) {
          console.warn(`CSV file not found: ${tableConfig.file}`);
          continue;
        }
        
        const csvData = await csvResponse.text();
        
        // Convert CSV to structured data
        const cutoffData = csvToCutoffData(csvData, subjectString);
        
        // Add table metadata to each record
        const enrichedData = cutoffData.map(record => ({
          ...record,
          tableId: tableConfig.id,
          tableTitle: tableConfig.title
        }));
        
        allData.push(...enrichedData);
        availableTables.push(tableConfig.id);
        
      } catch (error) {
        console.error(`Error processing ${tableConfig.file}:`, error);
      }
    }

    if (allData.length === 0) {
      return res.status(404).json({ 
        message: `No cutoff data found for subject: ${subjectString}`,
        error: 'No CSV files found'
      });
    }

    // Convert to table format
    const tableData = dataToTableFormat(allData);
    
    // Return the data with configuration
    res.status(200).json({
      subject: subjectString,
      config: subjectConfig,
      data: tableData[subjectString] || {},
      totalRecords: allData.length,
      availableTables,
      grades: ['5**', '5*', '5', '4', '3', '2']
    });

  } catch (error) {
    console.error('Error loading cutoff data:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 