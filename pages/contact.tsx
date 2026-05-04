import { useState } from 'react';
import PageSEO from '../components/PageSEO';
import PageBreadcrumb from '../components/PageBreadcrumb';

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
            <PageSEO
              title="聯絡我們 Contact Us"
              description="與 dse.best 聯絡，提供意見、回報問題或查詢合作機會。我們致力為香港DSE考生提供最優質的學習資源。"
              ogTitle="聯絡我們 Contact Us"
              ogDescription="與 dse.best 聯絡，提供意見、回報問題或查詢合作機會。"
              ogUrl="https://dse.best/contact"
              robots={['index', 'follow']}
            />

            <PageBreadcrumb section="其他" text="联絡我們" />
            <div className="card rounded-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="card-body">
                    <h1 className="text-center">聯絡我們 Contact Us</h1>
                    <br />
                    {sent ? (
                        <div
                            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center"
                            role="alert"
                        >
                            <h4 className="mb-3 font-bold text-green-700">
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
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center" role="alert">
                                    訊息送出失敗，請稍後再試。
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <input type="hidden" name="access_key" value="b13743b4-6206-422c-8e77-99eaf800610d" />
                                <div className="mb-3">
                                    <label htmlFor="name" className="block text-sm font-medium mb-1">姓名 Name</label>
                                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" id="name" name="name" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="block text-sm font-medium mb-1">電郵 Email</label>
                                    <input type="email" className="w-full border border-gray-300 rounded px-3 py-2" id="email" name="email" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="subject" className="block text-sm font-medium mb-1">主題 Subject</label>
                                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" id="subject" name="subject" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="block text-sm font-medium mb-1">訊息 Message</label>
                                    <textarea className="w-full border border-gray-300 rounded px-3 py-2" id="message" name="message" rows={5} required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-full py-3 font-semibold">
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
