import React from 'react';
import { getGradeColor } from '../utils/clientCutoffData';

// Custom scrollbar styles
const scrollbarStyles = `
  .table-scroll-container::-webkit-scrollbar {
    height: 20px !important;
    width: 20px !important;
  }
  
  .table-scroll-container::-webkit-scrollbar-track {
    background: #2c3e50 !important;
    border-radius: 10px !important;
    border: 2px solid #34495e !important;
  }
  
  .table-scroll-container::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #3498db, #2980b9) !important;
    border-radius: 10px !important;
    border: 2px solid #2c3e50 !important;
    box-shadow: inset 0 1px 3px rgba(255,255,255,0.3) !important;
  }
  
  .table-scroll-container::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #2980b9, #1f5f8b) !important;
    box-shadow: inset 0 1px 3px rgba(255,255,255,0.4) !important;
  }
  
  .table-scroll-container::-webkit-scrollbar-corner {
    background: #2c3e50 !important;
  }
  
  /* Firefox scrollbar */
  .table-scroll-container {
    scrollbar-width: auto !important;
    scrollbar-color: #3498db #2c3e50 !important;
  }
`;

interface TableConfig {
  id: string;
  title: string;
  file: string;
}

interface CutoffTableProps {
  data: {
    [tableId: string]: {
      [year: string]: {
        [grade: string]: {
          score: number;
          percentage: number;
        };
      };
    };
  };
  config?: {
    tables: TableConfig[];
  };
  subject: string;
  loading?: boolean;
}

const CutoffTable: React.FC<CutoffTableProps> = ({ data, config, subject, loading = false }) => {
  const tableIds = Object.keys(data).sort();
  
  // Dynamically determine available grades from the data
  const getAvailableGrades = (tableData: any) => {
    const allGrades = new Set<string>();
    Object.values(tableData).forEach((yearData: any) => {
      Object.keys(yearData).forEach(grade => allGrades.add(grade));
    });
    
    // Sort grades in the desired order
    const gradeOrder = ['5**', '5*', '5', '4', '3', '2', '1'];
    return gradeOrder.filter(grade => allGrades.has(grade));
  };

  const getTableConfig = (tableId: string) => {
    if (config?.tables) {
      return config.tables.find(table => table.id === tableId);
    }
    return null;
  };

  const sortedTableIds = tableIds.sort((a, b) => {
    if (!config?.tables) return 0;
    const aIndex = config.tables.findIndex(table => table.id === a);
    const bIndex = config.tables.findIndex(table => table.id === b);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  if (loading) {
    return (
      <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
        <div className="card-body">
          <div className="text-center py-5">
            <div className="loading-spinner mb-3">
              <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            <h6 className="text-dark mb-2" style={{ 
              color: 'var(--bs-body-color) !important',
              opacity: '0.9'
            }}>Loading cut-off data...</h6>
            <p className="text-dark small" style={{ 
              color: 'var(--bs-body-color) !important',
              opacity: '0.8'
            }}>載入分數線資料中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
        <div className="card-body">
          <div className="text-center py-5">
            <div className="empty-state mb-3">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted" style={{ filter: 'brightness(0) invert(1)' }}>
                <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h6 className="text-dark mb-2" style={{ 
              color: 'var(--bs-body-color) !important',
              opacity: '0.9'
            }}>No data available</h6>
            <p className="text-dark small" style={{ 
              color: 'var(--bs-body-color) !important',
              opacity: '0.8'
            }}>
              沒有找到 {subject} 的分數線資料
              <br />
              Please select a different subject or check back later
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      {sortedTableIds.map(tableId => {
        const tableData = data[tableId];
        const years = Object.keys(tableData).sort((a, b) => parseInt(b) - parseInt(a));
        const tableConfig = getTableConfig(tableId);
        const grades = getAvailableGrades(tableData);
        
        return (
          <div key={tableId} className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                {tableConfig?.title || tableId}
              </h5>
              <small style={{ color: 'var(--bs-body-color)', opacity: '0.8' }}>
                {Math.min(...years.map(y => parseInt(y)))} - {Math.max(...years.map(y => parseInt(y)))}
              </small>
            </div>
            <div className="card-body">
              
              <div className="table-scroll-container" style={{
                overflowX: 'auto',
                overflowY: 'hidden',
                maxWidth: '100%',
                borderRadius: '0.375rem'
              }}>
                <table className="table table-bordered table-hover" style={{
                  minWidth: '1200px',
                  width: 'max-content'
                }}>
                  <thead className="table-dark">
                    <tr>
                      <th scope="col" className="text-center" style={{ minWidth: '100px' }}>
                        等級 Grade
                      </th>
                      {years.map(year => (
                        <th key={year} scope="col" className="text-center" style={{ minWidth: '140px' }}>
                          {year}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map(grade => (
                      <tr key={grade}>
                        <td 
                          className="text-center fw-bold"
                          style={{ 
                            backgroundColor: getGradeColor(grade),
                            color: grade === '5**' || grade === '5*' ? '#000' : '#fff',
                            minWidth: '100px'
                          }}
                        >
                          {grade}
                        </td>
                        {years.map(year => {
                          const yearData = tableData[year];
                          const gradeData = yearData?.[grade];
                          
                                                      return (
                              <td key={`${year}-${grade}`} className="text-center">
                                {gradeData ? (
                                  <div>
                                    {gradeData.score} ({gradeData.percentage}%)
                                  </div>
                                ) : (
                                  <span className="text-muted">-</span>
                                )}
                              </td>
                            );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CutoffTable; 