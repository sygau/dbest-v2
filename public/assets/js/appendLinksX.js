(async function() {
  'use strict';

  const SUBJECTS = {
    'chinese-history': 'chinese-history',
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
    'citizen': 'citizen',
    'ths': 'ths'
  };

  function getCurrentSubject() {
    const path = window.location.pathname.toLowerCase();
    console.log(`🔍 Analyzing path: ${path}`);

    for (const [key, value] of Object.entries(SUBJECTS)) {
      const exactMatch = path === `/${key}` || path === `/${key}/`;
      const startsWithMatch = path.startsWith(`/${key}/`);
      const endsWithMatch = path.endsWith(`/${key}`) || path.endsWith(`/${key}/`);
      
      if (exactMatch || startsWithMatch || endsWithMatch) {
        console.log(`🎯 Detected subject: ${value} from path: ${path} (key: ${key})`);
        return value;
      }
    }

    console.log(`❓ No subject detected from path: ${path}`);
    return null;
  }

  async function loadData(subject) {
    try {
      const fileHost = 'https://x7m2qv9gkz1w8n3r5t6b4c0aehjldpuoyfsvxiwqzmnk3g7r2t9b6c5aeh.pages.dev';
      console.log('🔒 Using x.dse.best specific CDN:', fileHost);

      const baseUrls = [
        window.location.origin,
        'https://dse.best'
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

  async function initPaperLinks() {
    try {
      const subject = getCurrentSubject();

      if (!subject) {
        console.log('📄 No subject detected - this page doesn\'t need paper links');
        return;
      }

      console.log(`🔗 Setting up paper links for: ${subject}`);

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

  window.initPaperLinks = initPaperLinks;

  window.debugPaperLinks = function() {
    console.log('=== DEBUG PAPER LINKS (X.DSE.BEST) ===');
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
    
    const allButtons = document.querySelectorAll('button, a.btn');
    console.log(`Total buttons found: ${allButtons.length}`);
    
    console.log('Document ready state:', document.readyState);
    console.log('=== END DEBUG ===');
  };

  initPaperLinks();
})();