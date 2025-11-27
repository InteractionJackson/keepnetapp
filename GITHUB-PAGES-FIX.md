# GitHub Pages Deployment Fix Guide

## Issue
GitHub Pages deployment failing for the Keepnet marketing website.

## ✅ Step-by-Step Fix

### Step 1: Enable GitHub Pages with GitHub Actions

1. Go to your repository on GitHub:
   ```
   https://github.com/InteractionJackson/keepnetapp
   ```

2. Click **Settings** (top menu)

3. In the left sidebar, click **Pages**

4. Under "Build and deployment":
   - **Source:** Select **"GitHub Actions"** (NOT "Deploy from a branch")
   - This is crucial! The default "Deploy from a branch" won't work with our setup

5. Click **Save** if prompted

### Step 2: Commit and Push All Files

Make sure all your files are committed and pushed:

```bash
git add .
git commit -m "Add Keepnet design system and GitHub Pages deployment"
git push origin main
```

### Step 3: Check Workflow Permissions

1. In your repository, go to **Settings** → **Actions** → **General**

2. Scroll down to **Workflow permissions**

3. Select:
   - ✅ **"Read and write permissions"**
   - ✅ Check **"Allow GitHub Actions to create and approve pull requests"**

4. Click **Save**

### Step 4: Manually Trigger Deployment (Optional)

If it doesn't deploy automatically:

1. Go to **Actions** tab in your repository
2. Click on "Deploy to GitHub Pages" workflow (left sidebar)
3. Click **"Run workflow"** button (right side)
4. Select branch: **main**
5. Click **"Run workflow"**

### Step 5: Monitor Deployment

1. Go to **Actions** tab
2. Click on the running workflow
3. Watch the build and deploy steps
4. If any step fails, click on it to see detailed error logs

---

## 🔍 Common Issues & Fixes

### Issue: "npm ci" fails in Actions

**Error:** `npm error code ENOLOCK`

**Fix:** Make sure `package-lock.json` is committed:
```bash
git add package-lock.json
git commit -m "Add package-lock.json"
git push origin main
```

### Issue: 404 after deployment

**Problem:** Your site deploys but shows 404

**Fix 1:** Verify the base path in `vite.config.js` matches your repo name:
```javascript
base: '/keepnetapp/',  // Must match your repo name
```

**Fix 2:** Check if `.nojekyll` file exists in `public/` folder (it does!)

### Issue: CSS/JS not loading

**Problem:** Site loads but styles don't apply

**Fix:** Your base path in `vite.config.js` should be:
```javascript
base: '/keepnetapp/',  // Current setting ✅
```

### Issue: Permissions error

**Error:** `Error: Resource not accessible by integration`

**Fix:** 
1. Go to Settings → Actions → General
2. Set Workflow permissions to "Read and write permissions"
3. Re-run the workflow

---

## 📋 Pre-Flight Checklist

Before pushing, verify:

- [x] `package-lock.json` exists in root
- [x] `.github/workflows/deploy.yml` exists
- [x] `public/.nojekyll` file exists
- [x] `vite.config.js` has correct base path: `/keepnetapp/`
- [ ] All files are committed: `git status` shows clean
- [ ] GitHub Pages source is set to "GitHub Actions"
- [ ] Workflow permissions set to "Read and write"

---

## 🌐 Your Site URLs

After successful deployment:

**Primary URL:**
```
https://interactionjackson.github.io/keepnetapp/
```

**Local Dev:**
```
http://localhost:5173/keepnetapp/
```

---

## 🐛 Debugging Failed Deployments

### View Detailed Logs:

1. Go to **Actions** tab
2. Click on the failed workflow run
3. Click on "build" or "deploy" job
4. Expand each step to see logs
5. Look for red error messages

### Common Error Messages:

**"Error: No artifact named 'github-pages' was found"**
- The build step failed. Check the "Build" step logs.

**"npm error code ELIFECYCLE"**
- Build command failed. Usually a code error. Check build logs.

**"fatal: not a git repository"**
- Checkout step issue. Re-run workflow.

---

## 🔧 Manual Deployment (Alternative)

If GitHub Actions keeps failing, you can deploy manually:

### Option 1: Use gh-pages branch

```bash
# Build locally
npm run build

# Install gh-pages package
npm install --save-dev gh-pages

# Add deploy script to package.json:
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

Then in GitHub Settings → Pages:
- Source: "Deploy from a branch"
- Branch: "gh-pages" / (root)

### Option 2: Build and commit dist folder

```bash
# Remove dist from .gitignore temporarily
npm run build
git add dist -f
git commit -m "Add build"
git push

# In GitHub Settings → Pages:
# Source: "Deploy from a branch"
# Branch: "main" / "/dist"
```

---

## ✅ Success Indicators

You'll know it worked when:

1. ✅ Actions tab shows green checkmark
2. ✅ In Actions, you see "Deploy to GitHub Pages" completed
3. ✅ GitHub Pages settings shows:
   - "Your site is live at https://interactionjackson.github.io/keepnetapp/"
4. ✅ Visiting the URL shows your neon green Keepnet site!

---

## 📞 Still Having Issues?

If you're still stuck after trying these steps:

1. **Share the error message:**
   - Go to Actions → Failed workflow → Click on the step that failed
   - Copy the error message

2. **Check your current status:**
   ```bash
   git status
   git log --oneline -5
   ```

3. **Verify your files:**
   ```bash
   cat vite.config.js
   cat .github/workflows/deploy.yml
   ```

---

## 🎉 Next Steps After Deployment

Once deployed successfully:

1. **Test the live site** at your GitHub Pages URL
2. **Update any links** in your README to point to the live site
3. **Set up a custom domain** (optional) - see DEPLOYMENT.md
4. **Monitor** with GitHub's built-in insights

---

Good luck! Your neon green Keepnet site is ready to go live! 🚀

