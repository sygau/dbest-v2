import React from 'react';
import { GetStaticProps } from 'next';
import configData from '../../public/12p/config.json';
import PageSEO from '../../components/PageSEO';
import { BiBookReader, BiPencil } from 'react-icons/bi';
import NavigationLink from '../../components/NavigationLink';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import { PassageConfig } from '../../types/12p';
import {
  generate12pStructuredData,
  generate12pFAQStructuredData,
  generate12pBreadcrumbStructuredData,
} from '../../utils/12pStructuredData';

interface HomeProps {
  config: PassageConfig;
}

// Moved outside component — never changes, no reason to recreate on each render
const PASSAGE_COLORS = [
  { bg: 'rgba(239, 68, 68, 0.08)',   border: '#ef4444', text: '#991b1b' },
  { bg: 'rgba(249, 115, 22, 0.08)',  border: '#f97316', text: '#9a3412' },
  { bg: 'rgba(234, 179, 8, 0.08)',   border: '#eab308', text: '#854d0e' },
  { bg: 'rgba(34, 197, 94, 0.08)',   border: '#22c55e', text: '#14532d' },
  { bg: 'rgba(20, 184, 166, 0.08)',  border: '#14b8a6', text: '#134e4a' },
  { bg: 'rgba(59, 130, 246, 0.08)',  border: '#3b82f6', text: '#1e3a8a' },
  { bg: 'rgba(99, 102, 241, 0.08)',  border: '#6366f1', text: '#312e81' },
  { bg: 'rgba(168, 85, 247, 0.08)',  border: '#a855f7', text: '#581c87' },
  { bg: 'rgba(236, 72, 153, 0.08)',  border: '#ec4899', text: '#831843' },
  { bg: 'rgba(244, 63, 94, 0.08)',   border: '#f43f5e', text: '#881337' },
  { bg: 'rgba(14, 165, 233, 0.08)',  border: '#0ea5e9', text: '#0c4a6e' },
  { bg: 'rgba(139, 92, 246, 0.08)',  border: '#8b5cf6', text: '#4c1d95' },
];

// Accurate, formal passage descriptions in Wikipedia/documentation style.
// Each entry: author info → text type → core argument → DSE exam relevance.
const PASSAGE_INFO: Record<string, { meta: string; summary: string }> = {
  lunyu: {
    meta: '孔子 (551–479 BCE)｜《論語》｜語錄體｜先秦儒家',
    summary:
      '《論仁》闡述仁德的內涵與實踐方法，指出仁者無論處困境或逸樂皆守仁，甚至「殺身成仁」。《論孝》論孝道之本質在於「無違」於禮，養父母需兼備敬意而非僅供養。《論君子》界定君子的品格標準：嚴於律己、言行一致、坦蕩無懼，並以對比手法區分君子與小人。考試常考跨篇章比較（如《岳陽樓記》）及論證手法（排比、對比、雙重否定）。',
  },
  yuwosuoyuye: {
    meta: '孟子 (372–289 BCE)｜《孟子·告子上》｜論說文｜先秦儒家',
    summary:
      '以「魚與熊掌不可兼得」為喻，論證當生命（生）與道義（義）不能並存時，應捨生取義。全篇貫穿性善說：人天生具備本心（辨義之心），但因貪圖富貴、苟且偷生而喪失本心。文章三段論證結構清晰，先以比喻立論，次舉乞食之例反面論證，末以對比指出貧富境況下本心之存亡。考試重點：論證層次、「本心」的涵義及其喪失的原因。',
  },
  xiaoyaoyou: {
    meta: '莊子 (369–286 BCE)｜《莊子·內篇》首篇｜寓言散文｜先秦道家',
    summary:
      '借鯤鵬化形、遠徙南溟的寓言，說明小知不及大知，凡有所待（依賴外在條件）者皆非真正逍遙。文末以「無用之用」（大樗之木）為例，批判世俗的功利標準。全篇核心概念為「無待」——絕對自由須擺脫對外物的依附。DSE節錄考核寓言手法、「逍遙」的具體所指，以及莊子對世俗價值觀的批判態度。',
  },
  quanxue: {
    meta: '荀子 (313–238 BCE)｜《荀子》首篇｜論說文｜先秦儒家',
    summary:
      '開篇「學不可以已」統領全文，論證持續學習的必要性與方法。荀子主張性惡說，認為人須透過後天學習與禮義規範（化性起偽）改變本性。文章以比喻論證為主（青出於藍、輮木為輪等），強調三要素：積累（積土成山）、堅持（鍥而不舍）、專一（用心一也）。與孟子性善說形成對照，常作跨篇章考題。考試重點：比喻的論證作用及與《論仁》思想之異同。',
  },
  lianpolin: {
    meta: '司馬遷 (145–86 BCE)｜《史記·廉頗藺相如列傳》｜紀傳體史傳｜西漢',
    summary:
      '記述戰國趙國名臣藺相如與廉頗的事蹟，包含三段核心情節：完璧歸趙（智勇抗秦）、澠池之會（維護趙王尊嚴）、負荊請罪（廉頗認錯，將相和好）。全篇以人物行動與對話塑造形象：藺相如機智果敢、以大局為重；廉頗勇猛直率、知錯能改。主題為「先國家之急而後私仇」。考試重點：人物描寫手法（語言、行動、對比）及敘事節奏的安排。',
  },
  chusibiao: {
    meta: '諸葛亮 (181–234 CE)｜出師表｜奏疏（上書體）｜三國蜀漢',
    summary:
      '諸葛亮北伐前呈後主劉禪的奏疏，全文提出三項施政建議：廣開言路（納諫）、嚴明賞罰、親賢遠佞。文章前半理性陳述治國方略，後半轉為個人自述，回顧受先帝知遇之恩，表達鞠躬盡瘁的忠誠。文體兼備說理與抒情，感情真摯而不濫。為中國古典散文中「忠臣奏議」的代表作，歷代被視為忠義精神的典範。考試重點：行文結構、情理交融的表達手法及「親賢遠佞」的具體主張。',
  },
  shishuo: {
    meta: '韓愈 (768–824 CE)｜《韓昌黎集》｜論說文｜唐代古文運動',
    summary:
      '針對唐代士大夫階層恥於從師問學的風氣而作。開篇定義師道：「古之學者必有師；師者，所以傳道受業解惑也。」提出擇師標準以「道」為先，不論年齒貴賤——「道之所存，師之所存也」。文中批評時人「恥學於師」的矛盾行為（教子讀書卻不肯自師），並舉孔子問禮於老聃為例。韓愈此文為唐代古文運動的重要篇章。考試重點：論點的推進邏輯、批評對象的具體行為，及與其他篇章「學習」主題的比較。',
  },
  shidexishan: {
    meta: '柳宗元 (773–819 CE)｜《永州八記》之首｜山水遊記｜唐代',
    summary:
      '柳宗元被貶永州期間所作，記述發現西山的經過與感受。文章前半寫貶謫生涯中漫無目的的遊歷，與西山之遊形成對比，突出西山「特立」的形象。登西山遠眺天地相融，作者達至「心凝形釋，與萬化冥合」的境界，象徵精神上的解脫。山水既是實景描寫，亦是作者人格的隱喻（高潔自持）。考試重點：景物描寫的象徵意義、作者借景抒懷的手法，及「始得」二字所含的轉折意涵。',
  },
  yueyanglouj: {
    meta: '范仲淹 (989–1052 CE)｜岳陽樓記｜寫景記事文｜北宋',
    summary:
      '應好友滕子京之邀為重修岳陽樓而作。文章先寫洞庭湖的陰晴景色及遷客騷人的悲喜反應，繼而以「古仁人」作對比——古仁人不以物喜、不以己悲，「居廟堂之高則憂其民，處江湖之遠則憂其君」。末段提出千古名句「先天下之憂而憂，後天下之樂而樂」，彰顯士大夫的政治理想與道德責任。考試重點：對比手法的運用、「古仁人」與「遷客騷人」的分別，及與《論仁·論君子》的跨篇章比較。',
  },
  liuguolun: {
    meta: '蘇洵 (1009–1066 CE)｜《嘉祐集》｜史論（政論文）｜北宋',
    summary:
      '借戰國六國滅亡的歷史教訓，論證六國失敗的根本原因在於以土地賄賂秦國（賂秦），而非兵力或謀略不足。文章採用歸納論證，逐一分析「賂秦而力虧」與「不賂者以賂者喪」兩類情況，並以「抱薪救火」為喻批評妥協政策。末段借古諷今，暗指北宋以歲幣換和平的對外政策同樣危險。考試重點：論證結構（破題、立論、舉例、結論）、類比手法，及文章的「借古諷今」寫作意圖。',
  },
  shi3: {
    meta: '唐代詩三首｜五言律詩 / 七言古詩 / 七言律詩',
    summary:
      '《山居秋暝》（王維，699–759 CE）：五言律詩，寫秋日山中雨後清景，以動寫靜，融入禪宗「空寂」美學，表達歸隱之志。《月下獨酌》其一（李白，701–762 CE）：七言古詩，以月與影為伴飲酒，以浪漫誇張手法掩飾深層孤獨，風格飄逸奔放。《登樓》（杜甫，712–770 CE）：七言律詩，安史之亂期間登樓遠眺，春色繁華與國勢衰落形成對比，體現「憂國憂民」情懷。三詩常作比較題，考核意象運用、情景交融手法及詩人創作背景。',
  },
  ci3: {
    meta: '宋代詞三首｜豪放派 / 婉約派',
    summary:
      '《念奴嬌·赤壁懷古》（蘇軾，1037–1101 CE）：豪放派代表，借赤壁古戰場感慨英雄業績，以周瑜之壯年功業反襯自身仕途坎坷，末以「人生如夢」作佛家式的豁達收結。《聲聲慢·秋情》（李清照，1084–約1155 CE）：婉約派傑作，以疊字開篇（「尋尋覓覓」），累積秋日意象（淡酒、黃花、梧桐、細雨），渲染國破夫亡後的極度悲涼。《青玉案·元夕》（辛棄疾，1140–1207 CE）：元宵燈節人海中，以「燈火闌珊處」的孤獨女子自喻，寄托不與世俗同流的高潔志節。',
  },
};

const FAQS = [
  {
    id: 'f1',
    question: '📚 點解要操練十二篇範文詞語？',
    answer:
      '十二篇範文係 DSE 中文科指定篇章，考試必出。熟悉詞語意義有助理解文章內容，提升閱讀卷及聆聽卷表現。',
  },
  {
    id: 'f2',
    question: '🔄 溫習模式同測驗模式有咩分別？',
    answer:
      '溫習模式用閃卡形式，可以慢慢睇、反覆記憶。測驗模式就係自我測試，即時評分，檢查學習成果。',
  },
  {
    id: 'f3',
    question: '💡 應該點樣用呢個工具？',
    answer:
      '建議先用溫習模式熟悉詞語，記得七七八八之後再做測驗模式，咁樣效果最好。可以集中操練某幾篇，或者全部一齊溫。',
  },
  {
    id: 'f4',
    question: '👥 呢個練習適合邊啲人？',
    answer:
      '適合所有 DSE 中文科考生，特別係想加強文言文詞彙理解嘅同學。無論你係初學定溫故知新都啱用。',
  },
];

export default function TwelvePassagesHome({ config }: HomeProps) {
  const structuredData = generate12pStructuredData();
  const faqData = generate12pFAQStructuredData();
  const breadcrumbData = generate12pBreadcrumbStructuredData('index');

  return (
    <>
      <PageSEO
        title="DSE 中文 十二篇範文語譯溫習工具"
        description="DSE 中文科十二篇範文詞語意義練習平台。提供溫習模式及測驗模式，涵蓋《論語》、《孟子》、《莊子》等12篇指定篇章，助你掌握古文詞語解釋，提升閱讀理解能力。"
        ogTitle="DSE 中文 十二篇範文語譯溫習工具"
        ogDescription="DSE 中文科十二篇範文詞語意義練習平台。提供溫習模式及測驗模式，涵蓋12篇指定篇章，助你掌握古文詞語解釋。"
        ogImage="https://dse.best/assets/images/logo-icon.webp"
        ogUrl="https://dse.best/12p"
        robots={['index', 'follow']}
        jsonLd={[structuredData, faqData, breadcrumbData].filter(Boolean) as object[]}
      />

      <PageBreadcrumb section="工具" text="十二篇範文練習 📝" showHome />

      {/* Main Content */}
      <div className="card rounded-4 page-12p">
        <div className="card-body p-4">

          {/* Title — matches IR page style */}
          <h1 className="page-title">十二篇範文語譯練習</h1>
          <p className="page-subtitle">
            全面掌握 DSE 中文科十二篇指定範文的詞語意義及語譯技巧。透過互動式閃卡溫習及測驗模式，深化對文言文詞彙的理解，提升閱讀理解及應試能力。
          </p>

          <hr className="divider" />

          {/* Mode Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="h-full">
              <NavigationLink href="/12p/study" className="no-underline block h-full">
                <div className="mode-card mode-study">
                <div className="mode-ghost-icon" aria-hidden="true">
                  <BiBookReader size={88} />
                </div>
                <div className="mode-title mode-title-study">溫習模式</div>
                <div className="mode-desc">閃卡形式逐詞溫習，輕鬆翻閱加深記憶</div>
                <div className="mode-arrow mode-arrow-study">開始溫習 →</div>
                <div className="mode-bar mode-bar-study" />
              </div>
              </NavigationLink>
            </div>
            <div className="h-full">
              <NavigationLink href="/12p/quiz" className="no-underline block h-full">
                <div className="mode-card mode-quiz">
                <div className="mode-ghost-icon" aria-hidden="true">
                  <BiPencil size={88} />
                </div>
                <div className="mode-title mode-title-quiz">測驗模式</div>
                <div className="mode-desc">自我測試詞語理解，即時評分追蹤進度</div>
                <div className="mode-arrow mode-arrow-quiz">開始測驗 →</div>
                <div className="mode-bar mode-bar-quiz" />
              </div>
              </NavigationLink>
            </div>
          </div>

          <hr className="divider" />

          {/* Passages List */}
          <h2 className="section-heading">📖 十二篇指定篇章</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {config.passages.map((passage, index) => {
              const color = PASSAGE_COLORS[index % PASSAGE_COLORS.length];
              const info = PASSAGE_INFO[passage.id];
              return (
                <div
                  key={passage.id}
                  className="passage-card"
                  style={{
                    background: color.bg,
                    borderLeft: `3px solid ${color.border}`,
                  }}
                >
                  <div className="passage-header">
                    <span className="passage-emoji">{passage.emoji}</span>
                    <div>
                      <div className="passage-title">{passage.title}</div>
                      <div className="passage-subtitle">{passage.subtitle}</div>
                    </div>
                  </div>
                  {info && (
                    <>
                      <div className="passage-meta">{info.meta}</div>
                      <p className="passage-summary">{info.summary}</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <hr className="divider" />

          {/* FAQ */}
          <h3 className="section-heading">❓ 常見問題</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
            {FAQS.map((faq) => (
              <div key={faq.id} className="faq-card">
                <div className="faq-question">{faq.question}</div>
                <div className="faq-answer">{faq.answer}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style jsx>{`
        /* ── Page title — matches Individual Response card title ── */
        .page-title {
          font-size: 2.4rem;
          font-weight: 800;
          color: var(--color-heading-color);
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin: 1.25rem 0 0.75rem;
          text-align: center;
        }

        .page-subtitle {
          font-size: 0.92rem;
          color: var(--color-secondary-color);
          max-width: 680px;
          margin: 0 auto 1.5rem;
          text-align: center;
          line-height: 1.65;
        }

        .divider {
          border-color: var(--color-border-color);
          margin: 1.5rem 0;
        }

        .section-heading {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-heading-color);
          margin-bottom: 1.25rem;
          text-align: center;
        }

        /* ── Mode cards — style G: grey bg, ghost icon top-right, bottom bar ── */
        .mode-card {
          position: relative;
          overflow: hidden;
          border-radius: 10px;
          padding: 1.4rem 1.5rem 1.6rem;
          height: 100%;
          background: var(--color-tertiary-bg, #f1f5f9);
          cursor: pointer;
          transition: background 0.15s;
        }

        .mode-card:hover {
          background: var(--color-secondary-bg, #e8eef6);
        }

        /* Ghost icon — large, faded, top-right corner */
        .mode-ghost-icon {
          position: absolute;
          top: 50%;
          right: -6px;
          transform: translateY(-50%);
          opacity: 0.055;
          pointer-events: none;
          line-height: 0;
        }

        /* Bottom bar */
        .mode-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
        }

        .mode-bar-study { background: #3b82f6; }
        .mode-bar-quiz  { background: #22c55e; }

        .mode-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.3rem;
          position: relative; /* sit above ghost icon */
        }

        .mode-title-study { color: #1d4ed8; }
        .mode-title-quiz  { color: #15803d; }

        .mode-desc {
          font-size: 0.855rem;
          color: var(--bs-secondary-color, #64748b);
          line-height: 1.55;
          margin-bottom: 0.75rem;
          position: relative;
        }

        .mode-arrow {
          font-size: 0.8rem;
          font-weight: 600;
          position: relative;
        }

        .mode-arrow-study { color: #3b82f6; }
        .mode-arrow-quiz  { color: #22c55e; }

        /* ── Passage cards — GitHub/Wikipedia doc style ── */
        .passage-card {
          padding: 1.1rem 1.25rem;
          border-radius: 6px;
          height: 100%;
        }

        .passage-header {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.6rem;
        }

        .passage-emoji {
          font-size: 1.75rem;
          line-height: 1;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .passage-title {
          font-weight: 700;
          font-size: 1rem;
          line-height: 1.3;
          margin-bottom: 0.2rem;
          color: var(--color-heading-color);
        }

        .passage-subtitle {
          font-size: 0.8rem;
          color: var(--color-secondary-color);
        }

        /* Monospace metadata bar — like a GitHub file header */
        .passage-meta {
          font-size: 0.72rem;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
          color: var(--color-secondary-color);
          background: var(--bs-tertiary-bg);
          border: 1px solid var(--bs-border-color);
          border-radius: 4px;
          padding: 3px 8px;
          margin-bottom: 0.6rem;
          line-height: 1.6;
          word-break: break-word;
        }

        .passage-summary {
          font-size: 0.82rem;
          color: var(--color-body);
          line-height: 1.65;
          margin: 0;
        }

        /* ── FAQ cards — theme-aware, no hardcoded white ── */
        .faq-card {
          padding: 1.25rem 1.5rem;
          border-radius: 8px;
          background: var(--bs-secondary-bg);
          border: 1px solid var(--bs-border-color);
          height: 100%;
        }

        .faq-question {
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 0.6rem;
          color: var(--color-heading-color);
        }

        .faq-answer {
          font-size: 0.875rem;
          line-height: 1.65;
          color: var(--color-secondary-color);
        }

        /* ── Responsive ── */
        @media (max-width: 575px) {
          .page-title {
            font-size: 1.75rem;
          }
          .mode-card {
            padding: 1.2rem 1.25rem 1.45rem;
          }
          .mode-ghost-icon {
            top: 50%;
            right: -4px;
          }
        }

        :global(.page-12p) {
          font-family: var(--font-noto-sans-hk), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: { config: configData } };
};