import type { AppProps } from 'next/app'
import Link from 'next/link'
import Head from 'next/head'
import PageTransition from '../components/PageTransition'
import PaceLoader from '../components/PaceLoader'
import usePageInitialization from '../hooks/usePageInitialization'

export default function App({ Component, pageProps }: AppProps) {
  // Initialize page-specific JavaScript functionality
  usePageInitialization()

  return (
    <>
      <PaceLoader />
      
      <Head>
        <style>{`html,body,#__next{transition:none!important;margin:0;padding:0}*{box-sizing:border-box}.main-content{transition:opacity .2s ease-in-out;min-height:100vh}.main-wrapper{min-height:100vh}body{overflow-x:hidden}.pace{-webkit-pointer-events:none;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}.pace-inactive{display:none}.pace .pace-progress{background:linear-gradient(to right,#7928ca,#ff0080,#04e09a,#e0d504);-o-border-image:linear-gradient(to right,#7928ca,#ff0080,#04e09a,#e0d504) 1;border-image:linear-gradient(to right,#7928ca,#ff0080,#04e09a,#e0d504) 1;position:fixed;z-index:2000;top:0;right:100%;width:100%;height:3px!important}.pace .pace-progress-inner{display:block;position:absolute;right:0;width:100px;height:100%;box-shadow:0 0 10px #0d6efd,0 0 5px #0d6efd;opacity:1;-webkit-transform:rotate(3deg) translate(0,-4px);-moz-transform:rotate(3deg) translate(0,-4px);-ms-transform:rotate(3deg) translate(0,-4px);-o-transform:rotate(3deg) translate(0,-4px);transform:rotate(3deg) translate(0,-4px)}.pace .pace-activity{display:none!important;visibility:hidden!important;opacity:0!important}`}</style>
      </Head>

      {/* Header */}
      <header className="top-header">
        <nav className="navbar navbar-expand align-items-center gap-4">
          <div className="btn-toggle">
            <a href="javascript:;" aria-label="menu">
              <i className="material-icons-outlined">menu</i>
            </a>
          </div>
          <div className="search-bar flex-grow-1">
            <div className="position-relative">
              <input 
                className="form-control rounded-5 px-5 search-control d-lg-block d-none" 
                type="text" 
                placeholder="Search"
              />
              <span 
                className="material-icons-outlined position-absolute me-3 translate-middle-y end-0 top-50 search-close"
                tabIndex={0} 
                role="button" 
                aria-label="Close Search"
              >
                close
              </span>
              <div className="search-popup p-3">
                <div className="card rounded-4 overflow-hidden">
                  <div className="card-body search-content">
                    <p className="search-title mb-0" style={{whiteSpace: 'nowrap'}}>
                      ⠀(裝飾嚟嘅， SEARCH唔到)⠀
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="navbar-nav gap-1 nav-right-links align-items-center">
            <li className="nav-item d-lg-none mobile-search-btn">
              <a className="nav-link" href="javascript:;">
                <i className="material-icons-outlined">search</i>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle dropdown-toggle-nocaret" 
                href="javascript:;" 
                data-bs-toggle="dropdown"
              >
                <img 
                  src="/assets/images/county/06.webp" 
                  width="22" 
                  height="22" 
                  alt="cn-icon" 
                  loading="lazy"
                />
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item d-flex align-items-center py-2" href="javascript:;">
                    <img 
                      src="/assets/images/county/06.webp" 
                      width="20" 
                      height="20" 
                      alt="cn-icon" 
                      loading="lazy"
                    />
                    <span className="ms-2">中文</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center py-2" href="javascript:;">
                    <img 
                      src="/assets/images/county/05.webp" 
                      width="20" 
                      height="20" 
                      alt="us-icon" 
                      loading="lazy"
                    />
                    <span className="ms-2">English</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      {/* Sidebar */}
      {/* start sidebar */}
      <aside className="sidebar-wrapper">
        <div className="sidebar-header">
          <div className="logo-icon">
            <Link href="/">
              <img src="/assets/images/logo-icon.webp" className="logo-img" alt="dsebest-logo" loading="lazy" />
            </Link>
          </div>
          <div className="logo-name flex-grow-1">
            <Link href="/" style={{textDecoration: 'none', color: 'inherit'}}>
              <h5 className="mb-0">DSEBest</h5>
            </Link>
          </div>
          <div className="sidebar-close">
            <span className="material-icons-outlined">close</span>
          </div>
        </div>
        <div className="sidebar-nav" suppressHydrationWarning>
          {/* navigation */}
          <ul className="sidebar-menu" id="sidenav" suppressHydrationWarning>
            <li>
              <Link href="/">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#007bff'}}>home</i>
                </div>
                <div className="menu-title">主頁</div>
              </Link>
            </li>
            <li>
              <Link href="/blog/">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#ffc107'}}>article</i></div>
                <div className="menu-title">Blog</div>
              </Link>
            </li>
            <li>
              <Link href="/countdown">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#dc3545'}}>schedule</i></div>
                <div className="menu-title">DSE 2026 倒數</div>
              </Link>
            </li>
            <li>
              <Link href="/chat">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#1976d2'}}>chat</i></div>
                <div className="menu-title">聊天室 Chatroom</div>
              </Link>
            </li>
            <li className="menu-label">核心科目</li>
            <li>
              <Link href="/chinese">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#e83e8c'}}>book</i>
                </div>
                <div className="menu-title">中文</div>
              </Link>
            </li>
            <li>
              <Link href="/english">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#00bcd4'}}>book</i>
                </div>
                <div className="menu-title">英文 English</div>
              </Link>
            </li>
            <li>
              <Link href="/math">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#ff9800'}}>calculate</i>
                </div>
                <div className="menu-title">數學 Math</div>
              </Link>
            </li>
            <li>
              <Link href="/citizen">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#8e24aa'}}>school</i>
                </div>
                <div className="menu-title">公民</div>
              </Link>
            </li>
            <li className="menu-label">選修科目</li>
            <li>
              <Link href="/physics">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#ffc107'}}>bolt</i>
                </div>
                <div className="menu-title">物理 Physics</div>
              </Link>
            </li>
            <li>
              <Link href="/chemistry">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#43a047'}}>biotech</i>
                </div>
                <div className="menu-title">化學 Chemistry</div>
              </Link>
            </li>
            <li>
              <Link href="/biology">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#1976d2'}}>eco</i>
                </div>
                <div className="menu-title">生物 Biology</div>
              </Link>
            </li>
            <li>
              <Link href="/ict">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#212529'}}>computer</i>
                </div>
                <div className="menu-title">資訊及通訊科技 ICT</div>
              </Link>
            </li>
            <li>
              <Link href="/m1">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#7c4dff'}}>functions</i>
                </div>
                <div className="menu-title">M1</div>
              </Link>
            </li>
            <li>
              <Link href="/m2">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#009688'}}>functions</i>
                </div>
                <div className="menu-title">M2</div>
              </Link>
            </li>
            <li>
              <Link href="/geography">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#0097a7'}}>public</i>
                </div>
                <div className="menu-title">地理 Geography</div>
              </Link>
            </li>
            <li>
              <Link href="/history">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#6d4c41'}}>book</i>
                </div>
                <div className="menu-title">歷史 History</div>
              </Link>
            </li>
            <li>
              <Link href="/chinese-history">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#c62828'}}>book</i>
                </div>
                <div className="menu-title">中國歷史 Chinese History</div>
              </Link>
            </li>
            <li>
              <Link href="/economics">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#6c757d'}}>attach_money</i>
                </div>
                <div className="menu-title">經濟 Economics</div>
              </Link>
            </li>
            <li>
              <Link href="/bafs">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#ffb300'}}>business</i>
                </div>
                <div className="menu-title">企業、會計與財務概論 BAFS</div>
              </Link>
            </li>
            {/*
            <li>
              <a href="/visual-arts">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#03a9f4'}}>palette</i>
                </div>
                <div className="menu-title">視覺藝術 Visual Arts</div>
              </a>
            </li>
            */}
            <li className="menu-label">其他</li>
            <li>
              <Link href="/about">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#e8eaf6'}}>info</i>
                </div>
                <div className="menu-title">關於我們</div>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#e8eaf6'}}>contact_support</i>
                </div>
                <div className="menu-title">聯絡我們</div>
              </Link>
            </li>
            <li>
              <Link href="/disclaimer">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#e8eaf6'}}>warning</i>
                </div>
                <div className="menu-title">免責聲明</div>
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy">
                <div className="parent-icon"><i className="material-icons-outlined" style={{color: '#e8eaf6'}}>security</i>
                </div>
                <div className="menu-title">私隱政策</div>
              </Link>
            </li>
          </ul>
          {/* end navigation */}
        </div>
      </aside>


      {/* Main Content Wrapper */}
      <main className="main-wrapper">
        <div className="main-content">
          <PageTransition>
            <Component {...pageProps} />
          </PageTransition>
        </div>
      </main>

      {/* Overlay */}
      <div className="overlay btn-toggle"></div>

      {/* Footer */}
      <footer className="page-footer">
        <p className="mb-0">
          © 2024 版權所有。試題屬香港考試及評核局（HKEAA）所有，嚴禁未經授權之轉載、發佈、售賣或商業用途。如發現本網站內容有任何侵權或違規情況，請
          <Link href="/contact" style={{color: 'inherit', textDecoration: 'underline'}}>聯絡我們</Link>。
        </p>
      </footer>

      {/* Theme Switcher Button */}
      <button 
        className="btn btn-grd btn-grd-primary position-fixed bottom-0 end-0 m-3 d-flex align-items-center gap-2"
        type="button" 
        data-bs-toggle="offcanvas" 
        data-bs-target="#staticBackdrop"
      >
        <i className="material-icons-outlined">tune</i>
      </button>

      {/* Back to Top Button */}
      <button id="backToTopBtn" className="back-to-top-btn" aria-label="Back to top" title="Back to top" tabIndex={0}>
        <i className="material-icons-outlined">keyboard_arrow_up</i>
      </button>

      {/* Theme Customizer Offcanvas */}
      <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex={-1} id="staticBackdrop">
        <div className="offcanvas-header border-bottom h-70">
          <div>
            <h5 className="mb-0">主題自定義</h5>
            <p className="mb-0">Customize your theme</p>
          </div>
          <a href="javascript:;" className="primaery-menu-close" data-bs-dismiss="offcanvas">
            <i className="material-icons-outlined">close</i>
          </a>
        </div>
        <div className="offcanvas-body">
          <div>
            <div className="row g-3">
              <div className="col-12 col-xl-6">
                <input type="radio" className="btn-check" name="theme-options" id="BlueTheme" />
                <label
                  className="btn btn-outline-secondary d-flex flex-column gap-1 align-items-center justify-content-center p-4"
                  htmlFor="BlueTheme"
                >
                  <span className="material-icons-outlined">contactless</span>
                  <span>藍色</span>
                </label>
              </div>
              <div className="col-12 col-xl-6">
                <input type="radio" className="btn-check" name="theme-options" id="LightTheme" />
                <label
                  className="btn btn-outline-secondary d-flex flex-column gap-1 align-items-center justify-content-center p-4"
                  htmlFor="LightTheme"
                >
                  <span className="material-icons-outlined">light_mode</span>
                  <span>淺色</span>
                </label>
              </div>
              <div className="col-12 col-xl-6">
                <input type="radio" className="btn-check" name="theme-options" id="DarkTheme" />
                <label
                  className="btn btn-outline-secondary d-flex flex-column gap-1 align-items-center justify-content-center p-4"
                  htmlFor="DarkTheme"
                >
                  <span className="material-icons-outlined">dark_mode</span>
                  <span>深色</span>
                </label>
              </div>
              <div className="col-12 col-xl-6">
                <input type="radio" className="btn-check" name="theme-options" id="SemiDarkTheme" />
                <label
                  className="btn btn-outline-secondary d-flex flex-column gap-1 align-items-center justify-content-center p-4"
                  htmlFor="SemiDarkTheme"
                >
                  <span className="material-icons-outlined">contrast</span>
                  <span>半深色</span>
                </label>
              </div>
              <div className="col-12 col-xl-6">
                <input type="radio" className="btn-check" name="theme-options" id="BoderedTheme" />
                <label
                  className="btn btn-outline-secondary d-flex flex-column gap-1 align-items-center justify-content-center p-4"
                  htmlFor="BoderedTheme"
                >
                  <span className="material-icons-outlined">border_style</span>
                  <span>邊框</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
