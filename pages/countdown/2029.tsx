import { useEffect, useState } from 'react'
import NavigationLink from '../../components/NavigationLink'
import PageBreadcrumb from '../../components/PageBreadcrumb'
import styles from '../../styles/countdown.module.css'
import PageSEO from '../../components/PageSEO'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function Countdown2029Page() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const targetDate = new Date('2029-04-04T09:00:00+08:00')

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
      <PageSEO
        title="DSE 2029 Countdown Timer 考試日期倒數"
        description="DSE 2029 Countdown Timer 考試日期倒數計時器，幫助香港DSE考生準備文憑試。HKDSE Exam Date Countdown, Study Schedule Planner, Revision Timetable。掌握DSE考試日期，合理安排溫習時間，制定備考策略。How many days left till 2029 DSE Examination?"
        ogTitle="DSE 2029 Countdown Timer 考試日期倒數"
        ogDescription="DSE 2029 Countdown Timer 考試日期倒數計時器，幫助香港DSE考生準備文憑試。HKDSE Exam Date Countdown, Study Schedule Planner, Revision Timetable。掌握DSE考試日期，合理安排溫習時間，制定備考策略。"
        ogUrl="https://dse.best/countdown/2029"
        robots={['index', 'follow']}
        pageKey="countdown2029"
      />

      <PageBreadcrumb section="其他" text="DSE 2029 Countdown" />

      <div className={`card rounded-4 ${styles.countdownPage}`}>
        <div className="card-body">
          <div className="bg-yellow-50 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-4 flex items-center" role="alert">
            <svg className="bi flex-shrink-0 mr-2" width="24" height="24" role="img" aria-label="Warning:">
              <use xlinkHref="#exclamation-triangle-fill" />
            </svg>
            <div>
              <strong>注意：</strong> 2029年DSE考試日期為預計日期，基於過往考試日期推算。實際日期可能有所不同。請以香港考試及評核局(HKEAA)官方公佈為準。
            </div>
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </symbol>
          </svg>

          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.mainTitle}>DSE 2029 倒數</h1>
            </div>
            <p className={styles.description}>距離香港中學文憑考試 2029 還有</p>
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
                  <p>2029年4月4日</p>
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
                <p>查看 2029 年 DSE 各科目詳細考試時間安排（待公佈）</p>
                <NavigationLink
                  href="https://www.hkeaa.edu.hk/doclibrary/hkdse/exam_timetable/2029_dse_timetable.pdf"
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
