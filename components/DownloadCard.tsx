import { BiDownload } from 'react-icons/bi';

export interface DownloadCardProps {
  title: string;
  description: string;
  paperId: string;
  buttonText?: string;
}

export default function DownloadCard({
  title,
  description,
  paperId,
  buttonText = 'Download',
}: DownloadCardProps) {
  return (
    <div className="col">
      <div className="flex flex-col h-full rounded-lg border border-[var(--color-border)] shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--color-card-inner-bg)' }}>
        <div className="p-4 flex-1">
          <h5 className="font-bold text-lg mb-2" style={{ color: 'var(--color-heading)' }}>{title}</h5>
          <p className="text-sm" style={{ color: 'var(--color-body)', opacity: 0.8 }}>{description}</p>
        </div>
        <div className="px-4 py-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition-colors"
            data-paper-id={paperId}
          >
            <BiDownload style={{ fontSize: 22 }} />
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}

export interface PaperSectionProps {
  id?: string;
  title: string;
  children: React.ReactNode;
  showDivider?: boolean;
}

export function PaperSection({
  id,
  title,
  children,
  showDivider = true,
}: PaperSectionProps) {
  return (
    <>
      {id && <div id={id} />}
      <h2 className="text-center text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
      {showDivider && <hr className="my-6" />}
    </>
  );
}
