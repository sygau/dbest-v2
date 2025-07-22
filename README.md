---
name: HTML Starter
slug: html-starter-with-analytics
description: HTML5 template with analytics and advanced routing configuration.
deployUrl: https://vercel.com/new/clone?repository-url=https://github.com/vercel/examples/tree/main/solutions/html&project-name=html
relatedTemplates:
  - nextjs-boilerplate
---

# HTML Starter

This is a starter HTML5 templates which is configured with Vercel Analytics (through a `script` tag), advanced routing with [Vercel Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware), as well as some basic styles

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/examples/tree/main/solutions/html&project-name=html)

## Shortcode Guide

You can add beautiful, flexible buttons to your blog posts or pages using the following shortcodes in your Contentful content.

### Button Shortcode Format

```
[button;TYPE;STYLE;LABEL;URL]
```

- `TYPE`: The button style. Supported values:
  - `gradient` (e.g. Gradient Primary)
  - `color` (e.g. Color Primary)
  - `raised` (e.g. Raised Primary)
  - `outline` (e.g. Outline Primary)
  - `inverse` (e.g. Inverse Primary)
  - `icon+ICONNAME` (for icon buttons, see below)
- `STYLE`: The color style. Supported values:
  - `primary`, `danger`, `success`, `info`, `warning`, `voilet`, `royal`, `branding`, `deep-blue`, `dark`, `secondary`, `light`
- `LABEL`: The text to display on the button
- `URL`: The link for the button

### Examples

#### Gradient Buttons
```
[button;gradient;primary;Gradient Primary;https://example.com]
[button;gradient;danger;Gradient Danger;https://example.com]
```

#### Color Buttons
```
[button;color;primary;Color Primary;https://example.com]
[button;color;danger;Color Danger;https://example.com]
```

#### Raised Buttons
```
[button;raised;success;Raised Success;https://example.com]
```

#### Outline Buttons
```
[button;outline;info;Outline Info;https://example.com]
```

#### Inverse Buttons
```
[button;inverse;warning;Inverse Warning;https://example.com]
```

#### Icon Buttons
```
[button;icon+search;primary;Search;https://example.com]
[button;icon+home;danger;Home;https://example.com]
[button;icon+account_circle;success;Profile;https://example.com]
```
- The value after `icon+` is the Material Icons name (see https://fonts.google.com/icons for options).
- Icon buttons will have the icon before the label, with proper alignment and spacing.

### Notes
- All buttons are responsive and use your template's styles.
- You can use these shortcodes anywhere in your Contentful content.
- For best results, place multiple buttons on the same line (separated by spaces) to avoid unwanted block-level wrapping.
- If you use an unsupported type or style, the button will default to `gradient` and `primary`.

---
