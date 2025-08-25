

$(function () {
  "use strict";


  /* scrollar */

  // new PerfectScrollbar(".notify-list")

  // new PerfectScrollbar(".search-content")

  // new PerfectScrollbar(".mega-menu-widgets")

   const savedTheme = localStorage.getItem("selectedTheme");
  if (savedTheme) {
    $("html").attr("data-bs-theme", savedTheme);
    // Set the corresponding radio button as checked
    $(`#${savedTheme.charAt(0).toUpperCase() + savedTheme.slice(1).replace('-theme','') }Theme`).prop("checked", true);
  }

  // Theme switcher with localStorage
  $("#BlueTheme").on("click", function () {
    $("html").attr("data-bs-theme", "blue-theme");
    localStorage.setItem("selectedTheme", "blue-theme");
  });

  $("#LightTheme").on("click", function () {
    $("html").attr("data-bs-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  });

  $("#DarkTheme").on("click", function () {
    $("html").attr("data-bs-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  });

  $("#SemiDarkTheme").on("click", function () {
    $("html").attr("data-bs-theme", "semi-dark");
    localStorage.setItem("selectedTheme", "semi-dark");
  });

  $("#BoderedTheme").on("click", function () {
    $("html").attr("data-bs-theme", "bodered-theme");
    localStorage.setItem("selectedTheme", "bodered-theme");
  });


  /* toggle button */

  $(".btn-toggle").click(function () {
    $("body").hasClass("toggled") ? ($("body").removeClass("toggled"), $(".sidebar-wrapper").unbind("hover")) : ($("body").addClass("toggled"), $(".sidebar-wrapper").hover(function () {
      $("body").addClass("sidebar-hovered")
    }, function () {
      $("body").removeClass("sidebar-hovered")
    }))
  })




  /* menu 

*/
  $(".sidebar-close").on("click", function () {
    $("body").removeClass("toggled")
  })



  /* dark mode button */

  $(".dark-mode i").click(function () {
    $(this).text(function (i, v) {
      return v === 'dark_mode' ? 'light_mode' : 'dark_mode'
    })
  });


  $(".dark-mode").click(function () {
    $("html").attr("data-bs-theme", function (i, v) {
      return v === 'dark' ? 'light' : 'dark';
    })
  })


  /* sticky header */

  $(document).ready(function () {
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 60) {
        $('.top-header .navbar').addClass('sticky-header');
      } else {
        $('.top-header .navbar').removeClass('sticky-header');
      }
    });
  });


  /* switcher */

  $("#BlueTheme").on("click", function () {
    $("html").attr("data-bs-theme", "blue-theme")
  }),

  $("#LightTheme").on("click", function () {
    $("html").attr("data-bs-theme", "light")
  }),

    $("#DarkTheme").on("click", function () {
      $("html").attr("data-bs-theme", "dark")
    }),

    $("#SemiDarkTheme").on("click", function () {
      $("html").attr("data-bs-theme", "semi-dark")
    }),

    $("#BoderedTheme").on("click", function () {
      $("html").attr("data-bs-theme", "bodered-theme")
    })



  /* search control */

  $(".search-control").click(function () {
    $(".search-popup").addClass("d-block");
    $(".search-close").addClass("d-block");
  });


  $(".search-close").click(function () {
    $(".search-popup").removeClass("d-block");
    $(".search-close").removeClass("d-block");
  });


  $(".mobile-search-btn").click(function () {
    $(".search-popup").addClass("d-block");
  });


  $(".mobile-search-close").click(function () {
    $(".search-popup").removeClass("d-block");
  });






  $(function () {
    // Lightweight navigation - add active class to current page  
    const currentPath = window.location.pathname;
    $('.sidebar-nav a').each(function() {
      if (this.pathname === currentPath) {
        $(this).closest('li').addClass('mm-active');
      }
    });
  });



  /**
   * Function to hide sidebar scrollbars
   */
  function hideSidebarScrollbars() {
    const sidebarRails = document.querySelectorAll('.sidebar-wrapper .ps__rail-y, .sidebar-wrapper .ps__rail-x');
    sidebarRails.forEach(rail => {
      rail.style.display = 'none';
      rail.style.opacity = 0;
      rail.style.width = '0';
    });
  }
  
  /**
   * Function to hide all scrollbars throughout the app
   */
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

  // Apply scrollbar functionality when DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    // Initialize PerfectScrollbar with optimal settings
    // const sidebarPS = new PerfectScrollbar(".sidebar-wrapper", {
    //   suppressScrollX: true,
    //   wheelPropagation: true,
    //   minScrollbarLength: 0,
    //   swipeEasing: true
    // });
    
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
    
    // Additional event listeners
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
  });

  // Back to Top Button functionality
  $(document).ready(function() {
    const backToTopBtn = $('#backToTopBtn');

    // Only initialize if the button exists on the page
    if (backToTopBtn.length > 0) {
      const scrollThreshold = 300;

      // Show/hide button based on scroll position
      $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
        if (scrollTop > scrollThreshold) {
          backToTopBtn.addClass('show');
        } else {
          backToTopBtn.removeClass('show');
        }
      });

      // Smooth scroll to top when button is clicked
      backToTopBtn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, 600, 'swing');
      });

      // Keyboard navigation support
      backToTopBtn.on('keydown', function(e) {
        // Enter or Space key
        if (e.which === 13 || e.which === 32) {
          e.preventDefault();
          $(this).click();
        }
      });

      // Ensure button is accessible via keyboard
      backToTopBtn.attr('tabindex', '0');
    }
  });



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