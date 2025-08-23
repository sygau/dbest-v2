/**
 * Universal Paper Links Appender
 * Automatically detects subject and loads appropriate JSON files
 * Works with Swup Scripts Plugin
 */

(async function() {
  'use strict';

  // Subject mapping - order matters! Check longer matches first
  const SUBJECTS = {
    'chinese-history': 'chinese-history', // Must come before 'chinese'
    'visual-arts': 'visual-arts',
    'chinese': 'chinese',
    'math': 'math',
    'english': 'english',
    'physics': 'physics',
    'chemistry': 'chemistry',
    'biology': 'biology',
    'geography': 'geography',
    'history': 'history',
    'economics': 'economics',
    'ict': 'ict',
    'm1': 'm1',
    'm2': 'm2',
    'bafs': 'bafs',
    'citizen': 'citizen'
  };

  /**
   * Detect current subject from URL
   */
  function getCurrentSubject() {
    const path = window.location.pathname.toLowerCase();

    // Check each subject - order matters for partial matches
    for (const [key, value] of Object.entries(SUBJECTS)) {
      // More precise matching to avoid false positives
      if (path.includes(`/${key}`) || path.includes(`${key}.`) || path === `/${key}` || path.endsWith(`/${key}`)) {
        console.log(`🎯 Detected subject: ${value} from path: ${path}`);
        return value;
      }
    }

    console.log(`❓ No subject detected from path: ${path}`);
    return null;
  }

  /**
   * Load JSON data
   */
  async function loadData(subject) {
    try {
      // Simple ping to check if cdn.dse.best is online
      let fileHost = 'https://cdn.dse.best';
      
      try {
        const response = await fetch('https://cdn.dse.best', { 
          method: 'HEAD',
          mode: 'no-cors'
        });
        console.log('✅ cdn.dse.best is online');
      } catch (error) {
        console.log('❌ cdn.dse.best is offline, using fallback');
        fileHost = 'https://dbest-cdn.pages.dev';
      }

      const baseUrls = [
        window.location.origin, // Local development
        'https://dse.best'       // Production CDN
      ];

      let subjectData;
      let lastError;

      for (const baseUrl of baseUrls) {
        try {
          console.log(`🔍 Loading ${subject} config from: ${baseUrl}`);
          
          const response = await fetch(`${baseUrl}/config/${subject}.json`);

          if (response.ok) {
            subjectData = await response.json();
            console.log(`✅ Successfully loaded ${subject} config from: ${baseUrl}`);
            break;
          } else {
            throw new Error(`HTTP ${response.status}`);
          }
        } catch (error) {
          console.log(`❌ Failed to load from ${baseUrl}:`, error.message);
          lastError = error;
          continue;
        }
      }

      if (!subjectData) {
        throw lastError || new Error(`Failed to load JSON file for ${subject} from all sources`);
      }

      return {
        fileHost,
        papers: subjectData
      };
    } catch (error) {
      console.error('Error loading data:', error);
      throw error;
    }
  }

  /**
   * Update download buttons
   */
  function updateButtons(subject, fileHost, papers) {
    const buttons = document.querySelectorAll('a[data-paper-id]');

    if (buttons.length === 0) {
      console.log('📄 No buttons with data-paper-id found');
      return;
    }

    console.log(`🔗 Updating ${buttons.length} buttons for ${subject}`);
    console.log('📋 Available paper IDs in config:', Object.keys(papers));

    const foundIds = [];
    const missingIds = [];

    buttons.forEach(button => {
      const paperId = button.getAttribute('data-paper-id');
      const filename = papers[paperId];

      if (filename) {
        button.href = `${fileHost}/${subject}/${filename}`;
        button.classList.remove('disabled');
        foundIds.push(paperId);
      } else {
        button.href = '#';
        button.classList.add('disabled');
        missingIds.push(paperId);
        console.log(`⚠️ No file found for paper ID: ${paperId}`);
      }
    });

    console.log(`✅ Found ${foundIds.length} papers:`, foundIds);
    if (missingIds.length > 0) {
      console.log(`⚠️ Missing ${missingIds.length} papers:`, missingIds);
    }
  }

  // Main execution function
  async function initPaperLinks() {
    try {
      const subject = getCurrentSubject();

      if (!subject) {
        console.log('📄 No subject detected - this page doesn\'t need paper links');
        return;
      }

      console.log(`🔗 Setting up paper links for: ${subject}`);

      // Wait for React components to render
      const hasButtons = await waitForElements();
      
      if (!hasButtons) {
        console.log(`📄 No paper buttons found on ${subject} page - this is normal for some pages`);
        return;
      }

      const { fileHost, papers } = await loadData(subject);
      updateButtons(subject, fileHost, papers);

      console.log(`✅ Paper links setup complete for ${subject}`);

    } catch (error) {
      console.error('❌ Failed to setup paper links:', error);
    }
  }

  // Wait for elements with data-paper-id to be available
  function waitForElements(maxAttempts = 10, delay = 300) {
    return new Promise((resolve) => {
      let attempts = 0;

      const checkForElements = () => {
        const buttons = document.querySelectorAll('a[data-paper-id]');
        console.log(`🔍 Attempt ${attempts + 1}: Found ${buttons.length} buttons with data-paper-id`);

        if (buttons.length > 0) {
          console.log('✅ Found paper buttons, proceeding with initialization');
          resolve(true);
        } else if (attempts >= maxAttempts) {
          console.log(`📄 No paper buttons found after ${maxAttempts} attempts - page may not need them`);
          resolve(false);
        } else {
          attempts++;
          setTimeout(checkForElements, delay);
        }
      };

      checkForElements();
    });
  }

  // Export to global scope
  window.initPaperLinks = initPaperLinks;

  // Debug function to manually check elements
  window.debugPaperLinks = function() {
    console.log('=== DEBUG PAPER LINKS ===');
    console.log('Current URL:', window.location.pathname);
    console.log('Detected subject:', getCurrentSubject());
    
    const buttons = document.querySelectorAll('a[data-paper-id]');
    console.log(`Found ${buttons.length} buttons with data-paper-id`);
    
    if (buttons.length > 0) {
      buttons.forEach((button, index) => {
        console.log(`Button ${index + 1}:`, {
          paperId: button.getAttribute('data-paper-id'),
          href: button.href,
          text: button.textContent.trim(),
          element: button
        });
      });
    }
    
    // Check for any buttons at all
    const allButtons = document.querySelectorAll('button, a.btn');
    console.log(`Total buttons found: ${allButtons.length}`);
    
    // Check if page is loaded
    console.log('Document ready state:', document.readyState);
    console.log('=== END DEBUG ===');
  };

  // Auto-run on script load
  initPaperLinks();
})();