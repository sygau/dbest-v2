import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
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
    // Load configuration
    const configPath = path.join(process.cwd(), 'public', 'config', 'cutoff-config.json');
    const configData = fs.readFileSync(configPath, 'utf-8');
    const config: CutoffConfig = JSON.parse(configData);

    // Check if subject exists in config
    if (!config[subjectString]) {
      return res.status(404).json({ 
        message: `Subject configuration not found: ${subjectString}`,
        error: 'Subject not configured'
      });
    }

    const subjectConfig = config[subjectString];
    const dataDir = path.join(process.cwd(), 'public', 'data', 'cutoff', subjectString);
    const allData: any[] = [];
    const availableTables: string[] = [];

    // Process each table configuration
    for (const tableConfig of subjectConfig.tables) {
      const csvPath = path.join(dataDir, tableConfig.file);
      
      if (fs.existsSync(csvPath)) {
        try {
          // Read CSV file
          const csvData = fs.readFileSync(csvPath, 'utf-8');
          
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
      } else {
        console.warn(`CSV file not found: ${csvPath}`);
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