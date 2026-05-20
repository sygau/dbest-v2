import { useMemo, useState } from 'react'
import type { GetStaticProps } from 'next'
import { LuCalculator } from 'react-icons/lu'
import PageSEO from '../../components/PageSEO'
import PageBreadcrumb from '../../components/PageBreadcrumb'
import ProgrammeCard from '../../components/programmes/ProgrammeCard'
import ProgrammeFilters, {
  EMPTY_PROG_FILTERS,
  type ProgFilterState,
} from '../../components/programmes/ProgrammeFilters'
import type { Programme } from '../../lib/programmes'
import rawProgrammes from '../../data/programmes.json'

interface Props {
  programmes: Programme[]
}

const DIFFICULTY_ORDER: Record<string, number> = { essential: 0, common: 1, advanced: 2 }

export default function ProgrammesHubPage({ programmes }: Props) {
  const [filters, setFilters] = useState<ProgFilterState>(EMPTY_PROG_FILTERS)

  const filtered = useMemo(() => {
    return programmes
      .filter((p) => {
        if (filters.subject !== 'all' && !p.subjects.includes(filters.subject)) return false
        if (filters.model !== 'all' && !p.models.includes(filters.model)) return false
        if (filters.difficulty !== 'all' && p.difficulty !== filters.difficulty) return false
        if (p.bytes > filters.maxBytes) return false
        return true
      })
      .sort((a, b) => {
        const d = DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]
        if (d !== 0) return d
        return a.bytes - b.bytes
      })
  }, [programmes, filters])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'HKDSE Casio Calculator Programme Library',
    itemListElement: programmes.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://dse.best/calculator-programmes/${p.slug}`,
      name: p.title,
    })),
  }

  return (
    <>
      <PageSEO
        title="DSE 計數機程式庫 HKDSE Casio Calculator Programmes | dse.best"
        description="HKDSE 數學必修 / M1 / M2 用 Casio fx-50FH, fx-50FH II, fx-3650P 計算機程式合集。包含聯立方程、二次方程、三次方程、方差等公開程式碼，附逐 token 入機指引、顯示順序、例題核對表。"
        ogTitle="DSE 計數機程式庫 HKDSE Calculator Programmes"
        ogDescription="聯立方程、二次方程、方差、極座標等 HKDSE 必入計算機程式。fx-50FH / fx-3650P 適用。"
        ogUrl="https://dse.best/calculator-programmes"
        canonical="https://dse.best/calculator-programmes"
        jsonLd={[jsonLd]}
      />

      <PageBreadcrumb section="資源" text="DSE 計數機程式庫" />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 12px 48px' }}>
        <div style={{ textAlign: 'center', padding: '24px 16px 18px', maxWidth: '780px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#549ee8', marginBottom: '6px' }}>
            DSE 計數機程式庫
          </h1>
          <div style={{ fontSize: '1rem', color: 'var(--color-muted)', marginBottom: '10px', fontWeight: 600 }}>
            HKDSE Calculator Programme Library
          </div>
          <p style={{ color: 'var(--color-body)', margin: 0, fontSize: '1.05rem', lineHeight: 1.6 }}>
            DSE 數學必修 (Compulsory Part) / M1 / M2 用 Casio 計算機 Programme 程式合集。每個程式設有逐 token 入機指引、顯示順序、例題核對表，方便核對你輸入嘅程式是否正確。
          </p>
        </div>

        {/* <div
          style={{
            background: 'var(--color-card-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            padding: '14px 16px',
            marginBottom: '18px',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start',
          }}
        >
          <LuCalculator size={22} style={{ color: '#549ee8', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.9rem', color: 'var(--color-body)', lineHeight: 1.55 }}>
            <strong style={{ color: 'var(--color-heading)' }}>以下內置程式均源自網上其他網站，內容可能會有不準確或錯誤，請自行核對，僅供參考之用。</strong>{' '}
          </div>
        </div> */}

        <ProgrammeFilters filters={filters} onChange={setFilters} />

        <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', margin: '0 0 12px', paddingLeft: '2px' }}>
          共 <strong style={{ color: 'var(--color-heading)' }}>{filtered.length}</strong> 個程式 ({filtered.length} programme{filtered.length === 1 ? '' : 's'})
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-body)' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '1.15rem' }}>無符合篩選條件嘅程式 No programmes match.</h3>
            <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.9rem' }}>
              試下放寬容量上限或揀其他科目。Try widening the byte cap or selecting a different subject.
            </p>
          </div>
        ) : (
          <div className="prog-grid">
            {filtered.map((p) => (
              <ProgrammeCard key={p.slug} p={p} />
            ))}
          </div>
        )}
        {/* Guide section */}
        <div style={{ marginTop: '52px', borderTop: '1px solid var(--color-border)', paddingTop: '36px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '6px' }}>
            計數機程式入機指引
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', margin: '0 0 22px' }}>
            適用於 Casio fx-50FH II · fx-3650P II（DSE 認可型號）
          </p>

          <div className="guide-grid">

            {/* Enter programme */}
            <div className="guide-card">
              <div className="guide-card-title">🔢 點樣輸入程式</div>
              <ol className="guide-steps">
                <li>按 <kbd>MODE</kbd> → <kbd>2</kbd> 進入 <strong>PROG</strong> 模式</li>
                <li>按 <kbd>1</kbd>–<kbd>4</kbd> 揀選程式槽（P1–P4）</li>
                <li>對照程式頁面嘅 token 表，逐個掣輸入</li>
                <li>輸入完成後按 <kbd>EXE</kbd> 確認儲存</li>
                <li>返回正常模式：按 <kbd>MODE</kbd> → <kbd>1</kbd>（COMP）</li>
              </ol>
              <div className="guide-note">
                Token 次序非常重要——同一個數學符號可能要按唔同組合，詳見各程式嘅逐 token 表。
              </div>
            </div>

            {/* Run programme */}
            <div className="guide-card">
              <div className="guide-card-title">▶ 點樣運行程式</div>
              <ol className="guide-steps">
                <li>按 <kbd>MODE</kbd> → <kbd>2</kbd> 進入 <strong>PROG</strong> 模式</li>
                <li>按對應槽號（<kbd>1</kbd> = P1，如此類推）</li>
                <li>按 <kbd>EXE</kbd> 執行，跟住螢幕提示輸入數據</li>
                <li>每輸入一個數值後按 <kbd>EXE</kbd> 繼續</li>
              </ol>
              <div className="guide-note">
                執行期間如輸入錯誤，可按 <kbd>AC</kbd> 終止程式，重新執行。
              </div>
            </div>

            {/* Edit programme */}
            <div className="guide-card">
              <div className="guide-card-title">✏️ 點樣修改程式</div>
              <ol className="guide-steps">
                <li>進入 PROG 模式，選擇要修改嘅程式槽</li>
                <li>用 <kbd>◀</kbd> <kbd>▶</kbd> 移動游標到要修改嘅位置</li>
                <li>按 <kbd>DEL</kbd> 刪除當前 token</li>
                <li>按 <kbd>SHIFT</kbd> + <kbd>DEL</kbd>（INS）可插入 token</li>
                <li>修改完畢按 <kbd>EXE</kbd> 儲存</li>
              </ol>
              <div className="guide-note">
                建議對照例題輸出核對，確認修改後程式結果正確。
              </div>
            </div>

            {/* Delete programme */}
            <div className="guide-card">
              <div className="guide-card-title">🗑️ 點樣刪除程式</div>
              <ol className="guide-steps">
                <li>進入 PROG 模式，選擇目標槽</li>
                <li>按 <kbd>SHIFT</kbd> → <kbd>CLR</kbd></li>
                <li>選擇 <strong>1: Prog</strong>（只清除當前槽）或 <strong>2: All</strong>（清除全部）</li>
                <li>按 <kbd>EXE</kbd> 確認</li>
              </ol>
              <div className="guide-note">
                考試前建議清除所有舊程式，避免混淆。重新入機只需約 5–10 分鐘。
              </div>
            </div>

          </div>

          {/* DSE Tips */}
          <div style={{
            background: 'var(--color-card-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            padding: '16px 20px',
            marginTop: '20px',
          }}>
            <div style={{ fontWeight: 700, color: 'var(--color-heading)', marginBottom: '10px', fontSize: '0.95rem' }}>
              💡 DSE 考試貼士
            </div>
            <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--color-body)', fontSize: '0.88rem', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <li>考前一晚重新入一次機，確保每個程式輸出正確</li>
              <li>每個程式槽建議用紙仔寫低係 P 幾號，考場唔記得用邊個</li>
              <li>fx-50FH II 同 fx-3650P II 入法相同，但按鍵位置略有分別——熟悉自己部機</li>
              <li>程式唔係萬能，<strong>明白背後原理</strong>先係拿分關鍵——程式只係核對工具</li>
              <li>考場如計數機唔夠電或程式消失，要有手算備案</li>
            </ul>
          </div>

        </div>

      </div>

      <style jsx>{`
        .prog-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 600px) {
          .prog-grid { grid-template-columns: repeat(2, 1fr); gap: 18px; }
        }
        @media (min-width: 992px) {
          .prog-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }
        }
        .guide-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        @media (min-width: 600px) {
          .guide-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
        .guide-card {
          background: var(--color-card-bg);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          padding: 16px 18px;
        }
        .guide-card-title {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--color-heading);
          margin-bottom: 10px;
        }
        .guide-steps {
          margin: 0 0 10px;
          padding-left: 20px;
          color: var(--color-body);
          font-size: 0.87rem;
          line-height: 1.8;
        }
        .guide-steps li { margin-bottom: 2px; }
        .guide-note {
          background: var(--color-bg);
          border-left: 3px solid #549ee8;
          border-radius: 0 6px 6px 0;
          padding: 7px 10px;
          font-size: 0.82rem;
          color: var(--color-muted);
          line-height: 1.55;
        }
        kbd {
          display: inline-block;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: 4px;
          padding: 1px 5px;
          font-size: 0.8rem;
          font-family: monospace;
          color: var(--color-heading);
          white-space: nowrap;
        }
      `}</style>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const programmes = rawProgrammes as unknown as Programme[]
  return { props: { programmes } }
}
