import NavigationLink from './NavigationLink';

interface Props {
  section: string;
  text: string;
  showHome?: boolean;
}

export default function PageBreadcrumb({ section, text, showHome }: Props) {
  return (
    <div className="page-breadcrumb hidden lg:flex items-center mb-4">
      <div className="breadcrumb-title">{section}</div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {showHome && (
              <li className="breadcrumb-item">
                <NavigationLink href="/" aria-label="Home"><i className="bx bx-home-alt" /></NavigationLink>
              </li>
            )}
            <li className="breadcrumb-item active" aria-current="page">{text}</li>
          </ol>
        </nav>
      </div>
    </div>
  );
}
