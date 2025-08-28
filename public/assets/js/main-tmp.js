$(function () {
  "use strict";

  // Automatic PDF Download Analytics Tracking
  $(document).on('click', 'a[href$=".pdf"]', function() {
    const fullUrl = this.href;
    let fileName = fullUrl.split('/').pop(); // Extract filename from URL

    // Clean filename: remove query parameters and hash fragments
    fileName = fileName.split('?')[0].split('#')[0];

    // Debug logging to help identify the issue
    console.log('PDF Download Debug:', {
      fullUrl: fullUrl,
      rawFileName: fullUrl.split('/').pop(),
      cleanFileName: fileName,
      splitResult: fullUrl.split('/')
    });

    // Auto-detect subject from CDN URL path (much more accurate!)
    let subject = 'unknown';
    if (fullUrl.includes('/math/')) subject = 'math';
    else if (fullUrl.includes('/english/')) subject = 'english';
    else if (fullUrl.includes('/chinese-history/')) subject = 'chinese-history';
    else if (fullUrl.includes('/chinese/')) subject = 'chinese';
    else if (fullUrl.includes('/physics/')) subject = 'physics';
    else if (fullUrl.includes('/chemistry/')) subject = 'chemistry';
    else if (fullUrl.includes('/biology/')) subject = 'biology';
    else if (fullUrl.includes('/geography/')) subject = 'geography';
    else if (fullUrl.includes('/history/')) subject = 'history';
    else if (fullUrl.includes('/economics/')) subject = 'economics';
    else if (fullUrl.includes('/ict/')) subject = 'ict';
    else if (fullUrl.includes('/m1/')) subject = 'm1';
    else if (fullUrl.includes('/m2/')) subject = 'm2';
    else if (fullUrl.includes('/bafs/')) subject = 'bafs';
    else if (fullUrl.includes('/visual-arts/')) subject = 'visual-arts';
    else if (fullUrl.includes('/citizen/')) subject = 'citizen';

    // If URL detection fails, subject remains 'unknown' - no fallback needed

    const language = $(this).data('language') || 'unknown';

    let extractedLanguage = language;

    if (fileName) {
      // Extract language from filename - updated patterns
      if (fileName.includes('_chi')) extractedLanguage = 'chinese';
      else if (fileName.includes('_eng')) extractedLanguage = 'english';
      // Math uses m0_eng pattern
      else if (fileName.includes('m0_eng')) extractedLanguage = 'english';
    }

    // More robust language detection for subjects without clear indicators
    if (extractedLanguage === 'unknown') {
      // Chinese-only subjects (no English version available)
      if (subject === 'chinese' || subject === 'chinese-history') {
        extractedLanguage = 'chinese';
      }
      // English-only subjects
      else if (subject === 'english') {
        extractedLanguage = 'english';
      }
      // Math is always English (uses m0_eng pattern)
      else if (subject === 'math') {
        extractedLanguage = 'english';
      }
      // M1/M2 are English-only (no language indicators in filenames)
      else if (subject === 'm1' || subject === 'm2') {
        extractedLanguage = 'english';
      }
      // Sciences, Geography, Economics, ICT, BAFS have both versions
      // Try to infer from page context, default to Chinese
      else extractedLanguage = 'unknown';
    }

    // Clean up data for Google Analytics (capitalize and remove hyphens)
    const cleanSubject = subject.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const cleanLanguage = extractedLanguage.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    // Detect if this is a year slug page (e.g., /biology/2023, /math/2022)
    const currentPath = window.location.pathname;
    const isYearSlug = currentPath.match(/\/\d{4}$/);
    const yearSlugValue = isYearSlug ? 1 : 0; // Use 1 for year slug pages, 0 for subject index pages

    // Extract year from year slug page if available
    let yearFromSlug = null;
    if (isYearSlug) {
      const yearMatch = currentPath.match(/\/(\d{4})$/);
      yearFromSlug = yearMatch ? yearMatch[1] : null;
    }

    // Create slugName for year slug pages (e.g., "Biology 2023", "Math 2022")
    let slugName = null;
    if (isYearSlug && yearFromSlug) {
      slugName = `${cleanSubject} ${yearFromSlug}`;
    }

    // Send to Google Analytics with optimized parameters
    if (typeof gtag !== 'undefined') {
      // Simple approach: Subject + cleaned filename (remove underscores, keep it simple)
      let baseName = fileName.replace(/\.pdf$/i, '').replace(/[_]/g, ' ').trim();
      
      // Create paper name: "Subject + cleaned filename" (e.g., "Chinese History pp chihist dse 2015 p1")
      const paperName = `${cleanSubject} ${baseName}`.trim();
      
      const eventData = {
        'file_name': fileName,              // Full filename with .pdf
        'paper_name': paperName,            // Subject + cleaned filename
        'download_subject': cleanSubject,
        'download_language': cleanLanguage,
        'link_url': this.href,
        'is_year_slug': yearSlugValue,      // 1 for year slug pages, 0 for subject index pages
        'page_type': isYearSlug ? 'slug' : 'index' // 'slug' for year slug pages, 'index' for subject index pages
      };

      // Only add year_from_slug and slugName if they exist (not null)
      if (yearFromSlug) {
        eventData.year_from_slug = yearFromSlug;
      }
      if (slugName) {
        eventData.slug_name = slugName;
      }

      // Debug logging for GA4 data
      console.log('Sending to GA4 (file_download):', eventData);

      gtag('event', 'file_download', eventData);

      // Also send a simplified version for easier tracking
      const simplifiedEventData = {
        'file_name': fileName,              // Full filename with .pdf
        'paper_name': paperName,            // Subject + cleaned filename
        'subject': cleanSubject,
        'language': cleanLanguage,
        'is_year_slug': yearSlugValue,      // 1 for year slug pages, 0 for subject index pages
        'page_type': isYearSlug ? 'slug' : 'index' // 'slug' for year slug pages, 'index' for subject index pages
      };

      // Only add year_from_slug and slugName if they exist (not null)
      if (yearFromSlug) {
        simplifiedEventData.year_from_slug = yearFromSlug;
      }
      if (slugName) {
        simplifiedEventData.slug_name = slugName;
      }

      console.log('Sending to GA4 (pdf_download):', simplifiedEventData);

      gtag('event', 'pdf_download', simplifiedEventData);
    }
  });
}); 