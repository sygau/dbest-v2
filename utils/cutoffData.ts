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
  [subject: string]: {
    [paper: string]: {
      [year: string]: {
        [grade: string]: {
          score: number;
          percentage: number;
        };
      };
    };
  };
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
      
      // Handle empty values
      const score = row.score && row.score !== '' ? parseInt(row.score) : null;
      const percentage = row.percentage && row.percentage !== '' ? parseInt(row.percentage) : null;
      
      // Only add record if we have valid data
      if (row.year && row.level && (score !== null || percentage !== null)) {
        data.push({
          subject: subject,
          year: row.year,
          grade: row.level,
          score: score || 0,
          percentage: percentage || 0,
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
    if (!tableData[item.subject]) {
      tableData[item.subject] = {};
    }
    
    // Use tableId if available, otherwise fall back to paper
    const tableKey = item.tableId || item.paper;
    
    if (!tableData[item.subject][tableKey]) {
      tableData[item.subject][tableKey] = {};
    }
    if (!tableData[item.subject][tableKey][item.year]) {
      tableData[item.subject][tableKey][item.year] = {};
    }
    tableData[item.subject][tableKey][item.year][item.grade] = {
      score: item.score,
      percentage: item.percentage
    };
  });

  return tableData;
}

// Export data as CSV
export function exportToCSV(data: CutoffData[]): string {
  const headers = ['Subject', 'Year', 'Grade', 'Score', 'Percentage', 'Paper'];
  const csvContent = [
    headers.join(','),
    ...data.map(item => [
      item.subject,
      item.year,
      item.grade,
      item.score,
      item.percentage,
      item.paper
    ].join(','))
  ].join('\n');

  return csvContent;
}

// Get available subjects
export function getAvailableSubjects(): string[] {
  return [
    'English',
    'Chinese',
    'Math',
    'Physics',
    'Chemistry',
    'Biology',
    'ICT',
    'M1',
    'M2',
    'Geography',
    'Economics',
    'BAFS',
    'History',
    'Chinese History',
    'THS'
  ];
}

// Get available years
export function getAvailableYears(): string[] {
  return ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013'];
}

// Get available grades
export function getAvailableGrades(): string[] {
  return ['5**', '5*', '5', '4', '3', '2'];
}

// Filter data by subject and year
export function filterCutoffData(
  data: CutoffData[],
  subject?: string,
  year?: string,
  searchTerm?: string
): CutoffData[] {
  return data.filter(item => {
    const subjectMatch = !subject || item.subject.toLowerCase() === subject.toLowerCase();
    const yearMatch = !year || item.year === year;
    const searchMatch = !searchTerm || 
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.score.toString().includes(searchTerm) ||
      item.percentage.toString().includes(searchTerm);

    return subjectMatch && yearMatch && searchMatch;
  });
}

// Get grade color for styling
export function getGradeColor(grade: string): string {
  switch (grade) {
    case '5**':
      return '#FFD700'; // Gold
    case '5*':
      return '#C0C0C0'; // Silver
    case '5':
      return '#CD7F32'; // Bronze
    case '4':
      return '#007BFF'; // Blue
    case '3':
      return '#28A745'; // Green
    case '2':
      return '#FFA500'; // Orange
    default:
      return '#6C757D'; // Gray
  }
}

// Validate cutoff data
export function validateCutoffData(data: CutoffData): string[] {
  const errors: string[] = [];

  if (!data.subject) errors.push('Subject is required');
  if (!data.year) errors.push('Year is required');
  if (!data.grade) errors.push('Grade is required');
  if (data.score < 0 || data.score > 100) errors.push('Score must be between 0 and 100');
  if (data.percentage < 0 || data.percentage > 100) errors.push('Percentage must be between 0 and 100');

  return errors;
} 