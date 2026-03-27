# 十二篇範文語譯練習 (12 Passages Word Meaning Drill)

## 📚 Overview

An interactive learning feature for HKDSE Chinese students to practice and memorize word meanings from the 12 designated passages (十二篇範文).

**Live Path:** `dse.best/12p/`

## 🎯 Features

### 1. **Study Mode** (`/12p/study`)
- Flashcard-style learning interface
- Click to flip cards (front: sentence with highlighted word, back: meaning + notes)
- Keyboard navigation support (← → arrows)
- Progress tracking
- Select specific passages or study all

### 2. **Quiz Mode** (`/12p/quiz`)
- Interactive self-testing with text input
- Real-time answer validation
- Multiple acceptable answers support
- Options to skip or reveal answers
- Time-limited mode (optional)
- Comprehensive results page with statistics
- Color-coded feedback (correct/incorrect/skipped)

### 3. **Main Landing Page** (`/12p/`)
- Overview of both modes
- List of all 12 passages with emojis
- Usage tips

## 📂 File Structure

```
public/12p/
├── config.json          # Passage configuration
├── lunyu.json          # 《論語》
├── mengzi.json         # 《孟子》
├── zhuangzi.json       # 《莊子》
├── xunzi.json          # 《荀子》
├── lianpolin.json      # 《廉頗藺相如列傳》
├── chusibiao.json      # 《出師表》
├── shishuo.json        # 《師說》
├── shidexishan.json    # 《始得西山宴遊記》
├── yueyanglouj.json    # 《岳陽樓記》
├── liuguolun.json      # 《六國論》
├── shi3.json           # 詩三首
└── ci3.json            # 詞三首

pages/12p/
├── index.tsx           # Landing page
├── study.tsx           # Study mode
└── quiz.tsx            # Quiz mode

components/
└── Flashcard.tsx       # Reusable flashcard component

types/
└── 12p.ts              # TypeScript interfaces
```

## 🔧 Data Structure

### Question Format (JSON)
```json
{
  "id": "unique-id",
  "sentence": "句子內容{{目標詞語}}其他內容",
  "target": "目標詞語",
  "meaning": "詞語解釋",
  "acptAns": ["答案1", "答案2", "答案3"],
  "notes": "補充說明（如：通假字、古今異義）"
}
```

### Passage Configuration
```json
{
  "id": "passage-id",
  "title": "《篇章名稱》",
  "subtitle": "作者或補充資訊",
  "file": "filename.json",
  "emoji": "📚"
}
```

## 💡 Key Features Implementation

### 1. **Highlighting System**
- Uses `{{word}}` markers in sentences
- Automatically renders as highlighted `<mark>` elements
- Consistent across both study and quiz modes

### 2. **Answer Validation**
- Normalizes answers (trim, lowercase, remove spaces)
- Checks against multiple acceptable answers
- Case-insensitive matching

### 3. **Quiz Logic**
- **Correct answer**: Auto-advance after 800ms with success feedback
- **Incorrect answer**: Show error, offer "Skip" or "Reveal Answer" options
- **Skip**: Mark as skipped, move to next question
- **Reveal Answer**: Show full answer with notes, mark as incorrect

### 4. **Progress Tracking**
- Visual progress bar
- Circular progress indicator in quiz mode
- Question counter (X / Total)

### 5. **Timer System**
- Optional time-limited mode
- Countdown display
- Auto-submit when time expires
- Warning color when < 60 seconds remaining

### 6. **Results Page**
- Overall statistics (score %, correct, incorrect, skipped)
- Time taken
- Detailed question-by-question review
- Color-coded results (green/red/yellow)
- Shows user's answer vs correct answer

## 🎨 UI/UX Features

- **Responsive Design**: Works on all devices
- **iOS Font Size**: 16px minimum to prevent zoom on iOS/iPadOS
- **Theme Compatible**: Works with site's existing themes
- **Cantonese Interface**: Traditional Chinese with appropriate emojis
- **Zen Mode**: Clean, distraction-free interface
- **Keyboard Support**: Arrow keys for navigation in study mode
- **Enter Key**: Submit answers in quiz mode
- **Auto-focus**: Input field automatically focused

## 📱 Mobile Optimization

- Touch-friendly card flipping
- Responsive grid layouts
- Optimized font sizes for mobile
- Prevents zoom on input focus (16px minimum)

## 🚀 Usage

### Adding New Questions

1. Open the relevant JSON file in `/public/12p/`
2. Add a new question object following the format:
```json
{
  "id": "passage-unique-number",
  "sentence": "完整句子{{目標詞}}內容",
  "target": "目標詞",
  "meaning": "解釋",
  "acptAns": ["答案1", "答案2"],
  "notes": "補充說明"
}
```

### Adding New Passages

1. Create a new JSON file in `/public/12p/`
2. Add passage configuration to `config.json`
3. Questions will automatically appear in both modes

## 🔍 Technical Details

- **Framework**: Next.js with TypeScript
- **Styling**: Bootstrap 5 + Custom CSS
- **Data Loading**: Static Site Generation (SSG)
- **State Management**: React hooks (useState, useEffect)
- **No Server Logic**: Pure client-side functionality
- **Data Storage**: JSON files in public directory

## 📊 Sample Data Included

Each passage includes 8 sample questions covering:
- Common vocabulary
- Classical Chinese terms
- Idioms (成語)
- Homophonic substitutions (通假字)
- Ancient vs modern meanings (古今異義)
- Author-specific notes

## 🎓 Educational Value

- **Spaced Repetition**: Quiz mode encourages active recall
- **Immediate Feedback**: Instant validation helps learning
- **Context Learning**: Words shown in original sentence context
- **Multiple Attempts**: Students can retry incorrect answers
- **Comprehensive Review**: Results page for post-quiz analysis

## 🔮 Future Enhancements (Optional)

- [ ] Save progress to localStorage
- [ ] Track performance over time
- [ ] Difficulty levels
- [ ] Audio pronunciation
- [ ] Bookmark difficult questions
- [ ] Export results as PDF
- [ ] Leaderboard system
- [ ] Dark mode optimization

## 📝 Notes

- All 12 passages are included with sample questions
- 詩三首 and 詞三首 are handled as separate passages with author attribution in notes
- Answer validation is flexible to accept multiple correct forms
- Interface is primarily in Traditional Chinese (Cantonese) for target audience
