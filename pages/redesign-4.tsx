import Head from 'next/head'
import { useState, useEffect } from 'react'
import PageSEO from '../components/PageSEO'
import { Button } from '../components/ui/Button'
import { ButtonAnchor } from '../components/ui/ButtonAnchor'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Alert, AlertTitle, AlertDescription } from '../components/ui/Alert'
import { Input } from '../components/ui/Input'
import { Label } from '../components/ui/Label'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table'
import { Avatar } from '../components/ui/Avatar'
import { Accordion, AccordionItem } from '../components/ui/Accordion'
import { Progress } from '../components/ui/Progress'
import { Skeleton } from '../components/ui/Skeleton'
import { Switch } from '../components/ui/Switch'
import { Separator } from '../components/ui/Separator'
import { Chip } from '../components/ui/Chip'
import { EmptyState } from '../components/ui/EmptyState'
import { Callout } from '../components/ui/Callout'
import { RadioGroup } from '../components/ui/RadioGroup'
import { FileCard } from '../components/ui/FileCard'
import { CodeBlock } from '../components/ui/CodeBlock'
import { Toggle } from '../components/ui/Toggle'
import { ConfigItem, ConfigSection } from '../components/ui/ConfigItem'
import { Toast, ToastContainer } from '../components/ui/Toast'
import { Dialog } from '../components/ui/Dialog'
import { DropdownMenu } from '../components/ui/DropdownMenu'
import { IconCard } from '../components/ui/IconCard'
import {
  LuTriangleAlert, LuCircleCheck, LuInfo, LuCircleX,
  LuSearch, LuDownload, LuChevronRight, LuFilter,
  LuLayoutDashboard, LuFileText, LuUsers, LuBookOpen,
  LuFileSearch, LuGraduationCap, LuLightbulb,
  LuBold, LuItalic, LuUnderline,
  LuAlignLeft, LuAlignCenter, LuAlignRight,
  LuPencil, LuTrash2, LuShare2, LuEllipsis, LuLink,
  LuBell, LuShield, LuUser, LuSettings, LuLogOut, LuCopy,
  LuChevronDown, LuExternalLink,
} from 'react-icons/lu'

const inputBase = [
  'flex h-9 w-full rounded-md border border-violet-200',
  'bg-[var(--color-input-bg)] px-3 py-1 text-sm text-[var(--color-body)]',
  'placeholder:text-[var(--color-placeholder)]',
  'focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-400/30 focus:ring-offset-0',
  'disabled:cursor-not-allowed disabled:opacity-50',
].join(' ')

const sk = { backgroundColor: 'rgba(160,160,160,0.45)' }

export default function Redesign4() {
  const [quizAnswer, setQuizAnswer] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [toastType, setToastType] = useState<string | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [toggleBold, setToggleBold] = useState(false)
  const [toggleItalic, setToggleItalic] = useState(false)
  const [toggleUnder, setToggleUnder] = useState(false)
  const [alignMode, setAlignMode] = useState<'left' | 'center' | 'right'>('left')
  const [configNotifs, setConfigNotifs] = useState(true)
  const [configDark, setConfigDark] = useState(false)

  useEffect(() => {
    if (toastType) {
      const t = setTimeout(() => setToastType(null), 3500)
      return () => clearTimeout(t)
    }
  }, [toastType])

  return (
    <>
      <PageSEO title="Redesign 4 — Design System" description="Component library and design token showcase" robots={['noindex', 'nofollow']} />
      <Head>
        <style>{`
          .r4-section { margin-bottom: 2.5rem; }
          .r4-grid { display: grid; gap: 1rem; grid-template-columns: 1fr; }
          @media(min-width:768px){ .r4-grid-2 { grid-template-columns: repeat(2,1fr); } }
          @media(min-width:1024px){ .r4-grid-3 { grid-template-columns: repeat(3,1fr); } .r4-grid-4 { grid-template-columns: repeat(4,1fr); } }
          .r4-heading-xl { font-size: 2.25rem; font-weight: 800; line-height: 1.1; letter-spacing: -0.03em; color: var(--color-heading); }
          .r4-heading-lg { font-size: 1.5rem; font-weight: 700; line-height: 1.2; letter-spacing: -0.02em; color: var(--color-heading); }
          .r4-heading-md { font-size: 1.125rem; font-weight: 600; line-height: 1.3; color: var(--color-heading); }
          .r4-heading-sm { font-size: 0.9375rem; font-weight: 600; line-height: 1.4; color: var(--color-heading); }
          .r4-body { font-size: 0.875rem; line-height: 1.6; color: var(--color-body); }
          .r4-body-sm { font-size: 0.8125rem; line-height: 1.5; color: var(--color-muted); }
          .r4-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.8125rem; color: var(--color-body); background: #e1e1e1; padding: 0.125rem 0.375rem; border-radius: 4px; }
          [data-theme="dark"] .r4-mono { background: #343a40; }
          [data-theme="blue"] .r4-mono { background: #28305d; }
          .r4-caption { font-size: 0.75rem; line-height: 1.4; color: var(--color-muted); letter-spacing: 0.01em; }
          .r4-link { color: inherit; text-decoration: none; background: linear-gradient(120deg,rgba(167,139,250,0.28) 0%,rgba(167,139,250,0.28) 100%); background-repeat: no-repeat; background-size: 100% 42%; background-position: 0 90%; border-radius: 2px; padding: 0.1em 0.25em; }
          .r4-divider { height: 1px; background: var(--color-border); margin: 2rem 0; }
          .r4-swatch { width: 2.5rem; height: 2.5rem; border-radius: 0.5rem; border: 1px solid var(--color-border); flex-shrink: 0; }
          .r5-btn-press { transition: transform 0.06s ease; }
          .r5-btn-press:active { transform: translateY(2px); }
          .r5-btn-press-dip { transition: transform 0.06s ease; }
          .r5-btn-press-dip:active { transform: translateY(3px) scale(0.985); }
          .r5-btn-squish { transition: transform 0.08s cubic-bezier(.4,0,.2,1); }
          .r5-btn-squish:active { transform: translateY(2px) scale(0.97); }
          .r5-alert-ghost { position: relative; overflow: hidden; padding-left: 4rem; }
          .r5-alert-ghost > .ghost-mark { position: absolute; left: -6px; top: 50%; transform: translateY(-50%) scale(3.6); transform-origin: left center; opacity: 0.09; color: #8b5cf6; pointer-events: none; display: flex; line-height: 1; }
          [data-theme="dark"] .r5-alert-ghost > .ghost-mark, [data-theme="blue"] .r5-alert-ghost > .ghost-mark { opacity: 0.16; }
          .r4-warn-icon { color: #b45309; }
          [data-theme="dark"] .r4-warn-icon { color: #fbbf24; }
          [data-theme="blue"] .r4-warn-icon { color: #facc15; }
          .r4-tc-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-muted); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.375rem; }
          .r4-tc-label::before { content: ''; display: inline-block; width: 1.5rem; height: 1px; background: var(--color-border); }
          .r4-tc-label::after { content: ''; display: inline-block; width: 1.5rem; height: 1px; background: var(--color-border); }
          .tc-sharp { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; font-synthesis: none; }
          .r4-tg-group { display: inline-flex; border-radius: 0.375rem; solid var(--color-border); overflow: hidden; }
          .r4-tg-group > button { border-radius: 0; border: none; border-right: 1px solid var(--color-border); }
          .r4-tg-group > button:last-child { border-right: none; }
          .r4-section-tag { display: inline-flex; align-items: center; gap: 0.25rem; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-muted); border: 1px solid var(--color-border); border-radius: 4px; padding: 0.1rem 0.4rem; margin-bottom: 0.5rem; }
          .r4-popover-demo { position: relative; background: var(--color-card-inner-bg); border: 1px solid var(--color-border); border-radius: 12px; padding: 8px 12px; font-size: 13px; color: var(--color-body); line-height: 1.5; max-width: 220px; }
          .r4-popover-demo::before { content: ''; position: absolute; bottom: -7px; left: 20px; width: 12px; height: 12px; background: var(--color-card-inner-bg); border: 1px solid var(--color-border); border-top: none; border-left: none; transform: rotate(45deg); clip-path: polygon(0 0,100% 100%,0 100%); }
          .r4-ctx-menu { background: var(--color-card-bg); border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.15); width: 180px; }
          .r4-ctx-item { display: flex; align-items: center; gap: 10px; padding: 8px 12px; font-size: 13px; color: var(--color-body); cursor: default; }
          .r4-ctx-item.danger { color: #ef4444; }
          .r4-ctx-sep { height: 1px; background: var(--color-border); margin: 4px 0; }
        `}</style>
      </Head>

      {/* Live Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Download Paper"
        description="Mathematics 2024 — Paper 1 (2.4 MB)"
        footer={<>
          <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="default" size="sm" onClick={() => setDialogOpen(false)}><LuDownload size={13}/> Download</Button>
        </>}
      >
        <p>This paper is available for free download. It will be saved in your downloads folder as <span className="r4-mono">maths-2024-paper1.pdf</span>.</p>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        title="Delete saved paper?"
        description="This action cannot be undone."
        footer={<>
          <Button variant="outline" size="sm" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button variant="destructive" size="sm" onClick={() => setDeleteDialogOpen(false)}>Delete</Button>
        </>}
      />

      {/* Live Toast */}
      {toastType && (
        <ToastContainer>
          {toastType === 'success' && (
            <Toast variant="success" title="Download complete" description="maths-2024-paper1.pdf saved." onClose={() => setToastType(null)} />
          )}
          {toastType === 'error' && (
            <Toast variant="error" title="Download failed" description="Check your connection and try again." onClose={() => setToastType(null)} action={{ label: 'Retry', onClick: () => setToastType(null) }} />
          )}
          {toastType === 'warning' && (
            <Toast variant="warning" title="Subscription expires soon" description="Renew within 3 days to keep access." onClose={() => setToastType(null)} />
          )}
          {toastType === 'default' && (
            <Toast variant="default" title="Paper updated" description="2023 marking scheme is now available." onClose={() => setToastType(null)} />
          )}
        </ToastContainer>
      )}

      <div className="hidden sm:flex items-center mb-3">
        <div className="text-xl font-medium pr-3 border-r border-[var(--color-border)] text-[var(--color-heading)]">開發</div>
        <div className="pl-3"><nav aria-label="breadcrumb"><ol className="list-none flex p-0 m-0"><li className="text-base text-[var(--color-body)]" aria-current="page">Design System v4</li></ol></nav></div>
      </div>

      <div className="card rounded-4" style={{ height: 'auto' }}>
        <div className="card-body p-4">

          {/* PAGE HEADER */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <LuLayoutDashboard size={18} className="text-violet-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-violet-600">Design System v4</span>
            </div>
            <h1 className="r4-heading-xl mb-2">Components & Typography</h1>
            <p className="r4-body" style={{ maxWidth: 560 }}>
              Minimal, functional component library. Purple accent. Educational focus. Multi-theme.
            </p>
          </div>

          {/* ── 1. FOUNDATION ── */}
          <div className="r4-section">
            <div className="r4-section-tag">Tier 1</div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="r4-heading-lg">Foundation</h2>
              <Badge variant="outline">Tokens</Badge>
            </div>
            <div className="r4-grid r4-grid-2">
              <Card><CardContent className="pt-6 space-y-4">
                <div>
                  <div className="r4-heading-sm mb-2">Colour Palette — Light</div>
                  <div className="flex flex-wrap gap-2">
                    {[['#eff1f3','bg'],['#ffffff','card'],['#f3f4f6','inner'],['#474747','heading'],['#5b6166','body'],['#dee2e6','border'],['#8b5cf6','accent'],['#22c55e','success'],['#ef4444','danger'],['#f59e0b','warn']].map(([c,l])=>(
                      <div key={l} className="flex flex-col items-center gap-1"><div className="r4-swatch" style={{background:c}}/><span className="r4-caption">{l}</span></div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="r4-heading-sm mb-2">Colour Palette — Dark</div>
                  <div className="flex flex-wrap gap-2">
                    {[['#212529','bg'],['#2b3035','card'],['#343a40','inner'],['#ffffff','heading'],['#dee2e6','body'],['#495057','border'],['#a78bfa','accent'],['#4ade80','success'],['#f87171','danger'],['#fbbf24','warn']].map(([c,l])=>(
                      <div key={l} className="flex flex-col items-center gap-1"><div className="r4-swatch" style={{background:c}}/><span className="r4-caption">{l}</span></div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="r4-heading-sm mb-2">Colour Palette — Blue</div>
                  <div className="flex flex-wrap gap-2">
                    {[['#0f1535','bg'],['#070c29','card'],['#181f4a','inner'],['#e6ecf0','heading'],['#d3d7dc','body'],['rgba(255,255,255,0.15)','border'],['#c4b5fd','accent'],['#34d399','success'],['#fb7185','danger'],['#facc15','warn']].map(([c,l])=>(
                      <div key={l} className="flex flex-col items-center gap-1"><div className="r4-swatch" style={{background:c}}/><span className="r4-caption">{l}</span></div>
                    ))}
                  </div>
                </div>
              </CardContent></Card>
              <Card><CardContent className="pt-6 space-y-4">
                <div>
                  <div className="r4-heading-sm mb-2">Spacing Scale</div>
                  <div className="space-y-1.5">
                    {[['0.25rem','1'],['0.5rem','2'],['0.75rem','3'],['1rem','4'],['1.5rem','6'],['2rem','8'],['2.5rem','10'],['3rem','12']].map(([w,t])=>(
                      <div key={t} className="flex items-center gap-3"><div className="h-1 rounded" style={{width:w,background:'var(--color-border)'}}/><span className="r4-caption">{t} — {w}</span></div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="r4-heading-sm mb-2">Border Radius</div>
                  <div className="space-y-2">
                    {[['0px','sharp'],['4px','sm'],['8px','md'],['12px','lg'],['16px','xl'],['9999px','full']].map(([r,l])=>(
                      <div key={l} className="flex items-center gap-3"><div className="h-6 w-6 border" style={{borderColor:'var(--color-border)',borderRadius:r,background:'var(--color-body-bg)'}}/><span className="r4-caption">{l} — {r}</span></div>
                    ))}
                  </div>
                </div>
              </CardContent></Card>
            </div>
          </div>

          <div className="r4-divider" />

          {/* ── 2. TYPOGRAPHY ── */}
          <div className="r4-section">
            <div className="r4-section-tag">Tier 1</div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="r4-heading-lg">Typography</h2>
              <Badge variant="outline">10 styles</Badge>
            </div>
            <div className="r4-grid r4-grid-2">
              <Card><CardContent className="pt-6 space-y-5">
                <div><div className="r4-heading-xl mb-1">Heading XL</div><span className="r4-mono">.r4-heading-xl</span> <span className="r4-body-sm">36px / 800 / tight</span></div>
                <div><div className="r4-heading-lg mb-1">Heading LG</div><span className="r4-mono">.r4-heading-lg</span> <span className="r4-body-sm">24px / 700 / tight</span></div>
                <div><div className="r4-heading-md mb-1">Heading MD</div><span className="r4-mono">.r4-heading-md</span> <span className="r4-body-sm">18px / 600</span></div>
                <div><div className="r4-heading-sm mb-1">Heading SM</div><span className="r4-mono">.r4-heading-sm</span> <span className="r4-body-sm">15px / 600</span></div>
              </CardContent></Card>
              <Card><CardContent className="pt-6 space-y-5">
                <div><div className="r4-body mb-1">Body text carries the meaning. 14px / 1.6 line height, optimised for readability across long-form content.</div><span className="r4-mono">.r4-body</span> <span className="r4-body-sm">14px / 400 / 1.6</span></div>
                <div><div className="r4-body-sm mb-1">Small body for metadata, captions, secondary info.</div><span className="r4-mono">.r4-body-sm</span> <span className="r4-body-sm">13px / muted</span></div>
                <div><div className="r4-mono mb-1">Monospace for code and technical labels.</div><span className="r4-mono">.r4-mono</span> <span className="r4-body-sm">13px / pill bg</span></div>
                <div><div className="mb-1 r4-body">Inline <a href="#" className="r4-link">neon purple link</a> — VS Code collaborator highlight style.</div><span className="r4-mono">.r4-link</span></div>
                <div><div className="r4-caption mb-1">Caption for fine print, timestamps, figure labels.</div><span className="r4-mono">.r4-caption</span> <span className="r4-body-sm">12px / muted</span></div>
              </CardContent></Card>
            </div>
            <div className="r4-tc-label mt-5">繁體中文 Traditional Chinese</div>
            <div className="r4-grid r4-grid-2" lang="zh-Hant">
              <Card><CardContent className="pt-6 space-y-5">
                <div><div className="r4-heading-xl mb-1">文憑試備考平台</div><span className="r4-mono">.r4-heading-xl</span></div>
                <div><div className="r4-heading-lg mb-1">各科目歷屆試題匯整</div><span className="r4-mono">.r4-heading-lg</span></div>
                <div><div className="r4-heading-md mb-1">數學 — 試題標題</div><span className="r4-mono">.r4-heading-md</span></div>
              </CardContent></Card>
              <Card><CardContent className="pt-6 space-y-5">
                <div><div className="r4-body mb-1">本文字為正文內容，字體大小為14像素，行距1.6，針對長篇閱讀及複雜介面優化可讀性。</div><span className="r4-mono">.r4-body</span></div>
                <div><div className="r4-body-sm mb-1">次要資訊，如日期、作者、備注等輔助文字。</div><span className="r4-mono">.r4-body-sm</span></div>
                <div><div className="r4-mono mb-1">maths-2024-paper1.pdf</div><span className="r4-mono">.r4-mono</span></div>
              </CardContent></Card>
            </div>
          </div>

          <div className="r4-divider" />

          {/* ── 3. BUTTONS ── */}
          <div className="r4-section">
            <div className="r4-section-tag">Tier 2</div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="r4-heading-lg">Buttons</h2>
              <Badge variant="secondary">13 variants</Badge>
            </div>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <div className="r4-heading-sm mb-3">Variants</div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="default" size="md">Default</Button>
                    <Button variant="secondary" size="md">Secondary</Button>
                    <Button variant="outline" size="md">Outline</Button>
                    <Button variant="ghost" size="md">Ghost</Button>
                    <Button variant="destructive" size="md">Destructive</Button>
                    <Button variant="link" size="md">Link</Button>
                  </div>
                </div>
                <div>
                  <div className="r4-heading-sm mb-3">Semantic</div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="success" size="md">Success</Button>
                    <Button variant="warning" size="md">Warning</Button>
                    <Button variant="info" size="md">Info</Button>
                    <Button variant="destructive" size="md">Danger</Button>
                  </div>
                </div>
                <div>
                  <div className="r4-heading-sm mb-1">Press Effects</div>
                  <div className="r4-body-sm mb-3 opacity-75">Tap to feel the push-down snap.</div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="default" size="md" className="r5-btn-press">Shift</Button>
                    <Button variant="default" size="md" className="r5-btn-press-dip">Dip</Button>
                    <Button variant="default" size="md" className="r5-btn-squish">Squish</Button>
                    <Button variant="success" size="md" className="r5-btn-press"><LuCircleCheck size={14}/> Confirm</Button>
                    <Button variant="destructive" size="md" className="r5-btn-press-dip">Delete</Button>
                  </div>
                </div>
                <div>
                  <div className="r4-heading-sm mb-3">Sizes</div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="default" size="sm">Small</Button>
                    <Button variant="default" size="md">Medium</Button>
                    <Button variant="default" size="lg">Large</Button>
                    <Button variant="default" size="icon"><LuSearch size={16}/></Button>
                  </div>
                </div>
                <div>
                  <div className="r4-heading-sm mb-3">With Icons / States</div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="default" size="md"><LuDownload size={14}/> Download</Button>
                    <Button variant="outline" size="md"><LuFilter size={14}/> Filter</Button>
                    <Button variant="ghost" size="md">Next <LuChevronRight size={14}/></Button>
                    <Button variant="default" size="md" disabled>Disabled</Button>
                  </div>
                </div>
                <div>
                  <div className="r4-heading-sm mb-1">Blog Anchor Buttons (ButtonAnchor)</div>
                  <div className="r4-body-sm mb-3 opacity-75">
                    Renders as <code>&lt;a&gt;</code> tag. Used in blog post body. Default = sky blue (independent from Button violet default).
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <ButtonAnchor href="#" variant="default">Default</ButtonAnchor>
                    <ButtonAnchor href="#" variant="secondary">Secondary</ButtonAnchor>
                    <ButtonAnchor href="#" variant="outline">Outline</ButtonAnchor>
                    <ButtonAnchor href="#" variant="success">Success</ButtonAnchor>
                    <ButtonAnchor href="#" variant="warning">Warning</ButtonAnchor>
                    <ButtonAnchor href="#" variant="info">Info</ButtonAnchor>
                    <ButtonAnchor href="#" variant="destructive">Danger</ButtonAnchor>
                    <ButtonAnchor href="https://hkeaa.edu.hk" variant="info" target="_blank" rel="noopener noreferrer">
                      HKEAA.edu.hk <LuExternalLink size={14} />
                    </ButtonAnchor>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="r4-divider" />

          {/* ── 4. FORMS ── */}
          <div className="r4-section">
            <div className="r4-section-tag">Tier 2</div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="r4-heading-lg">Forms</h2>
              <Badge variant="secondary">Input · Select · Textarea</Badge>
            </div>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="r4-grid r4-grid-2" style={{ gap: '1rem' }}>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" type="email" placeholder="student@school.edu.hk" style={{ marginTop: '5px' }} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" style={{ marginTop: '5px' }} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="search">Search past papers</Label>
                  <div className="flex gap-2">
                    <Input id="search" placeholder="e.g. Mathematics 2023 Paper 1…" style={{ marginTop: '5px' }} />
                    <Button variant="default" size="sm" className="!h-9 !w-9 !px-0 flex-shrink-0" style={{ marginTop: '5px' }}>
                      <LuSearch size={15}/>
                    </Button>
                  </div>
                </div>
                <div className="r4-grid r4-grid-2" style={{ gap: '1rem' }}>
                  <div className="space-y-1.5">
                    <Label htmlFor="subject">Subject</Label>
                    <select id="subject" className={inputBase} style={{ height: '2.25rem', marginTop: '5px' }}>
                      <option value="">Select a subject…</option>
                      <option>Mathematics</option>
                      <option>English Language</option>
                      <option>Chinese Language</option>
                      <option>Economics</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="exam-date">Exam date</Label>
                    <Input id="exam-date" type="date" style={{ marginTop: '5px' }} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="notes">Notes</Label>
                  <textarea id="notes" rows={3} placeholder="Add revision notes…" className={inputBase} style={{ height: 'auto', resize: 'vertical', paddingTop: '0.5rem', paddingBottom: '0.5rem', marginTop: '5px' }} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="disabled-field">Read-only</Label>
                  <Input id="disabled-field" placeholder="Cannot edit this" disabled style={{ marginTop: '5px' }} />
                </div>
              </CardContent>
            </Card>

            {/* Switch */}
            <div className="r4-heading-sm mt-5 mb-3">Switch</div>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between"><div><div className="r4-heading-sm">Notifications</div><div className="r4-body-sm">Receive email alerts for new papers</div></div><Switch checked /></div>
                <Separator />
                <div className="flex items-center justify-between"><div><div className="r4-heading-sm">Dark Mode</div><div className="r4-body-sm">Switch to dark theme automatically</div></div><Switch /></div>
                <Separator />
                <div className="flex items-center justify-between opacity-50"><div><div className="r4-heading-sm">Beta Features</div><div className="r4-body-sm">Enable experimental tools (unavailable)</div></div><Switch disabled /></div>
              </CardContent>
            </Card>

            {/* Toggle Button */}
            <div className="r4-heading-sm mt-5 mb-3">Toggle Button</div>
            <Card>
              <CardContent className="pt-6 space-y-5">
                <div>
                  <div className="r4-body-sm mb-3">Independent toggles — each manages its own pressed state.</div>
                  <div className="flex flex-wrap gap-2">
                    <Toggle pressed={toggleBold} onPressedChange={setToggleBold}><LuBold size={14}/> Bold</Toggle>
                    <Toggle pressed={toggleItalic} onPressedChange={setToggleItalic}><LuItalic size={14}/> Italic</Toggle>
                    <Toggle pressed={toggleUnder} onPressedChange={setToggleUnder}><LuUnderline size={14}/> Underline</Toggle>
                  </div>
                  <div className="r4-body-sm mt-2 opacity-60">
                    Active: {[toggleBold&&'Bold',toggleItalic&&'Italic',toggleUnder&&'Underline'].filter(Boolean).join(', ') || 'none'}
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="r4-body-sm mb-3">Mutually exclusive group — text alignment.</div>
                  <div className="r4-tg-group">
                    <Toggle pressed={alignMode==='left'} onPressedChange={()=>setAlignMode('left')}><LuAlignLeft size={15}/></Toggle>
                    <Toggle pressed={alignMode==='center'} onPressedChange={()=>setAlignMode('center')}><LuAlignCenter size={15}/></Toggle>
                    <Toggle pressed={alignMode==='right'} onPressedChange={()=>setAlignMode('right')}><LuAlignRight size={15}/></Toggle>
                  </div>
                  <div className="r4-body-sm mt-2 opacity-60">Align: {alignMode}</div>
                </div>
                <Separator />
                <div>
                  <div className="r4-body-sm mb-3">Size variants.</div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Toggle size="sm" pressed>Small</Toggle>
                    <Toggle size="md" pressed>Medium</Toggle>
                    <Toggle size="lg" pressed>Large</Toggle>
                    <Toggle size="md">Inactive</Toggle>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Radio Group */}
            <div className="r4-heading-sm mt-5 mb-3">Radio Group</div>
            <div className="r4-grid r4-grid-2">
              <Card>
                <CardContent className="pt-6">
                  <div className="r4-heading-sm mb-1">DSE Mock Question</div>
                  <p className="r4-body-sm mb-3">Which of the following best describes the effect of an increase in money supply?</p>
                  <RadioGroup
                    name="quiz-demo"
                    variant="quiz"
                    value={quizAnswer}
                    onChange={setQuizAnswer}
                    options={[
                      { value: 'A', label: 'A. Interest rates will rise' },
                      { value: 'B', label: 'B. Aggregate demand shifts right' },
                      { value: 'C', label: 'C. The price level will fall' },
                      { value: 'D', label: 'D. Real GDP is unchanged' },
                    ]}
                  />
                  {quizAnswer && (
                    <div className="mt-3">
                      <Badge variant={quizAnswer === 'B' ? 'default' : 'destructive'}>
                        {quizAnswer === 'B' ? '✓ Correct' : '✗ Try again'}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card lang="zh-Hant">
                <CardContent className="pt-6">
                  <div className="r4-heading-sm mb-1">模擬試題</div>
                  <p className="r4-body-sm mb-3">以下哪項最能描述貨幣供應增加的影響？</p>
                  <RadioGroup
                    name="quiz-demo-tc"
                    variant="quiz"
                    options={[
                      { value: 'A', label: 'A. 利率上升' },
                      { value: 'B', label: 'B. 總需求曲線右移' },
                      { value: 'C', label: 'C. 物價水平下跌' },
                      { value: 'D', label: 'D. 實質本地生產總值不變' },
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="r4-divider" />

          {/* ── 5. ALERTS ── */}
          <div className="r4-section">
            <div className="r4-section-tag">Tier 3</div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="r4-heading-lg">Alerts</h2>
              <Badge variant="secondary">5 types</Badge>
            </div>
            <div className="space-y-2.5">
              <Alert variant="default">
                <AlertTitle icon={<LuInfo size={15} className="text-violet-500" style={{ marginBottom: '-2px' }} />}>Information</AlertTitle>
                <AlertDescription>Standard informational alert with a violet accent.</AlertDescription>
              </Alert>
              <Alert variant="success">
                <AlertTitle icon={<LuCircleCheck size={15} className="text-green-500" style={{ marginBottom: '-2px' }} />}>Success</AlertTitle>
                <AlertDescription>Operation completed successfully. 12 files processed.</AlertDescription>
              </Alert>
              <Alert variant="warning">
                <AlertTitle icon={<LuTriangleAlert size={15} className="r4-warn-icon" style={{ marginBottom: '-2px' }} />}>Warning</AlertTitle>
                <AlertDescription>Your subscription expires in 3 days. Renew to avoid interruption.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTitle icon={<LuCircleX size={15} className="text-red-500" style={{ marginBottom: '-2px' }} />}>Error</AlertTitle>
                <AlertDescription>Failed to connect to the server. Please check your internet connection.</AlertDescription>
              </Alert>
              <Alert variant="default" className="r5-alert-ghost">
                <span className="ghost-mark" aria-hidden="true"><LuLightbulb size={20} /></span>
                <AlertTitle icon={<LuLightbulb size={15} className="text-violet-500" style={{ marginBottom: '-2px' }} />}>Ghost Watermark</AlertTitle>
                <AlertDescription>The icon is ghosted on the left as a translucent watermark — softer emphasis without competing with the title.</AlertDescription>
              </Alert>
            </div>
          </div>

          <div className="r4-divider" />

          {/* ── 6. CALLOUTS ── */}
          <div className="r4-section">
            <div className="r4-section-tag">Tier 3</div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="r4-heading-lg">Callouts</h2>
              <Badge variant="secondary">Highlighted info</Badge>
            </div>
            <div className="space-y-3">
              <Callout variant="tip" icon={<LuLightbulb size={14} />} title="Study Tip">
                For Mathematics Paper 1, focus on functions and calculus — they account for roughly 40% of marks in recent years.
              </Callout>
              <Callout variant="info" title="Copyright Notice">
                Past papers are reproduced under fair use for educational purposes. HKDSE papers remain property of the HKEAA.
              </Callout>
              <Callout variant="warning" title="Deadline">
                JUPAS main round applications close in late April. Check your target programme cut-offs before applying.
              </Callout>
              <Callout variant="note">
                Marking schemes for 2023 are now available. Navigate to the subject page and toggle the MS tab.
              </Callout>
              <Callout ghost variant="tip" icon={<LuLightbulb size={20} />} title="Ghost Watermark — Tip">
                The icon is enlarged and ghosted on the left of the bubble — softer emphasis than a coloured chip.
              </Callout>
              <Callout ghost variant="warning" icon={<LuTriangleAlert size={20} />} title="Ghost Watermark — Warning">
                Same idea on a warning callout. The watermark inherits the variant accent colour.
              </Callout>
            </div>
          </div>

          <div className="r4-divider" />

          {/* ── 7. BADGES ── */}
          <div className="r4-section">
            <div className="r4-section-tag">Tier 3</div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="r4-heading-lg">Badges</h2>
              <Badge variant="secondary">A/B/C variants</Badge>
            </div>
            <Card>
              <CardContent className="pt-6 space-y-5">
                <div>
                  <div className="r4-tc-label" style={{ marginBottom: '0.5rem' }}>A · Sharp — default</div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>
                <div>
                  <div className="r4-tc-label" style={{ marginBottom: '0.5rem' }}>B · Square (zero radius)</div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Badge variant="default" shape="square">Default</Badge>
                    <Badge variant="secondary" shape="square">Secondary</Badge>
                    <Badge variant="outline" shape="square">Outline</Badge>
                    <Badge variant="destructive" shape="square">Destructive</Badge>
                  </div>
                </div>
                <div>
                  <div className="r4-tc-label" style={{ marginBottom: '0.5rem' }}>C · With status dot</div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Badge variant="default" dot>Available</Badge>
                    <Badge variant="secondary" dot>Reviewing</Badge>
                    <Badge variant="outline" dot>Pending</Badge>
                    <Badge variant="destructive" dot>Offline</Badge>
                  </div>
                </div>
                <div className="pt-1" lang="zh-Hant">
                  <div className="r4-tc-label" style={{ marginBottom: '0.5rem' }}>繁體中文</div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Badge variant="default" dot>可用</Badge>
                    <Badge variant="secondary">次要</Badge>
                    <Badge variant="outline">待確認</Badge>
                    <Badge variant="destructive" dot>不可用</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="r4-divider" />

          {/* ── 8. CHIPS ── */}
          <div className="r4-section">
            <div className="r4-section-tag">Tier 3</div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="r4-heading-lg">Chip</h2>
              <Badge variant="secondary">Filter tags</Badge>
            </div>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <div className="r4-heading-sm mb-3">Variants</div>
                  <div className="flex flex-wrap gap-2">
                    <Chip variant="default">Mathematics</Chip>
                    <Chip variant="active">English</Chip>
                    <Chip variant="outline">Chemistry</Chip>
                    <Chip variant="default">Economics</Chip>
                    <Chip variant="active">Biology</Chip>
                  </div>
                </div>
                <div>
                  <div className="r4-heading-sm mb-3">Removable — split pill with divider</div>
                  <div className="flex flex-wrap gap-2">
                    <Chip variant="active" onRemove={() => {}}>Mathematics</Chip>
                    <Chip variant="active" onRemove={() => {}}>2024</Chip>
                    <Chip variant="active" onRemove={() => {}}>Paper 1</Chip>
                    <Chip variant="default" onRemove={() => {}}>Economics</Chip>
                  </div>
                </div>
                <div className="pt-1" lang="zh-Hant">
                  <div className="r4-tc-label">繁體中文</div>
                  <div className="flex flex-wrap gap-2">
                    <Chip variant="active" onRemove={() => {}}>數學</Chip>
                    <Chip variant="active" onRemove={() => {}}>2024年</Chip>
                    <Chip variant="default">化學</Chip>
                    <Chip variant="outline">經濟</Chip>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="r4-divider" />

          {/* ── 9. OVERLAYS ── */}
          <div className="r4-section">
            <div className="r4-section-tag">Tier 4</div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="r4-heading-lg">Overlays</h2>
              <Badge variant="secondary">Dialog · Toast · Dropdown · Popover</Badge>
            </div>

            {/* Dialog */}
            <div className="r4-heading-sm mb-3">Dialog / Modal</div>
            <p className="r4-body-sm mb-3">Mobile-first: slides up from bottom on small screens, centered on tablet+. Tap the backdrop to close.</p>
            <div className="r4-grid r4-grid-2 mb-6">
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <div className="r4-body-sm font-medium text-[var(--color-heading)]">Info Dialog</div>
                  <p className="r4-body-sm">Confirm download, show details. Neutral action pair.</p>
                  <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)}><LuDownload size={13}/> Open Dialog</Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <div className="r4-body-sm font-medium text-[var(--color-heading)]">Destructive Confirm</div>
                  <p className="r4-body-sm">Delete / irreversible action. Red CTA, cancel first.</p>
                  <Button variant="destructive" size="sm" onClick={() => setDeleteDialogOpen(true)}><LuTrash2 size={13}/> Delete Dialog</Button>
                </CardContent>
              </Card>
            </div>

            {/* Toast */}
            <div className="r4-heading-sm mb-3">Toast / Notification</div>
            <p className="r4-body-sm mb-3">Fixed bottom of screen. Mobile-first, full-width on small screens, 384px on tablet+. Auto-dismisses after 3.5s.</p>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="r4-body-sm font-medium text-[var(--color-heading)] mb-2">Static previews</div>
                <Toast variant="success" title="Download complete" description="maths-2024-paper1.pdf saved successfully." />
                <Toast variant="error" title="Download failed" description="Check your connection and try again." action={{ label: 'Retry', onClick: () => {} }} />
                <Toast variant="warning" title="Subscription expires soon" description="Renew within 3 days to keep access." onClose={() => {}} />
                <Toast variant="default" title="Paper updated" description="2023 marking scheme is now available." onClose={() => {}} />
                <Separator />
                <div className="r4-body-sm font-medium text-[var(--color-heading)] mb-1">Live demo — triggers a real toast at screen bottom</div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => setToastType('success')}><LuCircleCheck size={13}/> Success</Button>
                  <Button variant="outline" size="sm" onClick={() => setToastType('error')}><LuCircleX size={13}/> Error</Button>
                  <Button variant="outline" size="sm" onClick={() => setToastType('warning')}><LuTriangleAlert size={13}/> Warning</Button>
                  <Button variant="outline" size="sm" onClick={() => setToastType('default')}><LuInfo size={13}/> Info</Button>
                </div>
              </CardContent>
            </Card>

            {/* Dropdown */}
            <div className="r4-heading-sm mt-6 mb-3">Dropdown Menu</div>
            <div className="r4-grid r4-grid-2 mb-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="r4-body-sm mb-3">Actions menu — common CRUD pattern.</div>
                  <div className="relative inline-block">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDropdownOpen(v => !v)}
                    >
                      Actions <LuChevronDown size={13}/>
                    </Button>
                    <DropdownMenu
                      open={dropdownOpen}
                      align="left"
                      items={[
                        { label: 'Edit', icon: <LuPencil size={14}/>, onClick: () => setDropdownOpen(false), shortcut: '⌘E' },
                        { label: 'Duplicate', icon: <LuCopy size={14}/>, onClick: () => setDropdownOpen(false) },
                        { label: 'Share link', icon: <LuLink size={14}/>, onClick: () => setDropdownOpen(false) },
                        { separator: true },
                        { label: 'Delete', icon: <LuTrash2 size={14}/>, onClick: () => setDropdownOpen(false), variant: 'destructive', shortcut: '⌫' },
                      ]}
                    />
                  </div>
                  {dropdownOpen && (
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDropdownOpen(false)}
                    />
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="r4-body-sm mb-3">Context / right-click menu — static preview.</div>
                  <div className="r4-ctx-menu">
                    <div className="r4-ctx-item"><LuPencil size={13}/> Edit</div>
                    <div className="r4-ctx-item"><LuCopy size={13}/> Duplicate</div>
                    <div className="r4-ctx-item"><LuShare2 size={13}/> Share</div>
                    <div className="r4-ctx-sep" />
                    <div className="r4-ctx-item danger"><LuTrash2 size={13}/> Delete</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Popover */}
            <div className="r4-heading-sm mt-2 mb-3">Popover / Tooltip</div>
            <Card>
              <CardContent className="pt-6">
                <div className="r4-body-sm mb-4">Lightweight info bubble — no backdrop, dismisses on blur/click away.</div>
                <div className="flex flex-wrap gap-8 items-end">
                  <div>
                    <div className="r4-popover-demo">
                      <span className="font-semibold" style={{ color: 'var(--color-heading)' }}>5** Grade</span><br/>
                      Top 1.3% of candidates. Distinction across all sub-papers.
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">Hover trigger</Button>
                  </div>
                  <div>
                    <div className="r4-popover-demo" style={{ background: '#8b5cf6', borderColor: '#7c3aed', color: '#fff', maxWidth: 200 }}>
                      <span className="font-semibold">Pro feature</span><br/>
                      Upgrade to access full marking schemes.
                    </div>
                    <Button variant="default" size="sm" className="mt-2">Upgrade prompt</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="r4-divider" />

          {/* ── 10. CARDS ── */}
          <div className="r4-section">
            <div className="r4-section-tag">Tier 5</div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="r4-heading-lg">Cards</h2>
              <Badge variant="secondary">3 layouts</Badge>
            </div>
            <div className="r4-grid r4-grid-3">
              <Card>
                <CardHeader>
                  <CardTitle>Simple Card</CardTitle>
                  <CardDescription>A card with just header text.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="r4-body">Cards are containers for related content. No footer on this one.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Card with Footer</CardTitle>
                  <CardDescription>Includes a footer action row.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="r4-body">Footer is used for primary actions or metadata belonging to the card.</p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button variant="outline" size="sm">Cancel</Button>
                  <Button variant="default" size="sm">Save</Button>
                </CardFooter>
              </Card>
             <IconCard
                variant="blob"
                icon={<LuFileText size={20} strokeWidth={2.5} />}
                title="Icon Card"
                description="Header with an icon accent."
                content={<p className="r4-body">Icon inline with the title provides visual categorisation without background noise.</p>}
                footer={<Button variant="outline" size="sm">View details <LuChevronRight size={13}/></Button>}
              />
            </div>
          </div>

          <div className="r4-divider" />

          {/* ── 11. CONFIGURATION ── */}
          <div className="r4-section">
            <div className="r4-section-tag">Tier 5</div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="r4-heading-lg">Configuration</h2>
              <Badge variant="secondary">Settings pattern</Badge>
            </div>
            <p className="r4-body-sm mb-4">Apple Settings-inspired grouped rows. Dividers between items, section labels above. Works standalone — no Card wrapper needed.</p>
            <div className="r4-grid r4-grid-2">
              <div className="space-y-4">
                <ConfigSection title="Account">
                  <ConfigItem
                    label="Profile"
                    description="Name, photo, school"
                    icon={<LuUser size={14}/>}
                    control={<LuChevronRight size={14} className="opacity-40"/>}
                  />
                  <ConfigItem
                    label="Notifications"
                    description="Email and push alerts"
                    icon={<LuBell size={14}/>}
                    control={<Switch checked={configNotifs} onCheckedChange={setConfigNotifs} />}
                  />
                  <ConfigItem
                    label="Security"
                    description="Password and 2FA"
                    icon={<LuShield size={14}/>}
                    control={<LuChevronRight size={14} className="opacity-40"/>}
                  />
                </ConfigSection>
                <ConfigSection title="Appearance" footer="Changing theme affects all sessions on this device.">
                  <ConfigItem
                    label="Dark Mode"
                    description="Switch to dark colour scheme"
                    icon={<LuSettings size={14}/>}
                    control={<Switch checked={configDark} onCheckedChange={setConfigDark} />}
                  />
                </ConfigSection>
              </div>
              <div className="space-y-4">
                <ConfigSection title="Danger Zone">
                  <ConfigItem
                    label="Delete Account"
                    description="Permanently remove all data"
                    icon={<LuTrash2 size={14}/>}
                    control={<Button variant="destructive" size="sm">Delete</Button>}
                    destructive
                  />
                  <ConfigItem
                    label="Sign Out"
                    icon={<LuLogOut size={14}/>}
                    control={<Button variant="outline" size="sm">Sign out</Button>}
                  />
                </ConfigSection>
                <div lang="zh-Hant">
                  <ConfigSection title="帳戶設定">
                    <ConfigItem label="個人資料" description="姓名、相片、學校" icon={<LuUser size={14}/>} control={<LuChevronRight size={14} className="opacity-40"/>}/>
                    <ConfigItem label="通知設定" description="電郵及推送通知" icon={<LuBell size={14}/>} control={<Switch checked />}/>
                    <ConfigItem label="登出帳戶" icon={<LuLogOut size={14}/>} control={<Button variant="outline" size="sm">登出</Button>}/>
                  </ConfigSection>
                </div>
              </div>
            </div>
          </div>

          <div className="r4-divider" />

          {/* ── 12. TABLE ── */}
          <div className="r4-section">
            <div className="r4-section-tag">Tier 5</div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="r4-heading-lg">Table</h2>
              <Badge variant="secondary">2 styles</Badge>
            </div>
            <div className="r4-heading-sm mb-2">Default — theme-aware, zebra striping</div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Paper</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell className="font-medium">Mathematics</TableCell><TableCell>Paper 1</TableCell><TableCell>2024</TableCell><TableCell>12,450</TableCell><TableCell><Badge variant="default">Available</Badge></TableCell><TableCell className="text-right"><Button variant="default" size="sm"><LuDownload size={12}/> Download</Button></TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Chinese Language</TableCell><TableCell>Paper 1</TableCell><TableCell>2024</TableCell><TableCell>9,870</TableCell><TableCell><Badge variant="default">Available</Badge></TableCell><TableCell className="text-right"><Button variant="default" size="sm"><LuDownload size={12}/> Download</Button></TableCell></TableRow>
                <TableRow><TableCell className="font-medium">English Language</TableCell><TableCell>Paper 1</TableCell><TableCell>2024</TableCell><TableCell>8,940</TableCell><TableCell><Badge variant="outline">Pending</Badge></TableCell><TableCell className="text-right"><span className="r4-body-sm">Pending</span></TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Economics</TableCell><TableCell>Paper 1</TableCell><TableCell>2024</TableCell><TableCell>3,890</TableCell><TableCell><Badge variant="destructive">Unavailable</Badge></TableCell><TableCell className="text-right"><span className="r4-body-sm">—</span></TableCell></TableRow>
              </TableBody>
            </Table>

            <div className="r4-tc-label mt-5">繁體中文 Traditional Chinese</div>
            <Table lang="zh-Hant">
              <TableHeader>
                <TableRow>
                  <TableHead>科目</TableHead>
                  <TableHead>試卷</TableHead>
                  <TableHead>年份</TableHead>
                  <TableHead>下載次數</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell className="font-medium">數學</TableCell><TableCell>卷一</TableCell><TableCell>2024</TableCell><TableCell>12,450</TableCell><TableCell><Badge variant="default">可用</Badge></TableCell><TableCell className="text-right"><Button variant="default" size="sm"><LuDownload size={12}/> 下載</Button></TableCell></TableRow>
                <TableRow><TableCell className="font-medium">中國語文</TableCell><TableCell>卷一</TableCell><TableCell>2024</TableCell><TableCell>9,870</TableCell><TableCell><Badge variant="default">可用</Badge></TableCell><TableCell className="text-right"><Button variant="default" size="sm"><LuDownload size={12}/> 下載</Button></TableCell></TableRow>
                <TableRow><TableCell className="font-medium">英國語文</TableCell><TableCell>卷一</TableCell><TableCell>2024</TableCell><TableCell>8,940</TableCell><TableCell><Badge variant="outline">待確認</Badge></TableCell><TableCell className="text-right"><span className="r4-body-sm">待處理</span></TableCell></TableRow>
                <TableRow><TableCell className="font-medium">經濟</TableCell><TableCell>卷一</TableCell><TableCell>2024</TableCell><TableCell>3,890</TableCell><TableCell><Badge variant="destructive">不可用</Badge></TableCell><TableCell className="text-right"><span className="r4-body-sm">—</span></TableCell></TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="r4-divider" />

          {/* ── 13. AVATAR ── */}
          <div className="r4-section">
            <div className="r4-section-tag">Tier 5</div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="r4-heading-lg">Avatar</h2>
              <Badge variant="secondary">Fallback initials</Badge>
            </div>
            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="flex flex-wrap gap-3 items-center">
                  <Avatar fallback="JD" /><Avatar fallback="AL" /><Avatar fallback="MK" /><Avatar fallback="+8" />
                  <span className="r4-body-sm ml-2">— Initials when no image is available.</span>
                </div>
                <div className="pt-1" lang="zh-Hant">
                  <div className="r4-tc-label">繁體中文</div>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Avatar fallback="陳" /><Avatar fallback="李" /><Avatar fallback="黃" /><Avatar fallback="+5" />
                    <span className="r4-body-sm ml-2">— 沒有頭像時顯示姓名首字。</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="r4-divider" />

          {/* ── 14. ACCORDION ── */}
          <div className="r4-section">
            <div className="r4-section-tag">Tier 5</div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="r4-heading-lg">Accordion</h2>
              <Badge variant="secondary">Collapsible</Badge>
            </div>
            <Accordion>
              <AccordionItem title="What papers are available?">
                We currently host papers from 2012 to 2024 for all core subjects and most electives. Updated annually after the DSE examination period.
              </AccordionItem>
              <AccordionItem title="How do I download?">
                Click the download button next to any paper. Some papers may require a subscription. All downloads are in PDF format.
              </AccordionItem>
              <AccordionItem title="Are the papers copyrighted?">
                Past papers are reproduced under fair use for educational purposes. HKDSE papers are the property of the HKEAA.
              </AccordionItem>
            </Accordion>
          </div>

          <div className="r4-divider" />

          {/* ── 15. PROGRESS ── */}
          <div className="r4-section">
            <div className="r4-section-tag">Tier 5</div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="r4-heading-lg">Progress</h2>
              <Badge variant="secondary">Bar indicator</Badge>
            </div>
            <div className="r4-grid r4-grid-2">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div><div className="flex justify-between mb-1.5"><span className="r4-body-sm font-medium">Mathematics — 5**</span><span className="r4-body-sm">78%</span></div><Progress value={78} /></div>
                  <div><div className="flex justify-between mb-1.5"><span className="r4-body-sm font-medium">English — 5*</span><span className="r4-body-sm">62%</span></div><Progress value={62} barClassName="bg-amber-500" /></div>
                  <div><div className="flex justify-between mb-1.5"><span className="r4-body-sm font-medium">Chinese — 4</span><span className="r4-body-sm">45%</span></div><Progress value={45} barClassName="bg-green-500" /></div>
                </CardContent>
              </Card>
              <Card lang="zh-Hant">
                <CardContent className="pt-6 space-y-4">
                  <div className="r4-tc-label">繁體中文</div>
                  <div><div className="flex justify-between mb-1.5"><span className="r4-body-sm font-medium">數學 — 5**</span><span className="r4-body-sm">78%</span></div><Progress value={78} /></div>
                  <div><div className="flex justify-between mb-1.5"><span className="r4-body-sm font-medium">英文 — 5*</span><span className="r4-body-sm">62%</span></div><Progress value={62} barClassName="bg-amber-500" /></div>
                  <div><div className="flex justify-between mb-1.5"><span className="r4-body-sm font-medium">中文 — 4</span><span className="r4-body-sm">45%</span></div><Progress value={45} barClassName="bg-green-500" /></div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="r4-divider" />

          {/* ── 16. SKELETON ── */}
          <div className="r4-section">
            <div className="r4-section-tag">Tier 6</div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="r4-heading-lg">Skeleton</h2>
              <Badge variant="secondary">Loading state</Badge>
            </div>
            <div className="r4-grid r4-grid-2">
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" style={sk} />
                    <div className="space-y-1.5 flex-1">
                      <Skeleton className="h-3 w-1/3" style={sk} />
                      <Skeleton className="h-3 w-1/2" style={sk} />
                    </div>
                  </div>
                  <Skeleton className="h-20 w-full" style={sk} />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20" style={sk} />
                    <Skeleton className="h-8 w-20" style={sk} />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <Skeleton className="h-4 w-2/3" style={sk} />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-full" style={sk} />
                    <Skeleton className="h-3 w-5/6" style={sk} />
                    <Skeleton className="h-3 w-4/6" style={sk} />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Skeleton className="h-7 w-16 rounded-full" style={sk} />
                    <Skeleton className="h-7 w-16 rounded-full" style={sk} />
                    <Skeleton className="h-7 w-16 rounded-full" style={sk} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="r4-divider" />

          {/* ── 17. CHINESE TEXT RENDERING ── */}
          <div className="r4-section">
            <div className="r4-section-tag">Tier 7</div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="r4-heading-lg">Chinese Text Rendering</h2>
              <Badge variant="outline">iPad / Retina</Badge>
            </div>
            <p className="r4-body-sm mb-4">Side-by-side comparison. Most visible on Apple Retina displays. Right card applies <span className="r4-mono">-webkit-font-smoothing: antialiased</span> + <span className="r4-mono">text-rendering: optimizeLegibility</span>.</p>
            <div className="r4-grid r4-grid-2" lang="zh-Hant">
              <Card>
                <CardContent className="pt-6">
                  <div className="r4-heading-sm mb-3">預設渲染 — Default</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, lineHeight: 1.4, color: 'var(--color-heading)', marginBottom: '0.75rem' }}>香港文憑試數學科</div>
                  <div style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--color-body)', marginBottom: '0.5rem' }}>必修部分第一卷考核考生對基礎代數的理解，包括二次方程、指數函數及對數函數。</div>
                  <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--color-muted)' }}>正弦定理、餘弦定理及其在三角學中的應用屬必考範圍。</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="r4-heading-sm mb-3">優化渲染 — Optimised <Badge variant="default" className="ml-1 text-[10px]">推薦</Badge></div>
                  <div className="tc-sharp" style={{ fontSize: '18px', fontWeight: 700, lineHeight: 1.4, color: 'var(--color-heading)', marginBottom: '0.75rem' }}>香港文憑試數學科</div>
                  <div className="tc-sharp" style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--color-body)', marginBottom: '0.5rem' }}>必修部分第一卷考核考生對基礎代數的理解，包括二次方程、指數函數及對數函數。</div>
                  <div className="tc-sharp" style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--color-muted)' }}>正弦定理、餘弦定理及其在三角學中的應用屬必考範圍。</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="r4-divider" />

          {/* ── 18. FILE CARD ── */}
          <div className="r4-section">
            <div className="r4-section-tag">Tier 8</div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="r4-heading-lg">File Card</h2>
              <Badge variant="secondary">Paper downloads</Badge>
            </div>
            <p className="r4-body-sm mb-3">Default icon: <span className="r4-mono">stacked</span>. Other variants via <span className="r4-mono">iconVariant=&quot;doc&quot; | &quot;ribbon&quot;</span>.</p>
            <div className="space-y-2.5 mb-4">
              <FileCard subject="Mathematics" paper="Paper 1" year={2024} size="2.4 MB" status="available" />
              <FileCard subject="English Language" paper="Paper 1" year={2024} size="3.1 MB" status="available" />
              <FileCard subject="Chinese Language" paper="Paper 2" year={2024} size="1.8 MB" status="pending" />
              <FileCard subject="Economics" paper="Paper 1" year={2024} size="1.2 MB" status="locked" />
            </div>
            <div className="r4-tc-label mt-3">繁體中文 Traditional Chinese</div>
            <div className="space-y-2.5" lang="zh-Hant">
              <FileCard subject="數學" paper="卷一" year={2024} size="2.4 MB" status="available" />
              <FileCard subject="中國語文" paper="卷二" year={2024} size="1.8 MB" status="available" />
              <FileCard subject="英國語文" paper="卷一" year={2024} status="pending" />
              <FileCard subject="經濟" paper="卷一" year={2024} status="locked" />
            </div>
          </div>

          <div className="r4-divider" />

          {/* ── 19. EMPTY STATE ── */}
          <div className="r4-section">
            <div className="r4-section-tag">Tier 8</div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="r4-heading-lg">Empty State</h2>
              <Badge variant="secondary">No results</Badge>
            </div>
            <div className="r4-grid r4-grid-3">
              <Card>
                <EmptyState
                  iconVariant="ring"
                  icon={<LuFileSearch size={22} />}
                  title="A · Dashed Ring"
                  description="Bare icon inside a dashed circle outline."
                  action={<Button variant="outline" size="sm">Clear filters</Button>}
                />
              </Card>
              <Card>
                <EmptyState
                  iconVariant="bare"
                  icon={<LuFileSearch size={28} />}
                  title="B · Bare + underline"
                  description="No frame. Icon at 50% opacity over a small underline."
                  action={<Button variant="outline" size="sm">Clear filters</Button>}
                />
              </Card>
              <Card lang="zh-Hant">
                <EmptyState
                  iconVariant="ring"
                  icon={<LuGraduationCap size={22} />}
                  title="未找到試題"
                  description="請嘗試調整篩選條件或搜尋關鍵詞。"
                  action={<Button variant="outline" size="sm">清除篩選</Button>}
                />
              </Card>
            </div>
          </div>

          <div className="r4-divider" />

          {/* ── 20. CODE BLOCK ── */}
          <div className="r4-section">
            <div className="r4-section-tag">Tier 8</div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="r4-heading-lg">Code Block</h2>
              <Badge variant="secondary">Syntax · Copy · Scroll</Badge>
            </div>
            <p className="r4-body-sm mb-5">Click icon to copy. Three variants — pick one per context.</p>

            <div className="r4-heading-sm mb-2">Short snippet</div>
            <CodeBlock
              language="tsx"
              filename="components/Flashcard.tsx"
              code={`import { useState } from 'react'

export function Flashcard({ front, back }: { front: string; back: string }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      onClick={() => setFlipped(f => !f)}
      className="flashcard rounded-xl"
    >
      {flipped ? back : front}
    </button>
  )
}`}
              className="mb-6"
            />

            <div className="r4-heading-sm mb-2">Long snippet — horizontal scroll test</div>
            <CodeBlock
              language="typescript"
              filename="lib/dse-calculator.ts"
              code={`import type { Subject, DSEGrade, JUPASProgram } from './types'

const GRADE_POINTS: Record<DSEGrade, number> = {
  '5**': 7, '5*': 6, '5': 5, '4': 4, '3': 3, '2': 2, '1': 1, 'U': 0,
}

export function gradeToPoints(grade: DSEGrade): number {
  return GRADE_POINTS[grade] ?? 0
}

export function calcBestOf(grades: { subject: Subject; grade: DSEGrade }[], pick: number): number {
  return grades
    .map(g => gradeToPoints(g.grade))
    .sort((a, b) => b - a)
    .slice(0, pick)
    .reduce((acc, v) => acc + v, 0)
}

export function meetsCutoff(
  applicantGrades: { subject: Subject; grade: DSEGrade }[],
  program: JUPASProgram,
): boolean {
  // Check every mandatory subject requirement against applicant grades
  for (const req of program.requirements.mandatory) {
    const match = applicantGrades.find(g => g.subject === req.subject)
    if (!match || gradeToPoints(match.grade) < gradeToPoints(req.minimumGrade)) {
      return false // mandatory subject not met — applicant ineligible for this program
    }
  }

  // Calculate elective score using best-of rule
  const electiveScore = calcBestOf(
    applicantGrades.filter(g => program.requirements.electives.subjects.includes(g.subject)),
    program.requirements.electives.pick,
  )

  return electiveScore >= program.requirements.electives.minimumTotal
}

export function rankPrograms(
  grades: { subject: Subject; grade: DSEGrade }[],
  programs: JUPASProgram[],
): JUPASProgram[] {
  return programs
    .filter(p => meetsCutoff(grades, p))
    .sort((a, b) => b.lastYearCutoff - a.lastYearCutoff)
}`}
            />
          </div>

        </div>
      </div>
    </>
  )
}
