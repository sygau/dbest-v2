import { Html, Head, Main, NextScript } from 'next/document'
import { consolidatedScripts, pwaStyles } from '../utils/documentScripts'

export default function Document() {
  return (
    <Html lang="zh-Hant">
      <Head>
        {/* BLOCKING theme script - MUST execute before any rendering */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var raw=localStorage.getItem('selectedTheme')||document.documentElement.getAttribute('data-theme')||'light';var theme=['dark','blue'].includes(raw)?raw:'light';var bg=theme==='dark'?'#212529':theme==='blue'?'#0f1535':'#eff1f3';document.documentElement.setAttribute('data-theme',theme);document.documentElement.style.setProperty('--color-body-bg',bg);document.documentElement.style.colorScheme=theme==='light'?'light':'dark';var meta=document.querySelector('meta[name=\"theme-color\"]');if(meta){meta.setAttribute('content',bg)}}catch(e){document.documentElement.setAttribute('data-theme','light');document.documentElement.style.setProperty('--color-body-bg','#eff1f3');document.documentElement.style.colorScheme='light'}})()`
        }} />
        <meta property="og:site_name" content="dse.best" />
        <meta property="og:locale" content="zh_HK" />
        <meta property="og:locale:alternate" content="en_US" />
        {/* Font preconnects removed — Noto Sans HK now self-hosted via next/font/google in _app.tsx */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon" />
        <meta name="theme-color" content="#0f1535" />
        {/* Optimized Ad-Free Logic (Static-Safe) */}
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
        {/* Consolidated Main Script */}
        <script dangerouslySetInnerHTML={{ __html: consolidatedScripts.mainScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src={`/assets/js/appendLinks.min.js`} async></script>
      </body>
    </Html>
  )
}
