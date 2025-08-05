import Head from 'next/head'
import { useEffect } from 'react'

export default function CountdownPage() {
    useEffect(() => {
        // Load countdown.js script
        if (!(window as any).DSECountdownLoaded) {
            const countdownScript = document.createElement('script');
            countdownScript.src = '/assets/js/countdown.js';
            countdownScript.onload = () => { 
                (window as any).DSECountdownLoaded = true;
                // Initialize countdown after script loads
                if (document.getElementById('countdownCanvas')) {
                    (window as any).dseCountdown = new (window as any).DSECountdown();
                }
            };
            document.head.appendChild(countdownScript);
        } else {
            // Script is already loaded, just re-initialize the countdown
            if ((window as any).dseCountdown) (window as any).dseCountdown.destroy();
            if (document.getElementById('countdownCanvas')) {
                (window as any).dseCountdown = new (window as any).DSECountdown();
            }
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
                <title>DSE 2026 Countdown 考試日期倒數 - dse.best</title>
                <meta name="description" content="DSE倒數計時器，幫助你準備文憑試。掌握DSE考試日期，合理安排溫習時間。" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="DSE 2026 Countdown 考試日期倒數 - dse.best" />
                <meta property="og:description" content="DSE倒數計時器，幫助你準備文憑試。掌握DSE考試日期，合理安排溫習時間。" />
                <meta property="og:image" content="https://dse.best/assets/images/logo-icon.png" />
                <meta property="og:url" content="https://dse.best/countdown" />
                <meta property="og:type" content="website" />
            </Head>

            {/*breadcrumb*/}
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">DSE 2026 倒數計時器</div>
                <div className="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            <li className="breadcrumb-item">
                                <a href="/" aria-label="home">
                                    <i className="bx bx-home-alt" />
                                </a>
                            </li>
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
