const fs = require('fs');
const path = require('path');

function validateCSVStructure(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.trim().split('\n');
    
    if (lines.length < 2) {
      console.error(`❌ ${filePath}: File has less than 2 lines (header + data)`);
      return false;
    }
    
    const headers = lines[0].split(',').map(h => h.trim());
    const expectedHeaders = ['year', 'level', 'score', 'percentage'];
    
    // Check headers
    if (headers.length !== expectedHeaders.length) {
      console.error(`❌ ${filePath}: Expected ${expectedHeaders.length} headers, got ${headers.length}`);
      return false;
    }
    
    for (let i = 0; i < expectedHeaders.length; i++) {
      if (headers[i] !== expectedHeaders[i]) {
        console.error(`❌ ${filePath}: Expected header "${expectedHeaders[i]}", got "${headers[i]}"`);
        return false;
      }
    }
    
    // Check data rows
    let validRows = 0;
    let emptyValues = 0;
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      
      if (values.length !== headers.length) {
        console.error(`❌ ${filePath}: Line ${i + 1} has ${values.length} values, expected ${headers.length}`);
        continue;
      }
      
      // Check for empty values
      const hasEmptyValues = values.some(v => v === '');
      if (hasEmptyValues) {
        emptyValues++;
        console.warn(`⚠️  ${filePath}: Line ${i + 1} has empty values: ${values.join(', ')}`);
      }
      
      // Validate year
      const year = parseInt(values[0]);
      if (isNaN(year) || year < 2010 || year > 2030) {
        console.error(`❌ ${filePath}: Line ${i + 1} has invalid year: ${values[0]}`);
        continue;
      }
      
      // Validate level
      const validLevels = ['5**', '5*', '5', '4', '3', '2'];
      if (!validLevels.includes(values[1])) {
        console.error(`❌ ${filePath}: Line ${i + 1} has invalid level: ${values[1]}`);
        continue;
      }
      
      // Validate score (can be empty)
      const score = values[2];
      if (score !== '' && (isNaN(parseInt(score)) || parseInt(score) < 0)) {
        console.error(`❌ ${filePath}: Line ${i + 1} has invalid score: ${score}`);
        continue;
      }
      
      // Validate percentage (can be empty)
      const percentage = values[3];
      if (percentage !== '' && (isNaN(parseInt(percentage)) || parseInt(percentage) < 0 || parseInt(percentage) > 100)) {
        console.error(`❌ ${filePath}: Line ${i + 1} has invalid percentage: ${percentage}`);
        continue;
      }
      
      validRows++;
    }
    
    console.log(`✅ ${filePath}: ${validRows} valid rows, ${emptyValues} rows with empty values`);
    return true;
    
  } catch (error) {
    console.error(`❌ ${filePath}: Error reading file - ${error.message}`);
    return false;
  }
}

function validateSubjectDirectory(subjectDir) {
  const subjectName = path.basename(subjectDir);
  console.log(`\n📁 Validating subject: ${subjectName}`);
  
  if (!fs.existsSync(subjectDir)) {
    console.error(`❌ Subject directory not found: ${subjectDir}`);
    return false;
  }
  
  const files = fs.readdirSync(subjectDir).filter(f => f.endsWith('.csv'));
  
  if (files.length === 0) {
    console.error(`❌ No CSV files found in ${subjectDir}`);
    return false;
  }
  
  let allValid = true;
  files.forEach(file => {
    const filePath = path.join(subjectDir, file);
    const isValid = validateCSVStructure(filePath);
    if (!isValid) allValid = false;
  });
  
  return allValid;
}

// Main validation
const cutoffDir = path.join(__dirname, '..', 'public', 'data', 'cutoff');
console.log('🔍 Validating CSV structure...\n');

if (!fs.existsSync(cutoffDir)) {
  console.error(`❌ Cutoff directory not found: ${cutoffDir}`);
  process.exit(1);
}

const subjects = fs.readdirSync(cutoffDir).filter(f => fs.statSync(path.join(cutoffDir, f)).isDirectory());

if (subjects.length === 0) {
  console.error(`❌ No subject directories found in ${cutoffDir}`);
  process.exit(1);
}

let allSubjectsValid = true;
subjects.forEach(subject => {
  const subjectDir = path.join(cutoffDir, subject);
  const isValid = validateSubjectDirectory(subjectDir);
  if (!isValid) allSubjectsValid = false;
});

console.log('\n📊 Validation Summary:');
if (allSubjectsValid) {
  console.log('✅ All CSV files are valid!');
  process.exit(0);
} else {
  console.log('❌ Some CSV files have issues. Please fix them.');
  process.exit(1);
} 