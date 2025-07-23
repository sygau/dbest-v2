

$(function () {
  "use strict";


  /* scrollar */

  new PerfectScrollbar(".notify-list")

  new PerfectScrollbar(".search-content")

  // new PerfectScrollbar(".mega-menu-widgets")

  $(function () {
    $('#sidenav').metisMenu();
  });

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
    for (var e = window.location, o = $(".metismenu li a").filter(function () {
      return this.href == e
    }).addClass("").parent().addClass("mm-active"); o.is("li");) o = o.parent("").addClass("mm-show").parent("").addClass("mm-active")
  });



  // PWA Enhancements
  
  /**
   * Detects if running as a PWA on iOS (iPhone/iPad)
   * @returns {boolean} True if running as PWA on iOS
   */
  function isIOSStandalone() {
    const ua = window.navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    const standalone = window.navigator.standalone === true ||
      (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
    return isIOS && standalone;
  }
  
  /**
   * Applies native-like feel for PWA on iOS
   */
  function applyPWAiOSNativeFeel() {
    document.body.classList.add('pwa-ios');
    // Prevent text selection
    document.body.style.webkitUserSelect = 'none';
    document.body.style.userSelect = 'none';
    // Prevent zooming
    let viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
    }
    // Prevent overscroll/stretching
    document.body.style.overscrollBehavior = 'none';
    document.body.style.webkitOverflowScrolling = 'auto';
    
    // iOS-specific scrolling fixes
    const sidebarWrapper = document.querySelector('.sidebar-wrapper');
    if (sidebarWrapper) {
      // Apply iOS-specific scrolling properties
      sidebarWrapper.style.webkitOverflowScrolling = 'touch';  // Enable momentum scrolling
      sidebarWrapper.style.overflowY = 'scroll';
      
      // Force hide scrollbars on iOS
      const style = document.createElement('style');
      style.innerHTML = `
        .sidebar-wrapper::-webkit-scrollbar { 
          width: 0 !important;
          display: none !important;
        }
        .sidebar-wrapper { 
          overflow-y: scroll !important;
          -webkit-overflow-scrolling: touch !important;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
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
  
  /**
   * Detects if the device is running iOS
   * @returns {boolean} True if running on iOS
   */
  function isIOS() {
    const ua = window.navigator.userAgent;
    return /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
  }

  // Apply the PWA enhancements when DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    // Check for iOS PWA mode
    const isIOSDevice = isIOS();
    if (isIOSStandalone()) {
      applyPWAiOSNativeFeel();
    }
    
    // Initialize PerfectScrollbar with settings appropriate for the platform
    const sidebarPS = new PerfectScrollbar(".sidebar-wrapper", {
      suppressScrollX: true,
      wheelPropagation: true,
      minScrollbarLength: 0,
      swipeEasing: true
    });
    
    // Ensure sidebar is scrollable but without visible scrollbars
    const sidebarWrapper = document.querySelector('.sidebar-wrapper');
    if (sidebarWrapper) {
      if (isIOSDevice) {
        // iOS needs these specific settings
        sidebarWrapper.style.overflowY = 'scroll';
        sidebarWrapper.style.webkitOverflowScrolling = 'touch';
      } else {
        // Non-iOS devices
        sidebarWrapper.style.overflowY = 'auto';
      }
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
        if (isIOSDevice) {
          sidebarWrapper.style.overflowY = 'scroll';
          sidebarWrapper.style.webkitOverflowScrolling = 'touch';
        } else {
          sidebarWrapper.style.overflowY = 'auto';
        }
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
        if (isIOSDevice) {
          sidebarWrapper.style.overflowY = 'scroll';
          sidebarWrapper.style.webkitOverflowScrolling = 'touch';
        } else {
          sidebarWrapper.style.overflowY = 'auto';
        }
      }
    }, 680);
  });
});










