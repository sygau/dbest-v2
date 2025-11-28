import { useEffect, useState } from 'react';

// Determine whether we should show ads (Google AdSense)
// Logic:
// - If URL has ?na, set localStorage.noAds = '1'
// - If localStorage.noAds === '1', ads are disabled
// - Otherwise, ads are enabled
export function useShowAds() {
  const [showAds, setShowAds] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const hasNoAdsParam = params.has('na');

    if (hasNoAdsParam) {
      try {
        window.localStorage.setItem('noAds', '1');
      } catch {
        // ignore storage errors
      }
    }

    try {
      const stored = window.localStorage.getItem('noAds');
      setShowAds(stored === '1' ? false : true);
    } catch {
      // If storage not available, fall back to showing ads
      setShowAds(true);
    }
  }, []);

  return showAds;
}
