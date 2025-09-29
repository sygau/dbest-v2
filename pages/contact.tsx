import Head from 'next/head'
import { useState } from 'react';
import { getMainPageMetadata } from '../utils/structuredData';

export default function ContactPage() {
  const metadata = getMainPageMetadata('contact');

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
                <title>{metadata?.title}</title>
                <meta name="description" content={metadata?.description} />
                <meta name="robots" content={metadata?.robots} />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content={metadata?.ogTitle} />
                <meta property="og:description" content={metadata?.ogDescription} />
                <meta property="og:image" content={metadata?.ogImage} />
                <meta property="og:url" content={metadata?.ogUrl} />
                <meta property="og:type" content={metadata?.ogType} />
            </Head>

            {/*breadcrumb*/}
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">其他</div>
                <div className="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
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
                                backgroundColor: '#198754',
                                color: 'white'
                            }}
                        >
                            <h4
                                className="mb-3 fw-bold"
                                style={{ color: 'white' }}
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
                                    訊息送出失敗，請稍後再試。
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
