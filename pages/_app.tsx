import type { AppProps } from 'next/app'
import Link from 'next/link'
import Head from 'next/head'
import NavigationLink from '../components/NavigationLink'
import '../styles/globals.css' // Import Next.js global CSS
import {
  BiHomeAlt,
  BiTimeFive,
  BiChat,
  BiBook,
  BiCalculator,
  BiBot,
  BiTestTube,
  BiLeaf,
  BiLaptop,
  BiGlobe,
  BiMoney,
  BiBriefcase,
  BiInfoCircle,
  BiSupport,
  BiError,
  BiShieldAlt,
  BiMenu,
  BiX,
  BiSearch,
  BiArrowToTop,
  BiCircleHalf,
  BiUpArrowAlt,
  BiFile,
  BiPalette,
  BiBookReader,
  BiLogoInstagram
} from 'react-icons/bi';
import PageTransition from '../components/PageTransition'
import PaceLoader from '../components/PaceLoader'
import usePageInitialization from '../hooks/usePageInitialization'
import usePdfTracking from '../hooks/usePdfTracking' // Import the PDF tracking hook
import TraditionalLayoutManager from '../components/TraditionalLayoutManager'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  // Initialize page-specific JavaScript functionality
  const ui = usePageInitialization()
  // Initialize PDF tracking
  usePdfTracking()
  const canonicalUrl = `https://dse.best${router.asPath}`
  // Render a minimal layout for the maintenance page (no header/sidebar/footer)
  if (router.pathname === '/maintenance') {
    return <Component {...pageProps} />
  }

  // Theme switcher handlers
  const handleThemeChange = (theme: string) => {
    console.log(`Theme clicked: ${theme}`);
    switch (theme) {
      case 'blue-theme':
        ui.handleBlueTheme();
        break;
      case 'light':
        ui.handleLightTheme();
        break;
      case 'dark':
        ui.handleDarkTheme();
        break;
      case 'semi-dark':
        ui.handleSemiDarkTheme();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <PaceLoader />
      <TraditionalLayoutManager />

      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />
        <style>{`html,body,#__next{transition:none!important;margin:0;padding:0}*{box-sizing:border-box}.main-content{transition:opacity .2s ease-in-out;min-height:100vh}.main-wrapper{min-height:100vh}body{overflow-x:hidden}.pace{-webkit-pointer-events:none;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}.pace-inactive{display:none}.pace .pace-progress{background:linear-gradient(to right,#7928ca,#ff0080,#04e09a,#e0d504);-o-border-image:linear-gradient(to right,#7928ca,#ff0080,#04e09a,#e0d504) 1;border-image:linear-gradient(to right,#7928ca,#ff0080,#04e09a,#e0d504) 1;position:fixed;z-index:2000;top:0;right:100%;width:100%;height:3px!important}.pace .pace-progress-inner{display:block;position:absolute;right:0;width:100px;height:100%;box-shadow:0 0 10px #0d6efd,0 0 5px #0d6efd;opacity:1;-webkit-transform:rotate(3deg) translate(0,-4px);-moz-transform:rotate(3deg) translate(0,-4px);-ms-transform:rotate(3deg) translate(0,-4px);-o-transform:rotate(3deg) translate(0,-4px);transform:rotate(3deg) translate(0,-4px)}.pace .pace-activity{display:none!important;visibility:hidden!important;opacity:0!important}`}</style>
      </Head>

      {/* Header */}
      <header className="top-header">
        <nav className="navbar navbar-expand align-items-center gap-4">
          <div className="btn-toggle">
            <button 
              type="button" 
              className="btn p-0 border-0 bg-transparent" 
              aria-label="Toggle sidebar menu"
              onClick={ui.toggleSidebar}
            >
              <BiMenu style={{ fontSize: 24 }} />
            </button>
          </div>
          <div className="search-bar flex-grow-1">
            <div className="position-relative">
              {/* <input 
                className="form-control rounded-5 px-5 search-control d-lg-block d-none" 
                type="text" 
                placeholder="Search"
              />
              <span 
                className="position-absolute me-3 translate-middle-y end-0 top-50 search-close"
                tabIndex={0} 
                role="button" 
                aria-label="Close Search"
              >
                <BiX style={{ fontSize: 22 }} />
              </span>
              <div className="search-popup p-3">
                <div className="card rounded-4 overflow-hidden">
                  <div className="card-body search-content">
                    <p className="search-title mb-0" style={{whiteSpace: 'nowrap'}}>
                      ⠀(裝飾嚟嘅， SEARCH唔到)⠀
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <ul className="navbar-nav gap-1 nav-right-links align-items-center">
            {/* <li className="nav-item d-lg-none mobile-search-btn">
              <a className="nav-link" href="#"><BiSearch style={{ fontSize: 22 }} /></a>
            </li> */}
 
            <li className="nav-item">
              <a 
                className="nav-link btn bg-transparent border-0 p-0" 
                href="https://www.instagram.com/dse_best"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                title="Follow us on Instagram"
                onClick={(e) => {
                  // Try to open Instagram app first on mobile
                  if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    e.preventDefault();
                    const appUrl = 'instagram://user?username=dse_best';
                    const webUrl = 'https://www.instagram.com/dse_best';
                    
                    // Try to open app, fallback to website after 2 seconds
                    window.location.href = appUrl;
                    setTimeout(() => {
                      window.location.href = webUrl;
                    }, 2000);
                  }
                }}
              >
                <BiLogoInstagram style={{ fontSize: 22 }} />
              </a>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link btn bg-transparent border-0 p-0" 
                data-bs-toggle="offcanvas" 
                data-bs-target="#staticBackdrop"
                aria-label="主題設定 Theme Settings"
                title="主題設定 Theme Settings"
              >
                <BiCircleHalf style={{ fontSize: 22 }} />
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Wrapper */}
      <div className="wrapper">
        {/* Sidebar */}
        <aside 
          className="sidebar-wrapper"
          data-simplebar="init"
          onMouseEnter={ui.handleSidebarMouseEnter}
          onMouseLeave={ui.handleSidebarMouseLeave}
        >
          <div className="sidebar-header">
            <div className="logo-icon">
              <NavigationLink href="/" aria-label="DSEBest 主頁 Home">
                {/* <?xml version="1.0" encoding="UTF-8"?> */}
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 192 192" role="img" aria-labelledby="logoTitle">
                  <title id="logoTitle">DSEBest Logo</title>
                  <path d="M0 0 C1.15246719 -0.00511093 2.30493439 -0.01022186 3.49232483 -0.01548767 C7.28163933 -0.02932603 11.07077074 -0.02843106 14.86010742 -0.02612305 C16.83866637 -0.02902896 18.81722539 -0.03194029 20.79578322 -0.03552979 C27.01133488 -0.04659129 33.22682609 -0.04708178 39.44238281 -0.04101562 C45.82431629 -0.03498218 52.20602895 -0.04727843 58.58792478 -0.06858569 C64.09399487 -0.08628329 69.5999952 -0.09219017 75.10609263 -0.08894795 C78.38276247 -0.08714743 81.65924137 -0.09098878 84.93589211 -0.10366249 C88.59675421 -0.11608444 92.25711388 -0.10920007 95.91796875 -0.09765625 C97.51517761 -0.10912186 97.51517761 -0.10912186 99.14465332 -0.12081909 C111.67876557 -0.03404528 123.35213343 2.82242028 132.84057617 11.3371582 C142.29049256 21.40241798 144.45458181 33.95388943 144.44360352 47.17578125 C144.45032074 48.34600327 144.45703796 49.51622528 144.46395874 50.72190857 C144.48290002 54.576775 144.48686122 58.43146692 144.48901367 62.28637695 C144.49186369 63.62214547 144.49505619 64.9579133 144.49858475 66.29368019 C144.51705468 73.29183287 144.52525951 80.2899097 144.52368164 87.28808594 C144.52248229 93.77852692 144.54355166 100.26863428 144.57516897 106.75899094 C144.60145583 112.35762626 144.61204372 117.95615348 144.61077082 123.55484992 C144.61026464 126.88701291 144.61763846 130.21864473 144.63712692 133.55078697 C144.65687398 137.27632133 144.65091344 141.00101256 144.63891602 144.7265625 C144.65015503 145.80804565 144.66139404 146.88952881 144.67297363 148.00378418 C144.57082555 160.58007727 140.99535574 171.99840742 132.30541992 181.23950195 C122.06984821 190.86460219 109.86434923 192.58068253 96.30615234 192.54931641 C95.15368515 192.55442734 94.00121796 192.55953827 92.81382751 192.56480408 C89.02451302 192.57864244 85.2353816 192.57774747 81.44604492 192.57543945 C79.46748597 192.57834537 77.48892695 192.58125669 75.51036912 192.5848462 C69.29481746 192.5959077 63.07932625 192.59639818 56.86376953 192.59033203 C50.48183605 192.58429859 44.10012339 192.59659484 37.71822757 192.6179021 C32.21215748 192.63559969 26.70615715 192.64150658 21.20005971 192.63826436 C17.92338987 192.63646384 14.64691098 192.64030518 11.37026024 192.6529789 C7.70939813 192.66540084 4.04903847 192.65851647 0.38818359 192.64697266 C-0.67662231 192.65461639 -1.74142822 192.66226013 -2.83850098 192.6701355 C-15.37261323 192.58336169 -27.04598108 189.72689612 -36.53442383 181.2121582 C-45.98434021 171.14689843 -48.14842947 158.59542697 -48.13745117 145.37353516 C-48.1441684 144.20331314 -48.15088562 143.03309113 -48.1578064 141.82740784 C-48.17674768 137.9725414 -48.18070887 134.11784948 -48.18286133 130.26293945 C-48.18571134 128.92717094 -48.18890385 127.59140311 -48.1924324 126.25563622 C-48.21090233 119.25748354 -48.21910717 112.25940671 -48.2175293 105.26123047 C-48.21632994 98.77078949 -48.23739931 92.28068213 -48.26901662 85.79032546 C-48.29530348 80.19169014 -48.30589138 74.59316292 -48.30461848 68.99446648 C-48.3041123 65.6623035 -48.31148612 62.33067168 -48.33097458 58.99852943 C-48.35072163 55.27299508 -48.3447611 51.54830385 -48.33276367 47.82275391 C-48.34400269 46.74127075 -48.3552417 45.6597876 -48.36682129 44.54553223 C-48.2646732 31.96923913 -44.68920339 20.55090899 -35.99926758 11.30981445 C-25.76369586 1.68471421 -13.55819688 -0.03136612 0 0 Z " fill="#181A2D" transform="translate(47.846923828125,-0.274658203125)" />
                  <path d="M0 0 C45.65219156 0 45.65219156 0 57.13671875 9.9921875 C66.21931613 19.77930501 68.87862182 31.52087695 68.41015625 44.5390625 C67.56151872 56.71794211 63.16482039 67.42853947 54.11328125 75.73046875 C38.98240744 87.40285712 17.43873962 84 0 84 C0 56.28 0 28.56 0 0 Z " fill="#6848E7" transform="translate(32,51)" />
                  <path d="M0 0 C4.95 0 9.9 0 15 0 C15 9.57 15 19.14 15 29 C17.64 27.35 20.28 25.7 23 24 C29.15783248 21.94738917 36.50989488 21.88206857 42.4375 24.6875 C49.25056015 28.75562889 53.85568383 34.34549431 56 42 C57.50411038 54.57720268 57.19181737 67.54370077 49.25 77.9375 C43.55508143 83.78709537 38.53634906 85.25220194 30.375 85.5 C24.58548237 85.5477486 21.57502108 84.57208853 17 81 C16.505 80.505 16.505 80.505 16 80 C15.67 81.65 15.34 83.3 15 85 C10.05 85 5.1 85 0 85 C0 56.95 0 28.9 0 0 Z " fill="#6748E6" transform="translate(109,50)" />
                  <path d="M0 0 C19.875 0 19.875 0 26 4 C26.928125 4.5775 27.85625 5.155 28.8125 5.75 C34.91314684 12.02495103 36.29150199 19.60600077 36.3190918 28.08935547 C36.17929373 35.59515882 34.3563105 41.23133517 29.5 46.9375 C28.2625 47.9584375 28.2625 47.9584375 27 49 C26.38125 49.556875 25.7625 50.11375 25.125 50.6875 C17.19483451 55.58554339 9.22404096 54 0 54 C0 36.18 0 18.36 0 0 Z " fill="#17192B" transform="translate(48,66)" />
                  <path d="M0 0 C5.19719122 1.79902773 7.32849441 4.25065673 10 9 C12.08079409 15.24238228 11.81192229 21.87930729 9.25 27.9375 C6.98943225 32.40272041 4.86829864 35.37723379 0 37 C-5.98363729 37.45159527 -9.8648471 36.4011753 -14.64038086 32.74365234 C-17.58599821 28.96602635 -16.55475239 23.21158692 -16.5625 18.625 C-16.59923828 17.48804687 -16.63597656 16.35109375 -16.67382812 15.1796875 C-16.71689272 7.02612478 -16.71689272 7.02612478 -14.69482422 4.13183594 C-10.06355745 0.21209631 -5.90938932 -0.59534892 0 0 Z " fill="#17192D" transform="translate(140,86)" />
                  <path d="M0 0 C11.55 0 23.1 0 35 0 C35.495 0.99 35.495 0.99 36 2 C24.78 2.33 13.56 2.66 2 3 C1.67 19.5 1.34 36 1 53 C0.67 53 0.34 53 0 53 C0 35.51 0 18.02 0 0 Z " fill="#7352F1" transform="translate(32,51)" />
                </svg>

              </NavigationLink>
            </div>
            <div className="logo-name flex-grow-1">
              <NavigationLink href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h5 className="mb-0">DSEBest</h5>
              </NavigationLink>
            </div>
            <div className="sidebar-close">
              <button 
                className="btn p-0 border-0 bg-transparent" 
                aria-label="Close sidebar"
                onClick={ui.closeSidebar}
              >
                <BiX style={{ fontSize: 24 }} />
              </button>
            </div>
          </div>
          <div className="sidebar-nav" suppressHydrationWarning>
            {/* navigation */}
            <ul className="metismenu sidebar-menu" id="sidenav" suppressHydrationWarning>
            <li>
              <NavigationLink href="/">
                <div className="parent-icon"><BiHomeAlt style={{ color: '#a78bfa', fontSize: 24 }} /></div>
                <div className="menu-title">主頁</div>
              </NavigationLink>
            </li>
            {/* <li>
              <Link href="/blog/">
                <div className="parent-icon"><BiFile style={{color: '#ffc107', fontSize: 24}} /></div>
                <div className="menu-title">Blog</div>
              </Link>
            </li> */}
            <li>
              <NavigationLink href="/countdown">
                <div className="parent-icon"><BiTimeFive style={{ color: '#f9a8d4', fontSize: 24 }} /></div>
                <div className="menu-title">DSE 2026 倒數</div>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="/chat">
                <div className="parent-icon"><BiChat style={{ color: '#fdba74', fontSize: 24 }} /></div>
                <div className="menu-title">聊天室 Chatroom</div>
              </NavigationLink>
            </li>
            <li className="menu-label">核心科目</li>
            <li>
              <NavigationLink href="/chinese">
                <div className="parent-icon"><BiBook style={{ color: '#ff69b4', fontSize: 24 }} /></div>
                <div className="menu-title">中文</div>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="/english">
                <div className="parent-icon"><BiBook style={{ color: '#40c4ff', fontSize: 24 }} /></div>
                <div className="menu-title">英文 English</div>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="/math">
                <div className="parent-icon"><BiCalculator style={{ color: '#ffd600', fontSize: 24 }} /></div>
                <div className="menu-title">數學 Math</div>
              </NavigationLink>
            </li>
            {/* <li>
              <Link href="/citizen">
                <div className="parent-icon"><BiBookReader style={{color: '#8e24aa', fontSize: 24}} /></div>
                <div className="menu-title">公民</div>
              </Link>
            </li> */}
            <li className="menu-label">選修科目</li>
            <li>
              <NavigationLink href="/physics">
                <div className="parent-icon"><BiBot style={{ color: '#ffd600', fontSize: 24 }} /></div>
                <div className="menu-title">物理 Physics</div>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="/chemistry">
                <div className="parent-icon"><BiTestTube style={{ color: '#00e676', fontSize: 24 }} /></div>
                <div className="menu-title">化學 Chemistry</div>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="/biology">
                <div className="parent-icon"><BiLeaf style={{ color: '#00c853', fontSize: 24 }} /></div>
                <div className="menu-title">生物 Biology</div>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="/ict">
                <div className="parent-icon"><BiLaptop style={{ color: '#ff3d00', fontSize: 24 }} /></div>
                <div className="menu-title">資訊及通訊科技 ICT</div>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="/m1">
                <div className="parent-icon"><BiCalculator style={{ color: '#b388ff', fontSize: 24 }} /></div>
                <div className="menu-title">M1</div>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="/m2">
                <div className="parent-icon"><BiCalculator style={{ color: '#64ffda', fontSize: 24 }} /></div>
                <div className="menu-title">M2</div>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="/geography">
                <div className="parent-icon"><BiGlobe style={{ color: '#00bfae', fontSize: 24 }} /></div>
                <div className="menu-title">地理 Geography</div>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="/history">
                <div className="parent-icon"><BiBook style={{ color: '#ffab91', fontSize: 24 }} /></div>
                <div className="menu-title">歷史 History</div>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="/chinese-history">
                <div className="parent-icon"><BiBook style={{ color: '#ff1744', fontSize: 24 }} /></div>
                <div className="menu-title">中國歷史 Chinese History</div>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="/economics">
                <div className="parent-icon"><BiMoney style={{ color: '#ffd600', fontSize: 24 }} /></div>
                <div className="menu-title">經濟 Economics</div>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="/bafs">
                <div className="parent-icon"><BiBriefcase style={{ color: '#ffea00', fontSize: 24 }} /></div>
                <div className="menu-title">企業、會計與財務概論 BAFS</div>
              </NavigationLink>
            </li>
            {/*
            <li>
              <a href="/visual-arts">
                <div className="parent-icon"><BiPalette style={{color: '#03a9f4', fontSize: 24}} /></div>
                <div className="menu-title">視覺藝術 Visual Arts</div>
              </a>
            </li>
            */}
            <li className="menu-label">其他</li>
            <li>
              <NavigationLink href="/about">
                <div className="parent-icon"><BiInfoCircle style={{ color: '#e8eaf6', fontSize: 24 }} /></div>
                <div className="menu-title">關於我們</div>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="/contact">
                <div className="parent-icon"><BiSupport style={{ color: '#e8eaf6', fontSize: 24 }} /></div>
                <div className="menu-title">聯絡我們</div>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="/disclaimer">
                <div className="parent-icon"><BiError style={{ color: '#e8eaf6', fontSize: 24 }} /></div>
                <div className="menu-title">免責聲明</div>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="/privacy-policy">
                <div className="parent-icon"><BiShieldAlt style={{ color: '#e8eaf6', fontSize: 24 }} /></div>
                <div className="menu-title">私隱政策</div>
              </NavigationLink>
            </li>
          </ul>
        </div>
        </aside>

        {/* Main Content */}
        <main className="main-wrapper">
          <div className="main-content">
            <PageTransition>
              <Component {...pageProps} />
            </PageTransition>
          </div>

          {/* Footer */}
          <footer className="footer d-flex flex-column flex-md-row align-items-center justify-content-between gap-1 py-0 border-top px-xl-4 px-3">
            <p className="mb-0" style={{ marginTop: '15px' }}>© 2023-2025 dse.best | 試題屬香港考試及評核局（HKEAA）所有，嚴禁未經授權之轉載、發佈、售賣或商業用途。如發現本網站內容有任何侵權或違規情況，請<NavigationLink href="/contact" style={{ color: 'inherit', textDecoration: 'underline' }}>聯絡我們</NavigationLink></p>
          </footer>
        </main>
      </div>

      {/* Theme Switcher Button */}
      {/* Removed floating button */}

      {/* Back to Top Button */}
      <button 
        id="backToTopBtn" 
        className={`back-to-top-btn-modern ${ui.isBackToTopVisible ? 'show' : ''}`}
        aria-label="Back to top" 
        title="Back to top" 
        tabIndex={0}
        onClick={ui.scrollToTop}
        onKeyDown={ui.handleBackToTopKeyDown}
      >
        <BiUpArrowAlt style={{ fontSize: 20 }} />
      </button>

      {/* Theme Customizer Offcanvas */}
      <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex={-1} id="staticBackdrop">
        <div className="offcanvas-header border-bottom h-70">
          <div>
            <h5 className="mb-0">主題自定義</h5>
            <p className="mb-0">Customize your theme</p>
          </div>
          <a href="#" className="primaery-menu-close" data-bs-dismiss="offcanvas">
            <BiX style={{ fontSize: 24 }} />
          </a>
        </div>
        <div className="offcanvas-body">
          <div>
            <div className="row g-3">
              <div className="col-12 col-xl-6">
                <div 
                  className={`theme-option-btn d-flex flex-column gap-1 align-items-center justify-content-center p-4 ${ui.currentTheme === 'blue-theme' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('blue-theme')}
                  role="button"
                >
                  <span><BiHomeAlt style={{ fontSize: 22 }} /></span>
                  <span>藍色</span>
                </div>
              </div>
              <div className="col-12 col-xl-6">
                <div 
                  className={`theme-option-btn d-flex flex-column gap-1 align-items-center justify-content-center p-4 ${ui.currentTheme === 'light' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('light')}
                  role="button"
                >
                  <span><BiTimeFive style={{ fontSize: 22 }} /></span>
                  <span>淺色</span>
                </div>
              </div>
              <div className="col-12 col-xl-6">
                <div 
                  className={`theme-option-btn d-flex flex-column gap-1 align-items-center justify-content-center p-4 ${ui.currentTheme === 'dark' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('dark')}
                  role="button"
                >
                  <span><BiError style={{ fontSize: 22 }} /></span>
                  <span>深色</span>
                </div>
              </div>
              <div className="col-12 col-xl-6">
                <div 
                  className={`theme-option-btn d-flex flex-column gap-1 align-items-center justify-content-center p-4 ${ui.currentTheme === 'semi-dark' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('semi-dark')}
                  role="button"
                >
                  <span><BiShieldAlt style={{ fontSize: 22 }} /></span>
                  <span>半深色</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Switcher Styles */}
      <style jsx global>{`
        .theme-switcher-btn{
          position: fixed;
          bottom: 22px;
          right: 22px;
          width: 45px;
          height: 45px;
          padding: 0;
          border-radius: 12px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid transparent;
          font-size: 18px;
          box-shadow: 0 4px 12px rgba(0,0,0,.15);
          z-index: 999;
          background: #4361ee;
          color: white;
          border-color: rgba(255,255,255,.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .theme-switcher-btn:hover{
          background: #3a0ca3;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,.25);
          color: white;
        }
        
        .theme-switcher-btn:focus{
          outline: none;
          box-shadow: 0 4px 12px rgba(0,0,0,.15), 0 0 0 2px rgba(255,255,255,.3);
        }
        
        .back-to-top-btn-modern{
          position: fixed;
          bottom: 22px;
          right: 22px;
          width: 45px;
          height: 45px;
          padding: 0;
          border-radius: 12px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid transparent;
          font-size: 18px;
          box-shadow: 0 4px 12px rgba(0,0,0,.15);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          color: var(--bs-body-color);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .back-to-top-btn-modern.show{
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        
        .back-to-top-btn-modern:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }
        
        /* Mobile adjustments */
        @media (max-width: 768px) {
          .theme-switcher-btn {
            bottom: 15px;
            right: 15px;
            width: 40px;
            height: 40px;
            font-size: 16px;
            border-radius: 10px;
          }
          
          .theme-switcher-btn svg {
            font-size: 16px !important;
          }
          
          .back-to-top-btn-modern {
            bottom: 22px !important;
            right: 15px !important;
            width: 40px !important;
            height: 40px !important;
            font-size: 16px !important;
            border-radius: 10px !important;
          }
        }
        
        /* Theme option buttons */
        .theme-option-btn {
          background: rgba(255,255,255,.1);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 20px;
          transition: all .3s ease;
          box-shadow: 0 8px 20px -5px rgba(0,0,0,.1);
          color: var(--bs-body-color);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        
        .theme-option-btn:hover {
          background: rgba(255,255,255,.2);
          transform: translateY(-5px);
          box-shadow: 0 12px 25px -5px rgba(0,0,0,.2);
        }
        
        .theme-option-btn.active {
          background: #4361ee;
          color: white;
          border-color: rgba(255,255,255,.3);
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(0,0,0,.3);
        }
        
        [data-bs-theme="dark"] .theme-option-btn {
          background: rgba(255,255,255,.05);
          border-color: rgba(255,255,255,.1);
          color: #fff;
        }
        
        [data-bs-theme="dark"] .theme-option-btn:hover {
          background: rgba(255,255,255,.1);
        }
        
        [data-bs-theme="dark"] .theme-option-btn.active {
          background: #4361ee;
          color: white;
        }
        
        [data-bs-theme="light"] .theme-option-btn {
          background: rgba(0,0,0,.05);
          border-color: rgba(0,0,0,.1);
          color: #333;
        }
        
        [data-bs-theme="light"] .theme-option-btn:hover {
          background: rgba(0,0,0,.1);
        }
        
        [data-bs-theme="light"] .theme-option-btn.active {
          background: #4361ee;
          color: white;
        }

        /* Dark theme adjustments for back-to-top button */
        [data-bs-theme="dark"] .back-to-top-btn-modern {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }
        
        [data-bs-theme="dark"] .back-to-top-btn-modern:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        
        /* Light theme adjustments for back-to-top button */
        [data-bs-theme="light"] .back-to-top-btn-modern {
          background: rgba(0, 0, 0, 0.1);
          border-color: rgba(0, 0, 0, 0.2);
          color: #333333;
        }
        
        [data-bs-theme="light"] .back-to-top-btn-modern:hover {
          background: rgba(0, 0, 0, 0.2);
        }
        
        /* Blue theme adjustments for back-to-top button */
        [data-bs-theme="blue-theme"] .back-to-top-btn-modern {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          color: #ffffff;
        }
        
        [data-bs-theme="blue-theme"] .back-to-top-btn-modern:hover {
          background: rgba(255, 255, 255, 0.25);
        }
      `}</style>
    </>
  )
}