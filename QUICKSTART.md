# 🚀 Quick Start: Connect to GitHub & Deploy

## Step 1: Initialize Git Repository

```bash
# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: MyKira Eco News with Hono + Cloudflare"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `mykira-eco-news`
3. Don't initialize with README (we already have one)
4. Copy the repository URL

## Step 3: Push to GitHub

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/mykira-eco-news.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 4: Deploy to Cloudflare Pages

### Option A: Via Cloudflare Dashboard (Recommended)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click **Workers & Pages** > **Create** > **Pages**
3. Select **Connect to Git**
4. Choose your `mykira-eco-news` repository
5. Configure build settings:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (leave as default)
6. Click **Save and Deploy**
7. Wait for deployment to complete (~2 minutes)

### Option B: Via CLI

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npm run deploy
```

## Step 5: Configure Environment Variables

1. In Cloudflare Dashboard, go to your Pages project
2. Navigate to **Settings** > **Environment variables**
3. Add variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://mykira-eco-news.pages.dev/api`
   - **Environment:** Production
4. Click **Save**
5. Redeploy if necessary

## Step 6: Verify Deployment

1. Visit your deployed site: `https://mykira-eco-news.pages.dev`
2. Test API endpoints:
   - `https://mykira-eco-news.pages.dev/api/health`
   - `https://mykira-eco-news.pages.dev/api/markets`
   - `https://mykira-eco-news.pages.dev/api/calendar`

## 🎉 You're Done!

Your MyKira Eco News platform is now live on Cloudflare Pages with:
- ✅ React frontend with dark theme
- ✅ Hono.js API backend
- ✅ Automatic deployments via GitHub
- ✅ Economic calendar
- ✅ Market data
- ✅ News feed

## 📝 Next Steps

- Customize the design in `src/components/`
- Add real market data APIs
- Implement user authentication
- Add more features

## 🔧 Troubleshooting

### Build fails on Cloudflare
- Check build logs in Cloudflare Dashboard
- Ensure all dependencies are in `package.json`
- Try clearing cache and redeploying

### API not working
- Check `_routes.json` configuration
- Verify `functions/[[path]].ts` exists
- Check Cloudflare Pages Functions logs

### Need help?
- Read [GITHUB_SETUP.md](./GITHUB_SETUP.md) for detailed instructions
- Check [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
- Review [README.md](./README.md) for project documentation
