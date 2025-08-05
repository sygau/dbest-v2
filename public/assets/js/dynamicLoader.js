// dynamicLoader.js
// Consolidated helper to load blog-index scripts, post-page scripts,
// and refresh them on Swup page transitions. Extracted from index.html
// so it can be reused across all static pages without duplication.

(function() {
  'use strict';

  /**
   * Inject blog index helpers (blogIndex.js + Disqus count.js) when on /blog/
   */
  function loadBlogIndexJS() {
    if (window.location.pathname === '/blog' || window.location.pathname === '/blog/') {
      // Inject blogIndex.js once per session
      if (!window.DSEBlogIndexLoaded) {
        const blogIndexScript = document.createElement('script');
        blogIndexScript.src = 'https://dse.best/assets/js/blogIndex.js';
        blogIndexScript.onload = () => { window.DSEBlogIndexLoaded = true; };
        document.head.appendChild(blogIndexScript);
      }
      // Inject Disqus comment counter (count.js) once per page load
      if (!document.getElementById('dsq-count-scr')) {
        const disqusCountScript = document.createElement('script');
        disqusCountScript.id = 'dsq-count-scr';
        disqusCountScript.src = '//dsebest.disqus.com/count.js';
        disqusCountScript.async = true;
        document.head.appendChild(disqusCountScript);
      }
    }
  }

  /**
   * Inject Disqus embed & Busuanzi view counter on individual blog-post pages.
   */
  function loadPostJS() {
    if (window.location.pathname.startsWith('/blog/') && window.location.pathname !== '/blog/') {
      // Busuanzi view counter
      if (!window.BusuanziLoaded) {
        const busuanziScript = document.createElement('script');
        busuanziScript.src = 'https://busuanzi.icodeq.com/busuanzi.pure.mini.js';
        busuanziScript.async = true;
        busuanziScript.defer = true;
        busuanziScript.onload = () => { window.BusuanziLoaded = true; };
        document.head.appendChild(busuanziScript);
      }

      // Embed Disqus after slight delay so DOM is ready
      setTimeout(() => {
        const disqusThread = document.getElementById('disqus_thread');
        if (disqusThread && !window.DisqusLoaded) {
          const pathSegments = window.location.pathname.split('/');
          const slug = pathSegments[pathSegments.length - 1].replace('.html', '');

          window.disqus_config = function () {
            this.page.url = `https://dse.best/blog/${slug}`;
            this.page.identifier = slug;
            this.page.robots = 'noindex, nofollow';
          };

          const disqusScript = document.createElement('script');
          disqusScript.src = 'https://dsebest.disqus.com/embed.js';
          disqusScript.setAttribute('data-timestamp', +new Date());
          disqusScript.onload = () => { window.DisqusLoaded = true; };
          (document.head || document.body).appendChild(disqusScript);
        }
      }, 400);
    }
  }

  // Expose globally so other inline scripts can call if needed
  window.loadBlogIndexJS = loadBlogIndexJS;
  window.loadPostJS = loadPostJS;

  // Helper to run on initial load & on every Swup replacement
  function runDynamicLoaders() {
    if (typeof initializePage === 'function') initializePage();
    if (typeof loadCountdownJs === 'function') loadCountdownJs();
    loadBlogIndexJS();
    loadPostJS();
  }

  // Initial run (compatible with pages without Swup)
  if (document.readyState === 'complete') {
    runDynamicLoaders();
  } else {
    document.addEventListener('DOMContentLoaded', runDynamicLoaders);
  }

  // Attach Swup hook if Swup is present
  if (window.swup && window.swup.hooks) {
    window.swup.hooks.on('content:replace', runDynamicLoaders);
  }
})();
