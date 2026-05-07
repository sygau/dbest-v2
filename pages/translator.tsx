import { useState, useRef, useEffect } from 'react';
import { BiCopy, BiTrash, BiLoaderAlt, BiBookContent, BiMessageDetail, BiCheckCircle, BiInfoCircle } from 'react-icons/bi';
import PageSEO from '../components/PageSEO';
import PageBreadcrumb from '../components/PageBreadcrumb';
export default function TranslatorPage() {

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      // Simple feedback - could add a toast notification
      console.log('Copied to clipboard');
    });
  };

  const handleClear = (field: 'input' | 'output') => {
    if (field === 'input') {
      setInputText('');
    } else {
      setOutputText('');
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim() || isTranslating || !turnstileToken || cooldown > 0) return;

    if (inputText.length > 1000) {
      alert('文本長度超過 1000 字限制。');
      return;
    }

    setIsTranslating(true);
    try {
      // Note: Replace with your actual production API URL if different
      const response = await fetch('https://api-v2.dse.best/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          token: turnstileToken,
        }),
      });

      const data = await response.json();
      if (data.translation) {
        setOutputText(data.translation);
        
        // Start 10s cooldown after successful translation
        setCooldown(10);
        cooldownTimerRef.current = setInterval(() => {
          setCooldown((prev) => {
            if (prev <= 1) {
              if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else if (data.error) {
        alert(data.error);
      }
    } catch (error) {
      console.error('Translation failed:', error);
      alert('翻譯請求失敗，請稍後再試。');
    } finally {
      setIsTranslating(false);
      if (window.turnstile) {
        window.turnstile.reset();
        setTurnstileToken(null);
      }
    }
  };

  // Load Cloudflare Turnstile script
  useEffect(() => {
    if (typeof window !== 'undefined' && !document.querySelector('script[src*="turnstile"]')) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.turnstile && turnstileRef.current) {
          window.turnstile.render(turnstileRef.current, {
            sitekey: '0x4AAAAAACqtFICc4sSmTsC1',
            callback: (token: string) => setTurnstileToken(token),
          });
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  return (
    <>
      <PageSEO
        title="文言文翻譯機 Classical Chinese Translator | AI 古文翻譯工具"
        description="免費 AI 文言文翻譯機，即時將古文翻譯成現代白話文。專為 DSE 中文科學生設計，支援《岳陽樓記》、《出師表》、《六國論》等常見文言文篇章翻譯。輕鬆理解古文意思，提升中文閱讀能力。"
        ogTitle="文言文翻譯機 Classical Chinese Translator | AI 古文翻譯工具"
        ogDescription="免費 AI 文言文翻譯機，即時將古文翻譯成現代白話文。專為 DSE 中文科學生設計，支援常見文言文篇章翻譯。輕鬆理解古文意思，提升中文閱讀能力。"
        ogUrl="https://dse.best/translator"
        robots={['index', 'follow']}
        pageKey="translator"
      />

      <div className="page-wrapper">
        <PageBreadcrumb section="工具" text="文言文翻譯機" />

        <div className="translator-container">
          <h1 className="translator-title">文言文翻譯機</h1>
          <p className="translator-subtitle">AI 即時將古文翻譯成現代白話文</p>

          <div className="translation-grid">
            <div className="translation-panel">
              <div className="panel-header">
                <span className="panel-label">文言文</span>
                <div className="panel-actions">
                  <button
                    className="action-btn"
                    onClick={() => handleClear('input')}
                    aria-label="清除輸入"
                    disabled={!inputText}
                  >
                    <BiTrash />
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => handleCopy(inputText)}
                    aria-label="複製輸入"
                    disabled={!inputText}
                  >
                    <BiCopy />
                  </button>
                </div>
              </div>
              <div className="input-group">
                <textarea
                  className="translate-textarea"
                  placeholder="請輸入文言文或白話文..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  maxLength={1000}
                ></textarea>
                <div className="input-extras">
                  <span className={`char-count ${inputText.length >= 1000 ? 'text-danger' : ''}`}>
                    {inputText.length} / 1000
                  </span>
                </div>

              </div>
            </div>

            <div className="translation-panel">
              <div className="panel-header">
                <span className="panel-label">白話文</span>
                <div className="panel-actions">
                  <button
                    className="action-btn"
                    onClick={() => handleCopy(outputText)}
                    aria-label="複製輸出"
                    disabled={!outputText}
                  >
                    <BiCopy />
                  </button>
                </div>
              </div>
              <div className="translation-output">
                {isTranslating ? (
                  <div className="skeleton-loader">
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line short"></div>
                  </div>
                ) : (
                  <div className="output-text">{outputText || '翻譯結果將顯示於此...'}</div>
                )}
              </div>
            </div>
          </div>
          <p className="translate-disclaimer mt-3 text-center" style={{ marginTop: '1px' }}>
              AI 翻譯結果僅供參考，請結合範文註釋及課堂筆記進行理解。
            </p>
          <div className="translate-controls">
            <div ref={turnstileRef} className="turnstile-widget"></div>
            <button
              className="translate-btn"
              onClick={handleTranslate}
              disabled={isTranslating || !inputText.trim() || !turnstileToken || cooldown > 0 || inputText.length > 1000}
            >
              {isTranslating ? (
                <>
                  <BiLoaderAlt className="spinner" />
                  <span>翻譯中...</span>
                </>
              ) : cooldown > 0 ? (
                <span>請稍候 ({cooldown}s)</span>
              ) : (
                <span>翻譯</span>
              )}
            </button>
          </div>

          <div className="card rounded-4 border-0 shadow-sm mb-4">
            <div className="card-body p-4 lg:p-5">
              <div className="article-content mt-0">
                <h1 className="article-title text-center">文言文翻譯全攻略：從基礎到 DSE 應試技巧</h1>
                <p className="article-meta text-center border-0 p-0">本指南旨在協助 DSE 考生掌握古文解碼邏輯，將晦澀的文言文轉化為易懂的現代白話文。</p>

                <h2 className="section-h2">一、 常用文言字詞對照表 (30+)</h2>
                <p className="section-p">掌握高頻字詞是解讀文言文的第一步。以下整理了 30 個常見文言字詞及其現代對應義項：</p>
                
                <div className="table-responsive mb-4">
                  <table className="vocab-table">
                    <thead>
                      <tr>
                        <th>文言字詞</th>
                        <th>現代對義 / 解釋</th>
                        <th>文言字詞</th>
                        <th>現代對義 / 解釋</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>之</td><td>的 / 他 / 往</td><td>其</td><td>他的 / 那個</td></tr>
                      <tr><td>而</td><td>而且 / 但 / 然後</td><td>以</td><td>用 / 因為 / 用來</td></tr>
                      <tr><td>於</td><td>在 / 對於 / 被</td><td>為</td><td>做 / 是 / 因為</td></tr>
                      <tr><td>則</td><td>就 / 那麼</td><td>乃</td><td>於是 / 竟然 / 是</td></tr>
                      <tr><td>者</td><td>……的人 / ……的話</td><td>也</td><td>（句末助詞，表判斷）</td></tr>
                      <tr><td>焉</td><td>在那裡 / 於此</td><td>何</td><td>什麼 / 為什麼</td></tr>
                      <tr><td>安</td><td>哪裡 / 怎麼</td><td>孰</td><td>誰 / 哪一個</td></tr>
                      <tr><td>遂</td><td>於是 / 就</td><td>竟</td><td>居然 / 終究</td></tr>
                      <tr><td>徒</td><td>只是 / 徒然</td><td>固</td><td>本來 / 堅決</td></tr>
                      <tr><td>少</td><td>稍微 / 不久</td><td>稍</td><td>漸漸</td></tr>
                      <tr><td>且</td><td>況且 / 暫且 / 將要</td><td>與</td><td>和 / 給予</td></tr>
                      <tr><td>或</td><td>有人 / 有時</td><td>莫</td><td>沒有人 / 不要</td></tr>
                      <tr><td>苟</td><td>如果 / 苟且</td><td>若</td><td>如果 / 像</td></tr>
                      <tr><td>微</td><td>如果沒有 / 卑賤</td><td>徐</td><td>緩慢地</td></tr>
                      <tr><td>亟</td><td>急切 / 屢次</td><td>適</td><td>剛好 / 到……去</td></tr>
                    </tbody>
                  </table>
                </div>

                <h2 className="section-h2">二、 核心解碼技巧：通假字與一詞多義的深度辨析</h2>
                <p className="section-p">在古漢語中，文字的演變與借用極為普遍，這要求讀者具備敏銳的語境感知能力。</p>
                
                <h3 className="section-h3">1. 通假字</h3>
                <p className="section-p">通假字是指在書寫時，古人借用音同或音近的字來代替本字。解碼策略是：<strong>當一個字在原義下解釋不通時，應立即嘗試其「音近字」。</strong></p>
                <div className="example-box mb-3">
                  <ul className="article-list mb-0">
                    <li><strong>《論語》：</strong>「不亦說乎」—「說」通<strong>「悅」</strong>（喜悅）。</li>
                    <li><strong>《桃花源記》：</strong>「便要還家」—「要」通<strong>「邀」</strong>（邀請）。</li>
                    <li><strong>常見：</strong>「女」通「汝」（你）、「知」通「智」（智慧）。</li>
                  </ul>
                </div>

                <h3 className="section-h3">2. 一詞多義</h3>
                <p className="section-p">文言文單字往往涵蓋多個範疇。以<strong>「謝」</strong>為例，在不同場景下其意義截然不同：</p>
                <div className="analysis-box py-3 px-4 mb-4">
                  <ol className="article-list mb-0">
                    <li><strong>道歉：</strong>「秦王色撓，長跪而<strong>謝</strong>之。」</li>
                    <li><strong>辭別：</strong>「阿母<strong>謝</strong>媒人。」</li>
                    <li><strong>凋謝：</strong>「及花之既<strong>謝</strong>。」</li>
                    <li><strong>感謝：</strong>現代常用意義，古文中相對較少。</li>
                  </ol>
                </div>

                <h2 className="section-h2">三、 句式結構：賓語變換與文法的隱形邏輯</h2>
                <p className="section-p">文言文的句法結構是 DSE 翻譯題的核心考點，必須掌握其「變與不變」。</p>

                <h3 className="section-h3">1. 賓語前置</h3>
                <p className="section-p">在古漢語中，賓語（Object，受詞）通常放在動詞（Verb，謂語）之後，這點與英語及現代漢語的 <strong>S-V-O</strong> (Subject-Verb-Object) 邏輯一致。然而，在特定的強調語境或疑問句中，賓語會提前到動詞之前，形成 <strong>S-O-V</strong> 結構。</p>
                <div className="example-box mb-3">
                  <p className="mb-1"><strong>典型案例：</strong>「何以知之？」</p>
                  <ul className="article-list-ordered mb-0 text-muted small">
                    <li><span className="list-num">01</span> <strong>文言 S-O-V：</strong> 何（Object） ＋ 以（Prep） ＋ 知（Verb） ＋ 之（Object）</li>
                    <li><span className="list-num">02</span> <strong>白話 S-V-O：</strong> 以（用） ＋ 何（什麼） ＋ 知（知道） ＋ 之（這件事）</li>
                    <li><span className="list-num">03</span> <strong>英語類比：</strong> "By what do you know this?" (Object "what" moves to the front)</li>
                  </ul>
                </div>

                <h3 className="section-h3">2. 省略句</h3>
                <p className="section-p">文言文追求極致簡練，常省略在上下文中已知的成分。這與英語中的省略相似，但古漢語的省略更為徹底：</p>
                <ul className="article-list-ordered">
                  <li><span className="list-num">01</span> <strong>主語 (Subject) 省略：</strong> 如《曹刿論戰》：「（公）曰：『不可。』」</li>
                  <li><span className="list-num">02</span> <strong>謂語 (Verb) 省略：</strong> 如「一鼓作氣，再（鼓）而衰」。</li>
                  <li><span className="list-num">03</span> <strong>賓語 (Object) 省略：</strong> 如「以（之）與其小者」。（之：這件事）</li>
                  <li><span className="list-num">04</span> <strong>介詞 (Preposition) 省略：</strong> 如「置之（於）坐」。（放在座位上）</li>
                </ul>


                <h3 className="section-h3">3. 被動與判斷句</h3>
                <p className="section-p">識別被動語態（如「見……於……」）和判斷句（「……者，……也」）是還原現代漢語邏輯的關鍵。</p>

                <h2 className="section-h2">四、 實戰拆解：經典篇章分析 (12篇範文引用)</h2>
                <p className="section-p">我們以 DSE 指定 12 篇範文中的精華片段，展示如何運用上述技巧進行精準翻譯：</p>
                
                <div className="analysis-box mb-4">
                  <h4 className="section-h4">《六國論》：因果與句式</h4>
                  <p className="mb-2"><strong>原文：</strong>「六國破滅，非兵不利，戰不善，弊在賂秦。」</p>
                  <p className="mb-2 text-muted small"><strong>拆解：</strong> 「兵」指武器（名詞）；「利」指鋒利（形容詞）；「善」指妥當（形容詞）。</p>
                  <p className="mb-0"><strong>翻譯：</strong> 六國滅亡，不是因為武器不鋒利，仗打得不好，弊端在於賄賂秦國。</p>
                </div>

                <div className="analysis-box mb-4">
                  <h4 className="section-h4">《岳陽樓記》：虛詞與對仗</h4>
                  <p className="mb-2"><strong>原文：</strong>「不以物喜，不以己悲。」</p>
                  <p className="mb-2 text-muted small"><strong>拆解：</strong> 「以」在這裡是介詞，解作「因為」。這是典型的對仗句式。</p>
                  <p className="mb-0"><strong>翻譯：</strong> 不因為外物（的好壞）而高興，不因為自己（的遭遇）而悲傷。</p>
                </div>

                <div className="analysis-box mb-4">
                  <h4 className="section-h4">《出師表》：主語省略與語氣</h4>
                  <p className="mb-2"><strong>原文：</strong>「今天下三分，益州疲弊，此誠危急存亡之秋也。」</p>
                  <p className="mb-2 text-muted small"><strong>拆解：</strong> 「秋」在這裡活用為「時刻/時期」。「也」表判斷語氣。</p>
                  <p className="mb-0"><strong>翻譯：</strong> 現在天下分裂成三部分，蜀漢國力疲弱，這實在是到了危急存亡的時刻啊。</p>
                </div>

                <h2 className="section-h2">五、 DSE 應試必修：詞性活用與深度解釋</h2>
                <p className="section-p">考評局最常考核「詞性活用」 (Parts of Speech Conversion)。這要求學生不只是背誦字義，更要理解字在句子中的「功能」。</p>
                
                <div className="table-responsive">
                  <table className="vocab-table">
                    <thead>
                      <tr>
                        <th>活用類型</th>
                        <th>12篇範文例句</th>
                        <th>詳細解析</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>名詞作動詞</strong></td>
                        <td>「驢不勝怒，<strong>蹄</strong>之。」</td>
                        <td>「蹄」本是名詞，此處置於賓語「之」前，活用為動詞「用蹄踢」。</td>
                      </tr>
                      <tr>
                        <td><strong>形容詞作名詞</strong></td>
                        <td>「親<strong>賢</strong>臣，遠<strong>小人</strong>。」</td>
                        <td>「賢」本是形容詞，此處活用為名詞「賢能的人」。</td>
                      </tr>
                      <tr>
                        <td><strong>使動用法</strong></td>
                        <td>「舞幽壑之潛蛟，<strong>泣</strong>孤舟之嫠婦。」</td>
                        <td>《赤壁賦》：「泣」即「使……哭泣」。這是一種隱形的被動與使令邏輯。</td>
                      </tr>
                      <tr>
                        <td><strong>意動用法</strong></td>
                        <td>「吾從而<strong>師</strong>之。」</td>
                        <td>《師說》：「師」即「以……為師」。表示主觀上認為對方具備某種身份。</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="tip-box mt-3">
                  <BiInfoCircle /> <span><strong>奪分關鍵：</strong> 在 DSE 翻譯題中，解釋「活用詞」時必須寫出其功能轉換後的完整意思（如「以……為師」而非單純的「老師」）。</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .page-wrapper {
          padding: 1rem;
          min-height: 80vh;
        }

        .translator-container {
          max-width: 1200px;
          margin: 0 auto;
          padding-bottom: 4rem;
        }

        .translator-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--color-heading-color);
          text-align: center;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .translator-subtitle {
          text-align: center;
          color: var(--color-secondary-color);
          font-size: 1rem;
          margin-bottom: 2rem;
        }

        .translation-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .translation-grid {
            grid-template-columns: 1fr;
          }
        }

        .translation-panel {
          background: var(--color-card-bg);
          border: 1px solid var(--color-border-color);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: var(--color-tertiary-bg);
          border-bottom: 1px solid var(--color-border-color);
        }

        .panel-label {
          font-weight: 600;
          color: var(--color-heading-color);
          font-size: 0.9rem;
        }

        .panel-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          background: transparent;
          border: none;
          color: var(--color-secondary-color);
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 1.1rem;
          transition: background-color 0.15s, color 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn:hover:not(:disabled) {
          background: var(--color-secondary-bg);
          color: var(--color-body);
        }

        .action-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .input-group {
          position: relative;
        }

        .translate-textarea {
          width: 100%;
          height: 250px;
          padding: 1.2rem;
          border: none;
          background: var(--color-card-bg);
          color: var(--color-body);
          font-size: 1.1rem;
          resize: none;
          transition: background-color 0.2s;
        }

        .translate-textarea:focus {
          outline: none;
        }

        .input-extras {
          position: absolute;
          bottom: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          pointer-events: none;
        }

        .char-count {
          font-size: 0.75rem;
          color: var(--color-secondary-color);
          opacity: 0.6;
          font-family: 'JetBrains Mono', monospace;
        }

        .char-count.text-danger {
          color: #dc3545 !important;
          opacity: 1;
          font-weight: bold;
        }

        .clear-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: none;
          border: none;
          color: var(--color-secondary-color);
          font-size: 1.2rem;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }

        .translation-output {
          flex: 1;
          padding: 16px;
          min-height: 240px;
        }

        .output-text {
          color: var(--color-body);
          font-size: 1rem;
          line-height: 1.6;
          white-space: pre-wrap;
        }

        .skeleton-loader {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .skeleton-line {
          height: 16px;
          background: linear-gradient(
            90deg,
            var(--color-tertiary-bg) 25%,
            var(--color-secondary-bg) 50%,
            var(--color-tertiary-bg) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
        }

        .skeleton-line.short {
          width: 60%;
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        .translate-controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          margin-bottom: 3rem;
        }

        .turnstile-widget {
          display: flex;
          justify-content: center;
        }

        .translate-btn {
          background: var(--color-primary, #6366f1);
          color: white;
          border: none;
          padding: 14px 48px;
          margin-top: -20px;
          margin-bottom: -30px;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: opacity 0.15s;
        }

        .translate-btn:hover:not(:disabled) {
          opacity: 0.9;
        }

        .translate-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .translate-disclaimer {
          font-size: 0.85rem;
          color: var(--color-secondary-color);
          opacity: 0.8;
        }

        .article-content {
          color: var(--color-body);
          line-height: 1.8;
          font-size: 1.15rem;
        }

        .article-title {
          font-size: 2.8rem;
          font-weight: 800;
          color: var(--color-heading-color);
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .article-meta {
          font-size: 1.2rem;
          color: var(--color-secondary-color);
          margin-bottom: 3rem;
        }

        .section-h2 {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--color-heading-color);
          margin: 3.5rem 0 1.5rem 0;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--color-border-color);
        }

        .section-h3 {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--color-heading-color);
          margin: 2rem 0 1rem 0;
        }

        .section-h4 {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 0.75rem;
        }

        .section-p {
          margin-bottom: 1.5rem;
        }

        .article-list-ordered {
          list-style: none;
          padding: 0;
          margin-bottom: 2rem;
        }

        .article-list-ordered li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 1rem;
        }

        .list-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-primary);
          background: var(--color-tertiary-bg);
          padding: 2px 6px;
          border-radius: 4px;
          margin-top: 4px;
        }

        .article-list {
          margin-bottom: 2rem;
          padding-left: 1.5rem;
          list-style: decimal-leading-zero;
        }

        .article-list li {
          margin-bottom: 1rem;
          padding-left: 0.5rem;
        }

        .vocab-table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          font-size: 1.05rem;
        }

        .vocab-table th, .vocab-table td {
          padding: 1rem;
          border: 1px solid var(--color-border-color);
          text-align: left;
        }

        .vocab-table th {
          background: var(--color-tertiary-bg);
          font-weight: 700;
          color: var(--color-heading-color);
        }

        .analysis-box {
          background: var(--color-tertiary-bg);
          padding: 2rem;
          border-radius: 12px;
          margin: 2rem 0;
          border-left: 6px solid var(--color-primary);
        }

        .example-box {
          background: var(--color-secondary-bg);
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px dashed var(--color-border-color);
        }

        @media (max-width: 768px) {
          .article-title { font-size: 2.2rem; }
          .article-content { font-size: 1.1rem; }
          .vocab-table { font-size: 0.95rem; }
        }

      `}</style>
    </>
  );
}

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: { sitekey: string; callback: (token: string) => void }) => void;
      reset: () => void;
    };
  }
}
