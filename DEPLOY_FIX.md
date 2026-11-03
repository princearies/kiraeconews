# 🔧 Fix Cloudflare Deploy Error

## ❌ Masalah

```
✘ [ERROR] Deprecation:
  The `wrangler preview` command has been deprecated.
  Try using `wrangler dev` to to try out a worker during development.
```

## ✅ Penyelesaian

### **Pilihan 1: Cloudflare Workers (RECOMMENDED)**

Projek ini ada API Hono, jadi **deploy sebagai Workers**, bukan Pages.

#### Langkah Fix di Cloudflare Dashboard:

1. **Login** ke [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Pergi ke **Workers & Pages**
3. Cari project anda dan klik **Settings**
4. Cari **Builds & deployments** section
5. **BUANG** atau kosongkan **Deploy command**
   - Jika ada `npx wrangler preview`, **DELETE** entirely
6. Pastikan settings:
   ```
   Build command: npm run build
   Build output directory: dist
   Deploy command: (kosongkan atau biarkan default)
   ```
7. Klik **Save**
8. Trigger new deployment (push ke GitHub atau manual deploy)

#### Atau Deploy Manual via CLI:

```bash
# Install wrangler globally
npm install -g wrangler

# Login ke Cloudflare
wrangler login

# Deploy sebagai Workers
npm run deploy
# atau
wrangler deploy
```

### **Pilihan 2: GitHub Actions Auto-Deploy**

Workflow `.github/workflows/deploy.yml` telah di-update untuk guna `wrangler deploy`.

#### Setup GitHub Secrets:

1. Pergi ke GitHub repository → **Settings** → **Secrets and variables** → **Actions**
2. Add secrets:
   - `CLOUDFLARE_API_TOKEN` - Token dari Cloudflare
   - `CLOUDFLARE_ACCOUNT_ID` - Account ID dari Cloudflare

#### Cara Dapatkan Credentials:

**API Token:**
1. [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. **Create Token** → **Edit Cloudflare Workers** template
3. Account Resources: Pilih account anda
4. Create dan copy token

**Account ID:**
1. [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Klik mana-ma domain
3. Scroll ke bawah, cari **Account ID** di sidebar kanan

### **Pilihan 3: Cloudflare Pages Only (Static Files Sahaja)**

Jika anda **TIDAK PERLU API** dan hanya mahu serve static React app:

1. Pergi ke Cloudflare Dashboard → **Workers & Pages**
2. **Create** → **Pages** → **Upload assets**
3. Upload folder `dist/`
4. **ATAU** connect GitHub repo dengan settings:
   ```
   Build command: npm run build
   Build output directory: dist
   Deploy command: (KOSONGKAN - jangan isi apa-apa)
   ```

⚠️ **AMARAN**: Dengan cara ini, API endpoints (`/api/*`) **TIDAK AKAN BERFUNGSI** kerana Pages hanya serve static files.

## 🎯 Rekomendasi

**Guna Pilihan 1 (Cloudflare Workers)** kerana:
- ✅ API Hono akan berfungsi
- ✅ Static files (React) akan di-serve dari `dist/`
- ✅ Semua features berfungsi penuh
- ✅ Auto-refresh calendar data dari live API

## 📝 Verification

Selepas deploy berjaya, test:

1. **Homepage**: `https://your-worker.workers.dev/`
   - ✅ React app should load
   - ✅ UI should display correctly

2. **API Health Check**: `https://your-worker.workers.dev/api/health`
   - ✅ Should return JSON: `{"status":"ok",...}`

3. **Calendar API**: `https://your-worker.workers.dev/api/calendar`
   - ✅ Should return calendar events

4. **Live Calendar Data**: Check EconomicCalendar component
   - ✅ Should fetch from `crypto-micro-agent.mykira.workers.dev`
   - ✅ Should display live data

## 🐛 Troubleshooting

### Error: "wrangler preview deprecated"
**Fix**: Buang deploy command dari Cloudflare Pages settings

### Error: "Cannot find module 'wrangler'"
**Fix**: 
```bash
npm install -D wrangler
```

### Error: "ASSETS binding not found"
**Fix**: Pastikan `wrangler.toml` ada:
```toml
[assets]
directory = "./dist"
binding = "ASSETS"
```

### Build berjaya tapi API tidak berfungsi
**Fix**: Deploy sebagai Workers, bukan Pages:
```bash
wrangler deploy
```

## 📞 Support

Jika masih ada masalah:
1. Check Cloudflare Workers logs
2. Verify `wrangler.toml` configuration
3. Ensure `dist/` folder exists after build
4. Check browser console for errors

---

**TL;DR**: Buang `wrangler preview` dari Cloudflare Pages settings, atau deploy sebagai Workers menggunakan `wrangler deploy`.
