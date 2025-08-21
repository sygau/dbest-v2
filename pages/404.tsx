import Head from 'next/head'
import Link from 'next/link'
import NavigationLink from '../components/NavigationLink'
import { getMainPageMetadata } from '../utils/structuredData';

export default function Custom404() {
  const metadata = getMainPageMetadata('404');

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
                <div className="breadcrumb-title pe-3">錯誤</div>
                <div className="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            <li className="breadcrumb-item active" aria-current="page">
                                404
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/*end breadcrumb*/}
            <div className="card rounded-4" style={{ height: "auto", padding: 20 }}>
                <div className="card-body text-center">
                    <h1
                        className="fw-bold mb-4"
                        style={{ marginTop: 50, fontSize: "3.0rem" }}
                    >
                        <span
                            style={{
                                background: "linear-gradient(to right, #663399, #007bff)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}
                        >
                            404 Not Found
                        </span>
                    </h1>
                    <p className="mb-4" style={{ marginTop: 40, fontSize: "1.4rem" }}>
                        抱歉，找不到您要訪問的頁面。
                    </p>
                    <NavigationLink href="/" className="btn btn-primary">
                        返回主頁
                    </NavigationLink>
                    <br />
                    <hr className="my-4" />
                    <br />
                    <br />
                </div>
            </div>
        </>
    )
}
