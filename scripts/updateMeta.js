const fs = require('fs').promises;
const path = require('path');
const ini = require('ini');

// Paths
const META_INI_PATH = path.join(__dirname, 'meta.ini');
const HTML_DIR = path.join(__dirname, '../');

// Stat counter
let stats = { updated: 0, unchanged: 0 };

// Function to escape special characters for ini file
function escapeIniValue(value) {
  return value.replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

// Function to extract meta tags from HTML content
async function extractMetaFromHtml(htmlFile) {
  try {
    const htmlContent = await fs.readFile(path.join(HTML_DIR, htmlFile), 'utf8');
    const metaData = {};

    // Extract title
    const titleMatch = htmlContent.match(/<title>([\s\S]*?)<\/title>/i);
    if (titleMatch) metaData.title = escapeIniValue(titleMatch[1].trim());

    // Extract meta name tags (description, keywords, robots)
    const metaNameRegex = /<meta\s+name=["'](description|keywords|robots)["']\s+content=["'](.*?)["']\s*\/?>/gi;
    let match;
    while ((match = metaNameRegex.exec(htmlContent)) !== null) {
      metaData[match[1]] = escapeIniValue(match[2].trim());
    }

    // Extract meta property tags (og:title, og:description, og:image, og:url)
    const metaPropertyRegex = /<meta\s+property=["'](og:title|og:description|og:image|og:url)["']\s+content=["'](.*?)["']\s*\/?>/gi;
    while ((match = metaPropertyRegex.exec(htmlContent)) !== null) {
      metaData[match[1]] = escapeIniValue(match[2].trim());
    }

    return metaData;
  } catch (error) {
    console.error(`🚨 Error extracting meta from ${htmlFile}: ${error.message}`);
    return {};
  }
}

// Function to generate meta.ini from HTML files
async function generateMetaIni() {
  try {
    // Read all files in HTML directory
    const files = await fs.readdir(HTML_DIR);
    const htmlFiles = files.filter(file => file.endsWith('.html'));

    // Create meta configuration by extracting from HTML files
    const metaConfig = {};
    for (const htmlFile of htmlFiles) {
      const pageName = path.basename(htmlFile, '.html');
      const metaData = await extractMetaFromHtml(htmlFile);

      // Only add to config if at least one meta tag is found
      if (Object.keys(metaData).length > 0) {
        metaConfig[pageName] = metaData;
      } else {
        // Fallback to default values if no meta tags are found
        metaConfig[pageName] = {
          title: escapeIniValue(`${pageName.charAt(0).toUpperCase() + pageName.slice(1)} Page`),
          description: escapeIniValue(`Description for ${pageName} page`),
          keywords: escapeIniValue(`${pageName}, website, example`),
          robots: 'index,follow',
          'og:title': escapeIniValue(`${pageName.charAt(0).toUpperCase() + pageName.slice(1)} Page`),
          'og:description': escapeIniValue(`Description for ${pageName} page`),
          'og:image': escapeIniValue('https://www.example.com/default-image.png'),
          'og:url': escapeIniValue(`https://www.example.com/${pageName}`)
        };
      }
    }

    // Ensure scripts directory exists
    await fs.mkdir(path.dirname(META_INI_PATH), { recursive: true });

    // Write to meta.ini
    await fs.writeFile(META_INI_PATH, ini.stringify(metaConfig), 'utf8');
    console.log(`📄 Generated meta.ini by extracting meta tags from HTML files`);
  } catch (error) {
    console.error(`🚨 Error generating meta.ini: ${error.message}`);
  }
}

// Function to update content within existing meta tags in HTML content
async function updateHtmlMeta(htmlFile, metaData) {
  try {
    let htmlContent = await fs.readFile(path.join(HTML_DIR, htmlFile), 'utf8');
    
    // Check if <head> exists
    if (!htmlContent.includes('<head>')) {
      console.error(`🚨 No <head> tag found in ${htmlFile}`);
      return;
    }

    // Extract current meta values from HTML
    const currentMeta = await extractMetaFromHtml(htmlFile);
    let hasChanges = false;
    let updatedContent = htmlContent;

    // Update title if different
    if (metaData.title && metaData.title !== currentMeta.title) {
      if (updatedContent.match(/<title>[\s\S]*?<\/title>/i)) {
        updatedContent = updatedContent.replace(/<title>[\s\S]*?<\/title>/i, `<title>${metaData.title}</title>`);
      } else {
        updatedContent = updatedContent.replace('<head>', `<head>\n  <title>${metaData.title}</title>`);
      }
      console.log(`✅ Title changed in ${htmlFile}`);
      hasChanges = true;
    }

    // Update meta name tags (description, keywords, robots) if different
    const metaNameTags = ['description', 'keywords', 'robots'];
    for (const tag of metaNameTags) {
      if (metaData[tag] && metaData[tag] !== currentMeta[tag]) {
        const regex = new RegExp(`<meta\\s+name=["']${tag}["']\\s+content=["'][^"]*["']\\s*/?>`, 'i');
        if (updatedContent.match(regex)) {
          updatedContent = updatedContent.replace(regex, `<meta name="${tag}" content="${metaData[tag]}">`);
        } else {
          updatedContent = updatedContent.replace('<head>', `<head>\n  <meta name="${tag}" content="${metaData[tag]}">`);
        }
        console.log(`✅ ${tag.charAt(0).toUpperCase() + tag.slice(1)} changed in ${htmlFile}`);
        hasChanges = true;
      }
    }

    // Update meta property tags (og:title, og:description, og:image, og:url) if different
    const metaPropertyTags = ['og:title', 'og:description', 'og:image', 'og:url'];
    for (const tag of metaPropertyTags) {
      if (metaData[tag] && metaData[tag] !== currentMeta[tag]) {
        const regex = new RegExp(`<meta\\s+property=["']${tag.replace(':', '\\:')}["']\\s+content=["'][^"]*["']\\s*/?>`, 'i');
        if (updatedContent.match(regex)) {
          updatedContent = updatedContent.replace(regex, `<meta property="${tag}" content="${metaData[tag]}">`);
        } else {
          updatedContent = updatedContent.replace('<head>', `<head>\n  <meta property="${tag}" content="${metaData[tag]}">`);
        }
        console.log(`✅ ${tag.replace('og:', 'OG ').replace(':', ' ')} changed in ${htmlFile}`);
        hasChanges = true;
      }
    }

    // Write updated content only if changes were made
    if (hasChanges) {
      await fs.writeFile(path.join(HTML_DIR, htmlFile), updatedContent, 'utf8');
      console.log(`✅ Updated meta tags for ${htmlFile} due to changes`);
      stats.updated++;
    } else {
      console.log(`⬜ No changes needed for ${htmlFile}`);
      stats.unchanged++;
    }
  } catch (error) {
    console.error(`🚨 Error processing ${htmlFile}: ${error.message}`);
  }
}

// Main function to process meta updates
async function updateMetaTags() {
  try {
    // Reset stats
    stats = { updated: 0, unchanged: 0 };

    // Generate meta.ini if it doesn't exist
    try {
      await fs.access(META_INI_PATH);
      console.log(`ℹ️ meta.ini already exists, skipping generation`);
    } catch {
      await generateMetaIni();
    }

    // Read and parse meta.ini
    const iniContent = await fs.readFile(META_INI_PATH, 'utf8');
    const metaConfig = ini.parse(iniContent);

    // Process each page in the config
    for (const [page, metaData] of Object.entries(metaConfig)) {
      const htmlFile = page.endsWith('.html') ? page : `${page}.html`;
      
      // Validate file existence
      try {
        await fs.access(path.join(HTML_DIR, htmlFile));
        await updateHtmlMeta(htmlFile, metaData);
      } catch (error) {
        console.error(`🚨 HTML file ${htmlFile} not found`);
      }
    }

    // Print stat counter
    console.log(`\n📊 Summary:\n  ✅ Updated: ${stats.updated}\n  ⬜ Unchanged: ${stats.unchanged}`);
  } catch (error) {
    console.error(`🚨 Error processing meta updates: ${error.message}`);
  }
}

// Run the script
updateMetaTags();