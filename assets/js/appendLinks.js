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
      const [mainResponse, subjectResponse] = await Promise.all([
        fetch('config/main.json'),
        fetch(`config/${subject}.json`)
      ]);

      if (!mainResponse.ok || !subjectResponse.ok) {
        throw new Error(`Failed to load JSON files for ${subject}`);
      }

      const mainData = await mainResponse.json();
      const subjectData = await subjectResponse.json();

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

    buttons.forEach(button => {
      const paperId = button.getAttribute('data-paper-id');
      const filename = papers[paperId];

      if (filename) {
        button.href = `${fileHost}/${subject}/${filename}`;
        button.classList.remove('disabled');
      } else {
        button.href = '#';
        button.classList.add('disabled');
        console.warn(`No file found for paper ID: ${paperId}`);
      }
    });
  }

  // Main execution
  try {
    const subject = getCurrentSubject();

    if (!subject) {
      console.log('No subject detected - skipping paper links setup');
      return;
    }

    console.log(`Setting up paper links for: ${subject}`);

    const { fileHost, papers } = await loadData(subject);
    updateButtons(subject, fileHost, papers);

    console.log(`✅ Paper links setup complete for ${subject}`);

  } catch (error) {
    console.error('❌ Failed to setup paper links:', error);
  }
})();