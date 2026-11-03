#!/bin/bash

# Deploy script for ForexFactory to Cloudflare

set -e

echo "🚀 Starting deployment..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler is not installed. Installing..."
    npm install -g wrangler
fi

# Check if logged in
if ! wrangler whoami &> /dev/null; then
    echo "🔐 Please login to Cloudflare..."
    wrangler login
fi

# Build the project
echo "📦 Building project..."
npm run build

# Deploy to Cloudflare Pages
echo "🌐 Deploying to Cloudflare Pages..."
wrangler pages deploy dist --project-name=forexfactory

echo "✅ Deployment complete!"
echo "📊 Check your deployment at: https://forexfactory.pages.dev"
