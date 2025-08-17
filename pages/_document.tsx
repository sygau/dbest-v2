import { Html, Head, Main, NextScript } from 'next/document'
import { consolidatedScripts, pwaStyles } from '../utils/documentScripts'

export default function Document() {
  return (
    <Html lang="zh-Hant" data-bs-theme="blue-theme">
      <Head>
        <meta property="og:site_name" content="dse.best" />
        <meta property="og:locale" content="zh_HK" />
        <meta property="og:locale:alternate" content="en_US" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon" />
        <meta name="theme-color" content="#0f1535" />
        {/* Bootstrap CSS */}
        <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" as="style" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
        
        {/* Fonts */}
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&display=swap" />
        
        {/* Combined CSS - All themes and styles in one file */}
        <link rel="preload" href="/assets/css/combined.min.css" as="style" />
        <link href="/assets/css/combined.min.css" rel="stylesheet" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "DSEBest",
            "description": "DSE.BEST 提供全面的香港中學文憑試 (DSE) 各科歷屆試題及答案，涵蓋中文、英文、數學、物理、化學等主要及選修科目。助您掌握考試趨勢，輕鬆備戰 DSE 考試。",
            "url": "https://dse.best/",
            "inLanguage": ["zh-HK", "en-HK"],
          })
        }} />

        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9807119599898921" crossOrigin="anonymous"></script>

        {/* Google Analytics */}
        <script src="https://www.googletagmanager.com/gtag/js?id=G-XB60B3MXHH" defer></script>
        <script defer dangerouslySetInnerHTML={{ __html: consolidatedScripts.analytics }} />
        
        {/* Vercel Analytics */}
        <script dangerouslySetInnerHTML={{ __html: consolidatedScripts.vercel }} />
        <script defer src="/_vercel/insights/script.js"></script>
        <script defer src="/_vercel/speed-insights/script.js"></script>
        
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
        {/* Critical Scripts - Load in dependency order */}
        <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
        <script src="/assets/js/main.min.js"></script>
        <script src="/assets/js/appendLinks.min.js" async></script>
      </body>
    </Html>
  )
}
