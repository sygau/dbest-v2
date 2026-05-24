import type { FAQEntry } from '../../utils/faqSchema'

export const pageFaqs: Record<string, FAQEntry[]> = {
  homepage: [
    { q: 'dse.best提供哪些科目的歷屆試題？', a: 'dse.best提供全面的DSE歷屆試題，包括核心科目（中文、英文、數學）和選修科目（物理、化學、生物、ICT、M1、M2、地理、歷史、中國歷史、經濟、BAFS等），涵蓋2012年至今的完整試題及答案。' },
    { q: '如何下載DSE歷屆試題？', a: '進入相應科目頁面，按年份選擇試題，點擊下載按鈕即可取得PDF格式的試題及答案。所有試題均免費提供，無需註冊即可下載。' },
    { q: 'Where can I find free HKDSE past papers?', a: 'dse.best offers free HKDSE past papers from 2012 to 2025 for all subjects including Chinese, English, Mathematics, Physics, Chemistry, Biology, ICT, M1/M2, Geography, History, Chinese History, Economics, BAFS and Citizenship and Social Development. No registration required — select a subject and year to download the PDF instantly.' },
    { q: 'What tools does dse.best offer for DSE exam preparation?', a: 'dse.best provides: (1) Past papers for all HKDSE subjects (2012–2025); (2) JUPAS admission calculator covering 381+ university programmes; (3) Grade cut-off scores (2012–2025); (4) DSE countdown timer; (5) 2027 exam timetable; (6) UCAS Tariff Points converter for UK university applications; (7) English vocabulary bank for Paper 2 & 4; (8) DSE Pomodoro study timer; (9) English oral Individual Response practice tool; (10) study blog with exam guides and tips. All tools are free.' },
    { q: 'What is HKDSE?', a: 'HKDSE (Hong Kong Diploma of Secondary Education) is the public examination sat by Form 6 students in Hong Kong, administered by the Hong Kong Examinations and Assessment Authority (HKEAA). It consists of four core subjects (Chinese, English, Mathematics, and Citizenship and Social Development) plus elective subjects. Results are used for JUPAS university admission in Hong Kong and are recognised for UK university applications via UCAS Tariff Points.' },
    { q: 'dse.best與其他網站有什麼不同？', a: 'dse.best提供最完整的DSE歷屆試題資源，按科目和年份清晰分類，支援快速搜尋。網站同時提供JUPAS計算機、Cut-off分數查詢、考試倒數、英文詞彙庫等一站式學習工具，完全免費，無需登入。' },
  ],

  countdown: [
    { q: 'DSE 2027考試日期是什麼時候？', a: 'DSE 2027考試預計於2027年4月至5月舉行，具體日期由香港考試及評核局(HKEAA)公佈。請查閱dse.best/timetable獲取最新2027年DSE考試時間表。' },
    { q: 'When does DSE 2027 start?', a: 'The 2027 Hong Kong Diploma of Secondary Education (HKDSE) written examinations are estimated to begin in early April 2027 and end by early May 2027. The official timetable is published by the Hong Kong Examinations and Assessment Authority (HKEAA). Check dse.best/timetable for subject-by-subject dates.' },
    { q: 'How many days until DSE 2027?', a: 'The live countdown on this page shows the exact days, hours, minutes and seconds remaining until the estimated start of the 2027 HKDSE examination. The countdown updates in real time.' },
    { q: '如何有效利用倒數時間準備DSE？', a: '建議制定詳細的溫習計劃，按科目和課題分配時間。多做歷屆試題，掌握出題模式。保持規律作息，適當休息，確保身心健康。可配合dse.best的番茄鐘計時器安排學習節奏。' },
    { q: 'What subjects are in the HKDSE exam?', a: 'HKDSE includes four compulsory core subjects (Chinese Language, English Language, Mathematics Compulsory Part, and Citizenship and Social Development) and elective subjects such as Physics, Chemistry, Biology, ICT, Mathematics Extended Module 1 (M1), Mathematics Extended Module 2 (M2), Geography, History, Chinese History, Economics, BAFS, Tourism and Hospitality Studies, Visual Arts, and more.' },
  ],

  countdown2027: [
    { q: 'DSE 2027考試日期是什麼時候？', a: 'DSE 2027考試日期尚未由香港考試及評核局(HKEAA)正式公佈。根據2026年考試日期推算，預計於2027年4月至5月舉行。考生應密切關注官方公佈的考試時間表。' },
    { q: '2027年DSE考試日期確定了嗎？', a: '目前2027年DSE考試日期尚未正式公佈。此倒數計時器基於2026年考試日期推算，實際日期可能有所不同。請以香港考試及評核局官方公佈為準。' },
    { q: '如何有效利用倒數時間準備DSE？', a: '建議制定詳細的溫習計劃，按科目和課題分配時間。多做歷屆試題，掌握出題模式。保持規律作息，適當休息，確保身心健康。' },
    { q: 'DSE考試包括哪些科目？', a: 'DSE包括核心科目（中文、英文、數學、公民與社會發展）和選修科目（物理、化學、生物、ICT、M1、M2、地理、歷史、中國歷史、經濟、BAFS等）。' },
  ],

  jupas: [
    { q: 'What is JUPAS?', a: 'JUPAS (Joint University Programmes Admissions System) is the centralised university admission system in Hong Kong. It covers eight publicly-funded universities: HKU, CUHK, HKUST, CityU, PolyU, HKBU, EdUHK and LingU, as well as HKMU. Students apply through JUPAS using their HKDSE results to gain admission to undergraduate degree programmes.' },
    { q: 'How does JUPAS admission scoring work?', a: 'Each university uses its own weighted scoring formula. HKU, CUHK, HKUST, CityU and PolyU use the Enhanced Scale (5** = 8.5 points), while HKBU, EdUHK, LingU and HKMU use the Standard Scale (5** = 7 points). Most programmes calculate Best 5 or Best 6 subjects, with subject-specific weightings. Some universities offer a 6th subject bonus. Flexible admission allows borderline applicants who fall one grade short to still be considered.' },
    { q: 'JUPAS 計算機點計我嘅入學機會？', a: '計算機會將你嘅 DSE 成績，按每間大學嘅官方計分公式換算成分數，再同該課程過去三年（2023–2025）嘅收生分數比較，分成「大機會 / 博得過 / 邊緣 / 機率低 / 唔達標」五個等級。' },
    { q: '點解唔同大學算出嚟嘅分數唔一樣？', a: 'JUPAS 並冇單一計分制。HKU、CUHK、HKUST、CityU、PolyU 用增強尺（5** = 8.5 分），HKBU、EdUHK、嶺大、都大用標準尺（5** = 7 分）；加上每間大學嘅 Best N、科目權重、第六科加分機制都唔同，所以同一份成績喺唔同課程會得出唔同分數。' },
    { q: '咩係彈性收生（Flexible Admissions）？', a: '若你只差一科、一個等級未達課程最低要求，部分大學容許「彈性收生」破格考慮。dse.best JUPAS計算機會自動套用各校嘅彈性收生規則，並喺合資格嘅課程標示「彈性收生」。' },
    { q: 'Which Hong Kong universities use the JUPAS system?', a: 'The main JUPAS universities are HKU (University of Hong Kong), CUHK (Chinese University of Hong Kong), HKUST (Hong Kong University of Science and Technology), CityU (City University of Hong Kong), PolyU (Hong Kong Polytechnic University), HKBU (Hong Kong Baptist University), EdUHK (Education University of Hong Kong), LingU (Lingnan University), and HKMU (Hong Kong Metropolitan University).' },
  ],

  'jupas-calculator': [
    { q: 'How do I calculate my JUPAS admission chances?', a: 'Enter your DSE subject grades on dse.best/jupas/calculator. The tool applies each university\'s official weighted scoring formula — including Enhanced Scale vs Standard Scale, Best 5 or Best 6, subject weightings, and 6th-subject bonus rules — and compares your score against 2023–2025 historical admission data (Lower Quartile, Median, Upper Quartile) for 381+ programmes. Results are categorised as High Chance, Worth Trying, Borderline, Low Chance, or Below Threshold.' },
    { q: 'What DSE grades do I need for HKU, CUHK or HKUST?', a: 'Admission requirements vary by programme and year. Generally, competitive programmes at HKU, CUHK and HKUST require DSE Best 5 scores in the range of 22–28 points on the Enhanced Scale. Use dse.best/jupas/calculator to enter your actual grades and see programme-specific chances with historical LQ/Median/UQ data from 2023–2025.' },
    { q: 'What is the difference between Enhanced Scale and Standard Scale in JUPAS?', a: 'The Enhanced Scale awards higher points for top DSE grades: 5** = 8.5, 5* = 7, 5 = 5.5, 4 = 4, 3 = 3, 2 = 2, 1 = 1. It is used by HKU, CUHK, HKUST, CityU and PolyU. The Standard Scale uses 5** = 7, 5* = 6, 5 = 5, 4 = 4, 3 = 3, 2 = 2, 1 = 1. It is used by HKBU, EdUHK, LingU and HKMU. The same DSE results score higher on the Enhanced Scale, widening gaps between top students.' },
    { q: 'JUPAS計算機係咪官方工具？', a: 'dse.best JUPAS計算機係非官方工具，由我哋根據各院校公開嘅計分公式及歷年收生資料建立。結果僅供參考，落實揀科前請務必到各院校官方網站及JUPAS官方計算機查證最新課程要求。' },
    { q: '幾多 DSE 分可以入讀本地大學？', a: '各院校及課程要求不同。一般而言，以增強尺 Best 5 計算，HKU、CUHK、HKUST 熱門課程中位數約在 24–28 分之間；CityU、PolyU 熱門課程約 20–25 分；HKBU、EdUHK、嶺大、都大部分課程 Best 5 約 16–22 分。輸入實際成績到計算機可獲準確估算。' },
    { q: 'Does the JUPAS calculator cover all 8 universities?', a: 'Yes, the dse.best JUPAS calculator covers programmes from all major JUPAS institutions: HKU, CUHK, HKUST, CityU, PolyU, HKBU, EdUHK, LingU, and HKMU — totalling 381+ programmes. The tool applies the official scoring formula for each university including subject weights, Best N rules, 6th subject bonus, and flexible admission policies.' },
  ],

  vocab: [
    { q: 'What vocabulary should I study for DSE English Paper 2?', a: 'For DSE English Paper 2 (Writing), focus on topic-specific vocabulary for common essay themes such as environment, technology, social issues, education, health and current affairs. Useful categories include collocations (word pairs), phrasal verbs, idioms, formal transition phrases, and sentence structures that elevate your writing level. dse.best vocab bank covers all major DSE writing topics with flashcard and table study modes.' },
    { q: 'How can I improve my vocabulary for DSE English?', a: 'Study topic-grouped vocabulary sets covering common DSE essay themes. Practice using words in full sentences, not just memorising definitions. Use flashcards to test recall. Focus on collocations and phrases rather than isolated words — examiners reward natural, idiomatic language. The dse.best vocab bank is organised by topic and supports flip-card learning, pronunciation playback and bookmarking.' },
    { q: 'DSE英文Paper 2寫作要用咩詞彙？', a: 'DSE英文Paper 2評核重點包括詞彙範圍（range of vocabulary）同準確性。建議掌握以下詞彙：時事議題詞彙（環境、科技、社會問題）、寫作模板同連接詞、升呢用字（替代常見字）、同義詞組、成語及句式。dse.best詞彙庫按主題分類，提供翻卡學習同發音功能。' },
    { q: 'How many vocabulary sets are in the dse.best vocab bank?', a: 'The dse.best vocab bank covers multiple DSE English writing and speaking topics across a growing collection of sets, organised into themed sections. Each set includes vocabulary items with definitions, example usage, pronunciation, and supports flip-card mode, table mode, bookmarking and search.' },
    { q: 'DSE英文詞彙庫適合Paper 4口試嗎？', a: '適合。詞彙庫涵蓋時事議題（適合DSE英文Paper 4 Group Discussion及Individual Response用語）、觀點表達詞組及句式，幫助你喺口試時流暢地表達意見，避免用詞重複。建議配合Individual Response練習工具一起使用。' },
  ],

  'calculator-programmes': [
    { q: 'Are calculator programs allowed in the DSE exam?', a: 'Yes, HKEAA-approved calculators including the Casio fx-50FH, Casio fx-50FH II and Casio fx-3650P are permitted in DSE Mathematics (Compulsory Part, M1 and M2) examinations. Pre-programmed user programs stored in the calculator memory are allowed. Students commonly program equations and formulas to speed up calculations during the exam.' },
    { q: 'What Casio calculator programmes are useful for DSE Maths?', a: 'Commonly used DSE Maths calculator programmes include: simultaneous equations (2x2 and 3x3), quadratic equation solver, cubic equation solver, statistical variance and standard deviation, coordinate geometry formulas, polar-rectangular conversion, and sum/difference of arithmetic/geometric sequences. The dse.best programme library provides open-source code with step-by-step input guides for Casio fx-50FH and fx-3650P.' },
    { q: 'Which Casio calculator models are approved for DSE?', a: 'HKEAA approves specific non-programmable and programmable calculator models. The Casio fx-50FH II and Casio fx-3650P II are two of the most commonly used approved models in DSE. Always verify with the latest HKEAA approved calculator list before the exam, as the list is updated periodically.' },
    { q: 'DSE數學可以用計算機程式嗎？', a: '可以。DSE數學必修及延伸部分（M1/M2）考試允許使用HKEAA認可型號的計算機，包括Casio fx-50FH II及fx-3650P II等。考生可預先將程式輸入計算機記憶體，考試時使用。dse.best提供常用程式嘅公開代碼及逐步入機指引。' },
    { q: 'How do I enter a program into a Casio fx-50FH calculator?', a: 'On the Casio fx-50FH II, press MODE 4 to enter PRGM mode, select a program slot, and enter the program code token by token. The dse.best calculator programme library provides the exact key sequence for each programme, the expected display order for inputs, and verification examples you can use to confirm the programme is entered correctly.' },
  ],

  'eng-b1b2': [
    { q: 'What is DSE English B1 and B2?', a: 'DSE English Language is divided into two assessment tiers: B1 (Basic Competency) and B2 (above Basic Competency). Paper 1 (Reading) and Paper 3 (Listening) each have a B1 raw mark that is converted to a B2-equivalent mark via an annual conversion factor set by HKEAA. This tiered marking system allows fairer comparison across different year cohorts.' },
    { q: 'How are DSE English B1 marks converted to B2?', a: 'HKEAA publishes an annual conversion factor for DSE English Paper 1 (Reading, 1B) and Paper 3 (Listening, 3B). Each B1 raw mark is multiplied by the conversion factor to produce the B2-equivalent score used in final grade calculations. The conversion factor varies each year based on exam difficulty. dse.best/eng-b1b2 shows the full 2012–2025 conversion tables for both papers.' },
    { q: 'DSE英文B1同B2有咩分別？', a: 'DSE英文試卷分為B1（基本水平）同B2（高於基本水平）兩個評核層次。Paper 1（閱讀）及Paper 3（聆聽）各有B1原始分，透過HKEAA每年訂定嘅換算系數（Conversion Factor）轉換成B2等值分，再計入最終成績。' },
    { q: 'Why does the DSE English B1 to B2 conversion factor change each year?', a: 'The conversion factor is adjusted annually by HKEAA to account for differences in exam difficulty across years. A more difficult paper results in a higher conversion factor (each B1 mark is worth more B2 marks), while an easier paper has a lower factor. This standardisation ensures that grades are comparable across different examination years.' },
    { q: 'DSE英文B1分值趨勢係點？', a: '根據2012至2025年數據，DSE英文Paper 1及Paper 3嘅B1換算系數每年略有浮動，反映各年試卷難度差異。dse.best/eng-b1b2提供歷年換算系數趨勢圖表，方便考生了解B1分數嘅歷年購買力變化。數據由社群估算，非HKEAA官方資料。' },
  ],

  'ucas-calculator': [
    { q: 'DSE 5** 等於幾多 UCAS 分？', a: 'DSE 5**（甲類科目，非數學）等於 56 UCAS Tariff Points，相當於英國 GCE A-Level A* 等級。數學必修部分 5** 計 28 分，加上延伸 M1 或 M2 的 5** 另計 28 分，合共同樣係 56 分。' },
    { q: 'How many UCAS points is DSE 5** worth?', a: 'A DSE Grade 5** (Category A subject, non-Mathematics) is worth 56 UCAS Tariff Points, equivalent to a UK GCE A-Level A* grade. DSE 5* = 52 points (between A* and A); DSE 5 = 48 points (A grade); DSE 4 = 32 points (C grade); DSE 3 = 16 points (E grade). Grades 2 and below do not attract UCAS Tariff Points.' },
    { q: 'Can DSE results be used to apply to UK universities?', a: 'Yes. HKDSE Category A subject grades are recognised by UCAS and converted to Tariff Points for UK university applications. The conversion is based on an official equivalency study by HKEAA and UCAS. Most UK universities accept DSE results directly for undergraduate admission. Use dse.best/ucas to calculate your total UCAS Tariff Points from your DSE grades.' },
    { q: 'DSE 4 等於幾多 UCAS 分？', a: 'DSE 4 等於 32 UCAS Tariff Points，相當於英國 GCE A-Level C 等級。3 級等於 16 分（相當於 E 級）。2 級或以下不獲分配任何 UCAS 分數。' },
    { q: '申請英國大學需要幾多 UCAS 分？', a: '各院校及課程要求不一。一般要求 96 至 160 分不等，熱門頂尖課程可能要求 160 分甚至以上。建議直接查閱目標大學官網或 UCAS 官網的入學要求。' },
    { q: '數學 M1/M2 點計 UCAS 分？', a: '數學必修部分（Compulsory Part）同延伸部分（M1 或 M2）各計半個甲類科目的 Tariff Points。以 5** 為例，必修部分得 28 分，延伸部分得 28 分，合計 56 分，同其他甲類科目上限相同。' },
  ],

  chat: [
    { q: 'DSE學習交流聊天室有什麼功能？', a: 'dse.best DSE學習交流聊天室提供香港中學文憑試學生即時討論平台，支援實時文字對話、表情符號、用戶名稱自定義等功能。學生可以討論DSE各科備考心得、分享歷屆試題解答技巧、交流考試經驗和溫習方法。' },
    { q: 'DSE Chat Room如何幫助備考？', a: '透過DSE聊天室，學生可以與其他應屆考生即時討論中文、英文、數學、物理、化學、生物等科目的學習難點，分享有效的溫習策略、解題技巧和時間管理方法。互相鼓勵支持，減輕DSE考試壓力。' },
    { q: '香港DSE學生聊天室討論什麼科目？', a: 'DSE聊天室歡迎討論所有香港中學文憑試科目，包括核心科目（中文、英文、數學、公民科）和選修科目（物理、化學、生物、ICT、M1、M2、地理、歷史、中國歷史、經濟、BAFS、視覺藝術等）的學習心得和考試技巧。' },
    { q: 'DSE聊天室的使用時間和規則是什麼？', a: 'DSE聊天室24小時開放，方便不同時間學習的同學交流。請保持友善尊重的態度，專注DSE學習相關討論。禁止發送廣告、不當內容或垃圾訊息，共同維護積極正面的DSE學習交流環境。' },
  ],

  cutoff: [
    { q: 'What are HKDSE cut-off scores?', a: 'HKDSE cut-off scores are the minimum raw marks students need to achieve each grade level (5**, 5*, 5, 4, 3, 2). These grade boundaries are adjusted annually based on exam difficulty and overall student performance, and published by the Hong Kong Examinations and Assessment Authority (HKEAA).' },
    { q: 'How do I find cut-off scores for a specific DSE subject?', a: 'Select the subject from dse.best/cutoff to view grade boundaries by year. The data covers 2012–2025 for all major HKDSE subjects including Chinese, English, Mathematics, Physics, Chemistry, Biology, ICT, M1, M2, Geography, History, Chinese History, Economics, BAFS and more.' },
    { q: 'Do DSE cut-off scores change every year?', a: 'Yes, cut-off scores are adjusted annually based on exam difficulty and student performance. A more difficult paper typically results in lower cut-off scores. Analysing multi-year trends on dse.best/cutoff helps students understand the range of grade boundaries and set realistic study targets.' },
    { q: 'What does the percentage in DSE cut-off scores mean?', a: 'The percentage shows the proportion of candidates who achieved that grade or above. For example, if the 5** grade boundary has 8%, approximately 8% of candidates reached 5** or higher in that subject that year. This helps gauge how competitive each grade level is.' },
    { q: 'How can I use DSE cut-off scores to plan my study?', a: 'Identify the cut-off score for your target grade in your target year. Compare it against multi-year data to understand score trends. Use this alongside past paper practice to set realistic score targets. Knowing the boundary for 5 vs 5* helps allocate study time more effectively.' },
    { q: '如何準確預測自己的DSE成績？', a: '完成Past Paper後，對照dse.best/cutoff的Cut Off分數，可估算你的等級。建議同時參考近三年的Cut Off數據，因為每年試卷難度不同會影響分界線。配合JUPAS計算機，了解你的預測成績在各課程的競爭力。' },
    { q: 'How accurate are the cut-off scores on this website?', a: 'The cut-off scores on dse.best are sourced from official HKEAA publications and updated annually after each examination cycle. They represent the actual grade boundaries used to assign official DSE grades.' },
  ],

  resources: [
    { q: 'dse.best 提供哪些學習資源？', a: 'dse.best 提供全面的DSE學習資源，包括歷屆試題下載、Cut-off分數查詢、DSE倒數計時器、學習交流室、學習博客、考試技巧、備考策略等。涵蓋中文、英文、數學、物理、化學、生物等全科資源。' },
    { q: '如何有效利用這些學習資源？', a: '建議按以下順序使用：1) 先了解各科目資源，2) 制定個人學習計劃，3) 定期練習歷屆試題，4) 使用學習工具如倒數計時器，5) 參與學習交流討論，6) 閱讀學習博客獲取最新資訊。' },
    { q: '學習資源多久更新一次？', a: '我們會定期更新學習資源，包括最新歷屆試題、考試資訊、學習技巧、備考策略等。一般每月都會有新內容加入，確保學生獲得最新最準確的學習資料。' },
    { q: '這些學習資源都是免費的嗎？', a: '是的，dse.best 提供的所有學習資源都是完全免費的，包括歷屆試題下載、學習工具使用、學習博客閱讀等。我們致力於為香港DSE學生提供免費優質的學習支援。' },
  ],

  timetable: [
    { q: 'When is the 2027 DSE exam timetable?', a: 'The 2027 HKDSE written examinations are estimated to start in early April 2027. The subject-by-subject timetable on dse.best/timetable shows estimated dates for each paper. Note that dates are estimated based on previous years — the official timetable is published by HKEAA and should be confirmed on their website.' },
    { q: 'What is the order of DSE exams?', a: 'HKDSE exams are typically held over 4–5 weeks in April–May. Core subjects (Chinese, English, Mathematics) are spread across the exam period. Elective subjects (Physics, Chemistry, Biology, Economics, etc.) are scheduled on separate days. English Paper 3 (Listening) is held as a simultaneous nationwide sitting. Check dse.best/timetable for the estimated 2027 schedule in List or Calendar view.' },
    { q: '2027 DSE 考試日期是什麼時候？', a: '2027 HKDSE 筆試暫定於 2027 年 4 月初開始，預計至 5 月初結束。實際日期由香港考試及評核局（HKEAA）正式公佈為準，本頁時間表為根據過往編排估算。' },
    { q: '英文聆聽（Paper 3）有甚麼特別安排？', a: '英文科 Paper 3（聆聽）為全港統一場次，使用電台廣播或會場 PA 系統播放。需注意到場時間：使用電台或 IR 系統的試場為 8:30am，使用 PA 系統的試場為 8:45am。詳情請查閱准考證。' },
    { q: 'DSE考試有口試和實習試嗎？', a: '是的。體育、音樂及英文口試等實習/口試部分通常於筆試前舉行，預計於2月至3月期間進行。實際日期因試場而異，請以個人准考證上的安排為準。' },
    { q: 'List View 同 Calendar View 有甚麼分別？', a: 'List View 以日期順序逐日列出所有考試場次，方便詳細閱讀；Calendar View 以月曆方式顯示，方便快速掌握整個月份的考試密度同空檔，適合用嚟規劃溫習時間。' },
  ],

  timer: [
    { q: 'What is a DSE past paper timer?', a: 'A DSE past paper timer simulates the official exam time limits so you can practise under real exam conditions at home. dse.best/timer has preset times for every DSE subject and paper, matching the official HKEAA durations. It plays audio alerts at 15 minutes remaining and at time-up.' },
    { q: 'DSE 操卷計時器提供哪些提醒功能？', a: '計時器會在剩餘 15 分鐘時顯示提示並播放聲效，時間歸零時亦會自動響鈴及顯示完成通知，協助你模擬真實考場節奏。' },
    { q: '全螢幕專注模式有甚麼作用？', a: '啟動全螢幕後，瀏覽器標籤與工具列會隱藏，減少分心，讓你在家操卷時亦能維持考場級專注。' },
    { q: 'How do I use the DSE exam timer for mock exams?', a: 'Go to dse.best/timer, select your subject and paper. The timer automatically loads the official HKEAA exam duration. Start the timer when you begin your past paper. An alert sounds at 15 minutes remaining. For best results, use full-screen mode to minimise distractions and simulate real exam conditions.' },
    { q: '如何提升操卷效率與專注力？', a: '建議配合番茄鐘節奏使用：完成一份限時試卷後休息約 15 分鐘，再檢討錯題與整理重點，有助提升專注力與記憶效果。' },
  ],

  blog: [
    { q: 'What topics does the dse.best blog cover?', a: 'The dse.best blog covers DSE examination guides, subject-specific study strategies, past paper analysis, exam tips, current affairs topics relevant to English essays, JUPAS admission guides, and study resources for Hong Kong Form 4–6 students.' },
    { q: 'dse.best Blog提供什麼內容？', a: 'dse.best Blog提供最新的DSE考試資訊、學習資源、溫習心得、考生經驗分享、科目指南等內容，幫助學生掌握DSE動向和提升學習效果。' },
    { q: '如何找到特定科目的文章？', a: '可以使用頁面頂部的分類按鈕篩選文章，或使用搜尋功能查找特定主題。文章按科目分類，包括中文、英文、數學、物理、化學等各科內容。' },
    { q: 'Can I share dse.best blog articles?', a: 'You are welcome to share links to dse.best blog articles. Please respect copyright and do not reproduce full article content without permission. Linking directly to dse.best is encouraged.' },
  ],
}
