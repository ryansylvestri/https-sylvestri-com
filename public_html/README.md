# Ryan Sylvestri Real Estate Website

## Website Setup Instructions for Hostinger

This comprehensive website package is ready to be uploaded to your Hostinger account for sylvestri.com.

## 📁 Files Included

### Core Files
- `index.html` - Main website file with all content and structure
- `styles.css` - Complete styling and responsive design
- `script.js` - JavaScript functionality and interactions
- `resources/` - Folder containing buyer's and seller's guides (PDFs)

## 🚀 Quick Setup Guide

### Step 1: Access Hostinger File Manager
1. Log into your Hostinger account
2. Go to **Websites** → Select your domain (sylvestri.com)
3. Click on **File Manager**

### Step 2: Upload Files
1. Navigate to the `public_html` folder
2. Delete any default files (like index.html) if present
3. Upload all files from this package:
   - `index.html`
   - `styles.css`
   - `script.js`
   - Create a folder called `resources`
   - Upload both PDF files into the `resources` folder

### Step 3: Verify Setup
1. Visit sylvestri.com to see your new website
2. Test all navigation links
3. Check that forms are working
4. Verify PDFs download correctly

## 🎨 Customization Options

### Update Contact Form
The contact form currently uses a simulated submission. To make it fully functional:

1. **Option A: Use Formspree (Recommended)**
   - Sign up at https://formspree.io
   - Create a new form
   - Replace the form action in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR-FORM-ID" method="POST">
   ```

2. **Option B: Use EmailJS**
   - Sign up at https://www.emailjs.com
   - Follow their integration guide
   - Update the form submission code in `script.js`

### Update Social Media Links
Find and replace the placeholder social media links in `index.html`:
```html
<a href="#" aria-label="Facebook">
```
Replace `#` with your actual social media URLs.

### Add Google Analytics
To track website visitors, add your Google Analytics code before the closing `</head>` tag in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

## 🔧 Technical Details

### Technologies Used
- HTML5 semantic markup
- CSS3 with custom properties (variables)
- Vanilla JavaScript (no dependencies)
- Font Awesome for icons
- Google Fonts (Open Sans & Montserrat)

### Browser Compatibility
- Chrome (90+)
- Firefox (88+)
- Safari (14+)
- Edge (90+)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Features
- Optimized images with lazy loading
- Minified CSS and JavaScript ready
- Responsive design for all devices
- SEO-optimized meta tags

## 📱 Mobile Responsiveness

The website is fully responsive with breakpoints at:
- Desktop: 1024px+
- Tablet: 768px - 1024px
- Mobile: Up to 768px

## 🎯 SEO Optimization

The website includes:
- Meta description and keywords
- Semantic HTML structure
- Schema.org markup ready
- Optimized headings hierarchy
- Alt tags for images

## 🆘 Troubleshooting

### Images Not Loading
- Ensure all image URLs from ImageKit are accessible
- Check that image paths are correct
- Verify internet connection for external resources

### PDFs Not Downloading
- Check that files are in the `resources` folder
- Verify file permissions in Hostinger (should be 644)

### Forms Not Working
- Implement a form service (Formspree or EmailJS)
- Check JavaScript console for errors

## 📧 Contact Form Setup with Formspree

1. Go to https://formspree.io
2. Sign up for a free account
3. Create a new form
4. Copy your form endpoint
5. In `index.html`, find the contact form and update:
   ```html
   <form class="contact-form" id="contact-form" action="https://formspree.io/f/YOUR-FORM-ID" method="POST">
   ```
6. Remove the JavaScript form handling in `script.js` (optional)

## 🔄 Future Updates

Consider adding:
- Property listings integration
- Blog section
- Virtual tour capabilities
- Mortgage calculator
- Client portal
- Newsletter signup
- Property search functionality

## 📞 Support

For website updates or modifications, you can:
1. Edit files directly in Hostinger File Manager
2. Download files, edit locally, and re-upload
3. Use Hostinger's website builder tools

## 🎯 Brand Colors Reference

- Primary Blue: #0054A4
- Primary Red: #ED1C24
- Neutral Grey: #6B7280
- White: #FFFFFF

## 📝 Content Management Tips

### Updating Testimonials
Find the testimonials section in `index.html` and update the content within the testimonial cards.

### Adding New Communities
Add new community tags in the communities section by copying the existing structure.

### Updating Stats
Update the numbers in the stats section by changing the `data-target` attributes.

## ⚡ Performance Tips

1. **Optimize Images**: Use ImageKit's transformation features to serve optimized images
2. **Enable Caching**: Configure Hostinger's caching settings
3. **Use CDN**: Enable Hostinger's CDN for faster global delivery
4. **Compress Files**: Enable GZIP compression in Hostinger

## 🔒 Security Recommendations

1. Keep Hostinger account secure with 2FA
2. Regular backups (Hostinger provides automatic backups)
3. SSL certificate (should be auto-enabled for HTTPS)
4. Keep form submissions secure with proper validation

---

## Launch Checklist

- [ ] Upload all files to Hostinger
- [ ] Test website on multiple devices
- [ ] Configure contact form
- [ ] Update social media links
- [ ] Add Google Analytics
- [ ] Test PDF downloads
- [ ] Verify SSL certificate is active
- [ ] Submit sitemap to Google Search Console
- [ ] Test page load speed
- [ ] Check all links work correctly

---

**Website created for Ryan Sylvestri - RE/MAX Town & Country**
Your Local Expert, Backed by Global Reach