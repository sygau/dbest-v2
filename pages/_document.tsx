import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="zh-Hant" data-bs-theme="blue-theme">
      <Head>
        {/* Remove title and meta description from document - these should be in individual pages */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Preconnect hints for faster resource loading */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://code.jquery.com" />
        
        {/* favicon */}
        <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon" />
        
        <meta name="theme-color" content="#0f1535" />
        
        {/* loader */}
        <link href="/assets/css/pace.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/pace-js@1.2.3/pace.min.js"></script>
        
        {/* plugins */}
        <link href="https://cdn.jsdelivr.net/npm/metismenu@3.0.7/dist/metisMenu.min.css" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="/assets/plugins/metismenu/mm-vertical.css" />
        
        {/* bootstrap css */}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&display=swap" />
        <link href="https://fonts.googleapis.com/css?family=Material+Icons+Outlined" rel="stylesheet" />
        
        {/* main css */}
        <link href="/assets/css/bootstrap-extended.css" rel="stylesheet" />
        <link href="/sass/main.css" rel="stylesheet" />
        <link href="/sass/dark-theme.css" rel="stylesheet" />
        <link href="/sass/blue-theme.css" rel="stylesheet" />
        <link href="/sass/semi-dark.css" rel="stylesheet" />
        <link href="/sass/bordered-theme.css" rel="stylesheet" />
        <link href="/sass/responsive.css" rel="stylesheet" />
        
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              var theme = localStorage.getItem('selectedTheme');
              if (theme) {
                document.documentElement.setAttribute('data-bs-theme', theme);
              }
            } catch (e) { }
          `
        }} />
        
        {/* Google tag (gtag.js) */}
        <script src="https://www.googletagmanager.com/gtag/js?id=G-XB60B3MXHH" defer></script>
        <script defer dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-XB60B3MXHH');
          `
        }} />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "DSEBest",
            "url": "https://dse.best/"
          })
        }} />
        
        {/* Vercel Analytics */}
        <script dangerouslySetInnerHTML={{
          __html: `window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`
        }} />
        <script defer src="/_vercel/insights/script.js"></script>
        
        {/* Vercel Speed Insights */}
        <script dangerouslySetInnerHTML={{
          __html: `window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };`
        }} />
        <script defer src="/_vercel/speed-insights/script.js"></script>
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* iOS support */}
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="DSEBest" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no, email=no" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-touch-callout" content="none" />

        {/* PWA iOS Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            body.pwa-ios,body.pwa-ios *{-webkit-user-select:none!important;user-select:none!important;-webkit-touch-callout:none!important;-webkit-tap-highlight-color:transparent!important;scrollbar-width:none!important;-ms-overflow-style:none!important}
            body.pwa-ios img{-webkit-user-drag:none!important;user-drag:none!important}
            body.pwa-ios ::-webkit-scrollbar{display:none!important;width:0!important}
            body.pwa-ios .sidebar-wrapper,body.pwa-ios .sidebar-nav{overflow-y:scroll!important;-webkit-overflow-scrolling:touch!important}
            body.pwa-ios input,body.pwa-ios textarea{-webkit-user-select:auto!important;user-select:auto!important}
            body.pwa-ios{overscroll-behavior:contain;touch-action:manipulation;-webkit-text-size-adjust:100%!important;text-size-adjust:100%!important}
            body.pwa-ios .ps__rail-x,body.pwa-ios .ps__rail-y,body.pwa-ios .ps__thumb-x,body.pwa-ios .ps__thumb-y{opacity:0!important;display:none!important;width:0!important;height:0!important}
            body.pwa-ios a,body.pwa-ios button,body.pwa-ios [role="button"],body.pwa-ios input[type="button"],body.pwa-ios input[type="submit"]{-webkit-tap-highlight-color:transparent!important;touch-action:manipulation!important}
          `
        }} />
        
        {/* PWA iOS Script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            function isIOSStandalone(){const e=window.navigator.userAgent,t=/iPad|iPhone|iPod/.test(e)||/Mac/.test(e)&&navigator.maxTouchPoints>1||!window.MSStream,n=!0===window.navigator.standalone||window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches;return t&&n}function applyPWAiOSNativeFeel(){document.body.classList.add("pwa-ios"),document.documentElement.style.webkitUserSelect="none",document.documentElement.style.userSelect="none",document.body.style.webkitUserSelect="none",document.body.style.userSelect="none",document.documentElement.style.touchAction="manipulation",document.body.style.touchAction="manipulation",document.addEventListener("gesturestart",function(e){return e.preventDefault(),!1},{passive:!1}),document.addEventListener("gesturechange",function(e){return e.preventDefault(),!1},{passive:!1}),document.addEventListener("gestureend",function(e){return e.preventDefault(),!1},{passive:!1});let e=document.querySelector('meta[name="viewport"]');e&&e.setAttribute("content","width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no");const t=document.createElement("meta");t.name="viewport",t.content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",document.head.appendChild(t),document.body.style.overscrollBehavior="none",document.documentElement.style.overscrollBehavior="none",document.body.style.webkitOverflowScrolling="touch";const n=document.createElement("style");n.textContent="::-webkit-scrollbar,::-webkit-scrollbar-track,::-webkit-scrollbar-thumb{display:none!important;width:0!important;height:0!important;background:transparent!important;appearance:none!important}*{scrollbar-width:none!important;-ms-overflow-style:none!important;scrollbar-color:transparent transparent!important}.main-content::-webkit-scrollbar,.main-wrapper::-webkit-scrollbar,main::-webkit-scrollbar{display:none!important;width:0!important;height:0!important;background:transparent!important}.main-content,.main-wrapper,main{-webkit-overflow-scrolling:touch!important;overflow-y:auto!important;scrollbar-width:none!important;-ms-overflow-style:none!important;scroll-behavior:smooth!important}",document.head.appendChild(n);const o=()=>{const e=document.querySelector(".main-content"),t=document.querySelector(".main-wrapper");e&&(e.style.webkitOverflowScrolling="touch",e.style.overflowY="auto",e.style.height="100%",e.style.position="relative",e.style.scrollbarWidth="none",e.style.msOverflowStyle="none"),t&&(t.style.webkitOverflowScrolling="touch",t.style.overflowY="auto",t.style.height="100%",t.style.position="relative",t.style.scrollbarWidth="none",t.style.msOverflowStyle="none");const n=document.querySelector(".sidebar-wrapper"),o=document.querySelector(".sidebar-nav");n&&(n.style.webkitOverflowScrolling="touch",n.style.overflowY="auto",n.style.scrollbarWidth="none",n.style.msOverflowStyle="none"),o&&(o.style.webkitOverflowScrolling="touch",o.style.overflowY="auto",o.style.scrollbarWidth="none",o.style.msOverflowStyle="none"),document.documentElement.style.height="100%",document.documentElement.style.overscrollBehavior="none",document.body.style.height="100%",document.body.style.overscrollBehavior="none",document.body.style.overflowY="auto"};o(),setTimeout(o,100),setTimeout(o,500),document.addEventListener("scroll",function(){requestAnimationFrame(o)},{passive:!0}),window.addEventListener("resize",o,{passive:!0});const l=document.createElement("style");l.innerHTML="*{-webkit-touch-callout:none!important;-webkit-tap-highlight-color:transparent!important}body,html{-webkit-text-size-adjust:100%!important;text-size-adjust:100%!important}a,button,[role=button],input,select,textarea{touch-action:manipulation!important}",document.head.appendChild(l);const s=setInterval(()=>{document.documentElement.style.webkitUserSelect="none",document.documentElement.style.userSelect="none",document.body.style.webkitUserSelect="none",document.body.style.userSelect="none"},2e3);window.addEventListener("unload",()=>{clearInterval(s)})}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",function(){isIOSStandalone()&&applyPWAiOSNativeFeel()}):isIOSStandalone()&&applyPWAiOSNativeFeel(),window.addEventListener("load",function(){isIOSStandalone()&&applyPWAiOSNativeFeel()}),window.addEventListener("orientationchange",function(){setTimeout(()=>{isIOSStandalone()&&applyPWAiOSNativeFeel()},100)});
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
        
        {/* bootstrap js */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
        
        {/* plugins */}
        {/* jQuery */}
        <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
        
        {/* MetisMenu */}
        <script src="https://cdn.jsdelivr.net/npm/metismenu@3.0.7/dist/metisMenu.min.js"></script>
        
        {/* main.js */}
        <script src="/assets/js/main.js" defer></script>
        
        {/* appendLinks.js */}
        <script src="/assets/js/appendLinks.js" defer></script>
        
        {/* Global initialization functions - only for general page setup */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Global initialization function for general page setup
            window.initializePage = function() {
              try {
                console.log('initializePage called, checking for initPaperLinks...');
                
                // Initialize paper links if available (used by subject pages)
                setTimeout(() => {
                  if (typeof window.initPaperLinks === 'function') {
                    console.log('Calling initPaperLinks after delay');
                    window.initPaperLinks();
                  } else {
                    console.warn('initPaperLinks function not available');
                  }
                }, 200);
                
              } catch (error) {
                console.error('Initialization error:', error);
              }
            }

            // Initial page load (only for first visit)
            if (document.readyState === 'complete') {
              window.initializePage();
            } else {
              document.addEventListener('DOMContentLoaded', window.initializePage);
            }
          `
        }} />
      </body>
    </Html>
  )
}
