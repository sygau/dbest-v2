/**
 * Global type declarations for the application
 */

// Global interface
interface Window {
  // Google Analytics
  gtag: (...args: any[]) => void;
  dataLayer: any[];
  
  // App-specific globals
  initPaperLinks?: () => void;
  updateCountdown?: () => void;
  countdownInterval?: NodeJS.Timeout;
  blogPagination?: any;
  
  // Next.js router (for navigation handling)
  next?: {
    router?: {
      events: {
        on: (event: string, callback: (...args: any[]) => void) => void;
        off: (event: string, callback: (...args: any[]) => void) => void;
      };
    };
  };
  
  // Vercel Analytics
  va?: (...args: any[]) => void;
  vaq?: any[];
  si?: (...args: any[]) => void;
  siq?: any[];
}

// Declare module for CSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// Declare module for static assets
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

// Environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    NEXT_PUBLIC_GA_ID: string;
    NEXT_PUBLIC_SITE_URL: string;
  }
} 