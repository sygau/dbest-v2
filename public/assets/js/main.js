

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


  /* email */

  $(".email-toggle-btn").on("click", function() {
    $(".email-wrapper").toggleClass("email-toggled")
  }), $(".email-toggle-btn-mobile").on("click", function() {
    $(".email-wrapper").removeClass("email-toggled")
  }), $(".compose-mail-btn").on("click", function() {
    $(".compose-mail-popup").show()
  }), $(".compose-mail-close").on("click", function() {
    $(".compose-mail-popup").hide()
  }), 


  /* chat */

  $(".chat-toggle-btn").on("click", function() {
    $(".chat-wrapper").toggleClass("chat-toggled")
  }), $(".chat-toggle-btn-mobile").on("click", function() {
    $(".chat-wrapper").removeClass("chat-toggled")
  }),



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

    // Fallback: try to detect from current page if URL detection fails
    if (subject === 'unknown') {
      const currentPage = window.location.pathname;
      if (currentPage.includes('math')) subject = 'math';
      else if (currentPage.includes('english')) subject = 'english';
      else if (currentPage.includes('chinese')) subject = 'chinese';
      else if (currentPage.includes('physics')) subject = 'physics';
      else if (currentPage.includes('chemistry')) subject = 'chemistry';
      else if (currentPage.includes('biology')) subject = 'biology';
      else if (currentPage.includes('geography')) subject = 'geography';
      else if (currentPage.includes('history')) subject = 'history';
      else if (currentPage.includes('economics')) subject = 'economics';
      else if (currentPage.includes('ict')) subject = 'ict';
      else if (currentPage.includes('m1')) subject = 'm1';
      else if (currentPage.includes('m2')) subject = 'm2';
      else if (currentPage.includes('bafs')) subject = 'bafs';
      else if (currentPage.includes('visual-arts')) subject = 'visual-arts';
      else if (currentPage.includes('citizen')) subject = 'citizen';
    }

    // Use data attributes if available, otherwise auto-detect
    const year = $(this).data('year') || 'unknown';
    const paper = $(this).data('paper') || 'unknown';
    const type = $(this).data('type') || 'regular';
    const language = $(this).data('language') || 'unknown';

    // Extract additional info from filename if not provided
    let extractedYear = year;
    let extractedPaper = paper;
    let extractedType = type;
    let extractedLanguage = language;

    if (fileName) {
      // Extract year from filename (2012-2024)
      const yearMatch = fileName.match(/20(1[2-9]|2[0-4])/);
      if (yearMatch && extractedYear === 'unknown') {
        extractedYear = yearMatch[0];
      }

      // Extract paper type from filename
      if (fileName.includes('_p1') || fileName.includes('p_1')) extractedPaper = 'P1';
      else if (fileName.includes('_p2') || fileName.includes('p_2')) extractedPaper = 'P2';
      else if (fileName.includes('_p3') || fileName.includes('p_3')) extractedPaper = 'P3';
      else if (fileName.includes('_p4') || fileName.includes('p_4')) extractedPaper = 'P4';
      else if (fileName.includes('_ans') || fileName.includes('an_s')) extractedPaper = 'Answers';
      else if (fileName.includes('_per')) extractedPaper = 'Performance';

      // Extract type from filename
      if (fileName.includes('_pp_') || fileName.startsWith('pp_')) extractedType = 'practice';
      else if (fileName.includes('_sp_')) extractedType = 'sample';
      else if (fileName.includes('bytopic')) extractedType = 'bytopic';
      else if (fileName.includes('exam')) extractedType = 'exam';

      // Extract language from filename
      if (fileName.includes('_chi')) extractedLanguage = 'chinese';
      else if (fileName.includes('_eng')) extractedLanguage = 'english';
    }

    // Clean up data for Google Analytics (capitalize and remove hyphens)
    const cleanSubject = subject.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const cleanPaper = extractedPaper.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const cleanType = extractedType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const cleanLanguage = extractedLanguage.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    // Send to Google Analytics with optimized parameters
    if (typeof gtag !== 'undefined') {
      const eventData = {
        'file_name': fileName,
        'download_subject': cleanSubject,
        'download_year': extractedYear,
        'download_paper': cleanPaper,
        'download_type': cleanType,
        'download_language': cleanLanguage,
        'link_url': this.href,
        'value': 1
      };

      // Debug logging for GA4 data
      console.log('Sending to GA4:', eventData);

      gtag('event', 'file_download', eventData);

      // Also send a simplified version for easier tracking
      gtag('event', 'pdf_download', {
        'subject': cleanSubject,
        'year': extractedYear,
        'paper': cleanPaper,
        'language': cleanLanguage
      });
    }
  });
});