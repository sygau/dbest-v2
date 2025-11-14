import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { BiBook, BiTrendingUp, BiAward, BiStar, BiDownload, BiBarChart, BiPlay, BiCode, BiGlobe, BiRocket, BiLaptop } from 'react-icons/bi';

const GlassmorphismHeroes: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const text = 'dse.best';
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setTypedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setTypedText('');
          index = 0;
        }, 2000);
      }
    }, 150);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <>
      <Head>
        <title>Glassmorphism Heroes | dse.best</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          0%, 50% { border-color: transparent; }
          51%, 100% { border-color: #8b5cf6; }
        }
        @keyframes morphing {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
      `}</style>

      <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '800', 
            color: 'white', 
            marginBottom: '1rem',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            Glassmorphism Heroes
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255,255,255,0.9)', 
            margin: 0,
            fontWeight: '400'
          }}>
            10 Modern Hero Designs with Frosted Glass Effects
          </p>
        </div>

        <div className="container py-5">

          {/* Hero 1: Classic Glassmorphism */}
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              backdropFilter: 'blur(10px)', 
              padding: '1rem', 
              borderRadius: '12px 12px 0 0', 
              border: '1px solid rgba(255,255,255,0.2)',
              borderBottom: 'none'
            }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600', color: '#1a1a1a' }}>
                #1 - Classic Glassmorphism
              </h3>
            </div>
            <section style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              minHeight: '80vh',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              borderRadius: '0 0 12px 12px',
              overflow: 'hidden'
            }}>
              <div className="container">
                <div style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '30px',
                  padding: '4rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  textAlign: 'center',
                  color: '#1a1a1a',
                  maxWidth: '800px',
                  margin: '0 auto'
                }}>
                  <h1 style={{
                    fontSize: '4rem',
                    fontWeight: '700',
                    marginBottom: '2rem',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    dse.best
                  </h1>
                  <p style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#4a4a4a', fontWeight: '500' }}>
                    香港中學文憑試專業資源平台
                  </p>
                  <p style={{ fontSize: '1.1rem', marginBottom: '3rem', color: '#4a4a4a', fontWeight: '400' }}>
                    提供全面的DSE各科歷屆試題及答案，助您掌握考試趨勢，輕鬆備戰DSE考試
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <button style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#1a1a1a',
                      padding: '12px 32px',
                      borderRadius: '50px',
                      fontSize: '1rem',
                      fontWeight: '500',
                      backdropFilter: 'blur(10px)',
                      cursor: 'pointer'
                    }}>
                      開始探索
                    </button>
                    <button style={{
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#1a1a1a',
                      padding: '12px 32px',
                      borderRadius: '50px',
                      fontSize: '1rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}>
                      了解更多
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Hero 2: Floating Cards */}
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              backdropFilter: 'blur(10px)', 
              padding: '1rem', 
              borderRadius: '12px 12px 0 0', 
              border: '1px solid rgba(255,255,255,0.2)',
              borderBottom: 'none'
            }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600', color: '#1a1a1a' }}>
                #2 - Floating Glass Cards
              </h3>
            </div>
            <section style={{
              background: 'linear-gradient(45deg, #8b5cf6, #667eea, #764ba2, #8b5cf6)',
              backgroundSize: '400% 400%',
              animation: 'gradientShift 8s ease infinite',
              minHeight: '80vh',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              borderRadius: '0 0 12px 12px',
              overflow: 'hidden'
            }}>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '25px',
                      padding: '3rem',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      animation: 'float 6s ease-in-out infinite'
                    }}>
                      <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: '800',
                        marginBottom: '1.5rem',
                        color: '#1a1a1a',
                        fontFamily: 'Poppins, sans-serif'
                      }}>
                        dse.best
                      </h1>
                      <p style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#4a4a4a', fontWeight: '500' }}>
                        香港中學文憑試資源平台
                      </p>
                      <p style={{ fontSize: '1rem', marginBottom: '2rem', color: '#4a4a4a', fontWeight: '400' }}>
                        涵蓋15+科目的完整歷屆試題庫
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginTop: '2rem' }}>
                      {[
                        { icon: BiBook, text: '15+ 科目', delay: '0s' },
                        { icon: BiTrendingUp, text: '歷年試題', delay: '0.2s' },
                        { icon: BiAward, text: '免費使用', delay: '0.4s' },
                        { icon: BiStar, text: '專業資源', delay: '0.6s' }
                      ].map((item, index) => (
                        <div key={index} style={{
                          background: 'rgba(255, 255, 255, 0.15)',
                          backdropFilter: 'blur(15px)',
                          borderRadius: '20px',
                          padding: '2rem',
                          textAlign: 'center',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          animation: `float 4s ease-in-out infinite ${item.delay}`
                        }}>
                          <item.icon style={{ fontSize: '2.5rem', color: '#667eea', marginBottom: '1rem' }} />
                          <p style={{ margin: 0, fontWeight: '600', color: '#1a1a1a' }}>{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Hero 3: Typing Effect */}
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              backdropFilter: 'blur(10px)', 
              padding: '1rem', 
              borderRadius: '12px 12px 0 0', 
              border: '1px solid rgba(255,255,255,0.2)',
              borderBottom: 'none'
            }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600', color: '#1a1a1a' }}>
                #3 - Typing Animation Glass
              </h3>
            </div>
            <section style={{
              background: 'linear-gradient(135deg, #667eea 0%, #8b5cf6 50%, #764ba2 100%)',
              minHeight: '80vh',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              borderRadius: '0 0 12px 12px',
              overflow: 'hidden'
            }}>
              <div className="container">
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(25px)',
                  borderRadius: '35px',
                  padding: '4rem',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  textAlign: 'center',
                  maxWidth: '700px',
                  margin: '0 auto'
                }}>
                  <div style={{ 
                    fontSize: '1rem', 
                    color: '#4a4a4a', 
                    marginBottom: '2rem', 
                    fontFamily: 'monospace',
                    fontWeight: '500'
                  }}>
                    $ welcome_to_platform
                  </div>
                  <h1 style={{
                    fontSize: '4.5rem',
                    fontWeight: '700',
                    marginBottom: '2rem',
                    color: '#1a1a1a',
                    fontFamily: 'Space Grotesk, sans-serif',
                    borderRight: typedText.length < 8 ? '3px solid #8b5cf6' : 'none',
                    animation: typedText.length < 8 ? 'blink 1s infinite' : 'none',
                    display: 'inline-block',
                    paddingRight: '10px'
                  }}>
                    {typedText}
                  </h1>
                  <p style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#4a4a4a', fontWeight: '500' }}>
                    香港中學文憑試專業資源平台
                  </p>
                  <p style={{ fontSize: '1rem', marginBottom: '2rem', color: '#4a4a4a', fontWeight: '400' }}>
                    Loading comprehensive DSE resources...
                  </p>
                </div>
              </div>
            </section>
          </div>

        </div>
      </div>
    </>
  );
};

export default GlassmorphismHeroes;
