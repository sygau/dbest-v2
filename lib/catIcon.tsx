import * as LuIcons from 'react-icons/lu'
import type { IconType } from 'react-icons'

export function CatIcon({ name, size = 11 }: { name?: string; size?: number }) {
  if (!name) return null
  const Icon = (LuIcons as Record<string, IconType>)[name]
  if (!Icon) return null
  return <Icon size={size} style={{ flexShrink: 0, verticalAlign: 'middle' }} />
}
