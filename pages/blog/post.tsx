import { useState } from 'react'
import PageSEO from '../../components/PageSEO'
import NavigationLink from '../../components/NavigationLink'
import { Badge } from '../../components/ui/Badge'
import { Skeleton } from '../../components/ui/Skeleton'
import {
  LuShare2, LuCalendar, LuClock, LuEye,
  LuInstagram, LuGlobe,
} from 'react-icons/lu'
import { BiCalendar } from 'react-icons/bi'

// ── Dummy data ────────────────────────────────────────────────────────────────
const POST = {
  category: { title: '學習指南' },
  tags: ['化學', 'DSE 2025', '備考攻略'],
  title: '2025 DSE 化學科備考攻略：必考知識點全面整理',
  publishedAt: '2025年4月28日',
  readingTime: 8,
  views: 12547,
  heroImage: 'https://picsum.photos/seed/chem_hero_2025/1200/525',
  author: {
    displayName: '陳俊傑',
    tagline: '化學科 5**，香港大學理學院一年級',
    avatar: 'https://picsum.photos/seed/author_chan_jj/200/200',
    bio: '前任補習社導師，專注 DSE 化學及生物備考。曾協助超過 200 名學生考獲 5* 或以上成績。目前於香港大學理學院主修化學，同時於 dse.best 擔任學術編輯。',
    authorType: 'team' as const,
    socialLinks: [
      { platform: 'instagram' as const, handle: 'chanck_chem', url: 'https://instagram.com/chanck_chem' },
      { platform: 'website' as const, handle: null, url: 'https://dse.best' },
    ],
  },
  relatedPosts: [
    {
      title: 'DSE 物理科必背公式大全（2025 最新版）',
      category: '學習指南',
      image: 'https://picsum.photos/seed/physics_dse_25/600/338',
      href: '/physics',
      readingTime: 6,
      views: 8342,
      author: { displayName: '王思力', avatar: 'https://picsum.photos/seed/author_wang_sl/200/200' },
      excerpt: '掌握 DSE 物理科必背公式，涵蓋力學、熱力學、波動等核心單元，助你快速復習。',
      date: '28/04/25',
    },
    {
      title: '2025 生物科 MC 解題技巧：高分必讀',
      category: '考試技巧',
      image: 'https://picsum.photos/seed/biology_mc_25/600/338',
      href: '/biology',
      readingTime: 5,
      views: 5671,
      author: { displayName: '李明軒', avatar: 'https://picsum.photos/seed/author_li_mx/200/200' },
      excerpt: '生物科 MC 考試不靠死記，掌握關鍵詞、排除法技巧，輕鬆拿高分。',
      date: '22/04/25',
    },
    {
      title: '有機化學反應速記圖表（免費下載）',
      category: '筆記資源',
      image: 'https://picsum.photos/seed/organic_chart_25/600/338',
      href: '/chemistry',
      readingTime: 4,
      views: 11203,
      author: { displayName: '陳俊傑', avatar: 'https://picsum.photos/seed/author_chan_jj/200/200' },
      excerpt: '有機化學反應一覽表，高效歸納烷烴、烯烴、官能基反應，備考必備。',
      date: '18/04/25',
    },
  ],
}

export default function BlogPost() {
  const [copied, setCopied] = useState(false)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [figureLoaded, setFigureLoaded] = useState(false)
  const [relatedLoaded, setRelatedLoaded] = useState<boolean[]>(() => POST.relatedPosts.map(() => false))

  function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  return (
    <>
      <PageSEO
        title={POST.title}
        description="2025 DSE 化學科全面備考攻略，涵蓋必考有機化學、無機化學重點及 MC 考試技巧，助你衝上 5**。"
      />

      <div className="blog-post-wrap">

        {/* ── Category + Tags + Share ── */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <Badge variant="default" className="text-[0.8rem] font-medium">
            {POST.category.title}
          </Badge>
          {POST.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-[0.8rem] font-medium">
              {tag}
            </Badge>
          ))}
          <button
            className={`blog-share-btn ml-auto${copied ? ' blog-share-btn--success' : ''}`}
            onClick={handleShare}
            aria-label="分享文章"
          >
            <LuShare2 size={14} />
            <span className="blog-share-text">分享</span>
          </button>
        </div>

        {/* ── Post Title ── */}
        <h1 className="blog-post-title">{POST.title}</h1>

        {/* ── Author mini + post stats ── */}
        <div className="blog-author-mini">
          <img
            src={POST.author.avatar}
            alt={POST.author.displayName}
            className="blog-avatar-sm"
            width={40}
            height={40}
          />
          <div>
            <div className="blog-author-name">{POST.author.displayName}</div>
            <div className="blog-author-tagline">{POST.author.tagline}</div>
          </div>
          <div className="blog-post-meta">
            <div className="flex items-center gap-0.5 whitespace-nowrap">
              <LuCalendar size={13} />
              <span>{POST.publishedAt}</span>
            </div>
            <span className="blog-meta-sep">·</span>
            <div className="flex items-center gap-0.5 whitespace-nowrap">
              <LuClock size={13} />
              <span>{POST.readingTime}min</span>
            </div>
            <span className="blog-meta-sep">·</span>
            <div className="flex items-center gap-0.5 whitespace-nowrap">
              <LuEye size={13} />
              <span>{POST.views.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* ── Hero Image ── */}
        <div className="blog-hero-wrap">
          {!heroLoaded && (
            <Skeleton className="absolute inset-0 rounded-none w-full h-full" />
          )}
          <img
            src={POST.heroImage}
            alt={POST.title}
            className={`blog-hero-image${heroLoaded ? '' : ' blog-img-hidden'}`}
            width={1200}
            height={525}
            onLoad={() => setHeroLoaded(true)}
          />
        </div>

        {/* ── Rich text body ── */}
        <div className="blog-prose">

          <p>
            距離 2025 年 DSE 正式開考只剩下數個星期，相信不少同學都感到壓力山大。
            化學科一向被視為理科中較難拿高分的科目，但只要掌握正確的備考方法，
            取得 <strong>5* 甚至 5**</strong> 並非遙不可及。本文將為大家整理
            <em>最高頻考點</em>及實用技巧，助你在最後衝刺階段事半功倍。
          </p>

          <h2>化學科考試結構概覽</h2>

          <p>
            首先讓我們快速溫習 DSE 化學科的考試結構，確保備考方向正確：
          </p>

          <div className="blog-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>試卷</th>
                  <th>題型</th>
                  <th>分數比重</th>
                  <th>考試時間</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Paper 1A</td>
                  <td>多項選擇題（36 題）</td>
                  <td>36%</td>
                  <td>1 小時</td>
                </tr>
                <tr>
                  <td>Paper 1B</td>
                  <td>結構題</td>
                  <td>41%</td>
                  <td>1.5 小時</td>
                </tr>
                <tr>
                  <td>Paper 2</td>
                  <td>實驗題 / 甲部選答</td>
                  <td>23%</td>
                  <td>1 小時</td>
                </tr>
              </tbody>
            </table>
          </div>

          <blockquote>
            「化學唔係靠死記，係要理解背後嘅邏輯。每一個反應機制都有佢的道理，明白咗，自然唔需要死背。」
          </blockquote>

          <h2>必考概念：有機化學篇</h2>

          <p>
            有機化學佔 DSE 化學科考試相當大的比重，尤其是 Paper 1A（MC）及 Paper 1B 的後半部分。
            以下是同學最常失分的知識點：
          </p>

          <h3>烴類及官能基</h3>

          <ul>
            <li>
              <strong>烷烴（Alkanes）</strong>：通式 C<sub>n</sub>H<sub>2n+2</sub>，
              主要反應為取代反應，需光照或高溫
            </li>
            <li>
              <strong>烯烴（Alkenes）</strong>：含碳碳雙鍵，發生加成反應，
              可用溴水（<em>橙色變無色</em>）測試不飽和程度
            </li>
            <li>
              <strong>醇類（Alcohols）</strong>：含 <code>-OH</code> 基，
              分伯醇（primary）、仲醇（secondary）、叔醇（tertiary）
            </li>
            <li>
              <strong>羧酸（Carboxylic Acids）</strong>：含 <code>-COOH</code>，
              具弱酸性，可與醇類發生酯化反應
            </li>
            <li>
              <strong>酯類（Esters）</strong>：由酸和醇縮合而成，
              常見於香料及油脂，水解可逆
            </li>
            <li>
              <strong>醛及酮（Aldehydes &amp; Ketones）</strong>：含羰基 <code>C=O</code>，
              醛可被氧化，酮不能；可用 Fehling 試劑或 Tollens 試劑區分
            </li>
          </ul>

          <h3>有機反應速記</h3>

          <p>
            記住以下反應類型，對應題目時可迅速識別考點：
          </p>

          <pre><code>{`加成反應 (Addition):
  烯烴 + X₂        → 二鹵化物
  烯烴 + HX        → 鹵代烷  (Markovnikov 規則)
  烯烴 + H₂O (H⁺)  → 醇

取代反應 (Substitution):
  烷烴 + Cl₂  (hν)  → 鹵代烷 + HCl (自由基機制)
  芳烴 + HNO₃ (H₂SO₄) → 硝基苯 + H₂O

消去反應 (Elimination):
  鹵代烷 + KOH (醇溶液)  → 烯烴 + KX + H₂O

酯化反應 (Esterification):
  羧酸 + 醇  ⇌  酯 + 水  (可逆，需濃 H₂SO₄ 催化)`}</code></pre>

          <figure>
            <div className="blog-figure-wrap">
              {!figureLoaded && (
                <Skeleton className="absolute inset-0 rounded-none w-full h-full" style={{ minHeight: 240 }} />
              )}
              <img
                src="https://picsum.photos/seed/organic_reaction_viz/900/480"
                alt="有機化學反應關係圖"
                className={figureLoaded ? undefined : 'blog-img-hidden'}
                width={900}
                height={480}
                onLoad={() => setFigureLoaded(true)}
              />
            </div>
            <figcaption>圖 1：DSE 有機化學主要反應類型總覽（示意圖，非真實化學結構）</figcaption>
          </figure>

          <h2>無機化學重點</h2>

          <p>
            無機化學部分同學往往覺得「好多嘢要背」，
            但其實只需抓住以下幾個核心概念便能以不變應萬變：
          </p>

          <ol>
            <li>
              <strong>酸鹼中和</strong>：掌握強酸強鹼反應及鹽的水解，
              判斷常見鹽溶液酸鹼性（如 Na₂CO₃ 呈鹼性、NH₄Cl 呈酸性）
            </li>
            <li>
              <strong>氧化還原</strong>：記憶「OIL RIG」口訣——
              <em>Oxidation Is Loss, Reduction Is Gain</em>（電子）；
              熟悉常見氧化劑與還原劑
            </li>
            <li>
              <strong>電化學</strong>：電解池 vs. 原電池，陽極氧化、陰極還原，
              以及水溶液和熔融物的電解差異
            </li>
            <li>
              <strong>化學計量</strong>：摩爾計算（mole calculation）是 Paper 1B
              必出題型，務必熟練濃度、體積、質量之間的換算
            </li>
            <li>
              <strong>氣體定律</strong>：理想氣體方程 <code>PV = nRT</code>，
              注意 T 須以 Kelvin 計算，以及標準狀況（STP）的定義
            </li>
          </ol>

          <hr />

          <h2>考試技巧分享</h2>

          <h3>多項選擇題（MC）攻略</h3>

          <p>
            Paper 1A 共 36 題，<strong>答錯不扣分</strong>，務必每題作答。
            以下是幾個實用策略：
          </p>

          <ul>
            <li>先快速掃一遍，先做熟悉題；遇到耗時計算題先跳過，最後回頭</li>
            <li>善用<em>排除法</em>——即使唔確定，通常可先排除 1–2 個明顯錯誤選項，再從餘下作判斷</li>
            <li>注意「<strong>除了以下哪項</strong>」的否定題型，容易粗心犯錯</li>
            <li>計算題善用估算，避免數量級明顯錯誤的答案</li>
            <li>最後 5 分鐘全部填滿，沒把握的猜 B 或 C（統計上較平均）</li>
          </ul>

          <h3>結構題（Paper 1B）書寫技巧</h3>

          <p>
            結構題考核表達，<strong>關鍵詞</strong>（key words）缺一不可：
          </p>

          <ul>
            <li>解釋現象要說「<em>為什麼</em>」，而非只描述「發生了什麼」</li>
            <li>
              化學方程式必須<strong>配平</strong>（balanced），
              並標明反應條件（光 hν、加熱 Δ、催化劑種類）
            </li>
            <li>
              用字精準：「沉澱」用 <em>precipitate</em>、
              「氣泡」用 <em>effervescence</em> 或 <em>bubbles of gas given off</em>
            </li>
            <li>
              實驗題留意安全事項，如「在通風櫥內進行」、
              「避免接觸皮膚」等，有時是給分點
            </li>
          </ul>

          <blockquote>
            備考最重要係<strong>做真題</strong>。由 2012 年至今的歷屆試題，
            建議每份最少做兩次——第一次限時模擬考試，第二次逐題分析錯漏。
            建立題感遠比單純死背重要。
          </blockquote>

          <h2>推薦備考資源</h2>

          <p>
            以下資源對備考大有幫助，同學可按需要參考：
          </p>

          <ul>
            <li>
              <a href="/chemistry">dse.best 化學科歷屆試題</a>
              ——提供由 2012 至 2024 年的 DSE 化學科試題及詳細解析，附 MC 答案統計
            </li>
            <li>
              <a href="/chat">dse.best AI 解題助手</a>
              ——隨時發問，即時獲得解題提示及概念解釋（Beta 功能，免費使用）
            </li>
          </ul>

          <h2>結語</h2>

          <p>
            化學科考試雖然範圍廣泛，但<strong>有規律可循</strong>。
            掌握核心概念、勤做真題、善用排除法，是取得高分的不二法門。
            最後衝刺階段切忌死記硬背，要<em>理解反應背後的原理</em>，
            才能以不變應萬變。
          </p>

          <p>
            祝各位同學在 2025 年 DSE 中旗開得勝，金榜題名！
            如有任何化學科問題，歡迎使用我們的{' '}
            <a href="/chat">AI 解題助手</a>提問，或在評論區留言。加油！
          </p>

        </div>

        {/* ── End-of-post Author Card ── */}
        <div className="blog-author-card-wrap">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:items-start">
            <img
              src={POST.author.avatar}
              alt={POST.author.displayName}
              className="blog-author-avatar flex-shrink-0"
              width={64}
              height={64}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="blog-author-card-name">{POST.author.displayName}</span>
              </div>
              <div className="blog-author-card-tagline mb-2">{POST.author.tagline}</div>
              <p className="blog-author-card-bio mb-3">{POST.author.bio}</p>
              <div className="flex items-center gap-2 flex-wrap">
                {POST.author.socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-social-link"
                  >
                    {/* Icon margin adjustment for text alignment */}
                    {link.platform === 'instagram' && <LuInstagram size={13} style={{ marginTop: '2px' }} />}
                    {link.platform === 'website' && <LuGlobe size={13} style={{ marginTop: '2px' }} />}
                    <span>
                      {link.platform === 'instagram'
                        ? `@${link.handle}`
                        : '個人網站'}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Related Posts ── */}
        <div className="blog-related-section">
          <h2 className="blog-related-title">相關文章</h2>
          <div className="blog-related-grid">
            {POST.relatedPosts.map((post, i) => (
              <NavigationLink
                key={post.href}
                href={post.href}
                className="blog-related-card"
              >
                <div className="blog-related-img-wrap">
                  {!relatedLoaded[i] && (
                    <Skeleton className="absolute inset-0 rounded-none w-full h-full" />
                  )}
                  <img
                    src={post.image}
                    alt={post.title}
                    className={`blog-related-img${relatedLoaded[i] ? '' : ' blog-img-hidden'}`}
                    width={600}
                    height={338}
                    onLoad={() => setRelatedLoaded(prev => prev.map((v, idx) => idx === i ? true : v))}
                  />
                </div>
                <div className="blog-related-body">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm border-transparent bg-[#549ee8] text-white text-[0.7rem] font-medium mb-1.5">
                    {post.category}
                  </div>
                  <div className="blog-related-card-title">{post.title}</div>
                  <div className="blog-related-excerpt">{post.excerpt}</div>
                  <div className="flex items-center gap-3.5 mt-2 text-xs text-[var(--color-muted)]">
                    <div className="flex items-center gap-1.5">
                      <BiCalendar size={12} style={{ marginTop: '2.2px' }} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <LuEye size={11} style={{ marginTop: '2.2px' }} />
                      <span>{post.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <LuClock size={11} style={{ marginTop: '2.2px' }} />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 pt-2 border-t border-[var(--color-border)] mt-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.displayName}
                      className="blog-related-author-avatar"
                      width={20}
                      height={20}
                    />
                    <span className="text-xs font-medium text-[var(--color-body)]">{post.author.displayName}</span>
                  </div>
                </div>
              </NavigationLink>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
