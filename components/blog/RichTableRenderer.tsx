import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../ui/Table'

interface SanityTableRow {
  _key: string
  _type: 'tableRow'
  cells: string[]
}

interface SanityTableValue {
  _type: 'table'
  rows?: SanityTableRow[]
}

export function RichTableRenderer({ value }: { value: SanityTableValue }) {
  if (!value?.rows?.length) return null

  const [headerRow, ...bodyRows] = value.rows

  return (
    <Table>
      {headerRow && (
        <TableHeader>
          <TableRow>
            {headerRow.cells.map((cell, i) => (
              <TableHead key={i}>{cell}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {bodyRows.map((row) => (
          <TableRow key={row._key}>
            {row.cells.map((cell, i) => (
              <TableCell key={i}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
