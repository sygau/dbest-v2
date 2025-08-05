/**
 * Universal Paper Links Appender
 * Automatically detects subject and loads appropriate JSON files
 * Works with Swup Scripts Plugin
 */

(async function() {
  'use strict';

  // Subject mapping - add new subjects here
  const SUBJECTS = {
    'math': 'math',
    'english': 'english',
    'chinese': 'chinese',
    'physics': 'physics',
    'chemistry': 'chemistry',
    'biology': 'biology',
    'geography': 'geography',
    'history': 'history',
    'chinese-history': 'chinese-history',
    'economics': 'economics',
    'ict': 'ict',
    'm1': 'm1',
    'm2': 'm2',
    'bafs': 'bafs',
    'visual-arts': 'visual-arts',
    'citizen': 'citizen'
  };

  /**
   * Detect current subject from URL
   */
  function getCurrentSubject() {
    const path = window.location.pathname.toLowerCase();

    // Check each subject
    for (const [key, value] of Object.entries(SUBJECTS)) {
      if (path.includes(key)) {
        return value;
      }
    }

    return null;
  }

  /**
   * Load JSON data
   */
  async function loadData(subject) {
    try {
      // Try local files first (for development), then fallback to CDN
      const baseUrls = [
        window.location.origin, // Local development
        'https://dse.best'       // Production CDN
      ];

      let mainData, subjectData;
      let lastError;

      for (const baseUrl of baseUrls) {
        try {
          console.log(`Trying to load config from: ${baseUrl}`);
          
          const [mainResponse, subjectResponse] = await Promise.all([
            fetch(`${baseUrl}/config/main.json`),
            fetch(`${baseUrl}/config/${subject}.json`)
          ]);

          if (mainResponse.ok && subjectResponse.ok) {
            mainData = await mainResponse.json();
            subjectData = await subjectResponse.json();
            console.log(`✅ Successfully loaded config from: ${baseUrl}`);
            break;
          } else {
            throw new Error(`HTTP ${mainResponse.status} or ${subjectResponse.status}`);
          }
        } catch (error) {
          console.log(`❌ Failed to load from ${baseUrl}:`, error.message);
          lastError = error;
          continue;
        }
      }

      if (!mainData || !subjectData) {
        throw lastError || new Error(`Failed to load JSON files for ${subject} from all sources`);
      }

      return {
        fileHost: mainData.file_host.replace(/\/$/, ''),
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
      console.log('No buttons with data-paper-id found');
      return;
    }

    console.log(`Updating ${buttons.length} buttons for ${subject}`);
    console.log('Available paper IDs in config:', Object.keys(papers));

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
        console.warn(`No file found for paper ID: ${paperId}`);
      }
    });

    console.log(`✅ Found ${foundIds.length} papers:`, foundIds);
    if (missingIds.length > 0) {
      console.warn(`❌ Missing ${missingIds.length} papers:`, missingIds);
    }
  }

  // Main execution function
  async function initPaperLinks() {
    try {
      const subject = getCurrentSubject();

      if (!subject) {
        console.log('No subject detected - skipping paper links setup');
        return;
      }

      console.log(`Setting up paper links for: ${subject}`);

      // Wait for React components to render
      await waitForElements();

      const { fileHost, papers } = await loadData(subject);
      updateButtons(subject, fileHost, papers);

      console.log(`✅ Paper links setup complete for ${subject}`);

    } catch (error) {
      console.error('❌ Failed to setup paper links:', error);
    }
  }

  // Wait for elements with data-paper-id to be available
  function waitForElements(maxAttempts = 10, delay = 300) {
    return new Promise((resolve, reject) => {
      let attempts = 0;

      const checkForElements = () => {
        const buttons = document.querySelectorAll('a[data-paper-id]');
        console.log(`Attempt ${attempts + 1}: Found ${buttons.length} buttons with data-paper-id`);

        if (buttons.length > 0) {
          console.log('✅ Found paper buttons, proceeding with initialization');
          resolve();
        } else if (attempts >= maxAttempts) {
          console.warn(`❌ No buttons found after ${maxAttempts} attempts`);
          reject(new Error('No buttons with data-paper-id found after waiting'));
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