const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

// ── Config ────────────────────────────────────────────────────────────────
const PUBLIC_OG_DIR = path.join(__dirname, '../public/og');
const BLOG_INDEX = path.join(__dirname, '../data/blog-index.json');
const CACHE_FILE = path.join(__dirname, '../.og-cache.json');
const ERROR_LOG = path.join(__dirname, '../.og-errors.json');

// Category color mapping
const CATEGORY_COLORS = {
  'English': '#00acc1',
  'Chemistry': '#2e7d32',
  'Physics': '#ffc107',
  'Biology': '#1565c0',
  'Maths': '#fb8c00',
  'Chinese': '#d81b60',
  'Economics': '#546e7a',
  'ICT': '#37474f',
  'History': '#795548',
  'Geography': '#0288d1',
  'default': '#549ee8',
};

// ── Utility: Generate SVG ─────────────────────────────────────────────────
function escapeXml(s) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function generateSVG(title, category = '', color = '#549ee8') {
  // Truncate logic (matches DefaultThumb.tsx)
  const truncate = (text, max) => {
    if (!text) return '';
    return text.length > max ? text.slice(0, max - 1) + '…' : text;
  };

  const splitIntoLines = (text, charsPerLine, maxLines) => {
    const chars = Array.from(text || '');
    const lines = [];

    for (let i = 0; i < chars.length && lines.length < maxLines; i += charsPerLine) {
      lines.push(chars.slice(i, i + charsPerLine).join(''));
    }

    const usedChars = lines.join('').length;
    const hasMore = usedChars < chars.length;

    if (hasMore && lines.length > 0) {
      const last = Array.from(lines[lines.length - 1]);
      if (last.length > 0) {
        last[last.length - 1] = '…';
        lines[lines.length - 1] = last.join('');
      } else {
        lines[lines.length - 1] = '…';
      }
    }

    return lines;
  };

  const truncatedTitle = truncate(title, 32);
  const truncatedCategory = truncate(category, 18);
  const titleLines = splitIntoLines(truncatedTitle, 16, 2).map(escapeXml);
  const safeCategory = escapeXml(truncatedCategory);
  const safeFullTitle = escapeXml(title);
  const displayColor = color || CATEGORY_COLORS[category] || '#549ee8';

  // SVG matching DefaultThumb.tsx (y="610" for bottom text)
  const svg = `<svg
    viewBox="0 0 1200 750"
    role="img"
    aria-label="${safeFullTitle}"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="${displayColor}" stopOpacity="0.95" />
        <stop offset="100%" stopColor="${displayColor}" stopOpacity="0.65" />
      </linearGradient>
      <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.10" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.10" />
      </linearGradient>
    </defs>

    <rect width="1200" height="750" fill="url(#bg)" />
    <rect x="-150" y="0" width="450" height="750" fill="url(#shine)" transform="skewX(-12)" opacity="0.6" />

    <circle cx="1020" cy="140" r="220" fill="#ffffff" opacity="0.10" />
    <circle cx="1045" cy="160" r="150" fill="#ffffff" opacity="0.07" />

    <text
      x="72"
      y="150"
      fill="#ffffff"
      opacity="0.95"
      fontSize="44"
      fontWeight="700"
      fontFamily="'Noto Sans HK','PingFang HK','Microsoft JhengHei',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    >
      ${safeCategory || 'dse.best'}
    </text>

    <text
      x="72"
      y="250"
      fill="#ffffff"
      opacity="0.96"
      fontSize="64"
      fontWeight="800"
      letterSpacing="-0.5"
      fontFamily="'Noto Sans HK','PingFang HK','Microsoft JhengHei',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    >
      ${titleLines.map((line, i) => `<tspan x="72" dy="${i === 0 ? 0 : 76}">${line}</tspan>`).join('')}
    </text>

    <text
      x="72"
      y="610"
      fill="#ffffff"
      opacity="1"
      fontSize="45"
      fontWeight="500"
      fontFamily="'Noto Sans HK','PingFang HK','Microsoft JhengHei',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    >
      dse.best/blog
    </text>
  </svg>`;

  return svg;
}

// ── Main Generator ────────────────────────────────────────────────────────
async function generateOGImages() {
  console.log('🖼️  Generating OG images...\n');

  try {
    // Ensure output directory
    await fs.ensureDir(PUBLIC_OG_DIR);

    // Load blog index
    const blogIndex = await fs.readJSON(BLOG_INDEX);
    const posts = Array.isArray(blogIndex) ? blogIndex : Object.values(blogIndex);

    // Load cache
    let cache = {};
    if (await fs.pathExists(CACHE_FILE)) {
      cache = await fs.readJSON(CACHE_FILE);
    }

    let generated = 0;
    let skipped = 0;
    let errors = 0;
    const errorLog = [];

    // Process each post
    for (const post of posts) {
      const slug = post.slug || post.id;
      const outputPath = path.join(PUBLIC_OG_DIR, `${slug}.png`);
      const postHash = JSON.stringify([post.title, post.category, post.categoryColor]).split('').reduce((a, b) => a + b.charCodeAt(0), 0);

      // Check if already generated and cache matches
      if (cache[slug] === postHash && await fs.pathExists(outputPath)) {
        skipped++;
        continue;
      }

      try {
        // Generate SVG
        const svg = generateSVG(post.title, post.category, post.categoryColor);

        // Convert SVG to PNG using sharp
        const pngBuffer = await sharp(Buffer.from(svg))
          .png({ quality: 90, progressive: true })
          .toBuffer();

        // Write PNG
        await fs.writeFile(outputPath, pngBuffer);

        // Update cache
        cache[slug] = postHash;

        generated++;
        process.stdout.write(`\r✓ Generated ${generated + skipped}/${posts.length}`);
      } catch (err) {
        errors++;
        const errorEntry = {
          slug: post.slug,
          title: post.title,
          category: post.category,
          message: err.message,
          stack: err.stack,
        };
        errorLog.push(errorEntry);
        console.error(`\n✗ Error for "${post.slug}": ${err.message}`);
      }
    }

    // Save cache
    await fs.writeJSON(CACHE_FILE, cache, { spaces: 2 });

    // Save error log if there are errors
    if (errorLog.length > 0) {
      await fs.writeJSON(ERROR_LOG, errorLog, { spaces: 2 });
    }

    console.log(`\n\n✅ OG Image Generation Complete:`);
    console.log(`   Generated: ${generated} new images`);
    console.log(`   Cached:    ${skipped} existing images`);
    console.log(`   Errors:    ${errors} failed`);
    console.log(`   Total:     ${posts.length} posts\n`);

    if (errors > 0) process.exit(1);
  } catch (err) {
    console.error('❌ Fatal error:', err);
    process.exit(1);
  }
}

// Only run on Cloudflare Pages (production)
// CF_PAGES is automatically set by Cloudflare Pages deployment
// On local dev, set CF_PAGES=true to force generation
if (!process.env.CF_PAGES && process.env.NODE_ENV !== 'production') {
  console.log('⏭️  Skipping OG image generation (local dev mode)\n');
  console.log('To generate OG images locally, run: CF_PAGES=true npm run og:generate\n');
  process.exit(0);
}

generateOGImages();
