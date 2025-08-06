import Head from 'next/head'
import { useState } from 'react';

export default function ContactPage() {
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false);
        const form = e.currentTarget;
        const formData = new FormData(form);
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                setSent(true);
            } else {
                setError(true);
            }
        } catch {
            setError(true);
        }
    };

    return (
        <>
            <Head>
                <title>聯絡我們 | dse.best</title>
                <meta name="description" content="DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、M1/M2、地理、歷史、中國歷史、經濟及視覺藝術全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。" />
                <meta name="robots" content="index" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="聯絡我們 | dse.best" />
                <meta property="og:description" content="DSE Past Paper 歷屆試題資源，涵蓋中文、英文、數學、物理、化學、ICT、BAFS、生物、數學延伸部分 (M1 和 M2)、地理、歷史、中國歷史、經濟及視覺藝術等全科歷屆試題及答案，支援按科目及年份搜尋，助你掌握DSE考試趨勢。2025、2026 DSE放榜日期、DSE cut off分數、成績查詢、JUPAS資訊等最新資訊一應俱全。" />
                <meta property="og:image" content="https://dse.best/assets/images/logo-icon.png" />
                <meta property="og:url" content="https://dse.best/contact" />
                <meta property="og:type" content="website" />
            </Head>

            {/*breadcrumb*/}
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">其他</div>
                <div className="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            <li className="breadcrumb-item">
                                <a href="javascript:;">
                                    <i className="bx bx-home-alt" />
                                </a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                聯絡我們
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/*end breadcrumb*/}
            <div className="card rounded-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="card-body">
                    <h1 className="text-center">聯絡我們 Contact Us</h1>
                    <br />
                    {sent ? (
                        <div
                            className="alert text-center"
                            role="alert"
                            style={{
                                backgroundColor: '#198754', // Deeper Bootstrap success green
                                color: 'white'
                            }}
                        >
                            <h4
                                className="mb-3 fw-bold" // fw-bold for bold text
                                style={{ color: 'white' }} // Ensure white text
                            >
                                訊息已成功送出！
                            </h4>
                            <p className="mb-0">感謝你的聯絡，我們會盡快回覆及處理相關事宜。</p>
                        </div>
                    ) : (
                        <>
                            <p className="mb-4">
                                如你發現本站內容有侵權、違規或有任何查詢，請填寫以下表格或電郵至 <a href="mailto:info@dse.best">info@dse.best</a>，我們會盡快回覆及處理相關事宜。
                            </p>
                            {error && (
                                <div className="alert alert-danger text-center" role="alert">
                                    訊息送出失敗，請稍後再試或直接電郵至 info@dse.best。
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <input type="hidden" name="access_key" value="b13743b4-6206-422c-8e77-99eaf800610d" />
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">姓名 Name</label>
                                    <input type="text" className="form-control" id="name" name="name" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">電郵 Email</label>
                                    <input type="email" className="form-control" id="email" name="email" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="subject" className="form-label">主題 Subject</label>
                                    <input type="text" className="form-control" id="subject" name="subject" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">訊息 Message</label>
                                    <textarea className="form-control" id="message" name="message" rows={5} required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg w-100">
                                    Submit
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
