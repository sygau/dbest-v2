import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import {
  BiHomeAlt, BiTimeFive, BiBarChartAlt2, BiChat, BiFile,
  BiBook, BiCalculator, BiBot, BiTestTube, BiLeaf, BiLaptop,
  BiGlobe, BiMoney, BiBriefcase, BiInfoCircle, BiSupport,
  BiError, BiShieldAlt, BiX, BiBookReader, BiMicrophone,
  BiPlanet
} from 'react-icons/bi'
import { getChatConfig } from '../../utils/chatToggle'
import NavigationLink from '../NavigationLink'
import { cn } from '../../lib/cn'
import { useTheme } from './ThemeProvider'

interface SidebarProps {
  isOpen: boolean
  isCollapsed: boolean
  onClose: () => void
}

interface NavItemProps {
  href: string
  icon: ReactNode
  label: string
  isCollapsed?: boolean
  isMobileSheet?: boolean
}

function NavItem({ href, icon, label, isCollapsed, isMobileSheet }: NavItemProps) {
  const router = useRouter()
  const isActive = router.pathname === href || router.asPath === href

  return (
    <li>
      <NavigationLink
        href={href}
        className={cn(
          'flex items-center gap-2.5 py-[6px] text-[15px] transition-colors duration-200 tracking-wide',
          isCollapsed && !isMobileSheet ? 'justify-center px-0' : 'px-3',
          'text-[var(--color-sidebar-text)] hover:text-[var(--color-sidebar-active)] hover:bg-[var(--color-sidebar-hover)]',
          isActive && 'text-[var(--color-sidebar-active)] bg-[var(--color-sidebar-hover)]'
        )}
      >
        <span className="flex-shrink-0 leading-none flex items-center justify-center w-6 h-6" style={{ filter: 'drop-shadow(0 0 0.3px currentColor)' }}>{icon}</span>
        {(!isCollapsed || isMobileSheet) && <span className="truncate">{label}</span>}
      </NavigationLink>
    </li>
  )
}

function MenuLabel({ children, isCollapsed, isMobileSheet }: { children: ReactNode; isCollapsed?: boolean; isMobileSheet?: boolean }) {
  if (isCollapsed && !isMobileSheet) {
    return <li className="my-1.5 mx-2 border-t border-[var(--color-border)]" />
  }
  return (
    <li className="px-3 py-2 text-[var(--color-muted)] uppercase text-xs tracking-wide font-semibold">
      {children}
    </li>
  )
}

function SidebarLogo() {
  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 192 192" role="img" aria-labelledby="logoTitle">
      <title id="logoTitle">DSEBest Logo</title>
      <path d="M0 0 C1.15246719 -0.00511093 2.30493439 -0.01022186 3.49232483 -0.01548767 C7.28163933 -0.02932603 11.07077074 -0.02843106 14.86010742 -0.02612305 C16.83866637 -0.02902896 18.81722539 -0.03194029 20.79578322 -0.03552979 C27.01133488 -0.04659129 33.22682609 -0.04708178 39.44238281 -0.04101562 C45.82431629 -0.03498218 52.20602895 -0.04727843 58.58792478 -0.06858569 C64.09399487 -0.08628329 69.5999952 -0.09219017 75.10609263 -0.08894795 C78.38276247 -0.08714743 81.65924137 -0.09098878 84.93589211 -0.10366249 C88.59675421 -0.11608444 92.25711388 -0.10920007 95.91796875 -0.09765625 C97.51517761 -0.10912186 97.51517761 -0.10912186 99.14465332 -0.12081909 C111.67876557 -0.03404528 123.35213343 2.82242028 132.84057617 11.3371582 C142.29049256 21.40241798 144.45458181 33.95388943 144.44360352 47.17578125 C144.45032074 48.34600327 144.45703796 49.51622528 144.46395874 50.72190857 C144.48290002 54.576775 144.48686122 58.43146692 144.48901367 62.28637695 C144.49186369 63.62214547 144.49505619 64.9579133 144.49858475 66.29368019 C144.51705468 73.29183287 144.52525951 80.2899097 144.52368164 87.28808594 C144.52248229 93.77852692 144.54355166 100.26863428 144.57516897 106.75899094 C144.60145583 112.35762626 144.61204372 117.95615348 144.61077082 123.55484992 C144.61026464 126.88701291 144.61763846 130.21864473 144.63712692 133.55078697 C144.65687398 137.27632133 144.65091344 141.00101256 144.63891602 144.7265625 C144.65015503 145.80804565 144.66139404 146.88952881 144.67297363 148.00378418 C144.57082555 160.58007727 140.99535574 171.99840742 132.30541992 181.23950195 C122.06984821 190.86460219 109.86434923 192.58068253 96.30615234 192.54931641 C95.15368515 192.55442734 94.00121796 192.55953827 92.81382751 192.56480408 C89.02451302 192.57864244 85.2353816 192.57774747 81.44604492 192.57543945 C79.46748597 192.57834537 77.48892695 192.58125669 75.51036912 192.5848462 C69.29481746 192.5959077 63.07932625 192.59639818 56.86376953 192.59033203 C50.48183605 192.58429859 44.10012339 192.59659484 37.71822757 192.6179021 C32.21215748 192.63559969 26.70615715 192.64150658 21.20005971 192.63826436 C17.92338987 192.63646384 14.64691098 192.64030518 11.37026024 192.6529789 C7.70939813 192.66540084 4.04903847 192.65851647 0.38818359 192.64697266 C-0.67662231 192.65461639 -1.74142822 192.66226013 -2.83850098 192.6701355 C-15.37261323 192.58336169 -27.04598108 189.72689612 -36.53442383 181.2121582 C-45.98434021 171.14689843 -48.14842947 158.59542697 -48.13745117 145.37353516 C-48.1441684 144.20331314 -48.15088562 143.03309113 -48.1578064 141.82740784 C-48.17674768 137.9725414 -48.18070887 134.11784948 -48.18286133 130.26293945 C-48.18571134 128.92717094 -48.18890385 127.59140311 -48.1924324 126.25563622 C-48.21090233 119.25748354 -48.21910717 112.25940671 -48.2175293 105.26123047 C-48.21632994 98.77078949 -48.23739931 92.28068213 -48.26901662 85.79032546 C-48.29530348 80.19169014 -48.30589138 74.59316292 -48.30461848 68.99446648 C-48.3041123 65.6623035 -48.31148612 62.33067168 -48.33097458 58.99852943 C-48.35072163 55.27299508 -48.3447611 51.54830385 -48.33276367 47.82275391 C-48.34400269 46.74127075 -48.3552417 45.6597876 -48.36682129 44.54553223 C-48.2646732 31.96923913 -44.68920339 20.55090899 -35.99926758 11.30981445 C-25.76369586 1.68471421 -13.55819688 -0.03136612 0 0 Z " fill="#181A2D" transform="translate(47.846923828125,-0.274658203125)" />
      <path d="M0 0 C45.65219156 0 45.65219156 0 57.13671875 9.9921875 C66.21931613 19.77930501 68.87862182 31.52087695 68.41015625 44.5390625 C67.56151872 56.71794211 63.16482039 67.42853947 54.11328125 75.73046875 C38.98240744 87.40285712 17.43873962 84 0 84 C0 56.28 0 28.56 0 0 Z " fill="#6848E7" transform="translate(32,51)" />
      <path d="M0 0 C4.95 0 9.9 0 15 0 C15 9.57 15 19.14 15 29 C17.64 27.35 20.28 25.7 23 24 C29.15783248 21.94738917 36.50989488 21.88206857 42.4375 24.6875 C49.25056015 28.75562889 53.85568383 34.34549431 56 42 C57.50411038 54.57720268 57.19181737 67.54370077 49.25 77.9375 C43.55508143 83.78709537 38.53634906 85.25220194 30.375 85.5 C24.58548237 85.5477486 21.57502108 84.57208853 17 81 C16.505 80.505 16.505 80.505 16 80 C15.67 81.65 15.34 83.3 15 85 C10.05 85 5.1 85 0 85 C0 56.95 0 28.9 0 0 Z " fill="#6748E6" transform="translate(109,50)" />
      <path d="M0 0 C19.875 0 19.875 0 26 4 C26.928125 4.5775 27.85625 5.155 28.8125 5.75 C34.91314684 12.02495103 36.29150199 19.60600077 36.3190918 28.08935547 C36.17929373 35.59515882 34.3563105 41.23133517 29.5 46.9375 C28.2625 47.9584375 28.2625 47.9584375 27 49 C26.38125 49.556875 25.7625 50.11375 25.125 50.6875 C17.19483451 55.58554339 9.22404096 54 0 54 C0 36.18 0 18.36 0 0 Z " fill="#17192B" transform="translate(48,66)" />
      <path d="M0 0 C5.19719122 1.79902773 7.32849441 4.25065673 10 9 C12.08079409 15.24238228 11.81192229 21.87930729 9.25 27.9375 C6.98943225 32.40272041 4.86829864 35.37723379 0 37 C-5.98363729 37.45159527 -9.8648471 36.4011753 -14.64038086 32.74365234 C-17.58599821 28.96602635 -16.55475239 23.21158692 -16.5625 18.625 C-16.59923828 17.48804687 -16.63597656 16.35109375 -16.67382812 15.1796875 C-16.71689272 7.02612478 -16.71689272 7.02612478 -14.69482422 4.13183594 C-10.06355745 0.21209631 -5.90938932 -0.59534892 0 0 Z " fill="#17192D" transform="translate(140,86)" />
      <path d="M0 0 C11.55 0 23.1 0 35 0 C35.495 0.99 35.495 0.99 36 2 C24.78 2.33 13.56 2.66 2 3 C1.67 19.5 1.34 36 1 53 C0.67 53 0.34 53 0 53 C0 35.51 0 18.02 0 0 Z " fill="#7352F1" transform="translate(32,51)" />
    </svg>
  )
}

function SidebarContent({ isCollapsed, isMobileSheet, onClose }: { isCollapsed: boolean; isMobileSheet: boolean; onClose: () => void }) {
  const { theme } = useTheme()
  const chatConfig = getChatConfig()
  const collapsed = isCollapsed && !isMobileSheet
  const dotColor = theme === 'light' ? '#4a148c' : '#c390ff'

  return (
    <>
      {/* Header */}
      <div className={cn(
        'flex items-center h-[56px] xl:h-[70px] gap-2 border-b border-[var(--color-border)] flex-shrink-0',
        collapsed ? 'justify-center px-2' : 'px-4'
      )} style={{ padding: collapsed ? undefined : '0.75rem 1rem' }}>
        <div className="flex-shrink-0">
          <NavigationLink href="/" aria-label="DSEBest 主頁 Home">
            <SidebarLogo />
          </NavigationLink>
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <NavigationLink href="/" className="no-underline text-inherit">
              <h5 style={{
                fontSize: '1.5rem',
                fontFamily: 'Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'baseline',
                marginTop: '3px',
                marginBottom: 0
              }}>
                dse<span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: dotColor }}>●</span><span style={{ fontWeight: 'bold' }}>best</span>
              </h5>
            </NavigationLink>
          </div>
        )}
        {isMobileSheet && (
          <button
            className="flex items-center justify-center w-[40px] h-[40px] bg-transparent border-0 cursor-pointer text-[var(--color-body)] ml-auto"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <BiX style={{ fontSize: 24 }} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2" suppressHydrationWarning>
        <ul className="list-none p-0 px-2 m-0 flex flex-col gap-[3px]" suppressHydrationWarning>
          <NavItem href="/" icon={<BiHomeAlt style={{ color: '#a78bfa', fontSize: 23 }} />} label="主頁" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/countdown" icon={<BiTimeFive style={{ color: '#f9a8d4', fontSize: 23 }} />} label="DSE 倒數 Countdown" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/cutoff" icon={<BiBarChartAlt2 style={{ color: '#f77', fontSize: 23 }} />} label="DSE Cut Off 分數" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          {chatConfig.enabled && (
            <NavItem href="/chat" icon={<BiChat style={{ color: '#fdba74', fontSize: 23 }} />} label="聊天室 Chatroom" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          )}
          <NavItem href="/blog" icon={<BiFile style={{ color: '#2fc4d4', fontSize: 23 }} />} label="Blog" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />

          <MenuLabel isCollapsed={collapsed} isMobileSheet={isMobileSheet}>Offer</MenuLabel>
          <NavItem href="/eng-writing" icon={<BiBot style={{ color: '#d4a017', fontSize: 23 }} />} label="免費英文寫作批改" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />

          <MenuLabel isCollapsed={collapsed} isMobileSheet={isMobileSheet}>核心科目</MenuLabel>
          <NavItem href="/chinese" icon={<BiBook style={{ color: '#ff69b4', fontSize: 23 }} />} label="中文 Chinese" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/english" icon={<BiBook style={{ color: '#40c4ff', fontSize: 23 }} />} label="英文 English" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/math" icon={<BiCalculator style={{ color: '#d4a017', fontSize: 23 }} />} label="數學 Math" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/citizen" icon={<BiGlobe style={{ color: '#28a745', fontSize: 23 }} />} label="公民 CSD" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />

          <MenuLabel isCollapsed={collapsed} isMobileSheet={isMobileSheet}>選修科目</MenuLabel>
          <NavItem href="/physics" icon={<BiBot style={{ color: '#7c3aed', fontSize: 23 }} />} label="物理 Physics" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/chemistry" icon={<BiTestTube style={{ color: '#059669', fontSize: 23 }} />} label="化學 Chemistry" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/biology" icon={<BiLeaf style={{ color: '#15803d', fontSize: 23 }} />} label="生物 Biology" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/ict" icon={<BiLaptop style={{ color: '#ff3d00', fontSize: 23 }} />} label="資訊及通訊科技 ICT" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/m1" icon={<BiCalculator style={{ color: '#b388ff', fontSize: 23 }} />} label="M1" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/m2" icon={<BiCalculator style={{ color: '#0d9488', fontSize: 23 }} />} label="M2" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/geography" icon={<BiGlobe style={{ color: '#0f766e', fontSize: 23 }} />} label="地理 Geography" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/economics" icon={<BiMoney style={{ color: '#d97706', fontSize: 23 }} />} label="經濟 Economics" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/bafs" icon={<BiBriefcase style={{ color: '#0d9488', fontSize: 23 }} />} label="企業、會計與財務概論 BAFS" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/history" icon={<BiBook style={{ color: '#ffab91', fontSize: 23 }} />} label="歷史 History" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/chinese-history" icon={<BiBook style={{ color: '#ff1744', fontSize: 23 }} />} label="中國歷史 Chinese History" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/ths" icon={<BiPlanet style={{ color: '#2196f3', fontSize: 23 }} />} label="旅遊與款待 Tourism & Hospitality" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />

          <MenuLabel isCollapsed={collapsed} isMobileSheet={isMobileSheet}>工具</MenuLabel>
          <NavItem href="/12p" icon={<BiBookReader style={{ color: '#ff6b9d', fontSize: 23 }} />} label="十二篇語譯練習" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/pomodoro" icon={<BiTimeFive style={{ color: '#667eea', fontSize: 23 }} />} label="番茄鐘 Pomodoro" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/timer" icon={<BiTestTube style={{ color: '#0891b2', fontSize: 23 }} />} label="操卷計時器 Paper Timer" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/individual-response" icon={<BiMicrophone style={{ color: '#25D366', fontSize: 23 }} />} label="Speaking IR 練習" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />

          <MenuLabel isCollapsed={collapsed} isMobileSheet={isMobileSheet}>其他</MenuLabel>
          <NavItem href="/about" icon={<BiInfoCircle style={{ color: '#7986cb', fontSize: 23 }} />} label="關於我們" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/contact" icon={<BiSupport style={{ color: '#7986cb', fontSize: 23 }} />} label="聯絡我們" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/disclaimer" icon={<BiError style={{ color: '#7986cb', fontSize: 23 }} />} label="免責聲明" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
          <NavItem href="/privacy-policy" icon={<BiShieldAlt style={{ color: '#7986cb', fontSize: 23 }} />} label="私隱政策" isCollapsed={collapsed} isMobileSheet={isMobileSheet} />
        </ul>
      </nav>
    </>
  )
}

export default function Sidebar({ isOpen, isCollapsed, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full bg-[var(--color-sidebar-bg)] border-r border-[var(--color-border)] transition-all duration-300 ease-out flex-col hidden xl:flex',
          isCollapsed ? 'w-[70px]' : 'w-[260px]'
        )}
        style={{ zIndex: 12 }}
      >
        <SidebarContent isCollapsed={isCollapsed} isMobileSheet={false} onClose={onClose} />
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 xl:hidden"
          style={{ zIndex: 50 }}
          onClick={onClose}
        />
      )}

      {/* Mobile sheet - slides in from left */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 w-[240px] max-w-[75vw] bg-[var(--color-sidebar-bg)] border-r border-[var(--color-border)] flex flex-col xl:hidden transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{ zIndex: 51 }}
      >
        <SidebarContent isCollapsed={false} isMobileSheet={true} onClose={onClose} />
      </div>
    </>
  )
}
