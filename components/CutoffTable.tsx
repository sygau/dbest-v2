import React from 'react';
import { getGradeColor } from '../utils/clientCutoffData';

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

  const getAvailableGrades = (tableData: any) => {
    const allGrades = new Set<string>();
    Object.values(tableData).forEach((yearData: any) => {
      Object.keys(yearData).forEach(grade => allGrades.add(grade));
    });
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
      <div className="rounded-xl border p-8 text-center" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card-inner-bg)' }}>
        <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="font-semibold mb-1" style={{ color: 'var(--color-heading)' }}>Loading cut-off data...</div>
        <div className="text-sm" style={{ color: 'var(--color-muted)' }}>載入分數線資料中...</div>
      </div>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="rounded-xl border p-8 text-center" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card-inner-bg)' }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3 mx-auto" style={{ color: 'var(--color-muted)' }}>
          <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="font-semibold mb-1" style={{ color: 'var(--color-heading)' }}>No data available</div>
        <div className="text-sm" style={{ color: 'var(--color-muted)' }}>
          沒有找到 {subject} 的分數線資料
          <br />
          Please select a different subject or check back later
        </div>
      </div>
    );
  }

  return (
    <div>
      <style>{`
        .cutoff-table-wrapper {
          overflow-x: auto;
          max-width: 100%;
          border-radius: 0.5rem;
          border: 1px solid var(--color-border);
        }
        .cutoff-table-wrapper table {
          min-width: 800px;
          width: max-content;
          border-collapse: collapse;
          font-size: 0.875rem;
        }
        .cutoff-table-wrapper thead th {
          background: #000000;
          color: #ffffff;
          padding: 0.625rem 1rem;
          text-align: center;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
          border-right: 1px solid #333333;
        }
        .cutoff-table-wrapper thead th:last-child {
          border-right: none;
        }
        .cutoff-table-wrapper thead th:first-child,
        .cutoff-table-wrapper tbody td:first-child {
          width: 100px;
          min-width: 90px;
          max-width: 150px;
        }
        .cutoff-table-wrapper tbody td {
          padding: 0.5rem 0.75rem;
          text-align: center;
          border-bottom: 1px solid var(--color-border);
          border-right: 1px solid var(--color-border);
          color: var(--color-body);
          white-space: nowrap;
        }
        .cutoff-table-wrapper tbody td:last-child {
          border-right: none;
        }
        .cutoff-table-wrapper tbody tr:last-child td {
          border-bottom: none;
        }
        .cutoff-table-wrapper tbody tr:nth-child(even) td {
          background: var(--color-overlay-bg);
        }
        [data-theme="dark"] .cutoff-table-wrapper tbody tr:nth-child(even) td,
        [data-theme="blue"] .cutoff-table-wrapper tbody tr:nth-child(even) td {
          background: var(--color-card-bg);
        }
        .cutoff-table-wrapper tbody td.grade-cell {
          font-weight: 700;
        }

        /* Scrollbar — subtle, theme-aware */
        .cutoff-table-wrapper::-webkit-scrollbar {
          height: 8px;
        }
        .cutoff-table-wrapper::-webkit-scrollbar-track {
          background: transparent;
        }
        .cutoff-table-wrapper::-webkit-scrollbar-thumb {
          background: var(--color-border);
          border-radius: 4px;
        }
        .cutoff-table-wrapper::-webkit-scrollbar-thumb:hover {
          background: var(--color-muted);
        }
        .cutoff-table-wrapper {
          scrollbar-width: thin;
          scrollbar-color: var(--color-border) transparent;
        }

        /* Table card header */
        .cutoff-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.25rem;
          background: var(--color-card-inner-bg);
          border-bottom: 1px solid var(--color-border);
          border-radius: 0.5rem 0.5rem 0 0;
        }
        .cutoff-card-header h5 {
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-heading);
        }
      `}</style>

      {sortedTableIds.map(tableId => {
        const tableData = data[tableId];
        const years = Object.keys(tableData).sort((a, b) => parseInt(b) - parseInt(a));
        const tableConfig = getTableConfig(tableId);
        const grades = getAvailableGrades(tableData);

        return (
          <div key={tableId} className="mb-4">
            <div className="cutoff-card-header rounded-t-lg" style={{ border: '1px solid var(--color-border)', borderBottom: 'none' }}>
              <div>
                <h5>{tableConfig?.title || tableId}</h5>
                <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                  {Math.min(...years.map(y => parseInt(y)))} – {Math.max(...years.map(y => parseInt(y)))}
                </span>
              </div>
            </div>
            <div className="cutoff-table-wrapper rounded-t-none">
              <table>
                <thead>
                  <tr>
                    <th>等級 Grade</th>
                    {years.map(year => (
                      <th key={year}>{year}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {grades.map(grade => (
                    <tr key={grade}>
                      <td
                        className="grade-cell"
                        style={{
                          backgroundColor: getGradeColor(grade),
                          color: grade === '5**' || grade === '5*' ? '#000' : '#fff',
                        }}
                      >
                        {grade}
                      </td>
                      {years.map(year => {
                        const yearData = tableData[year];
                        const gradeData = yearData?.[grade];

                        return (
                          <td key={`${year}-${grade}`}>
                            {gradeData ? (
                              <span>{gradeData.score} ({gradeData.percentage}%)</span>
                            ) : (
                              <span style={{ color: 'var(--color-muted)' }}>—</span>
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
        );
      })}
    </div>
  );
};

export default CutoffTable;
