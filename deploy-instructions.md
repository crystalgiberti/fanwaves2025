# Fan Waves Deployment Guide

## Quick Deploy Options

### Option 1: Vercel (Recommended)
1. Push code to GitHub using Builder.io's push button
2. Go to vercel.com → Import Project → Select your repo
3. Vercel auto-detects Vite and deploys instantly
4. Gets automatic domain like `fanwaves2025.vercel.app`

### Option 2: Netlify
1. Push code to GitHub
2. Go to netlify.com → New site from Git
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option 3: Build Locally & Upload
```bash
npm run build
```
Then upload the `dist/` folder to any web hosting service.

### Option 4: Traditional Hosting (cPanel, etc.)
1. Run `npm run build` locally
2. Upload contents of `dist/` folder to your web hosting
3. Point domain to the uploaded files

## Environment Variables for Production
Make sure to set these in your hosting platform:
- Any API keys you're using
- Database connections (if any)
- Custom environment variables

## Domain Setup
- Most platforms provide free subdomains
- You can connect your own domain (fanwaves.fun) in hosting settings
- Update DNS records to point to your hosting platform

## Builder.io in Production
Your Builder.io integration will work automatically in production without the authorization prompts that appear in development mode.
