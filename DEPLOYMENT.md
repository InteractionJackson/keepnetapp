# Deployment Guide for Keepnet Marketing Website

This guide covers deploying the Keepnet marketing website to GitHub Pages.

## Prerequisites

- Git repository initialized and pushed to GitHub
- Node.js and npm installed locally
- GitHub account with repository access

## GitHub Pages Deployment

### Method 1: Automatic Deployment with GitHub Actions (Recommended)

This project includes a GitHub Actions workflow that automatically builds and deploys on every push to `main`.

#### Setup Steps:

1. **Enable GitHub Pages in Repository Settings:**
   ```
   Repository → Settings → Pages
   Source: GitHub Actions
   ```

2. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit: Keepnet marketing site"
   git push origin main
   ```

3. **The workflow will automatically:**
   - Install dependencies
   - Build the site with Vite
   - Deploy to GitHub Pages

4. **Access your site:**
   - URL: `https://YOUR_USERNAME.github.io/keepnetapp/`
   - Check Actions tab to monitor deployment progress

#### Troubleshooting GitHub Actions:

If deployment fails:
- Check the Actions tab for error logs
- Ensure `vite.config.js` base path matches your repository name
- Verify Node.js version compatibility (using v20 in workflow)

---

### Method 2: Manual Deployment to GitHub Pages

If you prefer manual control:

1. **Build the site locally:**
   ```bash
   npm install
   npm run build
   ```

2. **The `dist` folder contains your built site**

3. **Deploy to `gh-pages` branch:**
   ```bash
   # Install gh-pages package
   npm install --save-dev gh-pages
   
   # Add deploy script to package.json
   # "deploy": "gh-pages -d dist"
   
   # Deploy
   npm run deploy
   ```

4. **Configure GitHub Pages:**
   ```
   Repository → Settings → Pages
   Source: Deploy from a branch
   Branch: gh-pages / (root)
   Save
   ```

5. **Access your site:**
   - URL: `https://YOUR_USERNAME.github.io/keepnetapp/`

---

## Custom Domain Setup

### Steps to use a custom domain (e.g., keepnetapp.com):

1. **Update CNAME file:**
   - Edit `public/CNAME`
   - Add your domain: `keepnetapp.com` (one line, no protocol)

2. **Configure DNS with your domain provider:**
   
   **For Apex Domain (keepnetapp.com):**
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   
   Type: A
   Name: @
   Value: 185.199.109.153
   
   Type: A
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   ```
   
   **For Subdomain (www.keepnetapp.com):**
   ```
   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   ```

3. **Enable Custom Domain in GitHub:**
   ```
   Repository → Settings → Pages
   Custom domain: keepnetapp.com
   Enforce HTTPS: ✓ (wait for SSL to provision)
   ```

4. **Wait for DNS propagation:**
   - Can take 24-48 hours
   - Check status: `dig keepnetapp.com`

5. **Rebuild and deploy:**
   ```bash
   npm run build
   git push origin main
   ```

---

## Pre-Deployment Checklist

Before deploying to production:

### Content Updates:
- [ ] Replace placeholder images with actual screenshots
- [ ] Update contact email addresses (currently using examples)
- [ ] Provide actual design tokens in `data/design-tokens.json`
- [ ] Update social media links in footer
- [ ] Add actual logo to navigation

### Configuration:
- [ ] Update `vite.config.js` base path if needed
- [ ] Set up Formspree or form backend
- [ ] Add analytics tracking code (Google Analytics, Plausible, etc.)
- [ ] Create and add favicon files
- [ ] Update Open Graph image (`/assets/images/og-image.jpg`)

### SEO:
- [ ] Verify meta descriptions are accurate
- [ ] Update Twitter/OG meta tags with production URLs
- [ ] Create and submit sitemap.xml
- [ ] Add robots.txt if needed
- [ ] Test with Google Search Console

### Legal:
- [ ] Add Privacy Policy page
- [ ] Add Terms of Service page
- [ ] Ensure GDPR compliance for beta form

### Testing:
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Test on desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify all anchor links work
- [ ] Test form submission
- [ ] Check responsive layouts at all breakpoints
- [ ] Run Lighthouse audit (aim for 90+ scores)

---

## Environment Variables (Future)

If you need environment-specific configuration:

1. **Create `.env` file (local only):**
   ```
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_ID
   VITE_GA_TRACKING_ID=G-XXXXXXXXXX
   ```

2. **Add to `.gitignore`:**
   ```
   .env
   .env.local
   ```

3. **Use in code:**
   ```javascript
   const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
   ```

4. **Set in GitHub Actions:**
   ```yaml
   env:
     VITE_FORMSPREE_ENDPOINT: ${{ secrets.FORMSPREE_ENDPOINT }}
   ```

---

## Performance Optimization

Already implemented:
- ✅ Minified CSS and JS
- ✅ Modern CSS with custom properties
- ✅ Minimal JavaScript
- ✅ Bootstrap loaded from CDN (cached)
- ✅ System fonts (no web font requests)

Additional optimizations:
- Add lazy loading to images: `loading="lazy"`
- Convert images to WebP format
- Add `<link rel="preconnect">` for external resources
- Enable Brotli compression (automatic with GitHub Pages)

---

## Monitoring & Analytics

### Recommended Tools:

1. **Uptime Monitoring:**
   - [UptimeRobot](https://uptimerobot.com/) - Free tier available
   - [Pingdom](https://www.pingdom.com/)

2. **Analytics:**
   - [Plausible](https://plausible.io/) - Privacy-friendly
   - [Fathom](https://usefathom.com/) - Simple analytics
   - [Google Analytics](https://analytics.google.com/) - Full-featured

3. **Error Tracking:**
   - [Sentry](https://sentry.io/) - JavaScript error tracking

---

## Rollback Procedure

If you need to rollback a deployment:

### GitHub Actions Method:
1. Go to Actions tab
2. Find the last successful deployment
3. Click "Re-run jobs"

### Manual Method:
```bash
# Checkout previous commit
git log --oneline
git checkout <previous-commit-hash>

# Build and deploy
npm run build
git push origin main --force
```

---

## Support & Troubleshooting

### Common Issues:

**404 on assets:**
- Check `vite.config.js` base path
- Ensure paths in HTML are relative or absolute from base

**Styles not loading:**
- Verify CSS files are in `dist/assets/` after build
- Check browser console for 404 errors
- Clear CDN/browser cache

**Form not working:**
- Verify Formspree endpoint is set
- Check CORS settings
- Look for JavaScript errors in console

**Slow initial load:**
- Optimize images (compress, use WebP)
- Consider lazy loading
- Check Lighthouse performance score

---

## Next Steps After Deployment

1. Submit to search engines:
   - [Google Search Console](https://search.google.com/search-console)
   - [Bing Webmaster Tools](https://www.bing.com/webmasters)

2. Set up monitoring:
   - Uptime checks
   - Analytics tracking
   - Error monitoring

3. Promote the site:
   - Share on social media
   - UK fishing forums and communities
   - Email to existing contacts

4. Iterate based on data:
   - Monitor form submissions
   - Track most visited pages
   - A/B test CTA copy if needed

---

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)

---

Built with ❤️ for Keepnet

