import Head from 'next/head'
import { useEffect } from 'react'
import { generateCountdownStructuredData, generatePageFAQStructuredData } from '../utils/structuredData'
import { getMainPageMetadata } from '../utils/structuredData';

export default function CountdownPage() {
  const metadata = getMainPageMetadata('countdown');

    useEffect(() => {
        // Function to initialize countdown
        const initCountdown = () => {
            if (document.getElementById('countdownCanvas') && (window as any).DSECountdown) {
                try {
                    if ((window as any).dseCountdown) (window as any).dseCountdown.destroy();
                    (window as any).dseCountdown = new (window as any).DSECountdown();
                } catch (error) {
                    console.error('Error initializing DSE Countdown:', error);
                }
            }
        };

        // Load countdown.js script
        if (!(window as any).DSECountdownLoaded || !(window as any).DSECountdown) {
            const countdownScript = document.createElement('script');
            countdownScript.src = '/assets/js/countdown.js';
            countdownScript.onload = () => { 
                (window as any).DSECountdownLoaded = true;
                // Initialize countdown after script loads
                initCountdown();
            };
            countdownScript.onerror = () => {
                console.error('Failed to load countdown.js');
            };
            document.head.appendChild(countdownScript);
        } else {
            // Script is already loaded, just re-initialize the countdown
            initCountdown();
        }

        // Cleanup function
        return () => {
            if ((window as any).dseCountdown) {
                (window as any).dseCountdown.destroy();
            }
        };
    }, []);

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
            </Head>

            {/*breadcrumb*/}
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
            {/*end breadcrumb*/}
            {/* DSE 2026 Countdown Canvas */}
            <div className="row">
                <div className="col-12">
                    <div
                        className="card rounded-4 shadow-lg countdown-card"
                        style={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            border: "none"
                        }}
                    >
                        <div
                            className="card-body d-flex flex-column justify-content-center align-items-center text-white position-relative"
                            style={{ padding: "2rem" }}
                        >
                            {/* Title Section */}
                            <div className="text-center mb-4">
                                <h1
                                    className="display-4 fw-bold mb-3"
                                    style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
                                >
                                    DSE 2026 倒數計時器
                                </h1>
                                <h2 className="h4 mb-4" style={{ opacity: "0.9" }}>
                                    DSE 2026 Countdown Timer
                                </h2>
                                <p className="lead mb-0" style={{ opacity: "0.8" }}>
                                    距離香港中學文憑考試 2026 還有
                                </p>
                            </div>
                            {/* Canvas Countdown Display */}
                            <div
                                className="countdown-canvas-container"
                                style={{ width: "100%", maxWidth: 800, padding: "0 0px" }}
                            >
                                <canvas
                                    id="countdownCanvas"
                                    width={900}
                                    height={300}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        background: "transparent"
                                    }}
                                />
                            </div>
                            {/* Exam Info */}
                            <div className="text-center mt-4">
                                <p className="mb-2" style={{ fontSize: "1.1rem", opacity: "0.9" }}>
                                    <strong>DSE 2026 預計開始日期：2026年4月10日</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
