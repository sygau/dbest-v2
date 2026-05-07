const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Configuration
const DATA_DIR = path.join(__dirname, '../public/data/cutoff');
const SUBJECTS = [
  'english', 'chinese', 'math', 'physics', 'chemistry', 'biology',
  'ict', 'm1', 'm2', 'geography', 'economics', 'bafs',
  'history', 'chinese-history', 'ths'
];

// Validate cutoff data
function validateCutoffData(data) {
  const errors = [];
  
  data.forEach((row, index) => {
    // Check required fields
    if (!row.Subject || !row.Year || !row.Grade || !row.Score || !row.Percentage || !row.Paper) {
      errors.push(`Row ${index + 1}: Missing required fields`);
    }
    
    // Validate score range
    const score = parseInt(row.Score);
    if (isNaN(score) || score < 0 || score > 100) {
      errors.push(`Row ${index + 1}: Invalid score ${row.Score}`);
    }
    
    // Validate percentage range
    const percentage = parseInt(row.Percentage);
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      errors.push(`Row ${index + 1}: Invalid percentage ${row.Percentage}`);
    }
    
    // Validate year
    const year = parseInt(row.Year);
    if (isNaN(year) || year < 2012 || year > 2025) {
      errors.push(`Row ${index + 1}: Invalid year ${row.Year}`);
    }
    
    // Validate grade
    const validGrades = ['5**', '5*', '5', '4', '3', '2'];
    if (!validGrades.includes(row.Grade)) {
      errors.push(`Row ${index + 1}: Invalid grade ${row.Grade}`);
    }
  });
  
  return errors;
}

// Process CSV file
function processCSVFile(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

// Generate statistics
function generateStats(data) {
  const stats = {
    totalRecords: data.length,
    subjects: new Set(),
    years: new Set(),
    grades: new Set(),
    papers: new Set()
  };
  
  data.forEach(row => {
    stats.subjects.add(row.Subject);
    stats.years.add(row.Year);
    stats.grades.add(row.Grade);
    stats.papers.add(row.Paper);
  });
  
  return {
    totalRecords: stats.totalRecords,
    subjects: Array.from(stats.subjects).sort(),
    years: Array.from(stats.years).sort((a, b) => parseInt(b) - parseInt(a)),
    grades: Array.from(stats.grades).sort(),
    papers: Array.from(stats.papers).sort()
  };
}

// Main processing function
async function processAllCutoffData() {
  console.log('🚀 Starting cutoff data processing...\n');
  
  const allData = [];
  const errors = [];
  const stats = {};
  
  // Process each subject file
  for (const subject of SUBJECTS) {
    const filePath = path.join(DATA_DIR, `${subject}.csv`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Skipping ${subject}.csv - file not found`);
      continue;
    }
    
    try {
      console.log(`📊 Processing ${subject}.csv...`);
      const data = await processCSVFile(filePath);
      
      // Validate data
      const validationErrors = validateCutoffData(data);
      if (validationErrors.length > 0) {
        errors.push(`\n❌ ${subject}.csv validation errors:`);
        errors.push(...validationErrors);
      } else {
        console.log(`✅ ${subject}.csv - ${data.length} records validated`);
        allData.push(...data);
        stats[subject] = generateStats(data);
      }
      
    } catch (error) {
      errors.push(`❌ Error processing ${subject}.csv: ${error.message}`);
    }
  }
  
  // Generate summary
  console.log('\n📈 Processing Summary:');
  console.log('=====================');
  
  if (errors.length > 0) {
    console.log('\n❌ Errors found:');
    errors.forEach(error => console.log(error));
  }
  
  console.log(`\n✅ Total records processed: ${allData.length}`);
  console.log(`📁 Subjects processed: ${Object.keys(stats).length}`);
  
  // Generate overall statistics
  const overallStats = generateStats(allData);
  console.log('\n📊 Overall Statistics:');
  console.log(`   Years: ${overallStats.years.join(', ')}`);
  console.log(`   Grades: ${overallStats.grades.join(', ')}`);
  console.log(`   Papers: ${overallStats.papers.join(', ')}`);
  
  // Generate data quality report
  console.log('\n🔍 Data Quality Report:');
  Object.entries(stats).forEach(([subject, subjectStats]) => {
    console.log(`   ${subject}: ${subjectStats.totalRecords} records, ${subjectStats.years.length} years`);
  });
  
  // Save processed data summary
  const summaryPath = path.join(DATA_DIR, 'data-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify({
    processedAt: new Date().toISOString(),
    totalRecords: allData.length,
    subjects: Object.keys(stats),
    statistics: stats,
    errors: errors.length > 0 ? errors : null
  }, null, 2));
  
  console.log(`\n💾 Summary saved to: ${summaryPath}`);
  
  if (errors.length > 0) {
    console.log('\n❌ Processing completed with errors. Please fix the issues above.');
    process.exit(1);
  } else {
    console.log('\n🎉 All cutoff data processed successfully!');
  }
}

// Run the script
if (require.main === module) {
  processAllCutoffData().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}

module.exports = {
  processAllCutoffData,
  validateCutoffData,
  generateStats
}; 