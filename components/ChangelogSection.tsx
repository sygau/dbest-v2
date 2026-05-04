interface ChangelogSectionProps {
  date: string;
  changes: string[];
}

export default function ChangelogSection({ date, changes }: ChangelogSectionProps) {
  return (
    <div className="max-w-4xl mx-auto my-10">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="rounded-lg border border-[var(--color-border)] shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--color-card-inner-bg)' }}>
            <div className="p-4">
              <h3 className="mb-4 text-center font-bold text-lg" style={{ color: 'var(--color-heading)' }}>
                Changelog / 更新日誌
              </h3>
              <div className="font-semibold mb-4 text-center text-sm" style={{ color: 'var(--color-muted)' }}>{date}</div>
              <div className="text-center space-y-2" style={{ color: 'var(--color-body)' }}>
                {changes.map((change, index) => (
                  <p key={index}>{change}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}