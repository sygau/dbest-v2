import React from 'react';

interface ChangelogSectionProps {
  date: string;
  changes: string[];
}

export default function ChangelogSection({ date, changes }: ChangelogSectionProps) {
  return (
    <div className="container my-5 changelog-section">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-primary border-2">
            <div className="card-body">
              <h3 className="mb-4 text-primary text-center">
                Changelog / 更新日誌
              </h3>
              <div className="changelog-entry">
                <div className="fw-bold text-primary mb-2">{date}</div>
                <ul className="list-unstyled mb-0">
                  {changes.map((change, index) => (
                    <li key={index}>• {change}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 