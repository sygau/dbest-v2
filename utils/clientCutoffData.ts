export interface CutoffData {
  subject: string;
  year: string;
  grade: string;
  score: number;
  percentage: number;
  paper: string;
  tableId?: string;
  tableTitle?: string;
}

export interface CutoffTableData {
  [tableId: string]: {
    [year: string]: {
      [grade: string]: {
        score: number;
        percentage: number;
      };
    };
  };
}

export interface TableConfig {
  id: string;
  title: string;
  title_zh: string;
  file: string;
  description: string;
  description_zh: string;
}

export interface SubjectConfig {
  tables: TableConfig[];
}

export interface CutoffConfig {
  [subject: string]: SubjectConfig;
}

// Convert CSV data to structured format
export function csvToCutoffData(csvData: string, subject: string): CutoffData[] {
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const data: CutoffData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    if (values.length === headers.length) {
      const row: any = {};
      headers.forEach((header, index) => {
        row[header.toLowerCase()] = values[index];
      });
      
      // Handle empty values - treat 0 and empty strings as null
      const scoreVal = row.score && row.score !== '' && row.score !== '0' ? parseInt(row.score) : null;
      const percentageVal = row.percentage && row.percentage !== '' && row.percentage !== '0' ? parseInt(row.percentage) : null;
      
      // Only add record if we have valid data (at least one non-zero/non-empty value)
      if (row.year && row.level && (scoreVal !== null || percentageVal !== null)) {
        data.push({
          subject: subject,
          year: row.year,
          grade: row.level,
          score: scoreVal || 0,
          percentage: percentageVal || 0,
          paper: '' // This will be set by the table configuration
        });
      }
    }
  }

  return data;
}

// Convert structured data to table format with table separation
export function dataToTableFormat(data: CutoffData[]): CutoffTableData {
  const tableData: CutoffTableData = {};

  data.forEach(item => {
    // Use tableId if available, otherwise fall back to paper
    const tableKey = item.tableId || item.paper;
    
    if (!tableData[tableKey]) {
      tableData[tableKey] = {};
    }
    if (!tableData[tableKey][item.year]) {
      tableData[tableKey][item.year] = {};
    }
    tableData[tableKey][item.year][item.grade] = {
      score: item.score,
      percentage: item.percentage
    };
  });

  return tableData;
}

// Load cutoff configuration
export async function loadCutoffConfig(): Promise<CutoffConfig> {
  try {
    const response = await fetch('/config/cutoff-config.json');
    if (!response.ok) {
      throw new Error(`Failed to load config: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading cutoff config:', error);
    throw error;
  }
}

// Load CSV data for a specific subject and table
export async function loadCSVData(subject: string, fileName: string): Promise<string> {
  try {
    const response = await fetch(`/data/cutoff/${subject}/${fileName}`);
    if (!response.ok) {
      throw new Error(`Failed to load CSV data: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error loading CSV data for ${subject}/${fileName}:`, error);
    throw error;
  }
}

// Load all data for a specific subject
export async function loadSubjectData(subject: string): Promise<{
  data: CutoffTableData;
  config: SubjectConfig;
}> {
  try {
    // Load configuration
    const config = await loadCutoffConfig();
    const subjectConfig = config[subject];
    
    if (!subjectConfig) {
      throw new Error(`Subject configuration not found: ${subject}`);
    }

    const allData: CutoffData[] = [];

    // Process each table configuration
    for (const tableConfig of subjectConfig.tables) {
      try {
        const csvData = await loadCSVData(subject, tableConfig.file);
        const tableData = csvToCutoffData(csvData, subject);
        
        // Add table information to each record
        tableData.forEach(item => {
          item.tableId = tableConfig.id;
          item.tableTitle = tableConfig.title;
        });
        
        allData.push(...tableData);
      } catch (error) {
        console.warn(`Failed to load table ${tableConfig.id} for subject ${subject}:`, error);
        // Continue with other tables even if one fails
      }
    }

    // Convert to table format
    const tableData = dataToTableFormat(allData);

    return {
      data: tableData,
      config: subjectConfig
    };
  } catch (error) {
    console.error(`Error loading data for subject ${subject}:`, error);
    throw error;
  }
}

// Get grade color for styling
export function getGradeColor(grade: string): string {
  switch (grade) {
    case '5**':
      return '#FFD700'; // Gold
    case '5*':
      return '#FFA500'; // Orange
    case '5':
      return '#CD7F32'; // Bronze
    case '4':
      return '#007BFF'; // Blue
    case '3':
      return '#28A745'; // Green
    case '2':
      return '#C0C0C0'; // Silver/Gray
    default:
      return '#6C757D'; // Gray
  }
}

// Get available subjects
export function getAvailableSubjects(): string[] {
  return [
    'english',
    'chinese',
    'math',
    'physics',
    'chemistry',
    'biology',
    'ict',
    'm1',
    'm2',
    'geography',
    'economics',
    'bafs',
    'history',
    'chinese-history',
    'ths'
  ];
} 