export interface FAQItem {
  id: string
  question: string
  answer: string
}

export const homepageFAQs: FAQItem[] = [
  {
    id: 'faq1',
    question: 'DSEBest 係咩平台？有咩資源？',
    answer: 'DSEBest（dse.best）係一個專為香港中學文憑試（HKDSE）學生而設嘅 <strong>免費網上平台</strong>，提供歷屆試題、溫習筆記、模擬試卷同教育博客文章等實用學習資源。'
  },
  {
    id: 'faq2',
    question: '「dse.life」停咗，點解喺 DSEBest 仲搵到啲文件？',
    answer: '我哋已經將 <strong>dse.life backup</strong> 嘅所有公開資源妥善備份並整合到 DSEBest，確保同學依然可以免費存取重要嘅 DSE 資料。'
  },
  {
    id: 'faq3',
    question: '點樣下載 PDF 試卷同答案？',
    answer: '喺各科頁面揀選年份後，直接按「下載」或「查看」按鈕即可開啟或下載 PDF 試卷／答案檔案，毋須登入。'
  },
  {
    id: 'faq4',
    question: '可唔可以離線瀏覽？',
    answer: 'DSEBest 個 <abbr title="Progressive Web App">PWA</abbr>，只要你用 Chrome 或 Safari 加到主畫面，網站就會自動快取資源，離線都能睇到以往載入過嘅內容。'
  },
  {
    id: 'faq5',
    question: 'DSEBest 嘅資源幾時會更新？',
    answer: '我哋會定期更新 DSEBest 嘅試題、答案同學習資源，確保內容最新最齊全。一般每月都會有新資料或功能加入，歡迎大家多啲留意網站公告或追蹤我哋嘅社交平台獲取最新消息。'
  }
] 