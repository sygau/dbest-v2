// All JUPAS calculator/design CSS in one place. Both pages render <JupasStyles />.
// Copied verbatim from the original design.tsx <style> block.

export default function JupasStyles() {
  return (
    <style jsx global>{`
      /* ── JUPAS design tokens ── */
      .jpd-wrap { max-width: 430px; margin: 0 auto; padding: 14px; }
      .jpd-results-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
      .jpd-result-label { font-size: 14px; color: var(--color-muted); letter-spacing: .3px; }

      .jpd-sort { display: inline-flex; align-items: center; gap: 0; border: 1px solid var(--color-border); border-radius: 3px; background: var(--color-card-bg); cursor: pointer; font-family: inherit; box-shadow: 0 1px 2px rgba(0,0,0,0.06); overflow: hidden; }
      .jpd-sort-icon { display: flex; align-items: center; padding: 4px 0px 2px 7px; color: var(--color-muted); }
      .jpd-sort-div { width: 1px; height: 100%; background: var(--color-border); flex-shrink: 0; }
      .jpd-sort-lbl { padding: 6px 9px; font-size: 12px; font-weight: 600; color: var(--color-emphasis); letter-spacing: .2px; }
      .jpd-sort-active .jpd-sort-icon { color: #6c3fc4; }
      .jpd-sort-active .jpd-sort-lbl  { color: #6c3fc4; }
      [data-theme="dark"] .jpd-sort-active .jpd-sort-icon,
      [data-theme="dark"] .jpd-sort-active .jpd-sort-lbl,
      [data-theme="blue"] .jpd-sort-active .jpd-sort-icon,
      [data-theme="blue"] .jpd-sort-active .jpd-sort-lbl { color: #b090f0; }

      .jpd-loading { display: flex; flex-direction: column; align-items: center; padding: 40px 20px; background: var(--color-card-bg); border: 1px solid var(--color-border); margin-bottom: 10px; }
      .jpd-loading-spinner { width: 26px; height: 26px; border: 2.5px solid var(--color-border); border-top-color: #6c3fc4; border-radius: 50%; animation: jpd-spin 0.75s linear infinite; margin-bottom: 14px; }
      [data-theme="dark"] .jpd-loading-spinner,
      [data-theme="blue"] .jpd-loading-spinner { border-top-color: #b090f0; }
      @keyframes jpd-spin { to { transform: rotate(360deg); } }
      .jpd-loading-text { font-size: 13px; color: var(--color-muted); letter-spacing: .3px; }

      .jpd-card { background: var(--color-card-bg); border: 1px solid var(--color-border); box-shadow: 0 1px 4px rgba(0,0,0,0.09); margin-bottom: 10px; }
      [data-theme="dark"] .jpd-card { box-shadow: 0 1px 4px rgba(0,0,0,0.25); }
      [data-theme="blue"] .jpd-card { box-shadow: 0 1px 4px rgba(0,0,0,0.35); }

      .jpd-result-card { display: block; }
      .jpd-card-top { display: block; }
      .jpd-card-main { display: block; }
      .jpd-chance-panel { display: none; }

      .jpd-hd { padding: 11px 13px 10px; }
      .jpd-codes-row { font-size: 11px; font-weight: 500; color: var(--color-muted); letter-spacing: .3px; margin-bottom: 5px; text-align: left; display: flex; align-items: center; gap: 4px; }
      .jpd-code-id { font-size: 12.8964px; font-weight: 700; color: var(--color-heading); letter-spacing: .4px; }
      .jpd-hd-body { display: flex; align-items: flex-start; gap: 10px; }
      .jpd-logo { width: 44px; height: 44px; flex-shrink: 0; border: 1px solid var(--color-border); display: flex; align-items: center; justify-content: center; border-radius: 2px; font-size: 10px; font-weight: 800; letter-spacing: .5px; color: #fff; }
      .jpd-logo-col { display: flex; flex-direction: column; align-items: center; gap: 5px; flex-shrink: 0; }
      .jpd-bookmark-btn { width: 32px; height: 28px; display: flex; align-items: center; justify-content: center; padding: 0; border: 0.3px solid var(--color-border); border-radius: 3px; background: transparent; color: var(--color-muted); cursor: pointer; }
      .jpd-bookmark-btn:hover { color: var(--color-emphasis); border-color: var(--color-emphasis); }
      .jpd-bookmark-on, .jpd-bookmark-on:hover {  }
      .jpd-prob-na { background: var(--color-border); color: var(--color-muted); }
      .jpd-names { flex: 1; min-width: 0; }
      .jpd-name-ch { font-size: 15.5px; font-weight: 700; color: var(--color-emphasis); line-height: 1; word-break: break-all; }
      .jpd-name-en { font-size: 11px; color: var(--color-muted); margin-top: 3px; line-height: 1.4; }

      .jpd-stats { border-top: 1px solid var(--color-border); padding: 3px 13px 3px 5px; display: flex; align-items: center; }
      .jpd-stats-nums { flex: 1; display: flex; align-items: center; }
      .jpd-stat { flex: 1; text-align: center; padding: 0 2px; }
      .jpd-stat + .jpd-stat { border-left: 1px solid var(--color-border); }
      .jpd-s-lbl { font-size: 8.5px; letter-spacing: .9px; text-transform: uppercase; color: var(--color-emphasis); margin-bottom: 3px; }
      [data-theme="dark"] .jpd-s-lbl { color: var(--color-muted); }
      [data-theme="blue"] .jpd-s-lbl { color: var(--color-muted); }
      .jpd-s-val { font-size: 14px; font-weight: 600; color: var(--color-emphasis); line-height: 1; }
      .jpd-s-md { font-size: 19px; font-weight: 800; }

      .jpd-badge-col { padding-left: 10px; border-left: 1px solid var(--color-border); display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 64px; gap: 3px; transform: translate(-2px, -2px); }
      .jpd-b-icons { display: flex; gap: 4px; align-items: center; min-height: 16px; }
      .jpd-ico-god { color: #e8930a; font-size: 15px; }
      .jpd-ico-pop { color: #d0310a; font-size: 15px; }

      .jpd-prob { font-size: 14px; font-weight: 500; padding: 3px 6px; text-align: center; line-height: 1.3; white-space: nowrap; }
      .jpd-p-highchance { background: #00703c; color: #fff; }
      .jpd-p-comp { background: #005eb8; color: #fff; }
      .jpd-p-bord { background: #ffb81c; color: #1a1200; }
      .jpd-p-low { background: #e8510c; color: #fff; }
      .jpd-p-unmet { background: #d5281b; color: #fff; }
      .jpd-prob-en { font-size: 8.5px; color: var(--color-muted); text-align: center; }

      .jpd-delta { font-size: 9.5px; font-weight: 700; line-height: 1; margin-top: 3px; letter-spacing: .2px; }

      .jpd-tog { display: flex; width: 100%; background: var(--color-secondary-bg); border: none; border-top: 1px solid var(--color-border); padding: 7px 13px; cursor: pointer; align-items: center; justify-content: space-between; font-size: 12px; color: #005eb8; font-weight: 500; font-family: inherit; letter-spacing: .2px; }
      [data-theme="dark"] .jpd-tog,
      [data-theme="blue"] .jpd-tog { color: #6fa8dc; }

      .jpd-body { display: block; }

      .jpd-yr-tbl { width: 100%; border-collapse: collapse; }
      .jpd-yr-tbl thead th { background: var(--color-secondary-bg); padding: 6px 12px; font-size: 9px; letter-spacing: .9px; text-transform: uppercase; color: var(--color-emphasis); font-weight: 700; text-align: center; border-bottom: 1.5px solid var(--color-border); }
      [data-theme="dark"] .jpd-yr-tbl thead th { color: var(--color-muted); }
      [data-theme="blue"] .jpd-yr-tbl thead th { color: var(--color-muted); }
      .jpd-yr-tbl thead th:first-child { text-align: left; }
      .jpd-yr-tbl tbody td { padding: 8px 12px; font-size: 13px; text-align: center; color: var(--color-emphasis); border-bottom: 1px solid var(--color-border); background: var(--color-card-bg); }
      .jpd-yr-tbl tbody td:first-child { text-align: left; font-weight: 600; font-size: 12px; color: var(--color-muted); }
      .jpd-mc { font-weight: 800; }
      .jpd-yr-tbl tbody tr:last-child td { border-bottom: none; }

      .jpd-info-sec { border-top: 3px solid var(--color-emphasis); }
      .jpd-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--color-border); border: 1px solid var(--color-border); border-top: none; }
      .jpd-info-cell { padding: 9px 12px; background: var(--color-card-bg); }
      .jpd-full { grid-column: 1 / -1; }
      .jpd-i-lbl { font-size: 11px; letter-spacing: .7px; text-transform: uppercase; color: var(--color-emphasis); margin-bottom: 3px; }
      [data-theme="dark"] .jpd-i-lbl { color: var(--color-muted); }
      [data-theme="blue"] .jpd-i-lbl { color: var(--color-muted); }
      .jpd-i-val { font-size: 13px; font-weight: 600; color: var(--color-emphasis); line-height: 1.45; }
      .jpd-i-val-lt { font-weight: 400; font-size: 12px; }
      .jpd-i-sub { font-size: 10.5px; font-weight: 400; color: var(--color-muted); margin-top: 1px; }

      .jpd-pill { display: inline-block; padding: 2px 6px; font-size: 11px; font-weight: 600; border-radius: 1px; }
      .jpd-pill-y { background: #d4edda; color: #0a3d20; }
      .jpd-pill-n { background: #fde8e8; color: #721c24; }
      .jpd-pill-maybe { background: #fff4cc; color: #6d4c00; }

      .jpd-formula-box { font-family: "Courier New", Courier, monospace; font-size: 11.5px; background: var(--color-secondary-bg); border: 1px solid var(--color-border); padding: 6px 9px; margin-top: 5px; word-break: break-all; color: var(--color-emphasis); }

      .jpd-legend { padding: 10px 12px; background: var(--color-card-bg); border: 1.5px solid var(--color-border); }
      .jpd-legend-title { font-size: 9.5px; letter-spacing: .6px; text-transform: uppercase; color: var(--color-muted); margin-bottom: 7px; }
      .jpd-legend-row { display: flex; flex-wrap: wrap; gap: 5px; }

      .jpd-page-hd { margin-bottom: 0px; padding-bottom: 1px; border-bottom: 1px solid var(--color-border); text-align: center; }
      .jpd-page-tag { font-size: 9px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--color-muted); margin-bottom: 4px; }
      .jpd-page-title { font-size: 35px; font-weight: 800; color: #6932db; margin: 0 0 6px; letter-spacing: .3px; filter: drop-shadow(4px 4px 1px rgba(139,92,246,.3)); }
      [data-theme="dark"] .jpd-page-title,
      [data-theme="blue"] .jpd-page-title { color: #b090f0; }
      .jpd-page-sub { font-size: 20px; color: var(--color-muted); line-height: 1.55; }

      .jpd-stats-delta { padding: 3px 0 6px; text-align: center; font-size: 9.5px; font-weight: 700; letter-spacing: .2px; border-top: 1px solid var(--color-border); }

      .jpd-search-card { margin-bottom: 16px; }
      .jpd-tbl-hd { padding: 6px 13px; background: var(--color-secondary-bg); border-top: 1px solid var(--color-border); font-size: 16px; letter-spacing: .9px; text-transform: uppercase; color: var(--color-emphasis); font-weight: 600; display: flex; align-items: baseline; gap: 7px; }
      .jpd-tbl-hd:first-child { border-top: none; }
      .jpd-tbl-hd-en { font-size: 14px; font-weight: 400; text-transform: none; letter-spacing: .3px; color: var(--color-muted); }
      [data-theme="dark"] .jpd-tbl-hd { color: var(--color-muted); font-weight: 600; }
      [data-theme="blue"] .jpd-tbl-hd { color: var(--color-muted); font-weight: 600; }

      .jpd-subj-row { display: flex; align-items: center; gap: 8px; padding: 8px 13px; border-bottom: 1px solid var(--color-border); }
      .jpd-subj-row:last-child { border-bottom: none; }
      .jpd-subj-name { flex: 1; min-width: 0; }
      .jpd-subj-name-ch { display: block; font-size: 15px; font-weight: 500; color: var(--color-emphasis); line-height: 1.3; }
      .jpd-subj-name-en { display: block; font-size: 13px; font-weight: 400; color: var(--color-muted); margin-top: 1px; }

      .jpd-select { padding: 5px 7px; font-size: 15px; font-weight: 500; background: var(--color-input-bg); color: var(--color-body); border: 1px solid var(--color-border); border-radius: 2px; font-family: inherit; cursor: pointer; -webkit-appearance: auto; }
      .jpd-grade-sel { width: 66px; flex-shrink: 0; }
      .jpd-subject-sel { flex: 1; min-width: 0; }

      .jpd-add-wrap { padding: 8px 13px; border-top: 1px solid var(--color-border); }

      .jpd-filters-sec { border-top: 1px solid var(--color-border); }
      .jpd-filters-hd { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 9px 13px; background: var(--color-secondary-bg); border: none; border-top: 1px solid var(--color-border); font-family: inherit; cursor: pointer; font-size: 13px; font-weight: 600; color: var(--color-emphasis); text-align: left; }
      .jpd-filters-hd-en { font-size: 14px; font-weight: 400; color: var(--color-muted); margin-left: 4px; }
      .jpd-filters-chevron { color: var(--color-muted); }
      .jpd-filters-chevron-open { transform: rotate(180deg); }
      .jpd-filters-body { padding: 12px 13px; display: flex; flex-direction: column; gap: 16px; border-top: 1px solid var(--color-border); }
      .jpd-filter-grp-lbl { font-size: 10px; font-weight: 700; letter-spacing: .7px; text-transform: uppercase; color: var(--color-muted); margin-bottom: 9px; }
      .jpd-chips { display: flex; flex-wrap: wrap; gap: 7px; }

      .jpd-fchip { display: inline-flex; align-items: center; gap: 5px; min-height: 40px; padding: 0 14px; border: 1.5px solid var(--color-border); border-radius: 2px; background: var(--color-card-bg); color: var(--color-emphasis); font-size: 14px; font-weight: 500; font-family: inherit; cursor: pointer; white-space: nowrap; }
      .jpd-fchip-on {  background: #8d5cff; color: #fff }
      .jpd-fchip-check { color: #6c3fc4; flex-shrink: 0; }
      [data-theme="dark"] .jpd-fchip-on { background: #2a1e42; color: #b090f0; border-color: #9060d8; }
      [data-theme="dark"] .jpd-fchip-check { color: #b090f0; }
      [data-theme="blue"] .jpd-fchip-on { background: #1e1840; color: #b090f0; border-color: #9060d8; }
      [data-theme="blue"] .jpd-fchip-check { color: #b090f0; }

      .jpd-search-foot { padding: 10px 13px; border-top: 1px solid var(--color-border); }
      .jpd-search-errs { padding: 8px 13px; background: #fde8e8; border-top: 1px solid var(--color-border); color: #721c24; font-size: 12.5px; line-height: 1.55; }
      [data-theme="dark"] .jpd-search-errs,
      [data-theme="blue"] .jpd-search-errs { background: #3a1a1a; color: #f0a8a0; }
      .jpd-search-errs ul { margin: 0; padding-left: 18px; }
      .jpd-sample-banner { padding: 7px 13px; background: var(--color-secondary-bg); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); font-size: 11.5px; color: var(--color-muted); letter-spacing: .2px; display: flex; align-items: center; gap: 6px; }
      .jpd-sample-dot { width: 6px; height: 6px; border-radius: 50%; background: #6c3fc4; }

      .jpd-nores { display: flex; flex-direction: column; align-items: center; padding: 36px 20px; background: var(--color-card-bg); border: 1px solid var(--color-border); margin-bottom: 10px; text-align: center; }
      .jpd-nores-icon { color: var(--color-muted); margin-bottom: 12px; }
      .jpd-nores-title { font-size: 15px; font-weight: 700; color: var(--color-emphasis); margin-bottom: 6px; }
      .jpd-nores-sub { font-size: 12px; color: var(--color-muted); max-width: 280px; line-height: 1.55; }

      .jpd-uni-palette { margin-top: 16px; }
      .jpd-up-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--color-border); border: 1px solid var(--color-border); border-top: none; }
      .jpd-up-item { display: flex; flex-direction: column; align-items: center; gap: 7px; padding: 14px 8px; background: var(--color-card-bg); }
      .jpd-up-swatch { width: 52px; height: 52px; border-radius: 2px; display: flex; align-items: center; justify-content: center; }
      .jpd-up-abbr { font-size: 9.5px; font-weight: 800; color: #fff; letter-spacing: .4px; text-align: center; line-height: 1.2; }
      .jpd-up-hex { font-size: 10px; font-weight: 500; color: var(--color-muted); font-family: "Courier New", Courier, monospace; letter-spacing: .3px; }

      .jpd-code-link { display: inline-flex; align-items: center; gap: 3px; color: inherit; text-decoration: none; cursor: pointer; }
      .jpd-code-link:hover .jpd-code-id,
      .jpd-code-link:focus-visible .jpd-code-id { text-decoration: underline; }
      .jpd-code-ext { color: var(--color-muted); transform: translateY(-0.5px); opacity: .75; }

      .jpd-mech-card { margin-top: 14px; }
      .jpd-mech-hd { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 10px 13px; background: var(--color-secondary-bg); border: none; border-bottom: 1px solid var(--color-border); font-family: inherit; cursor: pointer; font-size: 14px; font-weight: 700; color: var(--color-emphasis); text-align: left; letter-spacing: .2px; }
      .jpd-mech-hd-static { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 10px 13px; background: var(--color-secondary-bg); border: none; border-bottom: 1px solid var(--color-border); font-size: 14px; font-weight: 700; color: var(--color-emphasis); text-align: left; letter-spacing: .2px; }
      .jpd-mech-hd-en { display: block; font-size: 11px; font-weight: 400; color: var(--color-muted); margin-top: 2px; letter-spacing: .3px; }
      .jpd-mech-tri { font-size: 10px; color: var(--color-muted); line-height: 1; flex-shrink: 0; margin-left: 8px; }
      .jpd-mech-body { padding: 4px 0; }
      .jpd-mech-sec { padding: 12px 13px; border-bottom: 1px solid var(--color-border); }
      .jpd-mech-sec:last-child { border-bottom: none; }
      .jpd-mech-h { font-size: 15px; font-weight: 700; color: var(--color-heading); margin: 0 0 7px; line-height: 1.35; }
      .jpd-mech-h-en { display: inline-block; font-size: 11px; font-weight: 400; color: var(--color-muted); margin-left: 5px; letter-spacing: .2px; }
      .jpd-mech-p { font-size: 12.5px; line-height: 1.65; color: var(--color-body); margin: 0 0 8px; }
      .jpd-mech-p em, .jpd-mech-ul em { font-style: normal; font-weight: 700; color: var(--color-emphasis); }
      .jpd-mech-ul { margin: 0 0 8px; padding-left: 18px; font-size: 12.5px; line-height: 1.7; color: var(--color-body); }
      .jpd-mech-ul li { margin-bottom: 3px; }
      .jpd-mech-ul li b { color: var(--color-emphasis); font-weight: 700; }
      .jpd-mech-note { font-size: 11.5px; line-height: 1.55; color: var(--color-muted); margin: 6px 0 0; padding: 7px 10px; background: var(--color-secondary-bg); border-left: 2px solid var(--color-border); }
      .jpd-mech-note em { font-style: normal; font-weight: 700; color: var(--color-emphasis); }
      .jpd-mech-tbl { width: 100%; border-collapse: collapse; margin: 6px 0 10px; font-size: 12px; }
      .jpd-mech-tbl thead th { background: var(--color-secondary-bg); padding: 5px 8px; font-size: 10px; letter-spacing: .6px; text-transform: uppercase; color: var(--color-emphasis); font-weight: 700; border-bottom: 1.5px solid var(--color-border); text-align: center; }
      [data-theme="dark"] .jpd-mech-tbl thead th,
      [data-theme="blue"] .jpd-mech-tbl thead th { color: var(--color-muted); }
      .jpd-mech-tbl thead th:first-child { text-align: left; }
      .jpd-mech-tbl tbody td { padding: 5px 8px; text-align: center; color: var(--color-emphasis); border-bottom: 1px solid var(--color-border); }
      .jpd-mech-tbl tbody td:first-child { text-align: left; font-weight: 600; color: var(--color-muted); }
      .jpd-mech-tbl tbody tr:last-child td { border-bottom: none; }
      .jpd-mech-grp { display: flex; flex-direction: column; gap: 6px; margin-top: 4px; }
      .jpd-mech-grp-row { display: flex; flex-direction: column; gap: 2px; padding: 7px 9px; background: var(--color-secondary-bg); border-left: 2px solid var(--color-border); }
      .jpd-mech-grp-lbl { font-size: 10px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; color: var(--color-muted); }
      .jpd-mech-grp-val { font-size: 12px; line-height: 1.5; color: var(--color-emphasis); font-weight: 500; }
      .jpd-mech-tag { display: inline-block; font-size: 10px; font-weight: 700; padding: 1px 5px; margin-left: 2px; background: #fff4cc; color: #6d4c00; letter-spacing: .3px; }
      [data-theme="dark"] .jpd-mech-tag,
      [data-theme="blue"] .jpd-mech-tag { background: #3a2e10; color: #f0c060; }

      .jpd-show-more-wrap { padding: 14px 0; display: flex; justify-content: center; }
      .jpd-flex-badge { display: inline-block; padding: 2px 6px; font-size: 10px; font-weight: 700; background: #f0eafe; color: #6c3fc4; letter-spacing: .3px; margin-left: 5px; }
      [data-theme="dark"] .jpd-flex-badge,
      [data-theme="blue"] .jpd-flex-badge { background: #2a1e42; color: #b090f0; }
      .jpd-scale-note { font-size: 11px; color: #8a6200; padding: 6px 12px; background: #fff8e1; border-top: 1px solid var(--color-border); }
      [data-theme="dark"] .jpd-scale-note,
      [data-theme="blue"] .jpd-scale-note { background: #3a2e10; color: #f0c060; }

      /* Tier Stats Grid */
      .jpd-tier-stats-container { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 16px; }
      .jpd-tier-stat-card { background: var(--color-card-bg); border: 1px solid var(--color-border); box-shadow: 0 1px 4px rgba(0,0,0,0.09); border-radius: 2px; padding: 12px; display: flex; flex-direction: column; align-items: center; }
      .jpd-tier-stat-box { padding: 8px 6px; border-radius: 3px; font-size: 14px; font-weight: 600; line-height: 1.2; width: 100%; display: flex; align-items: center; justify-content: center; min-height: 32px; }
      .jpd-tier-stat-count { margin-top: 8px; font-size: 15px; font-weight: 700; color: var(--color-emphasis); }

      /* Results Filters */
      .jpd-results-filters { margin-bottom: 10px; }
      .jpd-results-filters .jpd-filters-hd { display: flex; width: 100%; background: var(--color-bg); border: none; border-top: 1px solid var(--color-border); padding: 7px 13px; cursor: pointer; align-items: center; justify-content: space-between; font-size: 12px font-weight: 500; font-family: inherit; letter-spacing: .2px; }
      [data-theme="dark"] .jpd-results-filters .jpd-filters-hd,
      [data-theme="blue"] .jpd-results-filters .jpd-filters-hd { color: #6fa8dc; }
      .jpd-results-filters .jpd-filters-chevron { transition: transform 0.2s ease; }
      .jpd-results-filters .jpd-filters-chevron-open { transform: rotate(180deg); }
      .jpd-results-filters .jpd-filters-body { padding: 12px 13px; border-top: 1px solid var(--color-border); display: flex; flex-direction: column; gap: 12px; }
      .jpd-results-filters .jpd-filter-grp-lbl { font-size: 11px; font-weight: 600; color: var(--color-emphasis); letter-spacing: .3px; margin-bottom: 8px; text-transform: uppercase; }
      .jpd-results-filters .jpd-chips { display: flex; flex-wrap: wrap; gap: 6px; }


      @media (min-width: 768px) {
        .jpd-wrap { max-width: 660px; padding: 18px; }
        .jpd-result-card { display: flex; flex-direction: column; }
        .jpd-card-top { display: flex; flex-direction: row; align-items: stretch; }
        .jpd-card-main { flex: 1; min-width: 0; }
        .jpd-badge-col { display: none; }
        .jpd-chance-panel { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 7px; flex-shrink: 0; width: 100px; border-left: 1px solid var(--color-border); padding: 16px 10px; }
        .jpd-cp-icons { display: flex; gap: 5px; align-items: center; min-height: 20px; }
        .jpd-cp-icons .jpd-ico-god { font-size: 18px; }
        .jpd-cp-icons .jpd-ico-pop { font-size: 18px; }
        .jpd-cp-prob { font-size: 17px; font-weight: 700; padding: 6px 10px; text-align: center; white-space: normal; line-height: 1.3; word-break: keep-all; }
        .jpd-cp-en { font-size: 10.5px; color: var(--color-muted); text-align: center; letter-spacing: .2px; }
        .jpd-stats { padding: 4px 16px 4px 6px; }
        .jpd-hd { padding: 13px 16px 12px; }
        .jpd-logo { width: 50px; height: 50px; font-size: 11px; }
        .jpd-hd-body { gap: 12px; }
        .jpd-name-ch { font-size: 17px; }
        .jpd-name-en { font-size: 11.5px; margin-top: 4px; }
        .jpd-code-id { font-size: 12.5px; }
        .jpd-codes-row { font-size: 12px; margin-bottom: 6px; }
        .jpd-s-lbl { font-size: 9.5px; }
        .jpd-s-val { font-size: 16px; }
        .jpd-s-md  { font-size: 23px; }
        .jpd-tog { padding: 9px 16px; font-size: 13px; }
        .jpd-stats-delta { font-size: 11px; padding: 4px 0 8px; }
        .jpd-yr-tbl thead th { padding: 7px 14px; font-size: 10px; }
        .jpd-yr-tbl tbody td { padding: 9px 14px; font-size: 14px; }
        .jpd-yr-tbl tbody td:first-child { font-size: 13px; }
        .jpd-info-cell { padding: 11px 14px; }
        .jpd-i-lbl { font-size: 11.5px; }
        .jpd-i-val { font-size: 14px; }
        .jpd-i-sub { font-size: 11.5px; }
        .jpd-formula-box { font-size: 12.5px; padding: 7px 11px; }
        .jpd-pill { font-size: 12px; padding: 3px 7px; }
        .jpd-tbl-hd { padding: 7px 16px; font-size: 17px; }
        .jpd-tbl-hd-en { font-size: 15px; }
        .jpd-subj-row { padding: 10px 16px; gap: 10px; }
        .jpd-subj-name-ch { font-size: 16px; }
        .jpd-subj-name-en { font-size: 14px; }
        .jpd-select { font-size: 16px; padding: 6px 8px; }
        .jpd-grade-sel { width: 72px; }
        .jpd-add-wrap { padding: 10px 16px; }
        .jpd-search-foot { padding: 12px 16px; }
        .jpd-filters-hd { padding: 10px 16px; font-size: 16px; }
        .jpd-filters-hd-en { font-size: 15px; }
        .jpd-filters-body { padding: 14px 16px; gap: 18px; }
        .jpd-filter-grp-lbl { font-size: 10.5px; margin-bottom: 10px; }
        .jpd-chips { gap: 8px; }
        .jpd-fchip { font-size: 15px; min-height: 42px; padding: 0 16px; }
        .jpd-result-label { font-size: 15px; }
        .jpd-sort-lbl { font-size: 13px; }
        .jpd-loading { padding: 48px 24px; }
        .jpd-loading-text { font-size: 14px; }
        .jpd-nores { padding: 44px 24px; }
        .jpd-nores-title { font-size: 16px; }
        .jpd-nores-sub { font-size: 13px; max-width: 340px; }
        .jpd-up-grid { grid-template-columns: repeat(4, 1fr); }
        .jpd-up-swatch { width: 58px; height: 58px; }
        .jpd-up-abbr { font-size: 10.5px; }
        .jpd-up-hex { font-size: 10.5px; }
        .jpd-legend { padding: 12px 16px; }
        .jpd-legend-title { font-size: 10.5px; margin-bottom: 9px; }
        .jpd-legend-row { gap: 6px; }
        .jpd-page-title { font-size: 38px; }
        .jpd-page-sub { font-size: 16px; }
        .jpd-page-tag { font-size: 10px; }
        .jpd-mech-hd { padding: 12px 16px; font-size: 15px; }
        .jpd-mech-hd-en { font-size: 12px; }
        .jpd-mech-sec { padding: 14px 16px; }
        .jpd-mech-h { font-size: 15px; margin-bottom: 8px; }
        .jpd-mech-h-en { font-size: 12px; }
        .jpd-mech-p { font-size: 13.5px; line-height: 1.7; }
        .jpd-mech-ul { font-size: 13.5px; line-height: 1.75; padding-left: 20px; }
        .jpd-mech-note { font-size: 12.5px; padding: 8px 12px; }
        .jpd-mech-tbl { font-size: 13px; }
        .jpd-mech-tbl thead th { padding: 6px 10px; font-size: 11px; }
        .jpd-mech-tbl tbody td { padding: 6px 10px; }
        .jpd-mech-grp-row { padding: 8px 11px; }
        .jpd-mech-grp-lbl { font-size: 10.5px; }
        .jpd-mech-grp-val { font-size: 13px; }
      }

      @media (min-width: 1024px) {
        .jpd-wrap { max-width: 760px; padding: 20px; }
        .jpd-chance-panel { width: 114px; padding: 18px 12px; gap: 8px; }
        .jpd-cp-prob { font-size: 18px; padding: 7px 12px; }
        .jpd-cp-en { font-size: 11px; }
        .jpd-cp-icons .jpd-ico-god, .jpd-cp-icons .jpd-ico-pop { font-size: 20px; }
        .jpd-logo { width: 54px; height: 54px; font-size: 11.5px; }
        .jpd-name-ch { font-size: 18.5px; }
        .jpd-name-en { font-size: 13px; }
        .jpd-s-val { font-size: 17px; }
        .jpd-s-md  { font-size: 25px; }
        .jpd-s-lbl { font-size: 10px; }
        .jpd-page-title { font-size: 38px; }
        .jpd-mech-hd { font-size: 16px; }
        .jpd-mech-h { font-size: 16px; }
        .jpd-mech-p { font-size: 14px; }
        .jpd-mech-ul { font-size: 14px; }
      }
    `}</style>
  );
}
