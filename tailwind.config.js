/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#4361ee',
        violet: '#8b5cf6',
      },
      fontFamily: {
        sans: [
          '-apple-system', 'BlinkMacSystemFont', 'Segoe UI',
          'Noto Sans HK', 'PingFang HK', 'Microsoft JhengHei',
          'sans-serif',
        ],
        chinese: [
          'Noto Sans HK', 'PingFang HK', 'Microsoft JhengHei',
          '-apple-system', 'BlinkMacSystemFont', 'sans-serif',
        ],
        logo: [
          'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode',
          'Lucida Sans', 'Tahoma', 'sans-serif',
        ],
        serif: [
          'var(--font-noto-serif-hk)', 'Noto Serif HK', 'Songti TC',
          'SimSun', 'serif',
        ],
      },
      width: {
        sidebar: '260px',
        'sidebar-collapsed': '70px',
      },
      height: {
        header: '70px',
      },
      spacing: {
        sidebar: '260px',
        'sidebar-collapsed': '70px',
        header: '70px',
      },
      zIndex: {
        sidebar: '12',
        header: '10',
        overlay: '11',
      },
      boxShadow: {
        sidebar: '0 2px 6px 0 rgba(0,0,0,0.044), 0 2px 6px 0 rgba(0,0,0,0.049)',
        header: '0 2px 6px 0 rgba(0,0,0,0.044), 0 2px 6px 0 rgba(0,0,0,0.049)',
      },
    },
  },
  plugins: [],
}
