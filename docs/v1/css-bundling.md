# CSS Bundling and Minification

This document explains how the CSS bundling and minification process works in the DSEBest project.

## Overview

The project uses a custom Node.js script to combine multiple CSS files into a single minified file (`combined.min.css`). This approach reduces HTTP requests and improves page load performance.

## How It Works

1. The script (`scripts/combine-css.js`) reads multiple CSS files in a specific order
2. It concatenates them into a single file
3. It uses the `clean-css` library to minify the combined CSS
4. The minified output is written to `public/assets/css/combined.min.css`

## Files Included in the Bundle

The following CSS files are included in the bundle (in order):

- **Main Styles**:
  - `public/sass/main.css` - Core styles
  - `public/sass/responsive.css` - Responsive design styles

- **Theme Styles**:
  - `public/sass/blue-theme.css` - Blue theme
  - `public/sass/dark-theme.css` - Dark theme
  - `public/sass/semi-dark.css` - Semi-dark theme
  - `public/sass/bordered-theme.css` - Bordered theme

- **Additional Styles**:
  - `public/assets/css/bootstrap-extended.css` - Bootstrap extensions
  - `public/assets/css/extra-icons.css` - Icon styles (needed for BoxIcons)

**Note**: The following CSS files are not included separately as their styles are already integrated into `main.css`:
  - `public/assets/css/pace.min.css` - Pace loader styles
  - `public/assets/css/countdown.css` - Countdown styles

## Usage

### Building the CSS Bundle

To build the CSS bundle, run:

```bash
npm run css:build
```

This will combine and minify all CSS files and output to `public/assets/css/combined.min.css`.

### Testing the CSS Bundle

To verify that the CSS bundle contains content from all source files:

```bash
npm run css:test
```

This will check if the bundle includes content from each source file and report any issues.

### Including CSS Build in the Main Build Process

The CSS bundling is automatically included in the full build process:

```bash
npm run build:full
```

This will run the blog data generation, CSS bundling, and Next.js build in sequence.

## Minification Options

The CSS minification uses the following options:

- **Level 1**: Basic optimizations (selectors and rules)
- **Level 2**: Advanced optimizations (restructuring rules)
- **Compatibility**: IE compatibility mode
- **Format**: Keep breaks for better readability in minified output

## Customization

To modify which files are included in the bundle or change the minification options, edit the `config` object in `scripts/combine-css.js`.

## Troubleshooting

If you encounter issues with the CSS bundle:

1. Check that all source files exist
2. Run the test script to verify file inclusion
3. Check the console output for errors or warnings
4. Ensure the `clean-css` dependency is installed 