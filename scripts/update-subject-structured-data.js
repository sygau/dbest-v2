const fs = require('fs');
const path = require('path');

// Subject pages to update
const subjectPages = [
  'physics',
  'chemistry', 
  'biology',
  'ict',
  'm1',
  'm2',
  'geography',
  'history',
  'chinese-history',
  'economics',
  'bafs',
  'citizen'
];

// Template for updating subject pages
const updateSubjectPage = (subjectKey) => {
  const filePath = path.join(__dirname, '..', 'pages', `${subjectKey}.tsx`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if already updated
  if (content.includes('generateSubjectStructuredData')) {
    console.log(`✅ ${subjectKey}.tsx already updated`);
    return;
  }

  // Add import
  const importStatement = `import { generateSubjectStructuredData, generateSubjectFAQStructuredData } from '../utils/structuredData';`;
  content = content.replace(
    /import Head from 'next\/head'/,
    `import Head from 'next/head'\nimport { generateSubjectStructuredData, generateSubjectFAQStructuredData } from '../utils/structuredData'`
  );

  // Add subject key and structured data generation
  const functionStart = content.indexOf('export default function');
  const functionName = content.match(/export default function (\w+)/)[1];
  
  const subjectKeyLine = `    const subjectKey = '${subjectKey}';`;
  const structuredDataLines = `    const structuredData = generateSubjectStructuredData(subjectKey);
    const faqData = generateSubjectFAQStructuredData(subjectKey);`;

  // Find the return statement and add the variables before it
  const returnIndex = content.indexOf('    return (', functionStart);
  if (returnIndex !== -1) {
    content = content.slice(0, returnIndex) + 
              subjectKeyLine + '\n' + 
              structuredDataLines + '\n\n' + 
              content.slice(returnIndex);
  }

  // Add structured data scripts to Head
  const structuredDataScripts = `
                {/* Structured Data */}
                {structuredData && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(structuredData)
                        }}
                    />
                )}
                {faqData && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(faqData)
                        }}
                    />
                )}`;

  // Find the closing Head tag and add structured data before it
  const headCloseIndex = content.indexOf('            </Head>');
  if (headCloseIndex !== -1) {
    content = content.slice(0, headCloseIndex) + 
              structuredDataScripts + '\n            ' + 
              content.slice(headCloseIndex);
  }

  // Update meta description to be subject-specific
  // We'll use a simple mapping for descriptions since we can't import the module
  const subjectDescriptions = {
    physics: 'DSE 物理科歷屆試題及答案，涵蓋力學、熱學、波動、電磁學等課題。提供完整試卷下載，助您掌握物理科考試重點。',
    chemistry: 'DSE 化學科歷屆試題及答案，涵蓋無機化學、有機化學、物理化學等課題。提供完整試卷下載，助您掌握化學科考試重點。',
    biology: 'DSE 生物科歷屆試題及答案，涵蓋細胞與分子生物學、遺傳與進化、生物與環境等課題。提供完整試卷下載。',
    ict: 'DSE ICT 歷屆試題及答案，涵蓋資訊處理、程式編寫、數據庫、網絡等課題。提供完整試卷下載。',
    m1: 'DSE 數學延伸部分 M1 (微積分與統計) 歷屆試題及答案。提供完整試卷下載，助您掌握微積分與統計學重點。',
    m2: 'DSE 數學延伸部分 M2 (代數與微積分) 歷屆試題及答案。提供完整試卷下載，助您掌握代數與微積分重點。',
    geography: 'DSE 地理科歷屆試題及答案，涵蓋自然環境、人文環境、全球相互依存等課題。提供完整試卷下載。',
    history: 'DSE 歷史科歷屆試題及答案，涵蓋現代世界、現代中國等課題。提供完整試卷下載，助您掌握歷史科考試重點。',
    'chinese-history': 'DSE 中國歷史科歷屆試題及答案，涵蓋古代史、近現代史等課題。提供完整試卷下載，助您掌握中國歷史科考試重點。',
    economics: 'DSE 經濟科歷屆試題及答案，涵蓋微觀經濟學、宏觀經濟學等課題。提供完整試卷下載，助您掌握經濟科考試重點。',
    bafs: 'DSE BAFS 歷屆試題及答案，涵蓋會計、商業管理、財務管理等課題。提供完整試卷下載，助您掌握商業科考試重點。',
    citizen: 'DSE 公民與社會發展科歷屆試題及答案，涵蓋香港、國家、世界等課題。提供完整試卷下載。'
  };

  const subjectDescription = subjectDescriptions[subjectKey];
  if (subjectDescription) {
    const newDescription = `content="${subjectDescription}"`;
    content = content.replace(
      /content="[^"]*DSE Past Paper[^"]*"/,
      newDescription
    );
    
    // Update OG description too
    content = content.replace(
      /<meta property="og:description" content="[^"]*DSE Past Paper[^"]*" \/>/,
      `<meta property="og:description" content="${subjectDescription}" />`
    );
  }

  // Write the updated content back
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Updated ${subjectKey}.tsx`);
};

// Update all subject pages
console.log('🔄 Updating subject pages with structured data...\n');

subjectPages.forEach(subjectKey => {
  try {
    updateSubjectPage(subjectKey);
  } catch (error) {
    console.error(`❌ Error updating ${subjectKey}.tsx:`, error.message);
  }
});

console.log('\n🎉 Subject pages update complete!');
console.log('\n📝 Next steps:');
console.log('1. Review the updated pages');
console.log('2. Test the structured data with Google Rich Results Test');
console.log('3. Check that meta descriptions are now subject-specific'); 