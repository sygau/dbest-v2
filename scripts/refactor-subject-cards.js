/**
 * Subject Page Download Card Refactoring Script
 * 
 * Usage: node scripts/refactor-subject-cards.js <subject-folder>
 * Example: node scripts/refactor-subject-cards.js chinese
 * 
 * This script:
 * 1. Copies index.tsx → index_r.tsx (safety backup)
 * 2. Applies regex transformations to convert old card structure to DownloadCard/PaperSection components
 * 3. Updates imports
 * 
 * CRITICAL: Always review index_r.tsx before deleting the original!
 */

const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '..', 'pages');

function refactorSubjectPage(subjectFolder) {
    const indexPath = path.join(PAGES_DIR, subjectFolder, 'index.tsx');
    const outputPath = path.join(PAGES_DIR, subjectFolder, 'index_r.tsx');

    if (!fs.existsSync(indexPath)) {
        console.error(`❌ File not found: ${indexPath}`);
        process.exit(1);
    }

    let content = fs.readFileSync(indexPath, 'utf8');
    const originalLines = content.split('\n').length;

    console.log(`📂 Processing: ${indexPath}`);
    console.log(`   Original: ${originalLines} lines`);

    // Step 1: Update imports
    // Remove BiDownload import
    content = content.replace(/import\s*{\s*BiDownload\s*}\s*from\s*['"]react-icons\/bi['"];\s*\n?/g, '');
    
    // Add DownloadCard import after LastUpdatedAlert import (or after other imports)
    if (!content.includes("import DownloadCard")) {
        // Try to add after LastUpdatedAlert import
        if (content.includes("import LastUpdatedAlert")) {
            content = content.replace(
                /(import LastUpdatedAlert[^;]+;)/,
                "$1\nimport DownloadCard, { PaperSection } from '../../components/DownloadCard';"
            );
        } else {
            // Add after the last import line
            const lastImportMatch = content.match(/^(import .+;)$/m);
            if (lastImportMatch) {
                const lastImport = lastImportMatch[0];
                content = content.replace(
                    lastImport,
                    lastImport + "\nimport DownloadCard, { PaperSection } from '../../components/DownloadCard';"
                );
            }
        }
    }

    // Step 2: Transform individual card blocks to DownloadCard components
    // Match the full card structure and extract title, description, paperId, buttonText
    const cardRegex = /<div className="col">\s*<div className="card h-100 d-flex flex-column">\s*<div className="card-body">\s*<h5 className="card-title">([^<]+)<\/h5>\s*<p className="card-text">([^<]+)<\/p>\s*<\/div>\s*<div className="card-footer bg-transparent border-0">\s*<a\s+href="#"\s+className="btn btn-info px-4 d-inline-flex gap-2"\s+data-paper-id="([^"]+)"\s*>\s*<BiDownload style=\{\{ fontSize: 22 \}\} \/>\s*([^<]+)<\/a>\s*<\/div>\s*<\/div>\s*<\/div>/g;

    content = content.replace(cardRegex, (match, title, description, paperId, buttonText) => {
        title = title.trim();
        description = description.trim();
        paperId = paperId.trim();
        buttonText = buttonText.trim();
        
        // Only include buttonText if it's not "Download" (the default)
        if (buttonText === 'Download') {
            return `<DownloadCard title="${title}" description="${description}" paperId="${paperId}" />`;
        } else {
            return `<DownloadCard title="${title}" description="${description}" paperId="${paperId}" buttonText="${buttonText}" />`;
        }
    });

    // Step 3: Transform section structure to PaperSection
    // Pattern: <div id="..."></div> + <h2>...</h2> + <br /> + <div className="row...">...</div> + <hr>
    
    // First, handle sections WITH hr at the end
    const sectionWithHrRegex = /(?:{\/\*[^*]*\*\/}\s*)?<div id="([^"]+)"><\/div>\s*<h2 style=\{\{ textAlign: "center" \}\}>([^<]+)<\/h2>\s*<br \/>\s*<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">([\s\S]*?)<\/div>\s*<hr className="my-4" \/>/g;

    content = content.replace(sectionWithHrRegex, (match, id, title, cards) => {
        // Clean up cards - remove extra whitespace and format nicely
        const cleanedCards = cards.trim()
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .map(line => '                        ' + line)
            .join('\n');
        
        return `<PaperSection id="${id}" title="${title}">
${cleanedCards}
                    </PaperSection>`;
    });

    // Handle sections WITHOUT hr at the end (last section)
    const sectionWithoutHrRegex = /(?:{\/\*[^*]*\*\/}\s*)?<div id="([^"]+)"><\/div>\s*<h2 style=\{\{ textAlign: "center" \}\}>([^<]+)<\/h2>\s*<br \/>\s*<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">([\s\S]*?)<\/div>(\s*<\/div>\s*<\/div>)/g;

    content = content.replace(sectionWithoutHrRegex, (match, id, title, cards, closing) => {
        // Check if this is really the last section (no more sections after it)
        const cleanedCards = cards.trim()
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .map(line => '                        ' + line)
            .join('\n');
        
        return `<PaperSection id="${id}" title="${title}" showDivider={false}>
${cleanedCards}
                    </PaperSection>${closing}`;
    });

    // Step 4: Clean up any remaining BiDownload references in case regex didn't catch all
    content = content.replace(/<BiDownload[^/]*\/>/g, '');

    // Write output
    fs.writeFileSync(outputPath, content, 'utf8');
    
    const newLines = content.split('\n').length;
    const reduction = Math.round((1 - newLines / originalLines) * 100);
    
    console.log(`   Output: ${outputPath}`);
    console.log(`   New: ${newLines} lines (${reduction}% reduction)`);
    console.log(`✅ Done! Please review ${outputPath}`);
    
    return { originalLines, newLines, reduction };
}

// Get list of subject folders to process
function getSubjectFolders() {
    return fs.readdirSync(PAGES_DIR)
        .filter(f => {
            const indexPath = path.join(PAGES_DIR, f, 'index.tsx');
            return fs.existsSync(indexPath) && 
                   f !== 'countdown' && 
                   f !== 'blog' && 
                   f !== 'cutoff' &&
                   f !== '12p' &&
                   f !== 'english'; // Already refactored
        });
}

// CLI handling
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Usage: node scripts/refactor-subject-cards.js <subject-folder>');
    console.log('       node scripts/refactor-subject-cards.js --all');
    console.log('Example: node scripts/refactor-subject-cards.js chinese');
    console.log('\nAvailable subject folders:');
    
    const subjects = getSubjectFolders();
    subjects.forEach(s => console.log(`  - ${s}`));
    process.exit(0);
}

if (args[0] === '--all') {
    console.log('🚀 Processing ALL subject pages...\n');
    const subjects = getSubjectFolders();
    const results = [];
    
    for (const subject of subjects) {
        try {
            const result = refactorSubjectPage(subject);
            results.push({ subject, ...result, status: 'success' });
        } catch (e) {
            console.error(`❌ Error processing ${subject}: ${e.message}`);
            results.push({ subject, status: 'error', error: e.message });
        }
        console.log('');
    }
    
    // Summary
    console.log('\n📊 Summary:');
    console.log('=' .repeat(60));
    let totalOriginal = 0, totalNew = 0;
    for (const r of results) {
        if (r.status === 'success') {
            console.log(`✅ ${r.subject.padEnd(20)} ${r.originalLines} → ${r.newLines} (${r.reduction}%)`);
            totalOriginal += r.originalLines;
            totalNew += r.newLines;
        } else {
            console.log(`❌ ${r.subject.padEnd(20)} ${r.error}`);
        }
    }
    console.log('=' .repeat(60));
    const totalReduction = Math.round((1 - totalNew / totalOriginal) * 100);
    console.log(`   TOTAL: ${totalOriginal} → ${totalNew} lines (${totalReduction}% reduction)`);
} else {
    const subject = args[0];
    refactorSubjectPage(subject);
}
