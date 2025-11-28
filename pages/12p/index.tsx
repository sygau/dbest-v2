import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { BiBookReader, BiPencil } from 'react-icons/bi';
import NavigationLink from '../../components/NavigationLink';
import { PassageConfig } from '../../types/12p';
import { get12pMetadata } from '../../utils/12pMetadata';
import { generate12pStructuredData, generate12pFAQStructuredData, generate12pBreadcrumbStructuredData } from '../../utils/12pStructuredData';

interface HomeProps {
  config: PassageConfig;
}

// Helper function to get passage information
function getPassageInfo(passageId: string): string {
  const info: Record<string, string> = {
    'lunyu': '記錄孔子同徒弟嘅對話。教人要做君子，核心價值係「仁」（修養自己、愛人）同「孝」（尊敬父母、真心），講得出就要做得到（言行一致）',
    'yuwosuoyuye': '用「魚同熊掌」比喻「義」比「生命」更重要。強調人性本善，唔好為咗富貴名利冇咗「本心」，必要時要識得「捨生取義」',
    'xiaoyaoyou': '道家代表作。用大鵬鳥同樗樹做比喻，講咩係真正嘅「逍遙」。話唔好依賴外在條件（無待），要睇得穿世俗標準，明白「無用之用」先最自由',
    'quanxue': '強調「學不可以已」（學習唔停得）。學習可以改變本性（化性起偽），只要堅持（鍥而不舍）、累積（積）同專心，普通人都可以變聖人',
    'lianpolin': '通過「完璧歸趙」、「澠池之會」同「負荊請罪」三個故事，讚藺相如識大體、廉頗肯認錯。最緊要係將國家安全放喺個人恩怨前面',
    'chusibiao': '諸葛亮北伐前寫畀後主劉禪嘅信。勸佢要廣開言路（聽人意見）、賞罰分明、親賢遠小（親近好官），表達自己對漢室嘅死忠',
    'shishuo': '批評唐代唔尊師重道嘅風氣。強調「古之學者必有師」，老師係用嚟傳道、解惑。只要識「道」，任何人都可以係老師，唔分貴賤年紀',
    'shidexishan': '被貶永州時發現西山，用西山嘅「特立」嚟比喻自己嘅高尚人品。透過遊山玩水達到「天人合一」嘅境界，解開心中鬱結',
    'yueyanglouj': '借岳陽樓景色講道理。話仁人志士唔似普通人咁易受環境影響心情，提出「先天下之憂而憂，後天下之樂而樂」嘅偉大抱負',
    'liuguolun': '借古諷今。話六國滅亡係因為「賂秦」（割地求和），唔係因為兵力弱。警告北宋朝廷唔好重蹈覆轍，唔好以為畀錢買怕就可以安樂',
    'shi3': '《山居秋暝》: 寫秋天山景好靚，想隱居唔做官，追求平淡自然\n《月下獨酌》: 自己同個影飲酒，表面好歡樂，其實好孤獨，展現浪漫想像\n《登樓》: 登樓望遠，見到春景靚但國家亂，感嘆時勢艱難，仍然心繫朝廷',
    'ci3': '《念奴嬌》: 借赤壁懷古，感嘆古代英雄幾勁都變塵土，自己老咗又冇成就，最後以此睇化人生如夢\n《聲聲慢》: 寫秋天景物（淡酒、黃花、梧桐雨）嚟表達國破家亡、死老公嘅極度悲慘孤獨\n《青玉案》: 寫元宵節勁熱鬧，但有個靚女（作者自喻）獨自喺「燈火闌珊處」，話自己唔同流合污'
  };
  return info[passageId] || '經典文言文篇章';
}

export default function TwelvePassagesHome({ config }: HomeProps) {
  const metadata = get12pMetadata('index');
  const structuredData = generate12pStructuredData();
  const faqData = generate12pFAQStructuredData();
  const breadcrumbData = generate12pBreadcrumbStructuredData('index');

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="robots" content={metadata.robots} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metadata.ogTitle} />
        <meta property="og:description" content={metadata.ogDescription} />
        <meta property="og:image" content={metadata.ogImage} />
        <meta property="og:url" content={metadata.ogUrl} />
        <meta property="og:type" content={metadata.ogType} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        />
      </Head>

      {/* Breadcrumb */}
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">工具</div>
        <div className="ps-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
              <li className="breadcrumb-item">
                <NavigationLink href="/">
                  <i className="bx bx-home-alt"></i>
                </NavigationLink>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                十二篇範文練習 📝
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="card rounded-4 page-12p" style={{ height: "auto" }}>
        <div className="card-body">
          <h1 className="mb-3 text-center" style={{ color: '#d97706', fontWeight: 800, marginTop: '1.5rem' }}>十二篇範文語譯練習</h1>
          
          <p className="mb-4 text-center" style={{ fontSize: '0.95rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
            全面掌握 DSE 中文科十二篇指定範文的詞語意義及語譯技巧。透過互動式閃卡溫習及測驗模式，深化對文言文詞彙的理解，提升閱讀理解及應試能力。涵蓋《論語》、《孟子》、《莊子》等經典篇章，助你輕鬆應對 DSE 中文科考試。
          </p>

          <hr className="my-4" />

          {/* Mode Selection */}
          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <NavigationLink href="/12p/study" className="text-decoration-none d-block">
                <div className="mode-card study-mode">
                  <div className="mode-icon-wrapper">
                    <BiBookReader className="mode-icon" size={52} />
                  </div>
                  <h3 className="mode-title">溫習模式</h3>
                  <p className="mode-description">
                    使用閃卡形式溫習詞語意義<br />
                    輕鬆翻閱，加深記憶
                  </p>
                </div>
              </NavigationLink>
            </div>

            <div className="col-md-6">
              <NavigationLink href="/12p/quiz" className="text-decoration-none d-block">
                <div className="mode-card quiz-mode">
                  <div className="mode-icon-wrapper">
                    <BiPencil className="mode-icon" size={52} style={{ color: '#0b9860ff' }} />
                  </div>
                  <h3 className="mode-title">測驗模式</h3>
                  <p className="mode-description">
                    自我測試詞語理解能力<br />
                    即時評分，追蹤進度
                  </p>
                </div>
              </NavigationLink>
            </div>
          </div>

          <hr className="my-4" />

          {/* Passages List */}
          <h2 className="mb-4 text-center">📖 十二篇指定篇章</h2>
          <div className="row g-3 mb-4">
            {config.passages.map((passage, index) => {
              const colors = [
                { bg: 'rgba(239, 68, 68, 0.1)', border: '#ef4444', text: '#991b1b' },
                { bg: 'rgba(249, 115, 22, 0.1)', border: '#f97316', text: '#9a3412' },
                { bg: 'rgba(234, 179, 8, 0.1)', border: '#eab308', text: '#854d0e' },
                { bg: 'rgba(34, 197, 94, 0.1)', border: '#22c55e', text: '#14532d' },
                { bg: 'rgba(20, 184, 166, 0.1)', border: '#14b8a6', text: '#134e4a' },
                { bg: 'rgba(59, 130, 246, 0.1)', border: '#3b82f6', text: '#1e3a8a' },
                { bg: 'rgba(99, 102, 241, 0.1)', border: '#6366f1', text: '#312e81' },
                { bg: 'rgba(168, 85, 247, 0.1)', border: '#a855f7', text: '#581c87' },
                { bg: 'rgba(236, 72, 153, 0.1)', border: '#ec4899', text: '#831843' },
                { bg: 'rgba(244, 63, 94, 0.1)', border: '#f43f5e', text: '#881337' },
                { bg: 'rgba(14, 165, 233, 0.1)', border: '#0ea5e9', text: '#0c4a6e' },
                { bg: 'rgba(139, 92, 246, 0.1)', border: '#8b5cf6', text: '#4c1d95' },
              ];
              const color = colors[index % colors.length];
              return (
                <div key={passage.id} className="col-md-4">
                  <div className="passage-card" style={{
                    background: color.bg,
                    borderLeft: `4px solid ${color.border}`
                  }}>
                    <div className="passage-card-emoji">{passage.emoji}</div>
                    <div className="passage-card-title" style={{ color: color.text }}>{passage.title}</div>
                    <div className="passage-card-subtitle">{passage.subtitle}</div>
                    <div className="passage-card-info" style={{ color: color.text }}>
                      {getPassageInfo(passage.id)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <hr className="my-4" />

          {/* FAQ Section */}
          <h3 className="mb-3 text-center">❓ 常見問題</h3>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="faq-card">
                <div className="faq-question">📚 點解要操練十二篇範文詞語？</div>
                <div className="faq-answer">十二篇範文係 DSE 中文科指定篇章，考試必出。熟悉詞語意義有助理解文章內容，提升閱讀卷及聆聽卷表現。</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="faq-card">
                <div className="faq-question">🔄 溫習模式同測驗模式有咩分別？</div>
                <div className="faq-answer">溫習模式用閃卡形式，可以慢慢睇、反覆記憶。測驗模式就係自我測試，即時評分，檢查學習成果。</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="faq-card">
                <div className="faq-question">💡 應該點樣用呢個工具？</div>
                <div className="faq-answer">建議先用溫習模式熟悉詞語，記得七七八八之後再做測驗模式，咁樣效果最好。可以集中操練某幾篇，或者全部一齊溫。</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="faq-card">
                <div className="faq-question">👥 呢個練習適合邊啲人？</div>
                <div className="faq-answer">適合所有 DSE 中文科考生，特別係想加強文言文詞彙理解嘅同學。無論你係初學定溫故知新都啱用。</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mode-card {
          position: relative;
          padding: 3rem 2rem;
          border-radius: 1.25rem;
          transition: all 0.25s ease;
          overflow: hidden;
          min-height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background: var(--bs-card-bg);
          border: 2px solid var(--bs-border-color);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .study-mode {
          background: rgba(20, 88, 196, 0.12);
        }

        .quiz-mode {
          background: rgba(34, 197, 94, 0.12);
        }

        .mode-card:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }

        .study-mode {
          border-color: #3b82f6 !important;
        }

        .study-mode:hover {
          border-color: #2563eb !important;
        }

        .quiz-mode {
          border-color: #22c55e !important;
        }

        .quiz-mode:hover {
          border-color: #16a34a !important;
        }

        .mode-icon-wrapper {
          margin-bottom: 1.5rem;
        }

        .mode-icon {
          color: #22c55e !important;
        }

        .study-mode .mode-icon {
          color: var(--bs-primary) !important;
        }

        .mode-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--bs-heading-color);
        }

        .mode-description {
          color: var(--bs-body-color);
          opacity: 0.9;
          margin-bottom: 0;
          line-height: 1.7;
          font-size: 0.95rem;
        }

        [data-bs-theme=light] .mode-description {
          color: #000000;
          opacity: 0.75;
        }

        .passage-card {
          padding: 1.5rem;
          border-radius: 0.75rem;
          height: 100%;
          transition: all 0.2s ease;
          cursor: default;
        }

        .passage-card-emoji {
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
        }

        .passage-card-title {
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .passage-card-subtitle {
          font-size: 0.85rem;
          color: var(--bs-body-color);
          opacity: 0.7;
          margin-bottom: 0.75rem;
        }

        .passage-card-info {
          font-size: 0.8rem;
          line-height: 1.5;
          opacity: 0.8;
        }

        .faq-card {
          padding: 1.5rem;
          border-radius: 0.75rem;
          background: var(--bs-card-bg);
          border: 1px solid var(--bs-border-color);
          height: 100%;
          transition: all 0.2s ease;
        }

        .faq-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .faq-question {
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.75rem;
          color: var(--bs-heading-color);
        }

        .faq-answer {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--bs-body-color);
          opacity: 0.85;
        }

        @media (max-width: 768px) {
          .mode-card {
            min-height: 260px;
            padding: 2.5rem 1.5rem;
          }

          .mode-title {
            font-size: 1.35rem;
          }

          .passage-card {
            padding: 1.25rem;
          }

          .passage-card-emoji {
            font-size: 2rem;
          }
        }
        
        :global(.page-12p) {
          font-family: 'Noto Sans HK', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const fs = require('fs');
  const path = require('path');
  
  const configPath = path.join(process.cwd(), 'public', '12p', 'config.json');
  const configData = fs.readFileSync(configPath, 'utf8');
  const config: PassageConfig = JSON.parse(configData);

  return {
    props: {
      config,
    },
  };
};
