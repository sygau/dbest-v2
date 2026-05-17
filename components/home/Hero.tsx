export default function Hero() {
  return (
    <div className="text-center pt-[33px] sm:pt-7 pb-1">
      {/* blank spacer — keeps title position on desktop; dropped on mobile to move title up */}
      <p
        aria-hidden
        className="font-logo font-bold m-0 select-none hidden sm:block"
        style={{ fontSize: 'clamp(1.4rem, 4.2vw, 2rem)' }}
      >
        &nbsp;
      </p>

      <h1
        className="font-bold mt-2 mb-0"
        style={{ fontSize: 'clamp(2rem, 8vw, 3.6rem)', color: 'var(--color-heading)', lineHeight: 1.16 }}
      >
        你的{' '}
        <span className="relative inline-block" style={{ whiteSpace: 'nowrap' }}>
          <span className="relative" style={{ zIndex: 1 }}>DSE 備戰拍檔。</span>
          {/* purple brush highlight, double layer */}
          <svg
            aria-hidden
            className="absolute pointer-events-none"
            style={{ left: '-5%', width: '110%', bottom: '-0.17em', height: '0.62em', zIndex: 0 }}
            viewBox="0 0 320 56"
            preserveAspectRatio="none"
          >
            <path
              d="M4,25 C62,13 132,18 202,16 C256,15 301,21 317,28 C309,42 250,48 174,46 C103,44 47,50 8,40 Z"
              fill="#c4b5fd"
              opacity="0.85"
            />
            <path
              d="M12,33 C76,23 146,26 216,25 C266,24 304,28 314,35 C303,47 244,49 167,47 C96,45 41,50 13,43 Z"
              fill="#8b5cf6"
              opacity="0.5"
            />
          </svg>
        </span>
      </h1>

      <p
        className="mx-auto mt-6 text-base sm:text-xl leading-relaxed"
        style={{ color: 'var(--color-body)', maxWidth: '78ch' }}
      >
        DSE 本身已經夠煩，搵資料唔應該都係一場折磨。dse.best 將你備戰需要嘅嘢全部整合埋一齊——工具、數據、DSE Past Papers、溫習攻略，一網打盡。專心溫書就好，其他交俾我哋。
      </p>
    </div>
  )
}
