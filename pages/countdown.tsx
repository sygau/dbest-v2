import Head from 'next/head'
import { useEffect, useState } from 'react'
import { generateCountdownStructuredData, generatePageFAQStructuredData } from '../utils/structuredData'
import { getMainPageMetadata } from '../utils/structuredData';
import NavigationLink from '../components/NavigationLink';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function CountdownPage() {
    const metadata = getMainPageMetadata('countdown');
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Target DSE 2026 - April 10, 2026 at 9:00 AM HKT
        const targetDate = new Date('2026-04-10T09:00:00+08:00');

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = targetDate.getTime() - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        // Initial calculation
        calculateTimeLeft();
        setIsLoaded(true);

        // Update every second
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    const totalSeconds = timeLeft.days * 86400 + timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;
    const totalDaysUntilExam = 365; // Approximate days until DSE 2026
    const progressPercentage = Math.max(0, Math.min(100, ((totalDaysUntilExam - timeLeft.days) / totalDaysUntilExam) * 100));

    return (
        <>
            <Head>
                <title>{metadata?.title}</title>
                <meta name="description" content={metadata?.description} />
                <meta name="robots" content={metadata?.robots} />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content={metadata?.ogTitle} />
                <meta property="og:description" content={metadata?.ogDescription} />
                <meta property="og:image" content={metadata?.ogImage} />
                <meta property="og:url" content={metadata?.ogUrl} />
                <meta property="og:type" content={metadata?.ogType} />

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generateCountdownStructuredData())
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generatePageFAQStructuredData('countdown'))
                    }}
                />

                {/* Google Fonts */}
            </Head>

            {/* Breadcrumb */}
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">其他</div>
                <div className="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            <li className="breadcrumb-item active" aria-current="page">
                                DSE 2026 Countdown
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Main Countdown Container */}
            <div className="row countdown-page">
                <div className="col-12">
                    <div className="modern-countdown-container">
                        {/* Header Section */}
                        <div className="countdown-header">
                            <div className="countdown-title-wrapper">
                                <h1 className="countdown-main-title">
                                    DSE 2026 倒數
                                </h1>
                            </div>
                            <p className="countdown-description">
                                距離香港中學文憑考試 2026 還有
                            </p>
                        </div>

                        {/* Countdown Display */}
                        <div className="countdown-display">
                            <div className="countdown-grid">
                                <div className={`countdown-card ${isLoaded ? 'loaded' : ''}`}>
                                    <div className="card-number" data-value={timeLeft.days}>
                                        {timeLeft.days.toString().padStart(3, '0')}
                                    </div>
                                    <div className="card-label">
                                        <span className="label-zh">天</span>
                                        <span className="label-en">DAYS</span>
                                    </div>
                                </div>

                                <div className={`countdown-card ${isLoaded ? 'loaded' : ''}`}>
                                    <div className="card-number" data-value={timeLeft.hours}>
                                        {timeLeft.hours.toString().padStart(2, '0')}
                                    </div>
                                    <div className="card-label">
                                        <span className="label-zh">小時</span>
                                        <span className="label-en">HOURS</span>
                                    </div>
                                </div>

                                <div className={`countdown-card ${isLoaded ? 'loaded' : ''}`}>
                                    <div className="card-number" data-value={timeLeft.minutes}>
                                        {timeLeft.minutes.toString().padStart(2, '0')}
                                    </div>
                                    <div className="card-label">
                                        <span className="label-zh">分鐘</span>
                                        <span className="label-en">MINUTES</span>
                                    </div>
                                </div>

                                <div className={`countdown-card ${isLoaded ? 'loaded' : ''}`}>
                                    <div className="card-number" data-value={timeLeft.seconds}>
                                        {timeLeft.seconds.toString().padStart(2, '0')}
                                    </div>
                                    <div className="card-label">
                                        <span className="label-zh">秒</span>
                                        <span className="label-en">SECONDS</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Exam Info Section - Compact */}
                        <div className="exam-info-section-compact">
                            <div className="exam-info-grid-compact">
                                <div className="exam-info-card-compact">
                                    <div className="info-icon-compact">📅</div>
                                    <div className="info-content-compact">
                                        <p>2026年4月10日</p>
                                    </div>
                                </div>

                                <div className="exam-info-card-compact">
                                    <div className="info-icon-compact">⏰</div>
                                    <div className="info-content-compact">
                                        <p>上午9:00</p>
                                    </div>
                                </div>

                                <div className="exam-info-card-compact">
                                    <div className="info-icon-compact">📍</div>
                                    <div className="info-content-compact">
                                        <p>香港各考場</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Horizontal Line */}
                        <hr className="timetable-divider" />

                        {/* Exam Timetable Link Section */}
                        <div className="exam-timetable-section">
                            <div className="timetable-card">
                                <div className="timetable-content">
                                    <h4>完整考試時間表</h4>
                                    <p>查看 2026 年 DSE 各科目詳細考試時間安排</p>
                                    <NavigationLink 
                                        href="https://www.hkeaa.edu.hk/doclibrary/hkdse/exam_timetable/2026_dse_timetable.pdf" 
                                        className="timetable-link"
                                        target="_blank"
                                    >
                                        查看完整考試時間表
                                    </NavigationLink>
                                </div>
                            </div>
                        </div>



                        {/* Call to Action */}
                        <div className="countdown-cta">
                            <div className="cta-content">
                                <h3>準備好迎接挑戰了嗎？</h3>
                                <p>立即開始溫習，掌握歷屆試題重點</p>
                                <div className="cta-buttons">
                                    <NavigationLink href="/" className="btn btn-primary btn-lg">
                                        開始溫習
                                    </NavigationLink>
                                    <NavigationLink href="/blog" className="btn btn-outline-primary btn-lg">
                                        考試攻略
                                    </NavigationLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        .countdown-page {
          --primary-gradient: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
          --secondary-gradient: linear-gradient(135deg, #7209b7 0%, #f72585 100%);
          --accent-gradient: linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);
          --card-bg: rgba(255, 255, 255, 0.12);
          --card-hover-bg: rgba(255, 255, 255, 0.2);
          --text-primary: #ffffff;
          --text-secondary: #ffffff;
          --text-tertiary: #ffffff;
          --border-color: rgba(255, 255, 255, 0.2);
          --shadow-color: rgba(0, 0, 0, 0.25);
          --glow-color: rgba(255, 255, 255, 0.4);
        }

        .countdown-page body {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          min-height: 100vh;
        }

        .countdown-page .modern-countdown-container {
          background: var(--primary-gradient);
          border-radius: 28px;
          padding: 3.5rem 2.5rem;
          margin: 2.5rem 0;
          box-shadow: 
            0 25px 50px -12px var(--shadow-color),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }

        .countdown-page .modern-countdown-container::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          z-index: 1;
        }

        .countdown-page .countdown-header {
          text-align: center;
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
        }

        .countdown-page .countdown-title-wrapper {
          position: relative;
          display: inline-block;
          margin-bottom: 1.25rem;
        }

        .countdown-page .countdown-main-title {
          font-family: 'Poppins', sans-serif;
          font-size: 3.8rem;
          font-weight: 800;
          margin: 0;
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          text-align: center;
          letter-spacing: -0.5px;
          color: #ffffff;
          line-height: 1.1;
        }

        .countdown-page .countdown-description {
          font-family: sans-serif;
          font-size: 1.3rem;
          font-weight: 500;
          color: #ffffff;
          margin: 0;
          letter-spacing: 0.5px;
        }

        .countdown-page .countdown-display {
          margin-bottom: 0;
          position: relative;
          z-index: 2;
        }

        .countdown-page .countdown-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .countdown-page .countdown-card {
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          padding: 2rem 1.5rem;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform: translateY(30px);
          opacity: 0;
          animation: slideInUp 0.7s ease forwards;
          aspect-ratio: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 160px;
          box-shadow: 
            0 10px 25px -5px var(--shadow-color),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .countdown-page .countdown-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--accent-gradient);
          border-radius: 24px 24px 0 0;
        }

        .countdown-page .countdown-card.loaded {
          transform: translateY(0);
          opacity: 1;
        }

        .countdown-page .countdown-card:nth-child(1) { animation-delay: 0.1s; }
        .countdown-page .countdown-card:nth-child(2) { animation-delay: 0.2s; }
        .countdown-page .countdown-card:nth-child(3) { animation-delay: 0.3s; }
        .countdown-page .countdown-card:nth-child(4) { animation-delay: 0.4s; }

        .countdown-page .countdown-card:hover {
          transform: translateY(-8px) scale(1.03);
          background: var(--card-hover-bg);
          box-shadow: 
            0 20px 40px -10px var(--shadow-color),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }

        .countdown-page .card-number {
          font-family: 'Inter', sans-serif;
          font-size: 3.2rem;
          font-weight: 900;
          line-height: 1.1;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          letter-spacing: -1px;
          color: #ffffff;
        }

        .countdown-page .countdown-card:hover .card-number {
          transform: scale(1.08);
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }

        .countdown-page .card-label {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .countdown-page .label-zh {
          font-family: sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.5px;
        }

        .countdown-page .label-en {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .countdown-page .countdown-progress {
          margin-bottom: 3.5rem;
          position: relative;
          z-index: 2;
        }

        .countdown-page .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .countdown-page .progress-header h3 {
          font-family: 'Poppins', sans-serif;
          margin: 0;
          font-size: 1.4rem;
          font-weight: 700;
          color: #ffffff;
        }

        .countdown-page .progress-percentage {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.6rem 1.25rem;
          border-radius: 24px;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 1.2rem;
          color: #ffffff;
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-color);
        }

        .countdown-page .progress-bar-container {
          background: rgba(0, 0, 0, 0.2);
          height: 16px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 1.25rem;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .countdown-page .progress-bar {
          height: 100%;
          background: var(--accent-gradient);
          border-radius: 12px;
          transition: width 1.2s cubic-bezier(0.22, 0.61, 0.36, 1);
          position: relative;
          box-shadow: 0 0 15px rgba(255, 107, 107, 0.5);
        }

        .countdown-page .progress-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, var(--glow-color), transparent);
          animation: shimmer 2.5s infinite;
          border-radius: 12px;
        }

        .countdown-page .progress-text {
          font-family: sans-serif;
          text-align: center;
          font-size: 1.1rem;
          font-weight: 500;
          color: #ffffff;
          margin: 0;
        }

        .countdown-page .exam-info-section {
          margin-bottom: 3.5rem;
          position: relative;
          z-index: 2;
        }

        .countdown-page .exam-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .countdown-page .exam-info-card {
          background: var(--card-bg);
          backdrop-filter: blur(15px);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 1.75rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px -5px var(--shadow-color);
        }

        .countdown-page .exam-info-card:hover {
          background: var(--card-hover-bg);
          transform: translateY(-5px);
          box-shadow: 0 12px 25px -5px var(--shadow-color);
        }

        .countdown-page .info-icon {
          font-size: 2.2rem;
          flex-shrink: 0;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        .countdown-page .info-content h4 {
          font-family: 'Poppins', sans-serif;
          margin: 0 0 0.6rem 0;
          font-size: 1.2rem;
          font-weight: 700;
          color: #ffffff;
        }

        .countdown-page .info-content p {
          font-family: sans-serif;
          margin: 0;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 500;
        }

        /* Compact Exam Info Section */
        .countdown-page .exam-info-section-compact {
          margin-bottom: 2.5rem;
          position: relative;
          z-index: 2;
        }

        .countdown-page .exam-info-grid-compact {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .countdown-page .exam-info-card-compact {
          background: var(--card-bg);
          backdrop-filter: blur(15px);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px -3px var(--shadow-color);
          text-align: center;
          margin: 1.5rem;
        }

        .countdown-page .exam-info-card-compact:hover {
          background: var(--card-hover-bg);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px -5px var(--shadow-color);
        }

        .countdown-page .info-icon-compact {
          font-size: 1.5rem;
          flex-shrink: 0;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        .countdown-page .info-content-compact p {
          font-family: sans-serif;
          margin: 0;
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 600;
          line-height: 1.2;
        }

        /* Horizontal Line Divider */
        .countdown-page .timetable-divider {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          margin: 2rem auto;
          max-width: 400px;
        }

        /* Exam Timetable Section */
        .countdown-page .exam-timetable-section {
          margin-top: 2rem;
          margin-bottom: 2.5rem;
          position: relative;
          z-index: 2;
        }

        .countdown-page .timetable-card {
          background: var(--card-bg);
          backdrop-filter: blur(15px);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px -5px var(--shadow-color);
          max-width: 600px;
          margin: 0 auto;
        }

        .countdown-page .timetable-card:hover {
          background: var(--card-hover-bg);
          transform: translateY(-3px);
          box-shadow: 0 12px 25px -5px var(--shadow-color);
        }

        .countdown-page .timetable-icon {
          font-size: 2.5rem;
          flex-shrink: 0;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        .countdown-page .timetable-content {
          text-align: center;
          flex: 1;
        }

        .countdown-page .timetable-content h4 {
          font-family: 'Poppins', sans-serif;
          margin: 0 0 0.5rem 0;
          font-size: 1.3rem;
          font-weight: 700;
          color: #ffffff;
        }

        .countdown-page .timetable-content p {
          font-family: sans-serif;
          margin: 0 0 1rem 0;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 500;
          opacity: 0.9;
        }

        .countdown-page .timetable-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #4cc9f0 0%, #4361ee 100%);
          color: white;
          text-decoration: none;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          border: none;
        }

        .countdown-page .timetable-link:hover {
          background: linear-gradient(135deg, #4895ef 0%, #3a0ca3 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
          color: white;
        }

        .countdown-page .countdown-cta {
          text-align: center;
          position: relative;
          z-index: 2;
          padding: 1rem;
        }

        .countdown-page .cta-content h3 {
          font-family: 'Poppins', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          letter-spacing: -0.5px;
          color: #ffffff;
        }

        .countdown-page .cta-content p {
          font-family: sans-serif;
          font-size: 1.2rem;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 2.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .countdown-page .cta-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .countdown-page .btn {
          padding: 1rem 2.5rem;
          border-radius: 16px;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          font-size: 1.1rem;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .countdown-page .btn-primary {
          background: linear-gradient(135deg, #4cc9f0 0%, #4361ee 100%);
          color: white;
          border: none;
        }

        .countdown-page .btn-primary:hover {
          background: linear-gradient(135deg, #4895ef 0%, #3a0ca3 100%);
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
        }

        .countdown-page .btn-outline-primary {
          background: transparent;
          color: white;
          border-color: rgba(255, 255, 255, 0.5);
        }

        .countdown-page .btn-outline-primary:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
        }

        @keyframes slideInUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        /* Responsive Design */
        @media (max-width: 992px) {
          .countdown-page .countdown-main-title {
            font-size: 3.2rem;
          }
          
          .countdown-page .countdown-grid {
            gap: 1.5rem;
          }
          
          .countdown-page .countdown-card {
            min-height: 150px;
            padding: 1.75rem 1.25rem;
          }
          
          .countdown-page .card-number {
            font-size: 2.8rem;
          }
        }

        @media (max-width: 768px) {
          .countdown-page .modern-countdown-container {
            padding: 2rem 1.5rem;
            margin: 1rem 0;
            border-radius: 20px;
          }

          .countdown-page .countdown-main-title {
            font-size: 2.5rem;
            margin-bottom: 0.75rem;
          }

          .countdown-page .countdown-description {
            font-size: 1.1rem;
            margin-bottom: 2rem;
          }

          .countdown-page .countdown-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-bottom: 2rem;
          }

          .countdown-page .countdown-card {
            min-height: 120px;
            padding: 1.5rem 1rem;
          }

          .countdown-page .card-number {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
          }

          .countdown-page .label-zh {
            font-size: 1rem;
          }

          .countdown-page .label-en {
            font-size: 0.8rem;
          }

          .countdown-page .exam-info-card-compact {
            margin: 0.5rem;
            padding: 0.75rem;
          }

          .countdown-page .info-icon-compact {
            font-size: 1.2rem;
          }

          .countdown-page .info-content-compact p {
            font-size: 0.85rem;
          }

          .countdown-page .timetable-card {
            padding: 1.25rem;
            gap: 1rem;
          }

          .countdown-page .timetable-icon {
            font-size: 2rem;
          }

          .countdown-page .timetable-content h4 {
            font-size: 1.2rem;
          }

          .countdown-page .timetable-content p {
            font-size: 0.9rem;
          }

          .countdown-page .timetable-link {
            padding: 0.6rem 1.25rem;
            font-size: 0.9rem;
          }

          .countdown-page .cta-content h3 {
            font-size: 1.6rem;
          }

          .countdown-page .cta-content p {
            font-size: 1rem;
          }

          .countdown-page .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .countdown-page .btn {
            width: 100%;
            max-width: 300px;
          }
        }

        @media (max-width: 480px) {
          .countdown-page .modern-countdown-container {
            padding: 1.5rem 1rem;
            margin: 0.5rem 0;
          }

          .countdown-page .countdown-main-title {
            font-size: 2rem;
          }

          .countdown-page .countdown-description {
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }

          .countdown-page .countdown-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
            margin-bottom: 1.5rem;
          }

          .countdown-page .countdown-card {
            min-height: 100px;
            padding: 1rem 0.75rem;
          }

          .countdown-page .card-number {
            font-size: 2rem;
            margin-bottom: 0.3rem;
          }
          
          .countdown-page .label-zh {
            font-size: 0.9rem;
          }
          
          .countdown-page .label-en {
            font-size: 0.7rem;
          }
          
          .countdown-page .exam-info-card-compact {
            margin: 0.4rem;
            padding: 0.6rem;
          }

          .countdown-page .info-icon-compact {
            font-size: 1.1rem;
          }

          .countdown-page .info-content-compact p {
            font-size: 0.8rem;
          }

          .countdown-page .timetable-card {
            padding: 1rem;
            gap: 0.75rem;
            flex-direction: column;
            text-align: center;
          }

          .countdown-page .timetable-icon {
            font-size: 1.8rem;
          }

          .countdown-page .timetable-content h4 {
            font-size: 1.1rem;
          }

          .countdown-page .timetable-content p {
            font-size: 0.85rem;
          }

          .countdown-page .timetable-link {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }

          .countdown-page .cta-content h3 {
            font-size: 1.4rem;
          }

          .countdown-page .cta-content p {
            font-size: 0.9rem;
          }
        }
      `}</style>
        </>
    )
}