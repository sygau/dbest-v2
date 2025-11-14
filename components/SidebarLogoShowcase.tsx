import React from 'react';

const SidebarLogoShowcase: React.FC = () => {
  const logoVariations = [
    {
      id: 1,
      title: "dse.best",
      style: {
        fontFamily: "'Inter', sans-serif",
        fontWeight: "800",
        fontSize: "1.5rem",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }
    },
    {
      id: 2,
      title: "DSE.BEST",
      style: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: "700",
        fontSize: "1.4rem",
        color: "#2563eb",
        textShadow: "0 2px 4px rgba(37, 99, 235, 0.3)"
      }
    },
    {
      id: 3,
      title: "dse.best",
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: "600",
        fontSize: "1.3rem",
        color: "#059669",
        letterSpacing: "0.05em"
      }
    },
    {
      id: 4,
      title: "DSE.BEST",
      style: {
        fontFamily: "'Playfair Display', serif",
        fontWeight: "700",
        fontSize: "1.5rem",
        background: "linear-gradient(45deg, #f093fb 0%, #f5576c 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }
    },
    {
      id: 5,
      title: "dse.best",
      style: {
        fontFamily: "'Fira Code', monospace",
        fontWeight: "500",
        fontSize: "1.4rem",
        color: "#7c3aed",
        textDecoration: "underline",
        textDecorationColor: "#a855f7",
        textUnderlineOffset: "4px"
      }
    },
    {
      id: 6,
      title: "DSE.BEST",
      style: {
        fontFamily: "'Roboto Slab', serif",
        fontWeight: "800",
        fontSize: "1.4rem",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textTransform: "uppercase" as const,
        letterSpacing: "0.1em"
      }
    },
    {
      id: 7,
      title: "dse.best",
      style: {
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: "600",
        fontSize: "1.5rem",
        color: "#dc2626",
        position: "relative" as const
      }
    },
    {
      id: 8,
      title: "DSE.BEST",
      style: {
        fontFamily: "'Outfit', sans-serif",
        fontWeight: "700",
        fontSize: "1.3rem",
        background: "linear-gradient(90deg, #4f46e5, #06b6d4, #10b981)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundSize: "200% 100%",
        animation: "gradient-shift 3s ease-in-out infinite"
      }
    },
    {
      id: 9,
      title: "dse.best",
      style: {
        fontFamily: "'Source Code Pro', monospace",
        fontWeight: "600",
        fontSize: "1.4rem",
        color: "#0891b2",
        border: "2px solid #0891b2",
        padding: "4px 8px",
        borderRadius: "6px"
      }
    },
    {
      id: 10,
      title: "DSE.BEST",
      style: {
        fontFamily: "'Nunito', sans-serif",
        fontWeight: "800",
        fontSize: "1.5rem",
        background: "linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundSize: "400% 400%",
        animation: "rainbow-shift 4s ease-in-out infinite"
      }
    }
  ];

  return (
    <div className="sidebar-logo-showcase">
      <style jsx>{`
        .sidebar-logo-showcase {
          height: 100vh;
          overflow-y: auto;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .logo-item {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 16px;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .logo-item:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .logo-number {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.8rem;
          margin-bottom: 8px;
          font-family: 'Inter', sans-serif;
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes rainbow-shift {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 200% 50%; }
          75% { background-position: 300% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .logo-7::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #dc2626, #f59e0b, #10b981);
          border-radius: 1px;
        }
      `}</style>
      
      <div className="text-center mb-4">
        <h2 style={{ 
          color: 'white', 
          fontFamily: "'Inter', sans-serif",
          fontWeight: '700',
          fontSize: '1.8rem',
          marginBottom: '8px'
        }}>
          Logo Showcase
        </h2>
        <p style={{ 
          color: 'rgba(255, 255, 255, 0.8)', 
          fontSize: '0.9rem',
          fontFamily: "'Inter', sans-serif"
        }}>
          Choose your preferred style
        </p>
      </div>

      {logoVariations.map((logo) => (
        <div key={logo.id} className="logo-item">
          <div className="logo-number">Option {logo.id}</div>
          <div 
            style={logo.style}
            className={logo.id === 7 ? 'logo-7' : ''}
          >
            {logo.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarLogoShowcase;
