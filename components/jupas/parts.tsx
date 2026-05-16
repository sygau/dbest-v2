// Reusable JUPAS UI parts: Pill, InfoSection, JupasCard, MechanismInfo,
// FilterChip, GradeSelect, SortToggle, SearchLoading, NoResults, ProbLegend, UniPalette.

import { useState } from 'react';
import {
  LuArrowDownWideNarrow, LuBuilding2, LuHash, LuUsers, LuChevronDown,
  LuExternalLink, LuSearchX, LuBookmark,
} from 'react-icons/lu';
import {
  PROB_CONFIG, UNI_COLORS, UNI_JUPAS_SLUG, type ProbLevel,
  ALL_PROB_LEVELS,
} from './constants';
import { useBookmarks } from '../../lib/jupas/client/bookmarks';

// ── Types reused by callers ────────────────────────────────────────────────

export interface YearData { year: number; lq: number | null; median: number | null; uq: number | null }

export interface ProgramInfo {
  duration?: string;
  quota?: number | null;
  faculty?: string;
  facultyEn?: string;
  category?: string;
  categoryEn?: string;
  dualDegree?: 'yes' | 'no' | 'maybe';
  interview?: 'yes' | 'no' | 'maybe';
  interviewType?: string;
  formula?: string;
}

export interface JupasCardProps {
  code: string;
  uni: string;
  nameCh: string;
  nameEn: string;
  lq: number | null;
  median: number | null;
  uq: number | null;
  prob?: ProbLevel;          // omitted on static (un-scored) bookmark cards
  isGod?: boolean;
  isPopular?: boolean;
  defaultOpen?: boolean;
  years?: YearData[];
  info?: ProgramInfo;
  scaleNote?: string;
  flexRule?: string;
  flexBadge?: string;
  score?: number | null;
  scoreDelta?: number | null;
  ineligibilityReason?: string;
}

// ── Filter chip ──

export function FilterChip({ label, selected, onToggle }: { label: string; selected: boolean; onToggle: () => void }) {
  return (
    <button className={`jpd-fchip${selected ? ' jpd-fchip-on' : ''}`} onClick={onToggle} type="button">
      {label}
    </button>
  );
}

// ── Grade select ──

const GRADE_OPTS = ['U', '1', '2', '3', '4', '5', '5*', '5**'];

export function GradeSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select className="jpd-select jpd-grade-sel" value={value} onChange={e => onChange(e.target.value)}>
      <option value="">Lv.</option>
      {GRADE_OPTS.map(g => <option key={g} value={g}>{g}</option>)}
    </select>
  );
}

// ── Pill ──

export function Pill({ value }: { value: 'yes' | 'no' | 'maybe' }) {
  const map = {
    yes:   { label: '是',     cls: 'jpd-pill-y' },
    no:    { label: '否',     cls: 'jpd-pill-n' },
    maybe: { label: '可能需要', cls: 'jpd-pill-maybe' },
  };
  const { label, cls } = map[value];
  return <span className={`jpd-pill ${cls}`}>{label}</span>;
}

// ── InfoSection ──

export function InfoSection({ info }: { info: ProgramInfo }) {
  return (
    <div className="jpd-info-sec">
      <div className="jpd-info-grid">
        {info.duration && (
          <div className="jpd-info-cell">
            <div className="jpd-i-lbl">修業年期</div>
            <div className="jpd-i-val">{info.duration}</div>
          </div>
        )}
        {info.quota != null && (
          <div className="jpd-info-cell">
            <div className="jpd-i-lbl">收生名額</div>
            <div className="jpd-i-val">{info.quota}</div>
          </div>
        )}
        {info.faculty && (
          <div className="jpd-info-cell jpd-full">
            <div className="jpd-i-lbl">學院</div>
            <div className="jpd-i-val">
              {info.faculty}
              {info.facultyEn && info.facultyEn !== info.faculty && <div className="jpd-i-sub">{info.facultyEn}</div>}
            </div>
          </div>
        )}
        {info.category && (
          <div className="jpd-info-cell">
            <div className="jpd-i-lbl">類別</div>
            <div className="jpd-i-val">
              {info.category}
              {info.categoryEn && info.categoryEn !== info.category && <div className="jpd-i-sub">{info.categoryEn}</div>}
            </div>
          </div>
        )}
        {info.dualDegree !== undefined && (
          <div className="jpd-info-cell">
            <div className="jpd-i-lbl">雙學位課程</div>
            <div className="jpd-i-val"><Pill value={info.dualDegree} /></div>
          </div>
        )}
        {info.interview !== undefined && (
          <div className="jpd-info-cell">
            <div className="jpd-i-lbl">面試要求</div>
            <div className="jpd-i-val"><Pill value={info.interview} /></div>
          </div>
        )}
        {info.interviewType && (
          <div className="jpd-info-cell">
            <div className="jpd-i-lbl">面試類型</div>
            <div className="jpd-i-val jpd-i-val-lt">{info.interviewType}</div>
          </div>
        )}
        {info.formula && (
          <div className="jpd-info-cell jpd-full">
            <div className="jpd-i-lbl">計分公式</div>
            <div className="jpd-formula-box">{info.formula}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── JupasCard ──

export function JupasCard({
  code, uni, nameCh, nameEn,
  lq, median, uq, prob,
  isGod, isPopular,
  defaultOpen = false,
  years, info,
  scaleNote, flexBadge,
  score, scoreDelta, ineligibilityReason,
}: JupasCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const { starred, toggle } = useBookmarks();
  const booked = starred.has(code);
  const cfg = prob ? PROB_CONFIG[prob] : null;
  const logoColor = UNI_COLORS[uni] ?? '#555';
  const hasDetail = !!(years || info);
  const sortedYears = years ? [...years].sort((a, b) => b.year - a.year) : null;
  // PolyU publishes the central admission stat as an "average", not a median.
  const medianLabel = uni === 'PolyU' ? 'Average' : 'Median';
  const medianLabelCh = uni === 'PolyU' ? '平均分' : '中位數';
  // Delta = user's weighted score − the displayed median (not year-over-year median drift).
  const delta = score != null && median != null ? +(score - median).toFixed(1) : null;

  return (
    <div className="jpd-card jpd-result-card">
      <div className="jpd-card-top">
        <div className="jpd-card-main">
          <div className="jpd-hd">
            <div className="jpd-hd-body">
              <div className="jpd-logo-col">
                <div className="jpd-logo" style={{ background: logoColor }}>{uni}</div>
                <button
                  type="button"
                  className={`jpd-bookmark-btn${booked ? ' jpd-bookmark-on' : ''}`}
                  onClick={() => toggle(code)}
                  aria-pressed={booked}
                  aria-label={booked ? '移除收藏' : '加入收藏'}
                  title={booked ? '移除收藏' : '加入收藏'}
                >
                  <LuBookmark size={17} fill={booked ? 'currentColor' : 'none'} aria-hidden style={{ transform: 'translateY(0.6px)' }}/>
                </button>
              </div>
              <div className="jpd-names">
                <div className="jpd-codes-row">
                  <a
                    className="jpd-code-link"
                    href={`https://www.jupas.edu.hk/en/programme/${UNI_JUPAS_SLUG[uni] ?? uni.toLowerCase()}/${code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${code} on JUPAS website`}
                  >
                    <span className="jpd-code-id">{code}</span>
                    <LuExternalLink size={11} strokeWidth={2.5} className="jpd-code-ext" aria-hidden />
                  </a>
                  <span style={{ opacity: .35, fontSize: 10 }}>|</span>
                  <span>{uni}</span>
                  {flexBadge && <span className="jpd-flex-badge">{flexBadge}</span>}
                  {score != null && (
                    <span style={{ marginLeft: 'auto', fontWeight: 700, color: 'var(--color-emphasis)' }}>
                      你: {score.toFixed(1)}
                      {scoreDelta != null && (
                        <span style={{ marginLeft: 4, fontSize: 10, color: scoreDelta >= 0 ? '#00703c' : '#d5281b' }}>
                          ({scoreDelta >= 0 ? '+' : ''}{scoreDelta.toFixed(1)})
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <div className="jpd-name-ch">{nameCh}</div>
                <div className="jpd-name-en">{nameEn}</div>
              </div>
            </div>
          </div>

          <div className="jpd-stats">
            <div className="jpd-stats-nums">
              <div className="jpd-stat">
                <div className="jpd-s-lbl">LQ</div>
                <div className="jpd-s-val">{lq ?? '—'}</div>
              </div>
              <div className="jpd-stat">
                <div className="jpd-s-lbl">{medianLabel}</div>
                <div className="jpd-s-val jpd-s-md" style={{ color: cfg ? cfg.medianColor : 'var(--color-emphasis)' }}>{median ?? '—'}</div>
              </div>
              <div className="jpd-stat">
                <div className="jpd-s-lbl">UQ</div>
                <div className="jpd-s-val">{uq ?? '—'}</div>
              </div>
            </div>
            <div className="jpd-badge-col">
              <div className="jpd-b-icons">
                {isGod && <i className="ti ti-trophy jpd-ico-god" title="神科" />}
                {isPopular && <i className="ti ti-flame jpd-ico-pop" title="熱門" />}
              </div>
              {cfg ? (
                <>
                  <div className={`jpd-prob ${cfg.className}`}>{cfg.label}</div>
                  <div className="jpd-prob-en">{cfg.en}</div>
                </>
              ) : (
                <>
                  <div className="jpd-prob jpd-prob-na">未計算</div>
                  <div className="jpd-prob-en">搜尋後顯示</div>
                </>
              )}
            </div>
          </div>

          {delta !== null && (
            <div className="jpd-stats-delta" style={{ color: delta > 0 ? '#00703c' : delta < 0 ? '#d5281b' : 'var(--color-muted)' }}>
              {delta > 0 ? '▲' : delta < 0 ? '▼' : '–'} {delta !== 0 ? `${delta > 0 ? '+' : '−'}${Math.abs(delta).toFixed(1)} pts` : '持平'} vs {medianLabelCh}
            </div>
          )}

          {scaleNote && <div className="jpd-scale-note">⚠ {scaleNote}</div>}
          {ineligibilityReason && (
            <div className="jpd-scale-note" style={{ background: '#fde8e8', color: '#721c24' }}>
              不達標：{ineligibilityReason}
            </div>
          )}
        </div>

        <div className="jpd-chance-panel">
          <div className="jpd-cp-icons">
            {isGod && <i className="ti ti-trophy jpd-ico-god" title="神科" />}
            {isPopular && <i className="ti ti-flame jpd-ico-pop" title="熱門" />}
          </div>
          {cfg ? (
            <>
              <div className={`jpd-prob jpd-cp-prob ${cfg.className}`}>{cfg.label}</div>
              <div className="jpd-cp-en">{cfg.en}</div>
            </>
          ) : (
            <>
              <div className="jpd-prob jpd-cp-prob jpd-prob-na">未計算</div>
              <div className="jpd-cp-en">搜尋後顯示</div>
            </>
          )}
        </div>
      </div>

      {hasDetail && (
        <button className="jpd-tog" onClick={() => setOpen(v => !v)}>
          <span>{open ? '收起詳情' : '查看詳情 / 歷年數據'}</span>
          <span style={{ fontSize: 11, lineHeight: 1 }} aria-hidden>{open ? '▲' : '▼'}</span>
        </button>
      )}

      {open && hasDetail && (
        <div className="jpd-body">
          {sortedYears && (
            <table className="jpd-yr-tbl">
              <thead>
                <tr><th>年份</th><th>LQ</th><th>{medianLabelCh}</th><th>UQ</th></tr>
              </thead>
              <tbody>
                {sortedYears.map(y => (
                  <tr key={y.year}>
                    <td>{y.year}</td>
                    <td>{y.lq ?? '—'}</td>
                    <td className="jpd-mc">{y.median ?? '—'}</td>
                    <td>{y.uq ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {info && <InfoSection info={info} />}
        </div>
      )}
    </div>
  );
}

// ── MechanismInfo ──

export function MechanismInfo() {
  return (
    <div className="jpd-card jpd-mech-card">
      <div className="jpd-mech-hd-static">
        <span>
          JUPAS 計分機制簡介
          <span className="jpd-mech-hd-en">How JUPAS Scoring Works</span>
        </span>
      </div>

      <div className="jpd-mech-body">
          <section className="jpd-mech-sec">
            <h4 className="jpd-mech-h">1. 兩套分數換算制度</h4>
            <p className="jpd-mech-p">
              JUPAS 分數換算並非全港統一。<br />各院校就 DSE 成績換算為分數時，現時行兩套並存制度：
              <br /><em>Standard</em>（標準制，5** = 7 分）<br /><em>Enhanced</em>（強化制，5** = 8.5 分）<br />
              強化制將頂尖成績拉開更大差距，方便院校在傑出學生之間分高下。
            </p>
            <table className="jpd-mech-tbl">
              <thead>
                <tr><th>等級 Level</th><th>Standard</th><th>Enhanced</th></tr>
              </thead>
              <tbody>
                <tr><td>5**</td><td>7</td><td>8.5</td></tr>
                <tr><td>5*</td><td>6</td><td>7</td></tr>
                <tr><td>5</td><td>5</td><td>5.5</td></tr>
                <tr><td>4</td><td>4</td><td>4</td></tr>
                <tr><td>3</td><td>3</td><td>3</td></tr>
              </tbody>
            </table>
            <div className="jpd-mech-grp">
              <div className="jpd-mech-grp-row">
                <span className="jpd-mech-grp-lbl">Enhanced (5**=8.5)</span>
                <span className="jpd-mech-grp-val">HKU、CUHK（醫科除外）、HKUST、PolyU（2025 起）、CityU（2025 起）</span>
              </div>
              <div className="jpd-mech-grp-row">
                <span className="jpd-mech-grp-lbl">Standard (5**=7)</span>
                <span className="jpd-mech-grp-val">HKBU、EdUHK、LU、HKMU、CUHK 醫科 (JS4501 / JS4502)</span>
              </div>
            </div>
          </section>

          <section className="jpd-mech-sec">
            <h4 className="jpd-mech-h">2. 課程如何計算你嘅分數</h4>
            <p className="jpd-mech-p">每個課程會按本身收生策略，揀以下其中一種模式：</p>
            <ul className="jpd-mech-ul">
              <li><b>Best 5</b> — 取最高 5 科分數總和</li>
              <li><b>Best 6</b> — 取最高 6 科分數總和</li>
              <li><b>4C + 2E</b> — 4 核心科 + 2 選修科（固定組合）</li>
              <li><b>Best 5 + 6th bonus</b> — 5 科加第 6 科額外加成（PolyU、HKU 部分課程）</li>
              <li><b>Weighted Best 5</b> — 指定科目加權（如英文 ×2、數學 ×1.5）</li>
            </ul>
            <p className="jpd-mech-note">每個課程自選計分公式，本工具會自動套用對應公式。</p>
          </section>

          <section className="jpd-mech-sec">
            <h4 className="jpd-mech-h">3. 科目類別規則</h4>
            <ul className="jpd-mech-ul">
              <li><b>M1 / M2（數學延伸部分）</b><br />兩科只取分數較高嗰一科，視為一個選修科。</li>
              <li><b>Category B（應用學習 / Applied Learning）</b><br />V1 暫未支援，後續版本會加入。</li>
              <li><b>Category C（其他語言 / Other Languages）</b><br />V1 暫只支援以 DSE 等級填寫，後續會加上 N1/C2 等真實級別。</li>
            </ul>
          </section>

          <section className="jpd-mech-sec">
            <h4 className="jpd-mech-h">4. 如果差少少達標點算？</h4>
            <p className="jpd-mech-p">
              若你只係<em>一個科目差一個級別</em>未達要求，其他全部達標，多數大學會考慮酌情取錄（俗稱「彈性收生 / Flexible Admission」）。各校細則略有不同：
            </p>
            <ul className="jpd-mech-ul">
              <li><b>HKU</b>：核心數學不可作彈性科目；獲彈性收生者總分扣減 <em>10%</em>。</li>
              <li><b>CUHK</b>：要求「整體表現優異」，以個案處理。</li>
              <li><b>PolyU / CityU</b>：每個課程設有公開嘅 <em>Flexible Admission Threshold Score</em>。</li>
              <li><b>HKBU 及其他</b>：通常要求失手科目至少 Level 2，並有一科 5* 或以上。</li>
            </ul>
            <p className="jpd-mech-note">符合條件嘅課程會以特別標籤顯示。</p>
          </section>

          <section className="jpd-mech-sec">
            <h4 className="jpd-mech-h">5. LQ / Median / UQ 點解讀</h4>
            <ul className="jpd-mech-ul">
              <li><b>LQ (Lower Quartile)</b> — 下四分位：當年獲取錄學生中，有 25% 分數低於此值。</li>
              <li><b>Median</b> — 中位數：取錄學生嘅中間分。</li>
              <li><b>UQ (Upper Quartile)</b> — 上四分位：有 25% 取錄學生分數高於此值。</li>
            </ul>
            <p className="jpd-mech-note">
              呢啲係<em>歷年實際取錄數據</em>，並非入學最低要求；分數會逐年浮動，僅供參考。
            </p>
          </section>
        </div>
    </div>
  );
}

// ── Sort toggle ──

export type SortMode = 'prob' | 'uni' | 'median' | 'quota';

const SORT_MODES: { key: SortMode; label: string; Icon: React.ComponentType<{ size?: number; strokeWidth?: number }> }[] = [
  { key: 'prob',   label: '機率',  Icon: LuArrowDownWideNarrow },
  { key: 'uni',    label: '大學',  Icon: LuBuilding2 },
  { key: 'median', label: '中位數', Icon: LuHash },
  { key: 'quota',  label: '名額',  Icon: LuUsers },
];

export function SortToggle({ mode, onChange }: { mode: SortMode; onChange: (m: SortMode) => void }) {
  const cur = SORT_MODES.find(m => m.key === mode) ?? SORT_MODES[0];
  const idx = SORT_MODES.indexOf(cur);
  const isDefault = mode === 'prob';
  const Icon = cur.Icon;
  return (
    <button
      className={`jpd-sort${isDefault ? '' : ' jpd-sort-active'}`}
      onClick={() => onChange(SORT_MODES[(idx + 1) % SORT_MODES.length].key)}
      type="button"
      title="切換排序"
    >
      <span className="jpd-sort-icon"><Icon size={12} strokeWidth={2.5} /></span>
      <span className="jpd-sort-div" />
      <span className="jpd-sort-lbl">{cur.label}</span>
    </button>
  );
}

// ── SearchLoading / NoResults ──

export function SearchLoading() {
  return (
    <div className="jpd-loading">
      <div className="jpd-loading-spinner" />
      <div className="jpd-loading-text">正在搜尋課程…</div>
    </div>
  );
}

export function NoResults() {
  return (
    <div className="jpd-nores">
      <LuSearchX size={32} strokeWidth={1.5} className="jpd-nores-icon" />
      <div className="jpd-nores-title">找不到符合條件的課程</div>
      <div className="jpd-nores-sub">No programmes match your grades or filters. Try lowering requirements or adjusting filters.</div>
    </div>
  );
}

// ── Legend / Palette ──

export function ProbLegend() {
  return (
    <div className="jpd-legend">
      <p className="jpd-legend-title">評估等級</p>
      <div className="jpd-legend-row">
        {ALL_PROB_LEVELS.map(k => {
          const v = PROB_CONFIG[k];
          return <span key={k} className={`jpd-prob ${v.className}`}>{v.label}</span>;
        })}
      </div>
    </div>
  );
}

export function UniPalette() {
  return (
    <div className="jpd-card jpd-uni-palette">
      <div className="jpd-tbl-hd">
        <span>大學顏色</span>
        <span className="jpd-tbl-hd-en">University Color Palette</span>
      </div>
      <div className="jpd-up-grid">
        {Object.entries(UNI_COLORS).map(([uni, color]) => (
          <div key={uni} className="jpd-up-item">
            <div className="jpd-up-swatch" style={{ background: color }}>
              <span className="jpd-up-abbr">{uni}</span>
            </div>
            <div className="jpd-up-hex">{color}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { LuChevronDown };
