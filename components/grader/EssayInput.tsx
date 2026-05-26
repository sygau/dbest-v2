import { LuTrash2, LuClipboardPaste } from 'react-icons/lu';

interface EssayInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  count: number;
  min: number;
  max: number;
  countLabel: string;
  disabled?: boolean;
  rows?: number;
}

export default function EssayInput({ value, onChange, placeholder, count, min, max, countLabel, disabled, rows }: EssayInputProps) {
  const tooShort = count > 0 && count < min;
  const tooLong = count > max;
  const bad = tooShort || tooLong;

  const handlePaste = async () => {
    try {
      const t = await navigator.clipboard.readText();
      if (t) onChange(value + t);
    } catch { /* user denied */ }
  };

  return (
    <>
      <textarea
        className="gd-textarea"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        spellCheck={false}
        style={rows ? { minHeight: rows * 24 + 28 } : undefined}
      />
      <div className="gd-input-bar">
        <span className={`gd-count ${bad ? 'bad' : ''}`}>
          {count} / {max} {countLabel}
          {tooShort && <span> · 最少 {min}</span>}
          {tooLong && <span> · 超出上限</span>}
        </span>
        <div className="gd-input-actions">
          <button
            type="button"
            onClick={handlePaste}
            disabled={disabled}
            className="gd-mini-btn"
            aria-label="貼上"
          >
            <LuClipboardPaste size={13} /> 貼上
          </button>
          <button
            type="button"
            onClick={() => onChange('')}
            disabled={disabled || !value}
            className="gd-mini-btn"
            aria-label="清除"
          >
            <LuTrash2 size={13} /> 清除
          </button>
        </div>
      </div>
    </>
  );
}
