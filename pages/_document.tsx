import { Html, Head, Main, NextScript } from 'next/document'
import { consolidatedScripts, pwaStyles } from '../utils/documentScripts'

export default function Document() {
  return (
    <Html lang="zh-Hant">
      <Head>
        {/* BLOCKING theme script - MUST execute before any rendering */}
        <script dangerouslySetInnerHTML={{ 
          __html: `(function(){try{var theme=localStorage.getItem('selectedTheme')||'light';document.documentElement.setAttribute('data-bs-theme',theme);document.documentElement.style.setProperty('--bs-body-bg',theme==='dark'?'#212529':theme==='blue-theme'?'#0f1535':'#eff1f3')}catch(e){document.documentElement.setAttribute('data-bs-theme','light');document.documentElement.style.setProperty('--bs-body-bg','#eff1f3')}})()` 
        }} />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "html:not([data-bs-theme]) .card,html[data-bs-theme='light'] .card,html[data-bs-theme='semi-dark'] .card{background-color:#ffffff !important;}html:not([data-bs-theme]) .card.rounded-4,html[data-bs-theme='light'] .card.rounded-4,html[data-bs-theme='semi-dark'] .card.rounded-4{background-color:#ffffff !important;}"
          }}
        />
        <meta property="og:site_name" content="dse.best" />
        <meta property="og:locale" content="zh_HK" />
        <meta property="og:locale:alternate" content="en_US" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon" />
        <meta name="theme-color" content="#0f1535" />

        {/* Bootstrap CSS */}
        <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" as="style" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />

        {/* Fonts */}
        {/* <link rel="preload" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&display=swap" as="style" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" /> */}
        
        {/* Noto Sans HK for 12p pages */}
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+HK:wght@400;500;600;700;900&display=swap" rel="stylesheet" />

                {/* Optimized Ad-Free Logic (Static-Safe) */}
        {process.env.PASSCODE_MODE !== 'true' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){
                try {
                  var p = new URLSearchParams(window.location.search);
                  var isNa = p.has('na');
                  var isCookie = document.cookie.indexOf('noAds=1') !== -1;
                  var isLocal = false;
                  try { isLocal = localStorage.getItem('noAds') === '1'; } catch(e) {}
                  
                  if (isNa || isCookie || isLocal) {
                    window.__noAds = true;
                    try { localStorage.setItem('noAds', '1'); } catch(e) {}
                    var st = document.createElement('style');
                    st.innerHTML = '.adsbygoogle, ins.adsbygoogle, [id^="google_ads"] { display:none !important; visibility:hidden !important; height:0 !important; }';
                    document.head.appendChild(st);
                  } else {
                    var s = document.createElement('script');
                    s.async = true;
                    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9807119599898921";
                    s.setAttribute('crossorigin', 'anonymous');
                    document.head.appendChild(s);
                  }
                } catch(e) {}
              })();`
            }}
          />
        )}


        {/* Google Analytics */}
        <script src="https://www.googletagmanager.com/gtag/js?id=G-XB60B3MXHH" defer></script>
        <script defer dangerouslySetInnerHTML={{ __html: consolidatedScripts.analytics }} />

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="DSEBest" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no, email=no" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-touch-callout" content="none" />

        {/* PWA iOS Styles */}
        <style dangerouslySetInnerHTML={{ __html: pwaStyles }} />

        {/* Hide download buttons */}
        {/* <Public><style dangerouslySetInnerHTML={{ __html: `a[data-paper-id],.btn-info:has(svg),.btn-info svg{display:none!important}` }} /></Public> */}

        {/* Consolidated Main Script */}
        <script dangerouslySetInnerHTML={{ __html: consolidatedScripts.mainScript }} />

        {process.env.PASSCODE_MODE === 'true' && (
          <script defer src="https://x.dse.best/_vercel/insights/script.js"></script>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* Critical Scripts - Load in dependency order */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

        {process.env.PASSCODE_MODE === 'true' ? (
          <script src={`/assets/js/appendLinksX.js?v=${Date.now()}`} async></script>
        ) : (
          <script src={`/assets/js/appendLinks.min.js?v=${Date.now()}`} async></script>
        )}
      </body>
    </Html>
  )
}