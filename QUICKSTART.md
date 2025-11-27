# Quick Start Guide

Get the Keepnet marketing website running in 5 minutes.

## 1. Install Dependencies

```bash
npm install
```

## 2. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see the site.

## 3. Customize Your Content

### Update Design Tokens (Optional)
Edit `data/design-tokens.json` with your brand colors, then sync to `assets/css/tokens.css`

### Add Your Logo
Replace logo text in `index.html` (line 34):
```html
<a class="navbar-brand" href="#home">
  <img src="/assets/images/logo.svg" alt="Keepnet" height="32">
</a>
```

### Add Screenshots
1. Place images in `assets/images/screenshots/`
2. Update screenshot section in `index.html` (around line 204)

### Connect Form to Backend
1. Sign up at [Formspree.io](https://formspree.io)
2. Get your form endpoint
3. Update `assets/js/main.js` (line 38):
```javascript
const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';
```

## 4. Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## 5. Deploy to GitHub Pages

### Option A: Automatic (Recommended)
1. Push to GitHub
2. Enable GitHub Actions in repo settings → Pages
3. Site auto-deploys on every push!

### Option B: Manual
```bash
npm run build
npx gh-pages -d dist
```

## Need Help?

- See [README-SITE.md](README-SITE.md) for full documentation
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment details
- See [TESTING.md](TESTING.md) for testing checklist

---

🎣 Happy fishing!

