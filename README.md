# MyKira Eco News - Hono + Cloudflare

[![Deploy to Cloudflare](https://img.shields.io/badge/Deploy-Cloudflare-orange?style=flat-square)](https://pages.cloudflare.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square)](https://www.typescriptlang.org/)
[![Hono](https://img.shields.io/badge/Hono-3.x-green?style=flat-square)](https://hono.dev/)

A full-stack eco-friendly economic news platform built with **React + Vite** (frontend) and **Hono.js** (backend API), deployed on **Cloudflare Workers**.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│              Cloudflare Pages                    │
│                                                  │
│  ┌──────────────┐    ┌──────────────────────┐   │
│  │   Frontend   │    │   Hono API (Worker)  │   │
│  │  React+Vite  │    │  functions/[[path]]  │   │
│  │   dist/      │◄──►│  TypeScript          │   │
│  └──────────────┘    └──────────────────────┘   │
│         │                       │                │
│         ▼                       ▼                │
│  Static Assets           API Endpoints           │
│  /index.html             /api/markets            │
│  /assets/*               /api/calendar           │
│                          /api/news               │
│                          /api/sentiment          │
│                          /api/health             │
└─────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
├── src/
│   ├── App.tsx                 # Main React app
│   ├── components/
│   │   ├── Header.tsx          # Navigation header
│   │   ├── MarketTicker.tsx    # Live market ticker
│   │   ├── EconomicCalendar.tsx # Economic calendar
│   │   ├── MarketOverview.tsx  # Market overview panel
│   │   ├── NewsSection.tsx     # Latest news
│   │   └── Footer.tsx          # Footer
│   ├── lib/
│   │   └── api.ts              # API client (fetches from Hono)
│   ├── server.ts               # Standalone Hono server (Workers)
│   └── index.css               # Tailwind styles
├── functions/
│   └── [[path]].ts             # Cloudflare Pages Functions (Hono)
├── public/
│   └── _routes.json            # CF Pages routing config
├── wrangler.toml               # Cloudflare Workers config
└── package.json
```

## 🚀 Quick Start

### Connect to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: MyKira Eco News with Hono + Cloudflare"

# Add your GitHub remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/mykira-eco-news.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Deploy to Cloudflare

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** > **Create** > **Pages**
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **Save and Deploy**

See [GITHUB_SETUP.md](./GITHUB_SETUP.md) for detailed instructions.

## 🚀 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/markets` | All market data |
| GET | `/api/markets/:pair` | Single market pair |
| GET | `/api/calendar` | Economic calendar events |
| GET | `/api/calendar?impact=high` | Filter by impact |
| GET | `/api/calendar?currency=USD` | Filter by currency |
| GET | `/api/news` | Latest news |
| GET | `/api/news?category=economy` | Filter by category |
| GET | `/api/sentiment` | Market sentiment data |

## 🛠️ Development

### Install dependencies
```bash
npm install
```

### Run frontend dev server
```bash
npm run dev
```

### Run Hono server locally (Workers)
```bash
npx wrangler dev src/server.ts
```

### Build frontend
```bash
npm run build
```

## 🌐 Deploy to Cloudflare

### Option 1: Cloudflare Pages (Recommended)

1. Connect your GitHub repo to Cloudflare Pages
2. Set build settings:
   - **Build command:** `npm run build`
   - **Build output:** `dist`
3. The `functions/[[path]].ts` will automatically be deployed as Pages Functions

```bash
# Or deploy via CLI
npm run build
npx wrangler pages deploy dist
```

### Option 2: Cloudflare Workers (Standalone API)

```bash
# Deploy the Hono API as a Worker
npx wrangler deploy src/server.ts
```

### Option 3: Full Stack (Pages + Workers)

```bash
# 1. Build frontend
npm run build

# 2. Deploy to Cloudflare Pages (includes functions/)
npx wrangler pages deploy dist --project-name mykira-eco-news

# 3. Or deploy API separately
npx wrangler deploy --name mykira-eco-news
```

## 🔧 Environment Variables

Create a `.env` file:

```env
VITE_API_URL=https://your-api.workers.dev/api
```

For Cloudflare Pages, set environment variables in the dashboard:
- Settings → Environment variables → Add `VITE_API_URL`

## 📊 Features

- **Economic Calendar** - Real-time economic events with impact levels
- **Market Data** - Live forex pairs, commodities, crypto
- **News Feed** - Latest forex and economic news
- **Market Sentiment** - Bullish/Bearish sentiment indicators
- **Responsive Design** - Mobile-first dark theme UI
- **API-First** - All data served via RESTful Hono API

## 📝 Notes

- The `functions/[[path]].ts` file is the Cloudflare Pages Functions entry point
- The `src/server.ts` is a standalone Hono app for Workers deployment
- Both use the same Hono API routes
- Static assets are served from `dist/` by Cloudflare Pages
- API routes (`/api/*`) are handled by the Hono worker

## 📄 License

MIT
