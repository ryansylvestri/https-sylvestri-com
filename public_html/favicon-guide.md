# Favicon Setup Guide

## Creating a Favicon for sylvestri.com

A favicon is the small icon that appears in browser tabs and bookmarks. Here's how to add one to your website:

## Option 1: Use Your Initials (Recommended)

1. Go to https://favicon.io/favicon-generator/
2. Enter "RS" (your initials)
3. Choose colors:
   - Text Color: #0054A4 (RE/MAX Blue)
   - Background: #FFFFFF (White)
   - Font: Montserrat or similar bold font
4. Download the favicon package
5. Upload these files to your website root:
   - favicon.ico
   - apple-touch-icon.png
   - favicon-32x32.png
   - favicon-16x16.png

## Option 2: Use RE/MAX Logo

Since you have the RE/MAX logo square image, you can convert it:
1. Go to https://favicon.io/favicon-converter/
2. Upload the RE/MAX square logo
3. Download the generated files
4. Upload to your website root

## Option 3: Create Custom Icon

Use a design tool like:
- Canva (https://www.canva.com)
- Figma (https://www.figma.com)
- Adobe Express (https://express.adobe.com)

Design specifications:
- Size: 512x512px (will be auto-resized)
- Format: PNG or ICO
- Keep it simple and recognizable at small sizes

## Add to Your Website

Add these lines in the <head> section of index.html:

```html
<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
```

## Testing

After uploading:
1. Clear your browser cache
2. Visit sylvestri.com
3. Check that the icon appears in the browser tab
4. Bookmark the site and verify the icon appears

## Recommended Design

For a real estate professional, consider:
- Your initials "RS" in bold
- A simple house icon
- RE/MAX balloon icon
- Combination of initials with small house silhouette

Keep it simple - favicons are tiny!