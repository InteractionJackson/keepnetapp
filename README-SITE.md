# Keepnet Marketing Website

> The friendly UK match fishing app that helps anglers log their matches, track weights, and record which baits and methods worked best.

## 🎯 Overview

This is the marketing website for Keepnet, built with:
- **Bootstrap 5.3** for layout and components
- **Vite** for fast development and building
- **Raycast-inspired design** with dark theme, high contrast, and modern styling
- **Custom design tokens** for consistent branding

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:5173`

## 📁 Project Structure

```
keepnetapp/
├── index.html                 # Main HTML file
├── assets/
│   ├── css/
│   │   ├── tokens.css         # Design tokens (colors, typography, spacing)
│   │   ├── bootstrap-overrides.css  # Bootstrap customizations
│   │   └── theme.css          # Custom Raycast-inspired styles
│   ├── js/
│   │   └── main.js            # Main JavaScript (form handling, navigation)
│   └── images/
│       ├── mockups/           # App mockup images
│       └── screenshots/       # App screenshot images
├── data/
│   └── design-tokens.json     # Source design tokens
├── vite.config.js             # Vite configuration
└── package.json
```

## 🎨 Design System

### Design Tokens

All design tokens are defined in:
1. `data/design-tokens.json` - Source of truth (edit this with brand values)
2. `assets/css/tokens.css` - CSS custom properties (auto-generated or manual sync)

### Color Palette

- **Primary**: Brand primary color
- **Accent**: CTA and interactive elements
- **Backgrounds**: Multiple shades for depth
- **Text**: High contrast for readability

### Typography

- System font stack for performance
- Responsive font sizes
- Multiple font weights for hierarchy

## 📝 Content Sections

1. **Hero** - Main value proposition with CTA
2. **Problem/Solution** - Empathy hook
3. **Features** - 4 key features with icons
4. **How It Works** - 4-step process
5. **Screenshots** - App interface preview
6. **Beta Signup** - Form with validation
7. **Pricing** - Beta and future pricing info
8. **FAQ** - Common questions accordion
9. **Final CTA** - Last conversion opportunity
10. **Footer** - Links and legal info

## 🔧 Customization

### Adding Design Tokens

1. Update `data/design-tokens.json` with your brand colors and styles
2. Update `assets/css/tokens.css` to match the JSON structure
3. All components will automatically use the new tokens

### Adding Screenshots

1. Place images in `assets/images/screenshots/`
2. Update the screenshot section in `index.html`
3. Recommended: Use device frame mockups for polish

### Form Integration

To connect the beta signup form to a backend:

1. Sign up for [Formspree](https://formspree.io) (recommended for GitHub Pages)
2. Create a new form and get your endpoint
3. Update `assets/js/main.js`:

```javascript
const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';
const response = await fetch(formspreeEndpoint, {
  method: 'POST',
  body: formData,
  headers: {
    'Accept': 'application/json'
  }
});
```

## 🚢 Deployment

### GitHub Pages

This project is configured for GitHub Pages deployment:

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Build marketing site"
   git push origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings > Pages
   - Source: Deploy from a branch
   - Branch: `main` → `/dist` folder
   - Click Save

4. **Custom Domain (optional):**
   - Add a `CNAME` file to the `dist` folder with your domain
   - Update DNS settings with GitHub Pages IP addresses
   - Enable "Enforce HTTPS" in GitHub Pages settings

### Alternative: Manual Deployment

The `dist` folder after building contains all static files ready for any host:
- Netlify: Drag & drop the `dist` folder
- Vercel: Import the GitHub repository
- AWS S3: Upload `dist` contents to S3 bucket

## 📱 Responsive Breakpoints

- **Mobile**: < 576px
- **Tablet**: ≥ 768px
- **Desktop**: ≥ 992px
- **Large Desktop**: ≥ 1200px

All components are tested and optimized for these breakpoints.

## ✅ Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- iOS Safari (latest)
- Chrome Android (latest)

## 🔐 SEO & Meta Tags

The site includes:
- Semantic HTML5 structure
- Open Graph tags for social sharing
- Twitter Card meta tags
- Descriptive meta descriptions
- Proper heading hierarchy

Update meta tags in `index.html` before deployment.

## 📊 Analytics

To add analytics:

1. **Google Analytics:**
   Add tracking code to `<head>` in `index.html`

2. **Plausible (privacy-friendly):**
   ```html
   <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
   ```

## 🐛 Troubleshooting

### Images not loading
- Check file paths are relative to project root
- Ensure images are in `assets/images/` directory
- Verify Vite base path in `vite.config.js`

### Form not submitting
- Check browser console for errors
- Verify Formspree endpoint is correct
- Ensure CORS is enabled (not an issue with Formspree)

### Styles not applying
- Check CSS load order in `index.html`
- Clear browser cache
- Verify CSS file paths

## 📄 License

See LICENSE file for details.

## 🤝 Support

For questions or issues:
- Email: support@keepnetapp.com
- Create an issue in this repository

---

Built with ❤️ for UK match anglers

