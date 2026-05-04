import { MouseEvent } from 'react'

interface NavigationLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  [key: string]: any
}

export default function NavigationLink({ href, children, className, onClick, ...props }: NavigationLinkProps) {
  return (
    <a href={href} className={className} onClick={onClick} {...props}>
      {children}
    </a>
  )
}
