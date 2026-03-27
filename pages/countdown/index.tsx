import Head from 'next/head'
import { useEffect, useState } from 'react'
import { generateCountdownStructuredData, generatePageFAQStructuredData, getMainPageMetadata } from '../../utils/structuredData'
import NavigationLink from '../../components/NavigationLink'
import styles from '../../styles/countdown.module.css'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownPage() {
  const metadata = getMainPageMetadata('countdown')
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const targetDate = new Date('2026-04-09T09:00:00+08:00')

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = targetDate.getTime() - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Head>
        <title>{metadata?.title}</title>
        <meta name="description" content={metadata?.description} />
        <meta name="robots" content={metadata?.robots} />
        <meta property="og:title" content={metadata?.ogTitle} />
        <meta property="og:description" content={metadata?.ogDescription} />
        <meta property="og:image" content={metadata?.ogImage} />
        <meta property="og:url" content={metadata?.ogUrl} />
        <meta property="og:type" content={metadata?.ogType} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateCountdownStructuredData()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePageFAQStructuredData('countdown')) }}
        />
      </Head>

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

      <div className={`card rounded-4 ${styles.countdownPage}`}>
        <div className="card-body">
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.mainTitle}>DSE 2026 倒數</h1>
            </div>
            <p className={styles.description}>距離香港中學文憑考試 2026 還有</p>
          </div>

          <div className={styles.display}>
            <div className={styles.grid}>
              <div className={styles.card}>
                <div className={styles.number}>{timeLeft.days}</div>
                <div className={styles.label}>
                  <span className={styles.labelZh}>天</span>
                  <span className={styles.labelEn}>DAYS</span>
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.number}>{timeLeft.hours}</div>
                <div className={styles.label}>
                  <span className={styles.labelZh}>小時</span>
                  <span className={styles.labelEn}>HOURS</span>
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.number}>{timeLeft.minutes}</div>
                <div className={styles.label}>
                  <span className={styles.labelZh}>分鐘</span>
                  <span className={styles.labelEn}>MINUTES</span>
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.number}>{timeLeft.seconds}</div>
                <div className={styles.label}>
                  <span className={styles.labelZh}>秒</span>
                  <span className={styles.labelEn}>SECONDS</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.infoSectionCompact}>
            <div className={styles.infoGridCompact}>
              <div className={styles.infoCardCompact}>
                <div className={styles.infoIconCompact}>📅</div>
                <div className={styles.infoContentCompact}>
                  <p>2026年4月9日</p>
                </div>
              </div>

              <div className={styles.infoCardCompact}>
                <div className={styles.infoIconCompact}>⏰</div>
                <div className={styles.infoContentCompact}>
                  <p>上午9:00</p>
                </div>
              </div>
            </div>
          </div>

          <hr className={styles.divider} />

          <div className={styles.timetableSection}>
            <div className={styles.timetableCard}>
              <div className={styles.timetableContent}>
                <h4>完整考試時間表</h4>
                <p>查看 2026 年 DSE 各科目詳細考試時間安排</p>
                <NavigationLink
                  href="https://www.hkeaa.edu.hk/doclibrary/hkdse/exam_timetable/2026_dse_timetable.pdf"
                  className={styles.timetableLink}
                  target="_blank"
                >
                  查看完整考試時間表
                </NavigationLink>
              </div>
            </div>
          </div>

          <div className={styles.cta}>
            <div className={styles.ctaContent}>
              <h3>準備好迎接挑戰了嗎？</h3>
              <p>立即開始溫習，掌握歷屆試題重點</p>
              <div className={styles.ctaButtons}>
                <NavigationLink href="/" className={`${styles.btn} ${styles.btnPrimary}`}>
                  開始溫習
                </NavigationLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
