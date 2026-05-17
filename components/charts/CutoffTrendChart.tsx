import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

export interface CutoffChartPoint {
  year: string
  '5**': number | null
  '5*': number | null
  '5': number | null
  '4': number | null
  '3': number | null
  '2': number | null
}

const GRADE_LINES: { key: keyof Omit<CutoffChartPoint, 'year'>; color: string; label: string }[] = [
  { key: '5**', color: '#f59e0b', label: '5**' },
  { key: '5*',  color: '#f97316', label: '5*' },
  { key: '5',   color: '#22c55e', label: '5' },
  { key: '4',   color: '#0ea5e9', label: '4' },
  { key: '3',   color: '#8b5cf6', label: '3' },
  { key: '2',   color: '#94a3b8', label: '2' },
]

const CustomTooltip = (props: any) => {
  const { active, payload, label } = props
  if (active && payload) {
    return (
      <div style={{
        background: 'var(--color-card-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: 8,
        padding: 8,
        fontSize: 13,
        color: 'var(--color-body)',
      }}>
        <p style={{ color: 'var(--color-heading)', fontWeight: 600, margin: '0 0 4px 0' }}>{label}</p>
        {GRADE_LINES.map(({ key, label: gradeLabel }) => {
          const item = payload.find((p: any) => p.dataKey === key)
          return (
            <div key={key} style={{ color: item?.color || '#6c757d' }}>
              Level {gradeLabel}: {item ? `${item.value}%` : '—'}
            </div>
          )
        })}
      </div>
    )
  }
  return null
}

export default function CutoffTrendChart({ data }: { data: CutoffChartPoint[] }) {
  return (
    <div style={{ width: '100%', height: 280 }}>
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
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: 'var(--color-muted)' }}
            tickFormatter={(v: number) => `${v}%`}
            width={44}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 13, fontWeight: 700, paddingTop: 8 }} />
          {GRADE_LINES.map(({ key, color, label }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={`Level ${label}`}
              stroke={color}
              strokeWidth={2}
              dot={{ r: 2.5 }}
              activeDot={{ r: 4.5 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
