declare module 'pace-js' {
  interface PaceOptions {
    ajax?: boolean | { trackMethods?: string[]; trackWebSockets?: boolean; ignoreURLs?: string[] };
    elements?: boolean | { selectors?: string[] };
    document?: boolean;
    eventLag?: boolean | { minSamples?: number; sampleCount?: number; lagThreshold?: number };
    restartOnPushState?: boolean;
    restartOnRequestAfter?: boolean;
    target?: string;
    startOnPageLoad?: boolean;
    ghostTime?: number;
    maxProgressPerFrame?: number;
    easeFactor?: number;
    initialRate?: number;
    minTime?: number;
  }

  interface PaceInstance {
    start(options?: PaceOptions): void;
    stop(): void;
    restart(): void;
    track(fn: () => any): any;
    ignore(fn: () => any): any;
    on(event: string, handler: (...args: any[]) => void): void;
    off(event: string, handler?: (...args: any[]) => void): void;
    once(event: string, handler: (...args: any[]) => void): void;
    trigger(event: string, ...args: any[]): void;
    running: boolean;
    bar: {
      progress: number;
      render(): void;
    };
  }

  const Pace: PaceInstance;
  export default Pace;
}

declare global {
  interface Window {
    Pace?: {
      start(options?: PaceOptions): void;
      stop(): void;
      restart(): void;
      track(fn: () => any): any;
      ignore(fn: () => any): any;
      on(event: string, handler: (...args: any[]) => void): void;
      off(event: string, handler?: (...args: any[]) => void): void;
      once(event: string, handler: (...args: any[]) => void): void;
      trigger(event: string, ...args: any[]): void;
      running: boolean;
      bar: {
        progress: number;
        render(): void;
      };
    };
  }
}
