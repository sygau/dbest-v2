import Head from ‘next/head’;
import { useEffect, useMemo, useRef, useState } from ‘react’;
import {
generateIndividualResponseStructuredData,
getMainPageMetadata
} from ‘../utils/structuredData’;

const DSE_QUESTIONS = [
{ “id”: 1, “level”: “Easy”, “text”: “Do you like people taking photographs of you?” },
{ “id”: 2, “level”: “Easy”, “text”: “What do you like about the area you live in?” },
{ “id”: 3, “level”: “Easy”, “text”: “Do you spend much time online?” },
{ “id”: 4, “level”: “Easy”, “text”: “Have you ever been to a wedding?” },
{ “id”: 5, “level”: “Easy”, “text”: “Do you ever shop online?” },
{ “id”: 6, “level”: “Medium”, “text”: “What photographs do you like to share?” },
{ “id”: 7, “level”: “Medium”, “text”: “What types of shops are typical of old neighbourhoods?” },
{ “id”: 8, “level”: “Hard”, “text”: “Why is the number of online crimes increasing?” },
{ “id”: 9, “level”: “Hard”, “text”: “Is the redevelopment of old areas too slow in Hong Kong?” },
{ “id”: 10, “level”: “Medium”, “text”: “Would you like to spend a lot of money on a wedding?” },
{ “id”: 11, “level”: “Easy”, “text”: “What is your favourite subject at school?” },
{ “id”: 12, “level”: “Easy”, “text”: “Do you prefer to exercise alone or with friends?” },
{ “id”: 13, “level”: “Medium”, “text”: “What are the advantages of living near a MTR station?” },
{ “id”: 14, “level”: “Easy”, “text”: “How do you usually spend your weekends?” },
{ “id”: 15, “level”: “Medium”, “text”: “Would you prefer to live in an old building or a new one?” },
{ “id”: 16, “level”: “Hard”, “text”: “Who benefits most from new shopping malls in a district?” },
{ “id”: 17, “level”: “Easy”, “text”: “Do you like listening to music while you study?” },
{ “id”: 18, “level”: “Medium”, “text”: “What kind of fast food is most popular with teenagers?” },
{ “id”: 19, “level”: “Medium”, “text”: “Is it better to travel by bus or by train in Hong Kong?” },
{ “id”: 20, “level”: “Hard”, “text”: “Should schools be responsible for teaching children about online safety?” },
{ “id”: 21, “level”: “Easy”, “text”: “What do you usually do when you get home from school?” },
{ “id”: 22, “level”: “Easy”, “text”: “Have you ever tried any extreme sports?” },
{ “id”: 23, “level”: “Medium”, “text”: “What makes a good neighbor?” },
{ “id”: 24, “level”: “Medium”, “text”: “Why do some people prefer to buy second-hand goods?” },
{ “id”: 25, “level”: “Hard”, “text”: “Do you think social media makes people feel more lonely?” },
{ “id”: 26, “level”: “Easy”, “text”: “Do you like to celebrate your birthday with a big party?” },
{ “id”: 27, “level”: “Easy”, “text”: “Which season do you like the most?” },
{ “id”: 28, “level”: “Medium”, “text”: “What are the most important things to take when you go on holiday?” },
{ “id”: 29, “level”: “Medium”, “text”: “Should students be allowed to choose their own school uniforms?” },
{ “id”: 30, “level”: “Hard”, “text”: “Is it possible to make real friends on the internet?” },
{ “id”: 31, “level”: “Easy”, “text”: “Do you prefer reading e-books or printed books?” },
{ “id”: 32, “level”: “Easy”, “text”: “What is the best gift you have ever received?” },
{ “id”: 33, “level”: “Medium”, “text”: “Why do many people like to keep pets in small apartments?” },
{ “id”: 34, “level”: “Medium”, “text”: “What can we do to reduce plastic waste in our daily lives?” },
{ “id”: 35, “level”: “Hard”, “text”: “Do you think teenagers in Hong Kong have enough pocket money?” },
{ “id”: 36, “level”: “Easy”, “text”: “What is your favourite snack?” },
{ “id”: 37, “level”: “Easy”, “text”: “Do you like watching reality TV shows?” },
{ “id”: 38, “level”: “Medium”, “text”: “What are the benefits of learning a foreign language?” },
{ “id”: 39, “level”: “Medium”, “text”: “Would you prefer to work in an office or outdoors?” },
{ “id”: 40, “level”: “Hard”, “text”: “Should the government ban cars from busy shopping areas?” },
{ “id”: 41, “level”: “Easy”, “text”: “Who is your favourite singer or band?” },
{ “id”: 42, “level”: “Easy”, “text”: “Do you enjoy cooking for your family?” },
{ “id”: 43, “level”: “Medium”, “text”: “What are the difficulties of living in a crowded city?” },
{ “id”: 44, “level”: “Medium”, “text”: “Why do some students find it hard to wake up early?” },
{ “id”: 45, “level”: “Hard”, “text”: “Is it important to preserve traditional customs in a modern city?” },
{ “id”: 46, “level”: “Easy”, “text”: “Do you like to go to the cinema or watch movies at home?” },
{ “id”: 47, “level”: “Easy”, “text”: “What is the most interesting place you have visited in Hong Kong?” },
{ “id”: 48, “level”: “Medium”, “text”: “How can we encourage more people to use public libraries?” },
{ “id”: 49, “level”: “Medium”, “text”: “Should primary school students have less homework?” },
{ “id”: 50, “level”: “Hard”, “text”: “What kinds of people are likely to be cheated online?” },
{ “id”: 51, “level”: “Easy”, “text”: “What do you like to do on rainy days?” },
{ “id”: 52, “level”: “Easy”, “text”: “Do you prefer to use a laptop or a smartphone for schoolwork?” },
{ “id”: 53, “level”: “Medium”, “text”: “What are the advantages of eating at home?” },
{ “id”: 54, “level”: “Medium”, “text”: “Why do many people enjoy hiking at the weekend?” },
{ “id”: 55, “level”: “Hard”, “text”: “Do you think artificial intelligence will change the way we learn?” },
{ “id”: 56, “level”: “Easy”, “text”: “What is your favourite type of food?” },
{ “id”: 57, “level”: “Easy”, “text”: “Do you like to wear fashionable clothes?” },
{ “id”: 58, “level”: “Medium”, “text”: “What are the disadvantages of shopping online?” },
{ “id”: 59, “level”: “Medium”, “text”: “Should schools provide more sports facilities for students?” },
{ “id”: 60, “level”: “Hard”, “text”: “Are weddings still important in Hong Kong?” },
{ “id”: 61, “level”: “Easy”, “text”: “What is your favourite sport to watch?” },
{ “id”: 62, “level”: “Easy”, “text”: “Do you prefer to travel to cold or warm countries?” },
{ “id”: 63, “level”: “Medium”, “text”: “What are the qualities of a good teacher?” },
{ “id”: 64, “level”: “Medium”, “text”: “Why do some people prefer to live alone?” },
{ “id”: 65, “level”: “Hard”, “text”: “Who should be blamed for online scams?” },
{ “id”: 66, “level”: “Easy”, “text”: “What do you like to do during the school holidays?” },
{ “id”: 67, “level”: “Easy”, “text”: “Do you have a part-time job?” },
{ “id”: 68, “level”: “Medium”, “text”: “What can students learn from taking part in community service?” },
{ “id”: 69, “level”: “Medium”, “text”: “Is it better to stay in a hotel or a youth hostel when traveling?” },
{ “id”: 70, “level”: “Hard”, “text”: “Should the legal age for smoking be increased?” },
{ “id”: 71, “level”: “Easy”, “text”: “What is the best way to relax after an exam?” },
{ “id”: 72, “level”: “Easy”, “text”: “Do you like to read newspapers?” },
{ “id”: 73, “level”: “Medium”, “text”: “What are the most popular tourist attractions in Hong Kong?” },
{ “id”: 74, “level”: “Medium”, “text”: “Why do some teenagers want to become famous on social media?” },
{ “id”: 75, “level”: “Hard”, “text”: “Do you think young people show enough respect to the elderly?” },
{ “id”: 76, “level”: “Easy”, “text”: “What do you usually eat for breakfast?” },
{ “id”: 77, “level”: “Easy”, “text”: “Do you enjoy going to museums?” },
{ “id”: 78, “level”: “Medium”, “text”: “What are the pros and cons of living in a high-rise building?” },
{ “id”: 79, “level”: “Medium”, “text”: “Should every student learn how to play a musical instrument?” },
{ “id”: 80, “level”: “Hard”, “text”: “Is it a good idea to have more 24-hour shops in Hong Kong?” },
{ “id”: 81, “level”: “Easy”, “text”: “What is your favourite way to travel around Hong Kong?” },
{ “id”: 82, “level”: “Easy”, “text”: “Do you like to go to the beach in summer?” },
{ “id”: 83, “level”: “Medium”, “text”: “What are the skills every teenager should learn?” },
{ “id”: 84, “level”: “Medium”, “text”: “Why do people like to take selfies?” },
{ “id”: 85, “level”: “Hard”, “text”: “Should the government provide more subsidies for low-income families?” },
{ “id”: 86, “level”: “Easy”, “text”: “What is your favourite animal?” },
{ “id”: 87, “level”: “Easy”, “text”: “Do you prefer to study in a group or by yourself?” },
{ “id”: 88, “level”: “Medium”, “text”: “What are the challenges of moving to a new district?” },
{ “id”: 89, “level”: “Medium”, “text”: “Is it better to have a small family or a big family?” },
{ “id”: 90, “level”: “Hard”, “text”: “Are professionally taken photos still important nowadays?” },
{ “id”: 91, “level”: “Easy”, “text”: “What do you usually do on Friday nights?” },
{ “id”: 92, “level”: “Easy”, “text”: “Do you like to go to theme parks?” },
{ “id”: 93, “level”: “Medium”, “text”: “What are the advantages of using a credit card?” },
{ “id”: 94, “level”: “Medium”, “text”: “Why is it important to have a balanced diet?” },
{ “id”: 95, “level”: “Hard”, “text”: “Should students be required to wear masks in public places?” },
{ “id”: 96, “level”: “Easy”, “text”: “What is your favourite hobby?” },
{ “id”: 97, “level”: “Easy”, “text”: “Do you prefer to use WhatsApp or talk on the phone?” },
{ “id”: 98, “level”: “Medium”, “text”: “What can we do to make our city cleaner?” },
{ “id”: 99, “level”: “Medium”, “text”: “Would you like to study overseas in the future?” },
{ “id”: 100, “level”: “Hard”, “text”: “What would you like to change about your district?” }
];

const FAQS = [
{
id: ‘f1’,
question: ‘DSE 英文口試 Individual Response 係點考法？’,
answer: ‘考生會獨立回答考官提問，唔需要同其他同學討論。考官會就某個社會議題或日常話題發問，考生需要即場表達個人意見並作出解釋，時間大約係 1 分鐘左右。’
},
{
id: ‘f2’,
question: ‘Individual Response 評分係睇咩？’,
answer: ‘DSE 英文口試主要評核四個範疇：pronunciation & delivery（發音流暢度）、communication strategies（溝通技巧）、vocabulary & language patterns（詞彙運用）、ideas & organisation（內容組織）。流暢同清晰比講得複雜更重要。’
},
{
id: ‘f3’,
question: ‘唔識答某條題目點算？’,
answer: ‘唔好直接話「I don't know」然後停低。可以先講「That's an interesting question」爭取一兩秒思考，再從一個你識講嘅角度切入。即使答案唔完整，保持流暢同自信係最緊要。’
},
{
id: ‘f4’,
question: ‘練習 Individual Response 最有效嘅方法係咩？’,
answer: ‘最有效係計時練習——每次限 1 分鐘，模擬真實考試壓力。題目最好隨機抽，唔好每次都準備固定答案，因為考試當日題目係即場發問。練完之後可以錄音重聽，留意自己嘅停頓同語速。’
},
{
id: ‘f5’,
question: ‘Individual Response 同 Group Discussion 有咩分別？’,
answer: ‘Individual Response 係你一個人回答考官問題，唔需要理會其他考生。Group Discussion 就係幾個考生一齊討論，需要學識 agree / disagree、接話、引導討論等技巧。兩者評分側重點有所不同。’
}
];

function shuffleArray<T>(array: T[]): T[] {
const arr = […array];
for (let i = arr.length - 1; i > 0; i–) {
const j = Math.floor(Math.random() * (i + 1));
[arr[i], arr[j]] = [arr[j], arr[i]];
}
return arr;
}

// Estimate how long TTS will take for a given text, add 2s buffer
// Based on ~0.85 rate, ~130 words/min → ~460ms/word
function estimateSpeakDurationMs(text: string): number {
const wordCount = text.trim().split(/\s+/).length;
return Math.ceil((wordCount / 130) * 60 * 1000 / 0.85) + 2000;
}

const STORAGE_KEY = ‘dse-ir-state’;
type TimerState = ‘idle’ | ‘reading’ | ‘running’ | ‘finished’;
interface StoredState { queue: number[]; doneIds: number[]; }

export default function IndividualResponsePage() {
const metadata = useMemo(() => getMainPageMetadata(‘individual-response’), []);
const structuredData = useMemo(() => generateIndividualResponseStructuredData(), []);

const [timerState, setTimerState] = useState<TimerState>(‘idle’);
const [timeLeft, setTimeLeft] = useState(60);
const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
const [queue, setQueue] = useState<number[]>([]);
const [doneIds, setDoneIds] = useState<Set<number>>(new Set());
const [openFaq, setOpenFaq] = useState<string | null>(null);
// TTS toggle — default OFF so Safari users never hit the bug
const [ttsEnabled, setTtsEnabled] = useState(false);

const timerRef = useRef<NodeJS.Timeout | null>(null);
const audioContextRef = useRef<AudioContext | null>(null);
const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

useEffect(() => {
const loadVoices = () => {
const voices = speechSynthesis.getVoices();
if (voices.length > 0) voicesRef.current = voices;
};
loadVoices();
speechSynthesis.onvoiceschanged = loadVoices;
return () => { speechSynthesis.onvoiceschanged = null; };
}, []);

useEffect(() => {
try {
const stored = localStorage.getItem(STORAGE_KEY);
if (stored) {
const parsed: StoredState = JSON.parse(stored);
if (parsed.queue?.length > 0) setQueue(parsed.queue);
if (parsed.doneIds) setDoneIds(new Set(parsed.doneIds));
}
} catch (e) {}
}, []);

useEffect(() => {
if (queue.length > 0) {
localStorage.setItem(STORAGE_KEY, JSON.stringify({ queue, doneIds: Array.from(doneIds) }));
}
}, [queue, doneIds]);

useEffect(() => {
if (queue.length === 0) {
setQueue(shuffleArray(DSE_QUESTIONS).map(q => q.id));
}
}, [queue.length]);

useEffect(() => {
if (timerState === ‘running’ && timeLeft > 0) {
timerRef.current = setInterval(() => {
setTimeLeft(t => {
if (t <= 1) {
if (timerRef.current) clearInterval(timerRef.current);
setTimerState(‘finished’);
playBellSound();
markCurrentDone();
return 0;
}
return t - 1;
});
}, 1000);
}
return () => { if (timerRef.current) clearInterval(timerRef.current); };
}, [timerState]);

const currentQuestion = useMemo(() => {
if (currentQuestionId === null) return null;
return DSE_QUESTIONS.find(q => q.id === currentQuestionId) || null;
}, [currentQuestionId]);

const getAudioContext = () => {
if (!audioContextRef.current) {
audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
}
return audioContextRef.current;
};

const playBeep = () => {
try {
const ctx = getAudioContext();
const osc = ctx.createOscillator();
const gain = ctx.createGain();
osc.connect(gain); gain.connect(ctx.destination);
osc.frequency.value = 880; osc.type = ‘sine’;
gain.gain.setValueAtTime(0.3, ctx.currentTime);
gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.2);
} catch (e) {}
};

const playBellSound = () => {
try {
const ctx = getAudioContext();
[523.25, 392, 261.63].forEach((freq, i) => {
const osc = ctx.createOscillator();
const gain = ctx.createGain();
osc.connect(gain); gain.connect(ctx.destination);
osc.frequency.value = freq; osc.type = ‘sine’;
const t = ctx.currentTime + i * 0.25;
gain.gain.setValueAtTime(0.3, t);
gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
osc.start(t); osc.stop(t + 0.4);
});
} catch (e) {}
};

const markCurrentDone = () => {
if (currentQuestionId !== null) {
setDoneIds(prev => new Set(prev).add(currentQuestionId));
}
};

const drawNextQuestion = (doneSoFar: Set<number>): { id: number; newQueue: number[] } => {
const remaining = queue.filter(id => !doneSoFar.has(id));
if (remaining.length === 0) {
const newShuffled = shuffleArray(DSE_QUESTIONS).map(q => q.id);
return { id: newShuffled[0], newQueue: newShuffled.slice(1) };
}
return { id: remaining[0], newQueue: remaining.slice(1) };
};

// Resilient TTS: races against a hard timeout so Safari can never get stuck
const speakQuestionResilient = (text: string): Promise<void> => {
return new Promise((resolve) => {
const timeout = estimateSpeakDurationMs(text);
// Hard fallback — always resolves within estimated duration
const fallbackTimer = setTimeout(() => {
try { speechSynthesis.cancel(); } catch (e) {}
resolve();
}, timeout);

```
  try {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = voicesRef.current;
    const maleVoice = voices.find(v =>
      v.lang.startsWith('en') && (
        v.name.toLowerCase().includes('male') ||
        v.name.toLowerCase().includes('david') ||
        v.name.toLowerCase().includes('daniel') ||
        v.name.includes('Google UK English Male')
      )
    ) || voices.find(v => v.lang.startsWith('en')) || null;
    if (maleVoice) utterance.voice = maleVoice;
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.onend = () => { clearTimeout(fallbackTimer); resolve(); };
    utterance.onerror = () => { clearTimeout(fallbackTimer); resolve(); };
    speechSynthesis.speak(utterance);
  } catch (e) {
    clearTimeout(fallbackTimer);
    resolve();
  }
});
```

};

const handleStart = async () => {
const newDone = currentQuestionId !== null ? new Set(doneIds).add(currentQuestionId) : new Set(doneIds);
const { id, newQueue } = drawNextQuestion(newDone);

```
setCurrentQuestionId(id);
setQueue(newQueue);
if (currentQuestionId !== null) setDoneIds(newDone);

const questionText = DSE_QUESTIONS.find(q => q.id === id)?.text ?? '';

if (ttsEnabled) {
  setTimerState('reading');
  await speakQuestionResilient(questionText);
  playBeep();
}

setTimeLeft(60);
setTimerState('running');
```

};

const handleStop = () => {
if (timerRef.current) clearInterval(timerRef.current);
try { speechSynthesis.cancel(); } catch (e) {}
setTimerState(‘finished’);
markCurrentDone();
};

const handleNextQuestion = () => {
if (timerRef.current) clearInterval(timerRef.current);
try { speechSynthesis.cancel(); } catch (e) {}
markCurrentDone();
setCurrentQuestionId(null);
setTimerState(‘idle’);
setTimeLeft(60);
};

const formatTime = (seconds: number) => {
const m = Math.floor(seconds / 60);
const s = seconds % 60;
return `${m}:${s < 10 ? '0' : ''}${s}`;
};

const progressPercent = ((60 - timeLeft) / 60) * 100;
const isIdle = timerState === ‘idle’;
const isReading = timerState === ‘reading’;

const mainBtnLabel = () => {
if (isIdle) return ‘START’;
if (isReading) return ‘讀緊題目…’;
if (timerState === ‘running’) return ‘STOP’;
return ‘NEXT’;
};

const mainBtnAction = () => {
if (isIdle || timerState === ‘finished’) return handleStart();
if (timerState === ‘running’) return handleStop();
};

return (
<>
<Head>
<title>{metadata?.title || ‘DSE English Oral Individual Response 練習工具 | dse.best’}</title>
<meta name=“description” content={metadata?.description || ‘DSE 英文口試 Individual Response 免費練習工具，隨機抽題、語音朗讀、60秒計時，模擬真實考試環境。’} />
<meta name=“robots” content={metadata?.robots || ‘index, follow’} />
<meta property=“og:title” content={metadata?.ogTitle || ‘DSE Individual Response 練習工具’} />
<meta property=“og:description” content={metadata?.ogDescription || ‘’} />
<meta property=“og:image” content={metadata?.ogImage || ‘https://dse.best/assets/images/logo-icon.png’} />
<meta property=“og:url” content={metadata?.ogUrl || ‘https://dse.best/individual-response’} />
<meta property=“og:type” content={metadata?.ogType || ‘website’} />
<script type=“application/ld+json” dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
</Head>

```
  <div className="page-wrapper">
    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
      <div className="breadcrumb-title pe-3">工具</div>
      <div className="ps-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 p-0">
            <li className="breadcrumb-item active" aria-current="page">DSE Speaking Individual Response 練習工具</li>
          </ol>
        </nav>
      </div>
    </div>

    <div className="layout-center">
      <div className="content-stack">

        <div className="timer-card">
          {/* TTS Toggle — top right of card */}
          <div className="card-top-controls">
            <button
              className={`tts-toggle${ttsEnabled ? ' tts-on' : ''}`}
              onClick={() => setTtsEnabled(v => !v)}
              title={ttsEnabled ? '關閉朗讀' : '開啟朗讀'}
              aria-label="Toggle read aloud"
              aria-pressed={ttsEnabled}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                {ttsEnabled ? (
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                ) : (
                  <>
                    <line x1="23" y1="9" x2="17" y2="15"/>
                    <line x1="17" y1="9" x2="23" y2="15"/>
                  </>
                )}
              </svg>
              {ttsEnabled ? '朗讀 ON' : '朗讀 OFF'}
            </button>
          </div>

          <div className="card-header-block">
            <h1 className="card-title">Individual Response 練習工具</h1>
          </div>

          <div className={`question-container${isIdle ? ' question-idle' : ''}`}>
            {isIdle ? (
              <div className="question-idle-text">按 Start 隨機抽一條題目開始練習</div>
            ) : (
              <>
                <div className="question-id">#{currentQuestion?.id}</div>
                <div className="question-text">{currentQuestion?.text}</div>
              </>
            )}
          </div>

          <div className={`time-display${isReading ? ' time-reading' : ''}${timerState === 'finished' ? ' time-done' : ''}`}>
            {isReading ? '—' : formatTime(timeLeft)}
          </div>

          <div className="progress-track">
            <div className="progress-bar-inner" style={{ width: `${isIdle ? 0 : progressPercent}%` }} />
          </div>

          <div className="controls">
            <button
              className={`primary-btn${timerState === 'running' ? ' btn-stop' : ''}${isReading ? ' btn-reading' : ''}`}
              onClick={mainBtnAction}
              disabled={isReading}
            >
              {mainBtnLabel()}
            </button>

            {(timerState === 'running' || timerState === 'finished') && (
              <button className="icon-btn" onClick={handleNextQuestion} title="下一題" aria-label="Skip to next question">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 4 15 12 5 20 5 4"/>
                  <line x1="19" y1="5" x2="19" y2="19"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Footnote */}
        <p className="audio-footnote">
          * 朗讀功能依賴瀏覽器內置語音合成，部分裝置（尤其 Safari / iOS）可能出現聲音異常或不支援。如遇問題請關閉朗讀模式。
        </p>

        {/* FAQ */}
        <div className="faq-container">
          <p className="faq-label">DSE Speaking 常見問題</p>
          {FAQS.map(faq => (
            <div key={faq.id} className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                aria-expanded={openFaq === faq.id}
              >
                <span>{faq.question}</span>
                <svg
                  className={`faq-chevron${openFaq === faq.id ? ' open' : ''}`}
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              {openFaq === faq.id && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  </div>

  <style jsx>{`
    .page-wrapper { padding: 1rem; min-height: 80vh; }
    .layout-center { display: flex; justify-content: center; padding-top: 1rem; padding-bottom: 4rem; }
    .content-stack { width: 100%; max-width: 680px; display: flex; flex-direction: column; gap: 12px; }

    .timer-card {
      background: #ffffff;
      border-radius: 24px;
      padding: 2.25rem 2.5rem;
      box-shadow: 0 4px 24px rgba(0,0,0,0.07);
      display: flex;
      flex-direction: column;
      align-items: center;
      border-top: 5px solid #25D366;
      position: relative;
    }

    /* TTS toggle */
    .card-top-controls {
      position: absolute;
      top: 1.1rem;
      right: 1.25rem;
    }

    .tts-toggle {
      display: flex;
      align-items: center;
      gap: 5px;
      border: 1.5px solid #e5e7eb;
      background: #f9fafb;
      color: #9ca3af;
      border-radius: 99px;
      padding: 4px 10px 4px 8px;
      font-size: 0.72rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
      letter-spacing: 0.02em;
    }

    .tts-toggle.tts-on {
      border-color: #25D366;
      background: #f0fdf4;
      color: #128C7E;
    }

    .tts-toggle:hover { border-color: #25D366; color: #128C7E; }

    .card-header-block { text-align: center; margin-bottom: 1.5rem; width: 100%; margin-top: 0.5rem; }

    .card-title {
      font-size: 2.6rem;
      font-weight: 800;
      color: #111827;
      letter-spacing: -0.03em;
      line-height: 1.1;
      margin: 0;
    }

    .question-container {
      background: #dcfce7;
      border-left: 4px solid #25D366;
      border-radius: 0 12px 12px 0;
      padding: 1.35rem 1.6rem;
      width: 100%;
      margin-bottom: 1.5rem;
      min-height: 96px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .question-container.question-idle { background: #f9fafb; border-left-color: #d1d5db; }
    .question-idle-text { font-size: 1rem; color: #9ca3af; font-weight: 500; text-align: center; }
    .question-id { font-size: 0.8rem; color: #128C7E; font-weight: 700; margin-bottom: 0.5rem; letter-spacing: 0.05em; }
    .question-text { font-size: 1.15rem; color: #0f1724; line-height: 1.65; font-weight: 600; }

    .time-display {
      font-size: 5.5rem;
      font-weight: 800;
      color: #111827;
      font-variant-numeric: tabular-nums;
      letter-spacing: -3px;
      line-height: 1;
      margin-bottom: 1rem;
      transition: color 0.3s;
    }

    .time-reading { color: #d1d5db; letter-spacing: 0; font-size: 4rem; }
    .time-done { color: #25D366; }

    .progress-track { width: 100%; height: 14px; background: #f3f4f6; border-radius: 99px; overflow: hidden; margin-bottom: 1.75rem; }
    .progress-bar-inner { height: 100%; background: linear-gradient(90deg, #25D366, #128C7E); transition: width 1s linear; border-radius: 99px; }

    .controls { display: flex; align-items: center; gap: 10px; width: 100%; }

    .primary-btn {
      flex: 1;
      height: 52px;
      border: none;
      background: #25D366;
      color: #ffffff;
      font-size: 1rem;
      font-weight: 700;
      border-radius: 14px;
      cursor: pointer;
      letter-spacing: 0.04em;
      transition: background 0.15s;
    }

    .primary-btn:hover:not(:disabled) { background: #128C7E; }
    .primary-btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .primary-btn.btn-stop { background: #ef4444; color: #ffffff; }
    .primary-btn.btn-stop:hover:not(:disabled) { background: #dc2626; }
    .primary-btn.btn-reading { background: #9ca3af; color: #ffffff; cursor: not-allowed; }

    .icon-btn {
      width: 52px;
      height: 52px;
      border: 1.5px solid #e5e7eb;
      background: #ffffff;
      border-radius: 14px;
      color: #6b7280;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: border-color 0.15s, color 0.15s;
    }

    .icon-btn:hover:not(:disabled) { border-color: #25D366; color: #128C7E; }
    .icon-btn:disabled { opacity: 0.35; cursor: not-allowed; }

    /* Footnote */
    .audio-footnote {
      font-size: 0.75rem;
      color: #9ca3af;
      text-align: center;
      margin: 0;
      padding: 0 0.5rem;
      line-height: 1.5;
    }

    /* FAQ */
    .faq-container { background: #ffffff; border-radius: 20px; padding: 1.5rem 1.75rem; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
    .faq-label { font-size: 1.2rem; font-weight: 700; color: #111827; text-align: center; margin-bottom: 0.75rem; }
    .faq-item { border-bottom: 1px solid #f3f4f6; }
    .faq-item:last-child { border-bottom: none; }

    .faq-question {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      background: none;
      border: none;
      padding: 1rem 0;
      text-align: left;
      font-size: 0.95rem;
      font-weight: 600;
      color: #111827;
      cursor: pointer;
      line-height: 1.5;
    }

    .faq-question:hover { color: #128C7E; }
    .faq-chevron { flex-shrink: 0; color: #9ca3af; transition: transform 0.2s; }
    .faq-chevron.open { transform: rotate(180deg); color: #25D366; }
    .faq-answer { font-size: 0.88rem; color: #4b5563; line-height: 1.7; padding-bottom: 1rem; }

    @media (max-width: 480px) {
      .timer-card { padding: 1.5rem; }
      .time-display { font-size: 4.5rem; }
      .card-title { font-size: 1.9rem; }
    }
  `}</style>
</>


);
}