import { useEffect } from 'react';

export function useBeforeUnload(active: boolean, message = 'AI 正在批改，離開會中斷批改並浪費今日次數，確定離開？') {
  useEffect(() => {
    if (!active) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = message;
      return message;
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [active, message]);
}
