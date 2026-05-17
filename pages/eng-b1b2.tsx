import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import PageSEO from '../components/PageSEO'
import PageBreadcrumb from '../components/PageBreadcrumb'
import { LuTriangleAlert, LuInfo } from 'react-icons/lu'
import { Alert, AlertTitle, AlertDescription } from '../components/ui/Alert'
import { Button } from '../components/ui/Button'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table'
import conversions from '../data/eng-b1b2/conversions.json'
import type { Conversions, ConvRow } from '../data/eng-b1b2/types'
import type { ChartPoint } from '../components/charts/B1WorthChart'

// Chart pulls in recharts (uses window) — load client-side only so the page stays SSG.
const B1WorthChart = dynamic(() => import('../components/charts/B1WorthChart'), {
  ssr: false,
  loading: () => (
    <div
      style={{ width: '100%', height: 320 }}
      className="flex items-center justify-center text-sm text-[var(--color-muted)]"
    >
      載入圖表中… Loading chart…
    </div>
  ),
})

const data = conversions as Conversions

// Black header for the conversion tables, theme-independent.
const tableTheme = {
  ['--color-table-head-bg' as string]: '#1a1a1a',
  ['--color-table-head-text' as string]: '#ffffff',
} as React.CSSProperties

/** Mean conversion factor across scoring marks (b1 > 0). null if no data. */
function avgFactor(rows: ConvRow[]): number | null {
  const scoring = rows.filter((r) => r.b1 > 0)
  if (!scoring.length) return null
  return scoring.reduce((s, r) => s + r.factor, 0) / scoring.length
}

function ConvTable({ rows, label }: { rows: ConvRow[]; label: string }) {
  return (
    <div>
      <div className="mb-2 text-sm font-semibold text-[var(--color-heading)]">{label}</div>
      <Table style={tableTheme}>
        <TableHeader>
          <TableRow>
            <TableHead>B1 原始分</TableHead>
            <TableHead>B2 等值分</TableHead>
            <TableHead>轉換系數 Factor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.b1}>
              <TableCell className="font-medium">{r.b1}</TableCell>
              <TableCell>{r.b2}</TableCell>
              <TableCell>{r.factor.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default function EngB1B2Page() {
  const years = useMemo(
    () => Object.keys(data).sort((a, b) => Number(b) - Number(a)),
    []
  )

  const chartData = useMemo<ChartPoint[]>(
    () =>
      [...years]
        .sort((a, b) => Number(a) - Number(b))
        .map((y) => {
          const p1 = avgFactor(data[y].paper1)
          const p3 = avgFactor(data[y].paper3)
          return {
            year: y,
            paper1: p1 == null ? null : Number(p1.toFixed(3)),
            paper3: p3 == null ? null : Number(p3.toFixed(3)),
          }
        }),
    [years]
  )

  return (
    <>
      <PageSEO
        title="DSE 英文 B1 B2 轉換表 2012-2025 (Paper 1B/3B) 閱讀+聆聽 | English B1 B2 Conversion Table"
        description="歷年 DSE 英文 B1 轉 B2 分數對照表，涵蓋 Paper 1 閱讀 (1B) 及 Paper 3 聆聽 (3B)，2012 至 2025 年轉換系數一覽。睇下 B1 分數每年值幾多 B2 分，附趨勢圖表。See how DSE English B1 marks convert to B2-equivalent scores each year."
        ogUrl="https://dse.best/eng-b1b2"
        canonical="https://dse.best/eng-b1b2"
        pageKey="eng-b1b2"
        robots={['index', 'follow']}
      />

      <PageBreadcrumb section="資訊" text="英文 B1 B2 轉換表" />

      <div className="card rounded-4" style={{ height: 'auto' }}>
        <div className="card-body">
          <h1>DSE 英文 B1 B2 轉換表 (2012-2025)</h1>
          <p className="text-[var(--color-muted)] mt-1">
            English B1/B2 Conversion Table — Paper 1B 閱讀 Reading &amp; Paper 3B 聆聽 Listening
          </p>
          <hr />

          <p>
            DSE 英文科 Paper 1 (閱讀) 同 Paper 3 (聆聽) 各分為 Part B1 (較淺) 同 Part B2 (較深)，
            每張卷只可揀做其中一 Part。因為 B1 較易攞分，HKEAA 會將 B1 原始分「打折」換算成
            B2 等值分先計成績。<strong>轉換系數 (conversion factor)</strong> 就係每個 B1 分數
            換到 B2 嘅比例 —— 數字越接近 1，B1 分數越「值錢」；數字越細，代表嗰年 B1 卷
            被「扣」得越多。揀 B1 定 B2、邊年扣得多扣得少，直接影響最後 level 同 cut off，
            所以同學報名同操卷前最好先了解歷年換算趨勢。呢版整合咗 2012 至 2025 年
            Paper 1B 及 3B 嘅完整對照表同趨勢圖，方便比較每年 B1 分數嘅實際價值。
          </p>

          <Alert variant="warning" className="mt-3">
            <AlertTitle icon={<LuTriangleAlert size={15} className="text-amber-500" style={{ marginBottom: '-2px' }} />}>重要：非官方數據 Not official</AlertTitle>
            <AlertDescription>
              以下數字<strong>並非 HKEAA 公開或官方發佈</strong>，而是由社群根據考生資料<strong>估算</strong>而成，僅供參考。請勿視為準確或官方換算結果。
            </AlertDescription>
          </Alert>

          <Alert variant="default" className="mt-3">
            <AlertTitle icon={<LuInfo size={15} className="text-violet-500" style={{ marginBottom: '-2px' }} />}>數據來源 Data credit</AlertTitle>
            <AlertDescription>
              轉換表數據由{' '}
              <a
                href="https://instagram.com/10stardse"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline"
              >
                @10stardse
              </a>{' '}
              Instagram 帳號整理提供，特此鳴謝。
            </AlertDescription>
          </Alert>

          <hr />

          <h2>歷年 B1 平均轉換系數 Average B1 Conversion Factor by Year</h2>
          <p className="text-[var(--color-muted)]">
            下圖為每年嘅平均轉換系數。系數越高，B1 分數喺 B2 尺度上越值錢，對考生越有利；
            系數越低，B1 分數被「打折」得越多。可以粗略當成 B1 分數每年嘅「含金量」。
            Paper 1 閱讀同 Paper 3 聆聽分開兩條線顯示。
          </p>
          <div className="mt-3">
            <B1WorthChart data={chartData} />
          </div>

          <hr />

          <h2 className="text-center">各年轉換表 Conversion Tables by Year</h2>
          <nav
            aria-label="年份導覽"
            className="flex flex-wrap justify-center gap-2 mt-3 mb-5 max-w-lg mx-auto"
          >
            {years.map((y) => (
              <a key={y} href={`#y${y}`} className="no-underline">
                <Button variant="default" size="sm">{y}</Button>
              </a>
            ))}
          </nav>

          {years.map((y) => (
            <section key={y} id={`y${y}`} className="scroll-mt-24 mb-8">
              <h3 className="mb-3">{y} 年轉換表</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ConvTable rows={data[y].paper1} label="Paper 1B 閱讀 Reading" />
                <ConvTable rows={data[y].paper3} label="Paper 3B 聆聽 Listening" />
              </div>
            </section>
          ))}

          <hr />
          <p className="text-sm text-[var(--color-muted)]">
            數據僅供參考，並非 HKEAA 官方資料。如有更新請以考評局公佈為準。
          </p>
        </div>
      </div>
    </>
  )
}
