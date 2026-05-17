import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts'

export interface ChartPoint {
  year: string
  /** Average conversion factor for Paper 1 that year (null if no data) */
  paper1: number | null
  /** Average conversion factor for Paper 3 that year (null if no data) */
  paper3: number | null
}

const PAPER1_COLOR = '#6366f1' // indigo — Reading
const PAPER3_COLOR = '#e11d48' // rose — Listening (strong contrast in light theme)

/**
 * B1 mark "purchasing power" by year. Higher average factor = a B1 mark is
 * worth more on the B2 scale (deflation, in the student's favour); lower =
 * the mark is discounted harder (inflation). Loaded client-side only.
 */
export default function B1WorthChart({ data }: { data: ChartPoint[] }) {
  return (
    <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 4, left: -12 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: 'var(--color-muted)' }}
            tickMargin={6}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[0, 1.1]}
            tick={{ fontSize: 11, fill: 'var(--color-muted)' }}
            tickFormatter={(v: number) => v.toFixed(1)}
            width={44}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--color-card-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 8,
              fontSize: 13,
              color: 'var(--color-body)',
            }}
            labelStyle={{ color: 'var(--color-heading)', fontWeight: 600 }}
            formatter={(v) => (typeof v === 'number' ? v.toFixed(2) : '—')}
          />
          <Legend wrapperStyle={{ fontSize: 13.5, fontWeight: 700, paddingTop: 8 }} />
          <ReferenceLine
            y={1}
            stroke="var(--color-muted)"
            strokeDasharray="4 4"
            label={{ value: '等值 parity', position: 'right', fontSize: 10, fill: 'var(--color-muted)' }}
          />
          <Line
            type="monotone"
            dataKey="paper1"
            name="Paper 1 閱讀 Reading"
            stroke={PAPER1_COLOR}
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="paper3"
            name="Paper 3 聆聽 Listening"
            stroke={PAPER3_COLOR}
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
