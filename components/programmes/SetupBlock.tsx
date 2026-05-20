import { LuArrowRight, LuInfo } from 'react-icons/lu'
import type { ProgrammeSetup } from '../../lib/programmes'

function KeyChip({ k }: { k: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 9px',
        background: 'var(--color-card-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontWeight: 600,
        fontSize: '0.85rem',
        color: 'var(--color-body)',
      }}
    >
      {k}
    </span>
  )
}

function KeySeq({ keys }: { keys: string[] }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
      {keys.map((k, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <KeyChip k={k} />
          {i < keys.length - 1 && <LuArrowRight size={12} style={{ color: 'var(--color-muted)' }} />}
        </span>
      ))}
    </div>
  )
}

export default function SetupBlock({ setup }: { setup: ProgrammeSetup }) {
  return (
    <div
      style={{
        display: 'grid',
        gap: '14px',
        padding: '16px',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        background: 'var(--color-card-bg)',
      }}
    >
      <div>
        <div style={setupLabelStyle}>1. 進入 PRGM 模式 Enter PRGM mode</div>
        <KeySeq keys={setup.enterPrgm} />
      </div>

      <div>
        <div style={setupLabelStyle}>2. 選擇 slot 揀位</div>
        <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--color-body)' }}>{setup.slotInstruction}</p>
      </div>

      <div>
        <div style={setupLabelStyle}>3. 計算機模式 Calculator mode</div>
        {setup.requiredMode && setup.modeSetupKeys ? (
          <>
            <p style={{ margin: '0 0 8px', fontSize: '0.92rem', color: 'var(--color-body)' }}>
              本程式需要 <strong>{setup.requiredMode}</strong> 模式 (requires {setup.requiredMode}) — 用以下按鍵設定：
            </p>
            <KeySeq keys={setup.modeSetupKeys} />
          </>
        ) : (
          <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--color-body)' }}>
            預設 <strong>COMP</strong> 模式即可運行，無需額外設定 (runs in default COMP mode).
          </p>
        )}
      </div>

      {setup.notes && (
        <div
          style={{
            display: 'flex',
            gap: '10px',
            padding: '10px 12px',
            background: 'var(--color-card-inner-bg)',
            border: '1px solid var(--color-border)',
            borderLeft: '3px solid #f59e0b',
            borderRadius: '4px',
            fontSize: '0.88rem',
            color: 'var(--color-body)',
          }}
        >
          <LuInfo size={16} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
          <span>{setup.notes}</span>
        </div>
      )}
    </div>
  )
}

const setupLabelStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  fontWeight: 700,
  color: 'var(--color-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  marginBottom: '6px',
}
