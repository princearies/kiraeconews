# GitHub Setup Guide

## 🚀 Quick Start

### 1. Create GitHub Repository

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: ForexFactory with Hono + Cloudflare"

# Add remote (replace with your GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/forexfactory-hono.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 2. Deploy to Cloudflare Pages

#### Option A: Automatic (via GitHub Integration)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** > **Create** > **Pages**
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **Save and Deploy**

#### Option B: Manual (via Wrangler CLI)

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npm run deploy
```

### 3. Configure Environment Variables

In Cloudflare Dashboard:
1. Go to your Pages project
2. **Settings** > **Environment variables**
3. Add:
   - `VITE_API_URL` = `https://your-project.pages.dev/api`

### 4. GitHub Secrets (for CI/CD)

Add these secrets to your GitHub repository:
1. Go to **Settings** > **Secrets and variables** > **Actions**
2. Add:
   - `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

#### Get Cloudflare API Token:
1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Create Token > **Edit Cloudflare Workers** template
3. Give it access to your account
4. Copy the token

## 📁 Project Structure

```
forexfactory-hono/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── functions/
│   └── [[path]].ts             # Cloudflare Pages Functions (Hono API)
├── src/
│   ├── components/             # React components
│   ├── lib/
│   │   └── api.ts              # API client
│   ├── server.ts               # Standalone Hono server
│   ├── App.tsx                 # Main app
│   └── main.tsx                # Entry point
├── public/
│   └── _routes.json            # CF Pages routing
├── wrangler.toml               # Cloudflare Workers config
├── package.json
├── tsconfig.json
└── vite.config.js
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Run dev server (frontend only)
npm run dev

# Run Hono API locally
npm run dev:worker

# Build for production
npm run build

# Deploy to Cloudflare
npm run deploy
```

## 📡 API Endpoints

All API routes are prefixed with `/api`:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/markets` | GET | All market data |
| `/api/markets/:pair` | GET | Single market pair |
| `/api/calendar` | GET | Economic calendar |
| `/api/calendar?impact=high` | GET | Filter by impact |
| `/api/calendar?currency=USD` | GET | Filter by currency |
| `/api/news` | GET | Latest news |
| `/api/news?page=1&limit=10` | GET | Paginated news |
| `/api/sentiment` | GET | Market sentiment |

## 🌐 Deployment Options

### Option 1: Cloudflare Pages (Recommended)
- Frontend + API in one deployment
- Automatic CI/CD via GitHub Actions
- Free tier available

### Option 2: Cloudflare Workers (API Only)
```bash
npm run deploy:worker
```

### Option 3: Separate Deployments
- Deploy frontend to Cloudflare Pages
- Deploy API to Cloudflare Workers
- Set `VITE_API_URL` to point to Workers URL

## 🔒 Security

- Never commit `.env` files
- Use GitHub Secrets for sensitive data
- Rotate API tokens regularly
- Enable Cloudflare WAF for production

## 📊 Monitoring

- Check Cloudflare Analytics dashboard
- Monitor API usage in Cloudflare Workers
- Set up alerts for errors

## 🆘 Troubleshooting

### Build fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment fails
```bash
# Check Wrangler version
wrangler --version

# Re-login
wrangler logout
wrangler login

# Try deploy again
npm run deploy
```

### API not working
- Check Cloudflare Pages Functions logs
- Verify `_routes.json` configuration
- Ensure API routes start with `/api`

## 📝 License

MIT
