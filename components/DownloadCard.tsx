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
      <div className="card h-100 d-flex flex-column">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
        <div className="card-footer bg-transparent border-0">
          <a
            href="#"
            className="btn btn-info px-4 d-inline-flex gap-2"
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
      {id && <div id={id}></div>}
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <br />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {children}
      </div>
      {showDivider && <hr className="my-4" />}
    </>
  );
}
