/**
 * main-native.js - Native JavaScript replacement for jQuery functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  "use strict";

  // Theme switcher with localStorage
  function setupThemeSwitchers() {
    const loadSavedTheme = () => {
      const savedTheme = localStorage.getItem("selectedTheme");
      if (savedTheme) {
        document.documentElement.setAttribute("data-bs-theme", savedTheme);
        
        // Set the corresponding radio button as checked
        const themeName = savedTheme.charAt(0).toUpperCase() + savedTheme.slice(1).replace('-theme','');
        const themeRadio = document.getElementById(`${themeName}Theme`);
        if (themeRadio) themeRadio.checked = true;
      }
    };
    
    // Load theme on initial page load
    loadSavedTheme();
    
    // Setup theme toggle buttons
    const themes = ['Blue', 'Light', 'Dark', 'SemiDark', 'Bodered'];
    themes.forEach(theme => {
      const button = document.getElementById(`${theme}Theme`);
      if (button) {
        button.addEventListener('click', function() {
          const themeValue = theme === 'Blue' ? 'blue-theme' : theme.toLowerCase();
          document.documentElement.setAttribute("data-bs-theme", themeValue);
          localStorage.setItem("selectedTheme", themeValue);
        });
      }
    });
  }
  
  // Toggle sidebar functionality
  function setupSidebar() {
    // Toggle button
    const toggleButtons = document.querySelectorAll('.btn-toggle');
    toggleButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const body = document.body;
        const sidebarWrapper = document.querySelector('.sidebar-wrapper');
        
        if (body.classList.contains('toggled')) {
          body.classList.remove('toggled');
          if (sidebarWrapper) {
            // Remove hover events
            sidebarWrapper.removeEventListener('mouseenter', sidebarHoverIn);
            sidebarWrapper.removeEventListener('mouseleave', sidebarHoverOut);
          }
        } else {
          body.classList.add('toggled');
          if (sidebarWrapper) {
            // Add hover events
            sidebarWrapper.addEventListener('mouseenter', sidebarHoverIn);
            sidebarWrapper.addEventListener('mouseleave', sidebarHoverOut);
          }
        }
      });
    });
    
    // Sidebar close button
    const sidebarClose = document.querySelector('.sidebar-close');
    if (sidebarClose) {
      sidebarClose.addEventListener('click', function() {
        document.body.classList.remove('toggled');
      });
    }
    
    function sidebarHoverIn() {
      document.body.classList.add('sidebar-hovered');
    }
    
    function sidebarHoverOut() {
      document.body.classList.remove('sidebar-hovered');
    }
  }
  
  // Search functionality
  function setupSearch() {
    // Search control
    const searchControl = document.querySelector('.search-control');
    if (searchControl) {
      searchControl.addEventListener('click', function() {
        const searchPopup = document.querySelector('.search-popup');
        const searchClose = document.querySelector('.search-close');
        
        if (searchPopup) searchPopup.classList.add('d-block');
        if (searchClose) searchClose.classList.add('d-block');
      });
    }
    
    // Search close
    const searchClose = document.querySelector('.search-close');
    if (searchClose) {
      searchClose.addEventListener('click', function() {
        const searchPopup = document.querySelector('.search-popup');
        
        if (searchPopup) searchPopup.classList.remove('d-block');
        this.classList.remove('d-block');
      });
    }
    
    // Mobile search button
    const mobileSearchBtn = document.querySelector('.mobile-search-btn');
    if (mobileSearchBtn) {
      mobileSearchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const searchPopup = document.querySelector('.search-popup');
        if (searchPopup) searchPopup.classList.add('d-block');
      });
    }
    
    // Mobile search close
    const mobileSearchClose = document.querySelector('.mobile-search-close');
    if (mobileSearchClose) {
      mobileSearchClose.addEventListener('click', function() {
        const searchPopup = document.querySelector('.search-popup');
        if (searchPopup) searchPopup.classList.remove('d-block');
      });
    }
  }
  
  // Set active navigation item based on current page
  function setupNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    
    navLinks.forEach(link => {
      if (link.pathname === currentPath) {
        const parentLi = link.closest('li');
        if (parentLi) parentLi.classList.add('mm-active');
      }
    });
  }
  
  // Hide scrollbars functionality
  function hideSidebarScrollbars() {
    const sidebarRails = document.querySelectorAll('.sidebar-wrapper .ps__rail-y, .sidebar-wrapper .ps__rail-x');
    sidebarRails.forEach(rail => {
      rail.style.display = 'none';
      rail.style.opacity = 0;
      rail.style.width = '0';
    });
  }
  
  function hideAllScrollbars() {
    // Hide Perfect Scrollbar rails
    const allRails = document.querySelectorAll('.ps__rail-x, .ps__rail-y, .ps__thumb-x, .ps__thumb-y');
    allRails.forEach(rail => {
      rail.style.display = 'none';
      rail.style.opacity = 0;
      rail.style.width = '0';
      rail.style.height = '0';
    });
    
    // Apply no-scrollbar style to important elements
    document.documentElement.style.scrollbarWidth = 'none';
    document.documentElement.style.msOverflowStyle = 'none';
    document.body.style.scrollbarWidth = 'none';
    document.body.style.msOverflowStyle = 'none';
    
    // Apply style to main content elements
    const mainElements = document.querySelectorAll('.main-wrapper, .main-content');
    mainElements.forEach(el => {
      el.style.scrollbarWidth = 'none';
      el.style.msOverflowStyle = 'none';
    });
  }
  
  // Back to top button functionality
  function setupBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    if (backToTopBtn) {
      const scrollThreshold = 300;
      
      // Show/hide button based on scroll position
      window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
          backToTopBtn.classList.add('show');
        } else {
          backToTopBtn.classList.remove('show');
        }
      });
      
      // Smooth scroll to top when button is clicked
      backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Smooth scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
      
      // Keyboard navigation support
      backToTopBtn.addEventListener('keydown', function(e) {
        // Enter or Space key
        if (e.keyCode === 13 || e.keyCode === 32) {
          e.preventDefault();
          this.click();
        }
      });
      
      // Ensure button is accessible via keyboard
      backToTopBtn.setAttribute('tabindex', '0');
    }
  }
  
  // Sticky header
  function setupStickyHeader() {
    const navbar = document.querySelector('.top-header .navbar');
    
    if (navbar) {
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 60) {
          navbar.classList.add('sticky-header');
        } else {
          navbar.classList.remove('sticky-header');
        }
      });
    }
  }
  
  // PDF Download Analytics
  function setupPdfTracking() {
    document.addEventListener('click', function(e) {
      // Check if clicked element is a PDF link
      const isPdfLink = e.target.closest('a[href$=".pdf"]');
      if (!isPdfLink) return;
      
      const fullUrl = isPdfLink.href;
      let fileName = fullUrl.split('/').pop();
      
      // Clean filename: remove query parameters and hash fragments
      fileName = fileName.split('?')[0].split('#')[0];
      
      // Auto-detect subject from CDN URL path
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
      
      const language = isPdfLink.dataset.language || 'unknown';
      
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
          'link_url': isPdfLink.href,
          'value': 1
        };
        
        gtag('event', 'file_download', eventData);
        
        // Also send a simplified version for easier tracking
        gtag('event', 'pdf_download', {
          'file_name': fileName,
          'paper_name': paperName,
          'subject': cleanSubject,
          'language': cleanLanguage
        });
      }
    });
  }
  
  // Initialize scrollbar functionality
  function setupScrollbars() {
    // Ensure sidebar is scrollable but without visible scrollbars
    const sidebarWrapper = document.querySelector('.sidebar-wrapper');
    if (sidebarWrapper) {
      sidebarWrapper.style.overflowY = 'auto';
      sidebarWrapper.style.scrollbarWidth = 'none';
      sidebarWrapper.style.msOverflowStyle = 'none';
    }
    
    // Hide scrollbars
    hideSidebarScrollbars();
    hideAllScrollbars();
    
    // Additional event listener
    window.addEventListener('resize', function() {
      hideAllScrollbars();
      // Re-check sidebar scrollability
      if (sidebarWrapper) {
        sidebarWrapper.style.overflowY = 'auto';
      }
    });
    
    // Hide Pace spinner after loading
    setTimeout(function () {
      if (typeof Pace !== 'undefined') {
        Pace.stop();
      }
      hideAllScrollbars();
      // Ensure sidebar remains scrollable
      if (sidebarWrapper) {
        sidebarWrapper.style.overflowY = 'auto';
      }
    }, 180);
  }
  
  // Initialize all functionality
  setupThemeSwitchers();
  setupSidebar();
  setupSearch();
  setupNavigation();
  setupScrollbars();
  setupBackToTopButton();
  setupStickyHeader();
  setupPdfTracking();
}); 