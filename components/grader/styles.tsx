export default function GraderStyles() {
  return (
    <style jsx global>{`
      .gd-wrap {
        max-width: 920px; margin: 0 auto; padding: 16px;
        --gd-accent: rgba(195, 66, 224);
        --gd-accent-soft: rgba(195, 66, 224, .10);
        --gd-accent-fill: rgba(195, 66, 224, .92);
        /* Semantic tiers via OKLCH for both themes */
        --gd-good: oklch(0.55 0.14 152);
        --gd-good-soft: oklch(0.95 0.04 152);
        --gd-ok:   oklch(0.62 0.14 80);
        --gd-ok-soft: oklch(0.96 0.05 80);
        --gd-bad:  oklch(0.56 0.18 27);
        --gd-bad-soft: oklch(0.95 0.05 27);
        /* Strong separator that survives light + dark backgrounds */
        --gd-sep: rgba(15, 23, 42, .14);
      }
      [data-theme="dark"] .gd-wrap, [data-theme="blue"] .gd-wrap {
        --gd-good: oklch(0.74 0.14 152);
        --gd-good-soft: oklch(0.27 0.06 152);
        --gd-ok:   oklch(0.80 0.14 80);
        --gd-ok-soft: oklch(0.27 0.06 80);
        --gd-bad:  oklch(0.74 0.18 27);
        --gd-bad-soft: oklch(0.27 0.06 27);
        --gd-sep: rgba(255, 255, 255, .14);
      }

      /* Hero */
      .gd-page-hd { text-align: center; margin: 8px 0 18px; }
      .gd-page-title {
        font-size: 40px; font-weight: 800;
        color: var(--gd-accent);
        margin: 0 0 10px; letter-spacing: -0.015em; line-height: 1.1;
      }
      .gd-page-sub { color: var(--color-muted); font-size: 15.5px; line-height: 1.65; margin: 0 auto; max-width: 720px; }
      @media (max-width: 600px) {
        .gd-page-title { font-size: 30px; }
        .gd-page-sub { font-size: 14px; }
      }

      /* Input card */
      .gd-card { background: var(--color-card-bg); border: 1px solid var(--color-border); border-radius: 12px; padding: 18px; margin-bottom: 14px; }
      .gd-card-title { font-size: 15px; font-weight: 700; color: var(--color-emphasis); margin: 0 0 12px; display: flex; align-items: center; gap: 8px; }
      .gd-card-title-center { justify-content: center; }
      .gd-h3 { font-size: 17px; font-weight: 700; color: var(--color-emphasis); margin: 0 0 12px; letter-spacing: -0.005em; }
      .gd-h3-center { text-align: center; }

      /* Controls */
      .gd-editor-controls { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 14px; }
      .gd-editor-controls .spacer { flex: 1; min-width: 0; }
      .gd-editor-controls > .feedback-group { display: inline-flex; align-items: center; gap: 8px; }
      .feedback-lbl { font-size: 13px; color: var(--color-muted); white-space: nowrap; }
      @media (max-width: 640px) {
        .gd-editor-controls { gap: 8px; }
        .gd-editor-controls > * { flex: 1 1 auto; min-width: 0; }
        .gd-editor-controls > .gd-toggle-group, .gd-editor-controls > .gd-select { width: 100%; }
        .gd-editor-controls .gd-toggle-btn { flex: 1; }
        .gd-editor-controls .spacer { display: none; }
        .gd-editor-controls > .feedback-group { width: 100%; justify-content: space-between; }
      }

      .gd-select {
        background: var(--color-secondary-bg, var(--color-card-bg));
        color: var(--color-body);
        border: 1px solid var(--color-border); border-radius: 8px;
        padding: 8px 12px; font-size: 14px; font-family: inherit; cursor: pointer;
      }
      .gd-select:focus { outline: none; border-color: var(--gd-accent); }
      .gd-toggle-group { display: inline-flex; border: 1px solid var(--color-border); border-radius: 8px; overflow: hidden; background: var(--color-secondary-bg, var(--color-card-bg)); }
      .gd-toggle-btn { background: transparent; color: var(--color-muted); border: none; padding: 8px 14px; font-size: 13.5px; cursor: pointer; font-weight: 500; }
      .gd-toggle-btn:hover:not(.active) { color: var(--color-emphasis); }
      .gd-toggle-btn.active { background: var(--gd-accent-fill); color: white; }

      .gd-field-label { display: block; font-size: 14px; font-weight: 600; color: var(--color-emphasis); margin-bottom: 8px; }
      .gd-block { margin-bottom: 16px; }

      .gd-task-textarea {
        width: 100%; min-height: 130px; padding: 12px 14px;
        background: var(--color-secondary-bg, var(--color-card-bg)); color: var(--color-body);
        border: 1px solid var(--color-border); border-radius: 8px;
        font-size: 15px; line-height: 1.65; font-family: inherit; resize: vertical;
      }
      .gd-task-textarea:focus { outline: none; border-color: var(--gd-accent); }
      .gd-task-count { display: block; text-align: right; font-size: 12px; color: var(--color-muted); margin-top: 4px; }

      .gd-textarea {
        width: 100%; min-height: 320px; padding: 14px;
        background: var(--color-secondary-bg, var(--color-card-bg)); color: var(--color-body);
        border: 1px solid var(--color-border); border-radius: 10px;
        font-size: 16px; line-height: 1.7; font-family: inherit; resize: vertical;
        transition: border-color .15s;
      }
      .gd-textarea:focus { outline: none; border-color: var(--gd-accent); }
      .gd-input-bar { display: flex; justify-content: space-between; align-items: center; margin-top: 8px; gap: 12px; flex-wrap: wrap; }
      .gd-count { font-size: 13px; color: var(--color-muted); }
      .gd-count.bad { color: var(--gd-bad); font-weight: 600; }
      .gd-input-actions { display: flex; gap: 6px; }
      .gd-mini-btn {
        background: transparent; border: 1px solid var(--color-border); border-radius: 6px;
        padding: 5px 10px; cursor: pointer; color: var(--color-muted); font-size: 12px;
        display: inline-flex; align-items: center; gap: 4px;
      }
      .gd-mini-btn:hover:not(:disabled) { color: var(--color-emphasis); border-color: var(--gd-accent); }
      .gd-mini-btn:disabled { opacity: .4; cursor: not-allowed; }
      .gd-submit-row { display: flex; margin-top: 14px; }
      .gd-submit-row > * { flex: 1; }

      /* Loading */
      .gd-loading { display: flex; flex-direction: column; align-items: center; padding: 56px 20px; background: var(--color-card-bg); border: 1px solid var(--color-border); border-radius: 12px; margin-bottom: 14px; }
      .gd-loading-spinner { width: 32px; height: 32px; border: 3px solid var(--color-border); border-top-color: var(--gd-accent); border-radius: 50%; animation: gd-spin .75s linear infinite; margin-bottom: 14px; }
      .gd-loading-text { font-size: 15px; color: var(--color-emphasis); font-weight: 600; }
      .gd-loading-sub { font-size: 13px; color: var(--color-muted); margin-top: 6px; }
      @keyframes gd-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

      /* ──────────── RESULT ──────────── */
      .gd-result {
        background: var(--color-card-bg);
        border: 1px solid var(--gd-sep);
        border-radius: 14px;
        padding: 30px 32px 28px;
        margin-bottom: 14px;
      }
      @media (max-width: 640px) { .gd-result { padding: 22px 18px; } }

      .gd-report-h {
        font-size: 20px; font-weight: 800; letter-spacing: -0.01em;
        color: var(--color-emphasis); margin: 0 0 20px;
        padding-bottom: 14px; border-bottom: 1px solid var(--gd-sep);
        text-align: center;
      }

      /* Summary: label above, score with /max inline beside */
      .gd-summary {
        display: grid; grid-template-columns: 1fr 1px 1fr; align-items: start; gap: 28px;
        padding-bottom: 24px; margin-bottom: 24px;
        border-bottom: 1px solid var(--gd-sep);
      }
      .gd-summary-sep { background: var(--gd-sep); height: 76px; align-self: center; }
      .gd-summary-cell { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px; }
      .gd-summary-lbl { font-size: 12px; color: var(--color-muted); text-transform: uppercase; letter-spacing: 0.7px; font-weight: 700; }
      .gd-summary-score { display: flex; align-items: baseline; gap: 6px; font-variant-numeric: tabular-nums; }
      .gd-summary-num { font-size: 64px; font-weight: 800; line-height: 1; letter-spacing: -0.03em; }
      .gd-summary-of { font-size: 22px; color: var(--color-muted); font-weight: 600; }
      .gd-summary-lvl { font-size: 60px; font-weight: 800; line-height: 1; color: var(--color-emphasis); letter-spacing: -0.025em; }
      .gd-summary-band { font-size: 14px; font-weight: 700; }
      @media (max-width: 640px) {
        .gd-summary { grid-template-columns: 1fr; gap: 18px; padding-bottom: 18px; margin-bottom: 18px; }
        .gd-summary-sep { display: none; }
        .gd-summary-num, .gd-summary-lvl { font-size: 52px; }
        .gd-summary-of { font-size: 18px; }
      }

      /* Domain rows */
      .gd-rows { display: flex; flex-direction: column; }
      .gd-row { padding: 22px 0; border-bottom: 1px solid var(--gd-sep); }
      .gd-row:last-child { border-bottom: 0; padding-bottom: 8px; }
      .gd-row-hd { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-bottom: 10px; }
      .gd-row-name { font-size: 18px; font-weight: 700; color: var(--color-emphasis); letter-spacing: -0.01em; margin: 0; }
      .gd-row-score { font-variant-numeric: tabular-nums; }
      .gd-row-num { font-size: 30px; font-weight: 800; letter-spacing: -0.02em; }
      .gd-row-of { font-size: 16px; color: var(--color-muted); font-weight: 600; margin-left: 2px; }
      .gd-row-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
      .gd-bar { height: 5px; flex: 1; background: var(--gd-sep); border-radius: 3px; overflow: hidden; }
      .gd-bar-fill { height: 100%; background: currentColor; border-radius: 3px; }
      .gd-row-band { font-size: 13.5px; font-weight: 700; white-space: nowrap; }
      .gd-row-body { display: flex; flex-direction: column; gap: 16px; }

      .gd-tier-good { color: var(--gd-good); }
      .gd-tier-ok   { color: var(--gd-ok); }
      .gd-tier-bad  { color: var(--gd-bad); }

      .gd-sub-lbl { font-size: 12.5px; color: var(--color-muted); text-transform: uppercase; letter-spacing: 0.6px; font-weight: 700; margin-bottom: 6px; }
      .gd-clean-list { margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.65; color: var(--color-body); }
      .gd-clean-list li { margin-bottom: 4px; }
      .gd-list-good li::marker { color: var(--gd-good); }
      .gd-list-bad li::marker { color: var(--gd-bad); }

      .gd-err-list { display: flex; flex-direction: column; gap: 7px; }
      .gd-err { background: var(--gd-bad-soft); padding: 10px 14px; border-radius: 6px; font-size: 14.5px; }
      .gd-err-line { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px; }
      .gd-err-orig { text-decoration: line-through; color: var(--color-muted); }
      .gd-err-arrow { color: var(--color-muted); }
      .gd-err-fix { color: var(--gd-good); font-weight: 600; }
      .gd-err-type { margin-left: auto; font-size: 11px; padding: 1px 8px; border-radius: 999px; background: var(--gd-sep); color: var(--color-emphasis); text-transform: uppercase; letter-spacing: 0.4px; font-weight: 700; }
      .gd-err-expl { font-size: 13px; color: var(--color-muted); margin-top: 5px; line-height: 1.5; }

      .gd-vocab-weak { color: var(--color-muted); text-decoration: line-through; }
      .gd-vocab-arrow { color: var(--color-muted); }
      .gd-vocab-strong { color: var(--color-emphasis); font-weight: 600; }
      .gd-vocab-ctx { color: var(--color-muted); font-size: 13px; }
      .gd-rhet-ok { color: var(--gd-good); font-weight: 600; font-size: 13px; }
      .gd-rhet-weak { color: var(--gd-ok); font-weight: 600; font-size: 13px; }

      /* Sub-blocks */
      .gd-block-block { padding-top: 24px; margin-top: 20px; border-top: 1px solid var(--gd-sep); }
      .gd-block-h { font-size: 14px; font-weight: 700; color: var(--color-emphasis); text-transform: uppercase; letter-spacing: 0.8px; margin: 0 0 14px; }

      /* Tips */
      .gd-tip-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
      .gd-tip-list li { display: grid; grid-template-columns: 28px 1fr; gap: 12px; font-size: 15px; line-height: 1.6; color: var(--color-body); }
      .gd-tip-n {
        width: 26px; height: 26px; border-radius: 50%;
        border: 1.5px solid var(--gd-accent); color: var(--gd-accent);
        display: inline-flex; align-items: center; justify-content: center;
        font-size: 13px; font-weight: 700; line-height: 1;
      }

      /* Paragraph feedback — one horizontal row: §N + role + rating + body */
      .gd-para-list { list-style: none; padding: 0; margin: 0; }
      .gd-para {
        display: grid;
        grid-template-columns: auto 1fr;
        column-gap: 12px;
        align-items: baseline;
        padding: 12px 0;
        border-bottom: 1px solid var(--gd-sep);
      }
      .gd-para:last-child { border-bottom: 0; }
      .gd-para-idx { font-size: 13px; color: var(--color-muted); font-variant-numeric: tabular-nums; font-weight: 600; min-width: 26px; }
      .gd-para-content { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
      .gd-para-role { font-size: 14.5px; font-weight: 700; color: var(--color-emphasis); white-space: nowrap; }
      .gd-para-rating {
        font-size: 12px; font-weight: 700;
        padding: 3px 9px; border-radius: 0; text-align: center;
        white-space: nowrap; letter-spacing: 0.3px;
      }
      .gd-rating-strong { background: var(--gd-good-soft); color: var(--gd-good); }
      .gd-rating-ok     { background: var(--gd-ok-soft); color: var(--gd-ok); }
      .gd-rating-weak   { background: var(--gd-bad-soft); color: var(--gd-bad); }
      .gd-para-body { margin: 0; font-size: 14.5px; line-height: 1.6; color: var(--color-body); flex: 1; min-width: 100%; }
      @media (max-width: 640px) {
        .gd-para { grid-template-columns: auto 1fr; }
        .gd-para-idx { }
        .gd-para-content { width: 100%; flex-direction: column; gap: 6px; }
        .gd-para-body { min-width: auto; }
      }

      .gd-overall-prose {
        font-size: 16px; line-height: 1.7; color: var(--color-emphasis);
        margin: 0; padding: 16px 20px;
        background: var(--color-secondary-bg, var(--color-card-bg));
        border-radius: 8px;
      }
      .gd-disclaimer { font-size: 12px; color: var(--color-muted); text-align: center; margin: 18px 0 0; font-style: italic; }

      /* Guide card */
      .gd-guide-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
      @media (max-width: 600px) { .gd-guide-steps { grid-template-columns: 1fr; } }
      .gd-guide-step { padding: 12px 14px; background: var(--color-secondary-bg, var(--color-card-bg)); border-radius: 10px; border: 1px solid var(--gd-sep); }
      .gd-guide-hd { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
      .gd-guide-num {
        display: inline-flex; align-items: center; justify-content: center;
        width: 22px; height: 22px; border-radius: 50%;
        background: var(--gd-accent-fill); color: white;
        font-size: 11.5px; font-weight: 700; flex-shrink: 0;
      }
      .gd-guide-title { font-size: 13.5px; font-weight: 700; color: var(--color-emphasis); }
      .gd-guide-body { font-size: 13px; color: var(--color-muted); line-height: 1.55; }
    `}</style>
  );
}
