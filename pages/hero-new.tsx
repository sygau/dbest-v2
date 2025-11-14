import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { BiBook, BiTrendingUp, BiAward, BiStar, BiDownload, BiBarChart, BiPlay, BiCode, BiGlobe, BiRocket, BiLaptop } from 'react-icons/bi';

const HeroShowcase: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  
  useEffect(() => {
    const text = 'DSE.BEST';
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setTypedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Hero Showcase | DSE.BEST</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          0%, 50% { border-color: transparent; }
          51%, 100% { border-color: #3b82f6; }
        }
      `}</style>

      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="container py-5">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>
              Hero Section Showcase
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>
              10 Modern Hero Designs for DSE.BEST
            </p>
          </div>

          {/* Hero 1: Modern Gradient */}
          <div style={{ marginBottom: '4rem', border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ background: '#f3f4f6', padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>#1 - Modern Gradient</h3>
            </div>
            <section style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              minHeight: '70vh',
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              position: 'relative'
            }}>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '2rem' }}>
                      DSE.BEST
                    </h1>
                    <p style={{ fontSize: '1.5rem', marginBottom: '1rem', opacity: 0.9 }}>
                      香港中學文憑試專業資源平台
                    </p>
                    <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.8 }}>
                      涵蓋15+科目的完整歷屆試題庫，助您輕鬆備戰DSE考試
                    </p>
                    <button style={{
                      background: 'rgba(255,255,255,0.2)',
                      border: '2px solid rgba(255,255,255,0.3)',
                      color: 'white',
                      padding: '12px 32px',
                      borderRadius: '50px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      backdropFilter: 'blur(10px)'
                    }}>
                      開始探索
                    </button>
                  </div>
                  <div className="col-lg-6">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
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
                          border: '1px solid rgba(255,255,255,0.2)'
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
          </div>

          {/* Hero 2: Glassmorphism */}
          <div style={{ marginBottom: '4rem', border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ background: '#f3f4f6', padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>#2 - Glassmorphism Card</h3>
            </div>
            <section style={{
              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
              backgroundSize: '400% 400%',
              animation: 'gradientShift 8s ease infinite',
              minHeight: '70vh',
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
                  <h1 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '2rem' }}>
                    DSE.BEST
                  </h1>
                  <p style={{ fontSize: '1.5rem', marginBottom: '1rem', opacity: 0.9 }}>
                    香港中學文憑試專業資源平台
                  </p>
                  <p style={{ fontSize: '1.1rem', marginBottom: '3rem', opacity: 0.8 }}>
                    提供全面的DSE各科歷屆試題及答案，助您掌握考試趨勢
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
                        minWidth: '150px'
                      }}>
                        <item.icon style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }} />
                        <p style={{ margin: 0, fontWeight: '600' }}>{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Hero 3: Typing Animation */}
          <div style={{ marginBottom: '4rem', border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ background: '#f3f4f6', padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>#3 - Typing Animation</h3>
            </div>
            <section style={{
              background: '#1a1a2e',
              color: '#16f8b6',
              minHeight: '70vh',
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'monospace'
            }}>
              <div className="container">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.8 }}>
                    $ welcome_to_dse_platform
                  </div>
                  <h1 style={{
                    fontSize: '5rem',
                    fontWeight: '800',
                    marginBottom: '2rem',
                    borderRight: '3px solid #16f8b6',
                    animation: 'blink 1s infinite',
                    display: 'inline-block',
                    paddingRight: '10px'
                  }}>
                    {typedText}
                  </h1>
                  <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                    {'>'} 香港中學文憑試資源平台
                  </p>
                  <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.8 }}>
                    {'>'} Loading comprehensive DSE resources...
                  </p>
                  <div style={{ fontSize: '1rem', opacity: 0.7 }}>
                    [✓] 15+ subjects available<br />
                    [✓] Past papers database loaded<br />
                    [✓] System ready for use
                  </div>
                </div>
              </div>
            </section>
          </div>

        </div>
      </div>
    </>
  );
};

export default HeroShowcase;
