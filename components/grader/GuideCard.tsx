interface Props { subject: 'english' | 'chinese' }

const STEPS = {
  english: [
    { title: '貼上題目同你嘅作文', body: '輸入 HKDSE Paper 2 Part A 或 Part B 題目（重要！）加你寫嘅文（50–2000 字）。' },
    { title: 'AI 按官方準則評分', body: '按 HKEAA Content / Language / Organisation 0–7 標準評分。離題會自動扣分。' },
    { title: '收到詳細反饋', body: '每範疇品第、段落點評、文法/詞彙錯誤、用詞升級、升呢行動建議。' },
  ],
  chinese: [
    { title: '貼上題目同你嘅作文', body: '輸入 DSE 中文卷二題目（重要！）加你寫嘅作文（100–2200 字）。' },
    { title: 'AI 按官方準則評分', body: '內容 /40 · 表達 /30 · 結構 /20 · 標點 /10 · 錯別字 /3。離題自動扣分。' },
    { title: '收到詳細反饋', body: '逐範疇品第、段落點評、病句修正、用詞建議、升呢行動建議。' },
  ],
};

export default function GuideCard({ subject }: Props) {
  const steps = STEPS[subject];
  return (
    <div className="gd-card">
      <h3 className="gd-h3 gd-h3-center">使用方法 How it works</h3>
      <div className="gd-guide-steps">
        {steps.map((s, i) => (
          <div key={i} className="gd-guide-step">
            <div className="gd-guide-hd">
              <span className="gd-guide-num">{i + 1}</span>
              <span className="gd-guide-title">{s.title}</span>
            </div>
            <div className="gd-guide-body">{s.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
