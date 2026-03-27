# Sitemap Generation Script Documentation

## Overview

The sitemap generation script (`scripts/generate-sitemap.js`) automatically creates and maintains a comprehensive XML sitemap for the DSE Best website. It intelligently handles lastmod dates, preserves existing URLs, and supports force-updating specific pages.

## Quick Start

### Basic Usage

```bash
npm run sitemap
```

This generates a complete sitemap with all existing pages and year-specific pages for all subjects.

### Force Update Specific Pages

```bash
npm run sitemap -- --force-update=about,contact
```

This updates the lastmod date for the specified pages to today's date while preserving all other pages.

## Command Line Options

### `--force-update`

Forces specific URLs to use today's date as their lastmod, regardless of their current lastmod value.

**Syntax:**
```bash
npm run sitemap -- --force-update=page1,page2,page3
```

**Examples:**
```bash
# Update single page
npm run sitemap -- --force-update=about

# Update multiple pages
npm run sitemap -- --force-update=about,contact,disclaimer

# Update subject pages
npm run sitemap -- --force-update=math,english,physics

# Update year-specific pages
npm run sitemap -- --force-update=math/2023,english/2022
```

## Sitemap Structure

The generated sitemap follows a hierarchical structure with clear comments:

### 1. Main Domain (Priority: 1.0)
- **URL:** `https://dse.best/`
- **Change Frequency:** daily
- **Priority:** 1.0

### 2. Core DSE Subject Pages (Priority: 0.9)
- **Subjects:** Math, English, Chinese
- **Change Frequency:** weekly
- **Priority:** 0.9

### 3. Other DSE Subject Pages (Priority: 0.8)
- **Subjects:** Physics, Biology, Chemistry, BAFS, Chinese History, Economics, History, Geography, M1, M2, ICT
- **Change Frequency:** weekly
- **Priority:** 0.8

### 4. Information Pages (Priority: 0.3-0.8)
- **Pages:** About, Contact, Disclaimer, Privacy Policy, Countdown
- **Change Frequency:** varies (monthly to daily)
- **Priority:** 0.3-0.8

### 5. Blog Index (Priority: 0.8)
- **URL:** `https://dse.best/blog`
- **Change Frequency:** daily
- **Priority:** 0.8

### 6. Blog Posts (Priority: 0.6)
- **Change Frequency:** monthly
- **Priority:** 0.6

### 7. Year-Specific Pages (Priority: 0.7)
- **Format:** `https://dse.best/{subject}/{year}`
- **Change Frequency:** monthly
- **Priority:** 0.7
- **Coverage:** All 14 subjects with available years (2012-2025)

## Lastmod Date Behavior

### Automatic Behavior

1. **Existing Pages:** Preserve their original lastmod dates
2. **New Pages:** Use today's date
3. **Year Slug Pages:** Always use today's date (since they're recently created content)

### Force Update Behavior

When using `--force-update`:
- Specified pages get today's date as lastmod
- All other pages maintain their original lastmod dates
- Year slug pages continue to use today's date

## Supported URL Formats for Force Update

The script supports various URL formats for force updates:

```bash
# Full URLs
npm run sitemap -- --force-update=https://dse.best/about

# Path-based (recommended)
npm run sitemap -- --force-update=/about

# Page names
npm run sitemap -- --force-update=about

# Subject names
npm run sitemap -- --force-update=math

# Year-specific pages
npm run sitemap -- --force-update=math/2023
```

## Data Sources

### Subject Configuration Files
The script reads year availability from JSON files in `public/config/`:
- `math.json`
- `english.json`
- `physics.json`
- `biology.json`
- `chemistry.json`
- `chinese.json`
- `bafs.json`
- `chinese-history.json`
- `economics.json`
- `history.json`
- `geography.json`
- `m1.json`
- `m2.json`
- `ict.json`

### Page Existence Verification
The script verifies that year slug pages exist by checking:
- `pages/{subject}/[year].tsx` files

## Output Information

The script provides detailed console output including:

- ✅ Successfully read existing sitemap
- 📋 Found X existing URLs with lastmod dates
- 🔧 Force update mode enabled for: [pages]
- 📊 URL Analysis (total, preserved, new, force updated)
- 📅 Year slug pages always use today's date
- 🔧 Force updated X URLs to today's date

## File Locations

- **Script:** `scripts/generate-sitemap.js`
- **Output:** `public/sitemap.xml`
- **Configuration:** `public/config/*.json`
- **Page Templates:** `pages/{subject}/[year].tsx`

## Error Handling

The script handles various error scenarios:

- **Missing sitemap.xml:** Creates new sitemap from scratch
- **Invalid JSON configs:** Logs warnings and continues
- **Missing page templates:** Logs errors and skips those subjects
- **Invalid command line arguments:** Gracefully handles parsing errors

## Best Practices

### When to Use Force Update

Use force update when you've made significant changes to:
- Content updates on existing pages
- SEO improvements
- Major feature additions
- Bug fixes that affect content

### Regular Maintenance

- Run `npm run sitemap` after adding new pages
- Use force update sparingly to maintain accurate lastmod dates
- Monitor console output for any warnings or errors

### SEO Considerations

- Year slug pages always have fresh dates (good for SEO)
- Main pages preserve their original dates (maintains crawl history)
- Force update only when content actually changes

## Troubleshooting

### Common Issues

1. **Script fails to run:**
   - Ensure Node.js is installed
   - Check file permissions
   - Verify script path

2. **Missing year pages:**
   - Check if `pages/{subject}/[year].tsx` exists
   - Verify JSON config files are valid

3. **Force update not working:**
   - Check URL format (use `/about` not `about`)
   - Verify page exists in sitemap
   - Check console output for errors

### Debug Mode

For detailed debugging, you can add console.log statements to the script or check the generated sitemap.xml file directly.

## Integration with Build Process

Consider adding sitemap generation to your build process:

```json
{
  "scripts": {
    "build": "next build && npm run sitemap",
    "sitemap": "node scripts/generate-sitemap.js"
  }
}
```

This ensures the sitemap is always up-to-date after builds. 