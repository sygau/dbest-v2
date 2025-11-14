import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { BiBook, BiTrendingUp, BiAward, BiCheckCircle, BiStar, BiDownload, BiBarChart, BiPlay, BiCode, BiGlobe, BiRocket, BiLaptop } from 'react-icons/bi';

const HeroShowcase: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'DSE.BEST';

  useEffect(() => {
    let index = 0;
    const typeTimer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setTimeout(() => {
          setTypedText('');
          index = 0;
        }, 2000);
      }
    }, 300);
    return () => clearInterval(typeTimer);
  }, []);

  const heroVariations = [
    {
      id: 1,
      title: "Modern Gradient Hero",
      component: (
        <section style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            animation: 'float 20s ease-in-out infinite'
          }} />
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1 style={{
                  fontSize: '4rem',
                  fontWeight: '800',
                  marginBottom: '2rem',
                  background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  DSE.BEST
                </h1>
                <p style={{ fontSize: '1.5rem', marginBottom: '1rem', opacity: 0.9 }}>
                  香港中學文憑試專業資源平台
                </p>
                <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.8 }}>
                  涵蓋15+科目的完整歷屆試題庫，助您輕鬆備戰DSE考試
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    padding: '12px 32px',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}>
                    開始探索
                  </button>
                  <button style={{
                    background: 'transparent',
                    border: '2px solid rgba(255,255,255,0.5)',
                    color: 'white',
                    padding: '12px 32px',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}>
                    了解更多
                  </button>
                </div>
              </div>
              <div className="col-lg-6">
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '2rem',
                  marginTop: '2rem'
                }}>
                  {[
                    { icon: BiBook, text: '15+ 科目', color: '#ffd700' },
                    { icon: BiTrendingUp, text: '歷年試題', color: '#ff6b6b' },
                    { icon: BiAward, text: '免費使用', color: '#4ecdc4' },
                    { icon: BiStar, text: '專業資源', color: '#45b7d1' }
                  ].map((item, index) => (
                    <div key={index} style={{
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '20px',
                      padding: '2rem',
                      textAlign: 'center',
                      border: '1px solid rgba(255,255,255,0.2)',
                      animation: `slideUp 0.6s ease ${index * 0.1}s both`
                    }}>
                      <item.icon style={{ fontSize: '3rem', color: item.color, marginBottom: '1rem' }} />
                      <p style={{ margin: 0, fontWeight: '600' }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 2,
      title: "Glassmorphism Card",
      component: (
        <section style={{
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 8s ease infinite',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          padding: '4rem 0'
        }}>
          <div className="container">
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '30px',
              padding: '4rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              color: 'white'
            }}>
              <h1 style={{
                fontSize: '4rem',
                fontWeight: '900',
                marginBottom: '2rem',
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
              }}>
                DSE.BEST
              </h1>
              <p style={{ fontSize: '1.5rem', marginBottom: '1rem', opacity: 0.9 }}>
                香港中學文憑試專業資源平台
              </p>
              <p style={{ fontSize: '1.1rem', marginBottom: '3rem', opacity: 0.8 }}>
                提供全面的DSE各科歷屆試題及答案，助您掌握考試趋勢
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                {[
                  { icon: BiBook, label: '15+ 科目' },
                  { icon: BiTrendingUp, label: '歷年試題' },
                  { icon: BiAward, label: '免費使用' }
                ].map((item, index) => (
                  <div key={index} style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '15px',
                    padding: '1.5rem',
                    minWidth: '150px',
                    animation: `fadeInUp 0.6s ease ${index * 0.2}s both`
                  }}>
                    <item.icon style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }} />
                    <p style={{ margin: 0, fontWeight: '600' }}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 3,
      title: "Card-based Layout",
      component: (
        <section className="hero-3 py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold">歡迎來到 <span className="text-primary">DSE.BEST</span></h1>
              <p className="lead">Your ultimate DSE preparation platform</p>
            </div>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="feature-card text-center p-4">
                  <BiBook className="feature-icon mb-3" />
                  <h5>15+ 科目</h5>
                  <p>Complete subject coverage</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-card text-center p-4">
                  <BiTrendingUp className="feature-icon mb-3" />
                  <h5>歷年試題</h5>
                  <p>2012-2025 past papers</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-card text-center p-4">
                  <BiAward className="feature-icon mb-3" />
                  <h5>免費使用</h5>
                  <p>Completely free access</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 4,
      title: "Split Screen",
      component: (
        <section className="hero-4">
          <div className="row g-0 min-vh-75">
            <div className="col-lg-6 bg-primary text-white d-flex align-items-center">
              <div className="p-5">
                <h1 className="display-4 fw-bold mb-4">DSE.BEST</h1>
                <p className="lead mb-4">香港中學文憑試專業資源平台</p>
                <ul className="list-unstyled">
                  <li className="mb-2"><BiCheckCircle className="me-2" />完整歷屆試題</li>
                  <li className="mb-2"><BiCheckCircle className="me-2" />詳細答案解析</li>
                  <li className="mb-2"><BiCheckCircle className="me-2" />Cut-off 分數線</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 bg-light d-flex align-items-center">
              <div className="p-5">
                <h2 className="h3 mb-4">Start Your DSE Journey</h2>
                <p className="mb-4">Access comprehensive resources for all DSE subjects including past papers, marking schemes, and grade boundaries.</p>
                <button className="btn btn-primary btn-lg">Explore Subjects</button>
              </div>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 5,
      title: "Animated Stats",
      component: (
        <section className="hero-5 py-5">
          <div className="container">
            <div className="text-center">
              <h1 className="display-3 fw-bold mb-4">
                <span className="typing-text">DSE.BEST</span>
              </h1>
              <p className="lead mb-5">香港最全面的DSE資源平台</p>
              
              <div className="row g-4 mb-5">
                <div className="col-md-3">
                  <div className="stat-box">
                    <div className="stat-number">15+</div>
                    <div className="stat-label">科目</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="stat-box">
                    <div className="stat-number">2012-2025</div>
                    <div className="stat-label">年份範圍</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="stat-box">
                    <div className="stat-number">100%</div>
                    <div className="stat-label">免費</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="stat-box">
                    <div className="stat-number">24/7</div>
                    <div className="stat-label">全天候</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 6,
      title: "Glassmorphism",
      component: (
        <section className="hero-6 py-5">
          <div className="container">
            <div className="glass-container p-5 text-center">
              <h1 className="display-4 fw-bold mb-4 text-white">DSE.BEST</h1>
              <p className="lead mb-4 text-white opacity-90">
                全面的香港中學文憑試資源平台
              </p>
              <p className="mb-4 text-white opacity-75">
                涵蓋中文、英文、數學、物理、化學等15+科目的完整歷屆試題及答案
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-light btn-lg">開始探索</button>
                <button className="btn btn-outline-light btn-lg">了解更多</button>
              </div>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 7,
      title: "Icon Grid",
      component: (
        <section className="hero-7 py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1 className="display-4 fw-bold mb-4">
                  歡迎來到 <br />
                  <span className="text-primary">DSE.BEST</span>
                </h1>
                <p className="lead mb-4">
                  香港中學文憑試專業學習平台
                </p>
                <p className="mb-4">
                  提供全面的DSE各科歷屆試題、答案及Cut-off分數線，
                  助您掌握考試趨勢，輕鬆備戰DSE考試。
                </p>
                <button className="btn btn-primary btn-lg">立即開始</button>
              </div>
              <div className="col-lg-6">
                <div className="icon-grid">
                  <div className="icon-item"><BiBook /></div>
                  <div className="icon-item"><BiTrendingUp /></div>
                  <div className="icon-item"><BiAward /></div>
                  <div className="icon-item"><BiStar /></div>
                  <div className="icon-item"><BiDownload /></div>
                  <div className="icon-item"><BiBarChart /></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 8,
      title: "Neon Cyberpunk",
      component: (
        <section className="hero-8 py-5">
          <div className="container">
            <div className="text-center">
              <h1 className="neon-title mb-4">DSE.BEST</h1>
              <p className="neon-subtitle mb-4">// 香港中學文憑試資源平台</p>
              <p className="cyber-text mb-4">
                &gt; Accessing comprehensive DSE resources...<br />
                &gt; Loading 15+ subjects database...<br />
                &gt; Status: READY
              </p>
              <div className="cyber-buttons">
                <button className="btn-cyber">ENTER_SYSTEM</button>
                <button className="btn-cyber-outline">VIEW_DATA</button>
              </div>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 9,
      title: "Newspaper Style",
      component: (
        <section className="hero-9 py-5">
          <div className="container">
            <div className="newspaper-layout">
              <div className="newspaper-header">
                <h1 className="newspaper-title">DSE.BEST</h1>
                <div className="newspaper-date">香港中學文憑試資源平台 | 2025</div>
              </div>
              
              <div className="row">
                <div className="col-lg-8">
                  <div className="main-article">
                    <h2 className="article-headline">
                      全面DSE資源平台正式啟動
                    </h2>
                    <p className="article-lead">
                      本網站提供全面的香港中學文憑試各科歷屆試題及答案，
                      涵蓋中文、英文、數學、物理、化學等15+主要及選修科目。
                    </p>
                    <p>
                      助您掌握考試趨勢，輕鬆備戰DSE考試。所有資源完全免費，
                      24小時全天候提供服務。
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="sidebar-news">
                    <h4>快速導航</h4>
                    <ul>
                      <li>📚 歷屆試題</li>
                      <li>📊 Cut-off分數</li>
                      <li>🎯 學習工具</li>
                      <li>📈 考試趨勢</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 10,
      title: "Terminal/Code",
      component: (
        <section className="hero-10 py-5">
          <div className="container">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <span className="btn-red"></span>
                  <span className="btn-yellow"></span>
                  <span className="btn-green"></span>
                </div>
                <div className="terminal-title">dse.best — terminal</div>
              </div>
              <div className="terminal-body">
                <div className="terminal-line">
                  <span className="prompt">user@dse.best:~$</span> 
                  <span className="command">welcome</span>
                </div>
                <div className="terminal-output">
                  <div className="ascii-art">
  ____  ____  _____   ____  _____ ____ _____ 
 |  _ \/ ___|| ____| | __ )| ____/ ___|_   _|
 | | | \___ \|  _|   |  _ \|  _| \___ \ | |  
 | |_| |___) | |___  | |_) | |___ ___) || |  
 |____/|____/|_____| |____/|_____|____/ |_|  
                  </div>
                  <div className="system-info">
                    <p>System: Hong Kong DSE Resource Platform</p>
                    <p>Status: Online</p>
                    <p>Subjects: 15+ available</p>
                    <p>Years: 2012-2025</p>
                    <p>Access: Free</p>
                  </div>
                  <div className="terminal-line">
                    <span className="prompt">user@dse.best:~$</span> 
                    <span className="cursor">_</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    }
  ];

  return (
    <>
      <Head>
        <title>Hero Section Showcase | DSE.BEST</title>
        <meta name="description" content="Different hero section designs for DSE.BEST" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:wght@400;700&family=Fira+Code:wght@400;500&family=Roboto+Slab:wght@400;700;800&family=Space+Grotesk:wght@400;600&family=Outfit:wght@400;700&family=Source+Code+Pro:wght@400;600&family=Nunito:wght@400;800&display=swap" rel="stylesheet" />
      </Head>

      <div className="hero-showcase">
        <style jsx>{`
          .hero-showcase {
            font-family: 'Inter', sans-serif;
          }
          
          .hero-section {
            margin-bottom: 4rem;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            overflow: hidden;
          }
          
          .section-header {
            background: #f3f4f6;
            padding: 1rem;
            border-bottom: 1px solid #e5e7eb;
          }
          
          /* Hero 1 - Minimalist */
          .hero-1 {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            min-height: 400px;
            display: flex;
            align-items: center;
          }
          
          /* Hero 2 - Gradient Modern */
          .hero-2 {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 500px;
            display: flex;
            align-items: center;
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .hero-graphic {
            position: relative;
            height: 300px;
          }
          
          .floating-card {
            position: absolute;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 2rem;
            font-size: 2rem;
            animation: float 3s ease-in-out infinite;
          }
          
          .floating-card:nth-child(1) {
            top: 20%;
            left: 10%;
          }
          
          .floating-card:nth-child(2) {
            top: 50%;
            right: 20%;
            animation-delay: 1s;
          }
          
          .floating-card:nth-child(3) {
            bottom: 20%;
            left: 30%;
            animation-delay: 2s;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          /* Hero 3 - Card-based */
          .hero-3 {
            background: #f8fafc;
            min-height: 500px;
          }
          
          .feature-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }
          
          .feature-card:hover {
            transform: translateY(-5px);
          }
          
          .feature-icon {
            font-size: 3rem;
            color: #3b82f6;
          }
          
          /* Hero 4 - Split Screen */
          .hero-4 .min-vh-75 {
            min-height: 75vh;
          }
          
          /* Hero 5 - Animated Stats */
          .hero-5 {
            background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
            color: white;
            min-height: 500px;
            display: flex;
            align-items: center;
          }
          
          .typing-text {
            border-right: 2px solid #fbbf24;
            animation: typing 2s steps(8) infinite;
          }
          
          @keyframes typing {
            0%, 50% { border-color: transparent; }
            51%, 100% { border-color: #fbbf24; }
          }
          
          .stat-box {
            text-align: center;
          }
          
          .stat-number {
            font-size: 2.5rem;
            font-weight: 800;
            color: #fbbf24;
          }
          
          .stat-label {
            font-size: 1rem;
            opacity: 0.9;
          }
          
          /* Hero 6 - Glassmorphism */
          .hero-6 {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 500px;
            display: flex;
            align-items: center;
          }
          
          .glass-container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
          }
          
          /* Hero 7 - Icon Grid */
          .hero-7 {
            background: #f8fafc;
            min-height: 500px;
            display: flex;
            align-items: center;
          }
          
          .icon-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }
          
          .icon-item {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            text-align: center;
            font-size: 2rem;
            color: #3b82f6;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }
          
          .icon-item:hover {
            transform: scale(1.05);
          }
          
          /* Hero 8 - Neon Cyberpunk */
          .hero-8 {
            background: #0a0a0a;
            color: #00ff00;
            min-height: 500px;
            display: flex;
            align-items: center;
            font-family: 'JetBrains Mono', monospace;
          }
          
          .neon-title {
            font-size: 4rem;
            font-weight: 800;
            text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00;
            animation: neon-flicker 2s infinite alternate;
          }
          
          @keyframes neon-flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          
          .neon-subtitle {
            color: #ff00ff;
            font-size: 1.2rem;
          }
          
          .cyber-text {
            font-family: 'Fira Code', monospace;
            color: #00ffff;
          }
          
          .btn-cyber {
            background: transparent;
            border: 2px solid #00ff00;
            color: #00ff00;
            padding: 12px 24px;
            margin: 0 8px;
            font-family: 'JetBrains Mono', monospace;
            text-transform: uppercase;
            transition: all 0.3s ease;
          }
          
          .btn-cyber:hover {
            background: #00ff00;
            color: #0a0a0a;
            box-shadow: 0 0 20px #00ff00;
          }
          
          .btn-cyber-outline {
            background: transparent;
            border: 2px solid #ff00ff;
            color: #ff00ff;
            padding: 12px 24px;
            margin: 0 8px;
            font-family: 'JetBrains Mono', monospace;
            text-transform: uppercase;
          }
          
          /* Hero 9 - Newspaper */
          .hero-9 {
            background: #f9f7f4;
            min-height: 500px;
            font-family: 'Times New Roman', serif;
          }
          
          .newspaper-layout {
            background: white;
            padding: 2rem;
            border: 1px solid #ccc;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
          .newspaper-header {
            border-bottom: 3px solid #000;
            margin-bottom: 1rem;
            text-align: center;
          }
          
          .newspaper-title {
            font-size: 3rem;
            font-weight: 900;
            letter-spacing: 0.1em;
          }
          
          .newspaper-date {
            font-size: 0.9rem;
            margin-bottom: 1rem;
          }
          
          .article-headline {
            font-size: 2rem;
            font-weight: 700;
            border-bottom: 1px solid #ccc;
            padding-bottom: 0.5rem;
            margin-bottom: 1rem;
          }
          
          .article-lead {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 1rem;
          }
          
          .sidebar-news {
            background: #f5f5f5;
            padding: 1rem;
            border-left: 3px solid #000;
          }
          
          /* Hero 10 - Terminal */
          .hero-10 {
            background: #1a1a1a;
            min-height: 500px;
            display: flex;
            align-items: center;
            font-family: 'Fira Code', monospace;
          }
          
          .terminal-window {
            background: #2d2d2d;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
          }
          
          .terminal-header {
            background: #3c3c3c;
            padding: 12px 16px;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          
          .terminal-buttons {
            display: flex;
            gap: 6px;
          }
          
          .terminal-buttons span {
            width: 12px;
            height: 12px;
            border-radius: 50%;
          }
          
          .btn-red { background: #ff5f56; }
          .btn-yellow { background: #ffbd2e; }
          .btn-green { background: #27ca3f; }
          
          .terminal-title {
            color: #ffffff;
            font-size: 0.9rem;
          }
          
          .terminal-body {
            background: #1e1e1e;
            padding: 20px;
            color: #00ff00;
            min-height: 300px;
          }
          
          .terminal-line {
            margin-bottom: 8px;
          }
          
          .prompt {
            color: #00ff00;
          }
          
          .command {
            color: #ffffff;
          }
          
          .ascii-art {
            color: #00ffff;
            font-size: 0.7rem;
            margin: 16px 0;
            white-space: pre;
          }
          
          .system-info {
            color: #ffff00;
            margin: 16px 0;
          }
          
          .cursor {
            animation: blink 1s infinite;
          }
          
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}</style>

        <div className="container py-5">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold">Hero Section Showcase</h1>
            <p className="lead">10 different design approaches for the DSE.BEST homepage</p>
          </div>

          {heroVariations.map((hero) => (
            <div key={hero.id} className="hero-section">
              <div className="section-header">
                <h3 className="h5 mb-0">
                  #{hero.id} - {hero.title}
                </h3>
              </div>
              {hero.component}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroShowcase;
