interface Props { label?: string; sub?: string }

export default function GraderLoading({ label = 'AI 正在批改…', sub = '通常需要 15–40 秒，請勿離開頁面' }: Props) {
  return (
    <div className="gd-loading">
      <div className="gd-loading-spinner" />
      <div className="gd-loading-text">{label}</div>
      <div className="gd-loading-sub">{sub}</div>
    </div>
  );
}
