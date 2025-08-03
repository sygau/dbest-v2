# Performance Optimization Diff

## CSS Loading Section Replacement

### REMOVE this entire section from ALL HTML files:

```html
<!-- loader-->
<link href="assets/css/pace.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/pace-js@1.2.3/pace.min.js"></script>
<!--plugins-->
<link href="https://cdn.jsdelivr.net/npm/metismenu@3.0.7/dist/metisMenu.min.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="assets/plugins/metismenu/mm-vertical.css">
<!--bootstrap css-->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&display=swap">
<link href="https://fonts.googleapis.com/css?family=Material+Icons+Outlined" rel="stylesheet">
<!--main css-->
<link href="assets/css/bootstrap-extended.css" rel="stylesheet">
<link href="sass/main.css" rel="stylesheet">
<link href="sass/dark-theme.css" rel="stylesheet">
<link href="sass/blue-theme.css" rel="stylesheet">
<link href="sass/semi-dark.css" rel="stylesheet">
<link href="sass/bordered-theme.css" rel="stylesheet">
<link href="sass/responsive.css" rel="stylesheet">
```

### REPLACE with this optimized section:

#### For ROOT level files (index.html, about.html, etc.):
```html
<!-- DNS Prefetch and Preconnect for better performance -->
<link rel="dns-prefetch" href="//cdn.jsdelivr.net">
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//fonts.gstatic.com">
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Critical CSS - inline the most important styles -->
<style>
  /* Critical CSS for above-the-fold content */
  body { font-family: system-ui, -apple-system, sans-serif; margin: 0; }
  .page-wrapper { min-height: 100vh; }
  .header-wrapper { background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,.1); }
  .primary-menu { background: #0f1535; }
  .loader-wrapper { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #fff; z-index: 9999; display: flex; align-items: center; justify-content: center; }
  .spinner { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #0f1535; border-radius: 50%; animation: spin 1s linear infinite; }
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>

<!-- Preload critical resources -->
<link rel="preload" href="sass/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="sass/main.css"></noscript>

<!-- Preload essential fonts -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&display=swap"></noscript>

<!-- Defer non-critical CSS -->
<script>
  // Function to load CSS asynchronously
  function loadCSS(href, media) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = media || 'all';
    document.head.appendChild(link);
  }
  
  // Load non-critical CSS after page load
  window.addEventListener('load', function() {
    // Theme CSS files
    loadCSS('sass/dark-theme.css');
    loadCSS('sass/blue-theme.css');
    loadCSS('sass/semi-dark.css');
    loadCSS('sass/bordered-theme.css');
    loadCSS('sass/responsive.css');
    
    // Bootstrap and plugins (deferred)
    loadCSS('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
    loadCSS('assets/css/bootstrap-extended.css');
    loadCSS('https://cdn.jsdelivr.net/npm/metismenu@3.0.7/dist/metisMenu.min.css');
    loadCSS('assets/plugins/metismenu/mm-vertical.css');
    loadCSS('assets/css/pace.min.css');
    
    // Load Material Icons (lowest priority)
    setTimeout(function() {
      loadCSS('https://fonts.googleapis.com/css?family=Material+Icons+Outlined');
    }, 100);
  });
</script>
```

#### For BLOG subdirectory files (blog/*.html):
```html
<!-- DNS Prefetch and Preconnect for better performance -->
<link rel="dns-prefetch" href="//cdn.jsdelivr.net">
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//fonts.gstatic.com">
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Critical CSS - inline the most important styles -->
<style>
  /* Critical CSS for above-the-fold content */
  body { font-family: system-ui, -apple-system, sans-serif; margin: 0; }
  .page-wrapper { min-height: 100vh; }
  .header-wrapper { background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,.1); }
  .primary-menu { background: #0f1535; }
  .loader-wrapper { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #fff; z-index: 9999; display: flex; align-items: center; justify-content: center; }
  .spinner { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #0f1535; border-radius: 50%; animation: spin 1s linear infinite; }
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>

<!-- Preload critical resources -->
<link rel="preload" href="../sass/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="../sass/main.css"></noscript>

<!-- Preload essential fonts -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&display=swap"></noscript>

<!-- Defer non-critical CSS -->
<script>
  // Function to load CSS asynchronously
  function loadCSS(href, media) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = media || 'all';
    document.head.appendChild(link);
  }
  
  // Load non-critical CSS after page load
  window.addEventListener('load', function() {
    // Theme CSS files
    loadCSS('../sass/dark-theme.css');
    loadCSS('../sass/blue-theme.css');
    loadCSS('../sass/semi-dark.css');
    loadCSS('../sass/bordered-theme.css');
    loadCSS('../sass/responsive.css');
    
    // Bootstrap and plugins (deferred)
    loadCSS('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
    loadCSS('../assets/css/bootstrap-extended.css');
    loadCSS('https://cdn.jsdelivr.net/npm/metismenu@3.0.7/dist/metisMenu.min.css');
    loadCSS('../assets/plugins/metismenu/mm-vertical.css');
    loadCSS('../assets/css/pace.min.css');
    
    // Load Material Icons (lowest priority)
    setTimeout(function() {
      loadCSS('https://fonts.googleapis.com/css?family=Material+Icons+Outlined');
    }, 100);
  });
</script>
```

#### For ADMIN subdirectory files (admin/*.html):
```html
<!-- DNS Prefetch and Preconnect for better performance -->
<link rel="dns-prefetch" href="//cdn.jsdelivr.net">
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//fonts.gstatic.com">
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Critical CSS - inline the most important styles -->
<style>
  /* Critical CSS for above-the-fold content */
  body { font-family: system-ui, -apple-system, sans-serif; margin: 0; }
  .page-wrapper { min-height: 100vh; }
  .header-wrapper { background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,.1); }
  .primary-menu { background: #0f1535; }
  .loader-wrapper { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #fff; z-index: 9999; display: flex; align-items: center; justify-content: center; }
  .spinner { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #0f1535; border-radius: 50%; animation: spin 1s linear infinite; }
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>

<!-- Preload critical resources -->
<link rel="preload" href="../sass/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="../sass/main.css"></noscript>

<!-- Preload essential fonts -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&display=swap"></noscript>

<!-- Defer non-critical CSS -->
<script>
  // Function to load CSS asynchronously
  function loadCSS(href, media) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = media || 'all';
    document.head.appendChild(link);
  }
  
  // Load non-critical CSS after page load
  window.addEventListener('load', function() {
    // Theme CSS files
    loadCSS('../sass/dark-theme.css');
    loadCSS('../sass/blue-theme.css');
    loadCSS('../sass/semi-dark.css');
    loadCSS('../sass/bordered-theme.css');
    loadCSS('../sass/responsive.css');
    
    // Bootstrap and plugins (deferred)
    loadCSS('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
    loadCSS('../assets/css/bootstrap-extended.css');
    loadCSS('https://cdn.jsdelivr.net/npm/metismenu@3.0.7/dist/metisMenu.min.css');
    loadCSS('../assets/plugins/metismenu/mm-vertical.css');
    loadCSS('../assets/css/pace.min.css');
    
    // Load Material Icons (lowest priority)
    setTimeout(function() {
      loadCSS('https://fonts.googleapis.com/css?family=Material+Icons+Outlined');
    }, 100);
  });
</script>
```

## ADD at the end of BODY section (before closing </body> tag):

### For ALL files:
```html
<!-- Load Pace.js after initial render -->
<script>
  window.addEventListener('load', function() {
    if (!window.Pace) {
      var paceScript = document.createElement('script');
      paceScript.src = 'https://cdn.jsdelivr.net/npm/pace-js@1.2.3/pace.min.js';
      paceScript.async = true;
      document.head.appendChild(paceScript);
    }
  });
</script>
```

## File-by-File Checklist:

### Root Directory Files:
- [ ] index.html ✅ (already done)
- [ ] about.html
- [ ] contact.html  
- [ ] disclaimer.html
- [ ] privacy-policy.html
- [ ] countdown.html
- [ ] chat.html
- [ ] chinese.html
- [ ] english.html
- [ ] math.html
- [ ] physics.html
- [ ] chemistry.html
- [ ] biology.html
- [ ] geography.html
- [ ] history.html
- [ ] chinese-history.html
- [ ] economics.html
- [ ] citizen.html
- [ ] ict.html
- [ ] visual-arts.html
- [ ] bafs.html
- [ ] m1.html
- [ ] m2.html

### Blog Directory Files:
- [ ] blog/index.html
- [ ] All blog post HTML files

### Admin Directory Files:
- [ ] admin/index.html
- [ ] admin/login.html

## Pro Tips:

1. **Use Find & Replace**: Most text editors support multi-file find & replace
2. **Test incrementally**: Apply to a few files, test, then continue
3. **Keep backups**: Make a backup before applying changes
4. **Clear Cloudflare cache**: After changes, purge CF cache for immediate results

This should reduce your critical path latency from 539ms to under 300ms and eliminate most render-blocking resources!
