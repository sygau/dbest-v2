import React from 'react';

interface ChangelogSectionProps {
  date: string;
  changes: string[];
}

export default function ChangelogSection({ date, changes }: ChangelogSectionProps) {
  return (
    <div className="max-w-4xl mx-auto my-10">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="card rounded-4">
            <div className="card-body p-4">
              <h3 className="mb-3 text-center font-bold text-[var(--color-heading)]">
                Changelog / 更新日誌
              </h3>
              <div className="font-bold text-[var(--color-muted)] mb-2 text-center text-sm">{date}</div>
              <div className="text-center text-[var(--color-body)]">
                {changes.map((change, index) => (
                  <p key={index} className="mb-2">{change}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}