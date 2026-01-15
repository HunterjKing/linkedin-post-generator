# 🚀 Deployment Guide - GitHub + Cloudflare

This guide will help you deploy the Castform AI LinkedIn Post Generator securely using GitHub and Cloudflare.

## 📋 Prerequisites

- GitHub account
- Cloudflare account (free tier works!)
- Your API keys ready:
  - OpenAI API Key
  - OpenAI Org ID
  - Kyyy.ai API Key

## 🔐 Step 1: Secure Your Repository

### Push to GitHub WITHOUT exposing API keys:

```bash
# Make sure you have the .gitignore file
# It prevents .env files from being committed

git init
git add .
git commit -m "Initial commit - Castform AI LinkedIn Generator"
git branch -M main
git remote add origin https://github.com/Castform-AI-Solutions-LTD/linkedin-post-generator.git
git push -u origin main
```

**IMPORTANT:** Never commit files containing actual API keys!

## 🌐 Step 2: Deploy Backend to Cloudflare Workers

### Option A: Using Cloudflare Dashboard (Recommended for beginners)

1. **Go to Cloudflare Dashboard**
   - Navigate to Workers & Pages
   - Click "Create Application"
   - Choose "Create Worker"

2. **Create a new Worker:**
   - Name it: `linkedin-generator-api`
   - Click "Deploy"

3. **Upload your backend code:**
   - Copy the contents of `backend/server.js`
   - Paste into the Cloudflare Worker editor
   - Note: You'll need to adapt it for Cloudflare Workers format (see below)

4. **Set Environment Variables (Secrets):**
   - Go to Settings → Variables
   - Add these as **encrypted** secrets:
     - `OPENAI_API_KEY`: Your OpenAI key
     - `OPENAI_ORG_ID`: Your OpenAI org
     - `KYYY_API_KEY`: Your Kyyy.ai key

### Option B: Using Wrangler CLI (For advanced users)

1. **Install Wrangler:**
```bash
npm install -g wrangler
```

2. **Login to Cloudflare:**
```bash
wrangler login
```

3. **Add your secrets (one at a time):**
```bash
wrangler secret put OPENAI_API_KEY
# Paste your key when prompted

wrangler secret put OPENAI_ORG_ID
# Paste your org ID

wrangler secret put KYYY_API_KEY
# Paste your Kyyy.ai key
```

4. **Deploy:**
```bash
cd backend
npm install
cd ..
wrangler deploy
```

5. **Get your Worker URL:**
   - After deployment, you'll get a URL like: `https://linkedin-generator-api.your-subdomain.workers.dev`
   - Copy this URL!

## 🎨 Step 3: Deploy Frontend to Cloudflare Pages

1. **Go to Cloudflare Dashboard**
   - Navigate to Workers & Pages
   - Click "Create Application"
   - Choose "Pages"
   - Connect to Git

2. **Connect your GitHub repository:**
   - Select: `Castform-AI-Solutions-LTD/linkedin-post-generator`
   - Click "Begin setup"

3. **Configure build settings:**
   - Framework preset: None
   - Build command: (leave empty)
   - Build output directory: `/`
   - Root directory: `/`

4. **Environment Variables:**
   - Add variable: `API_BASE_URL` = Your Worker URL from Step 2
   - Example: `https://linkedin-generator-api.your-subdomain.workers.dev`

5. **Deploy!**
   - Click "Save and Deploy"
   - Wait for deployment to complete
   - You'll get a URL like: `https://linkedin-post-generator.pages.dev`

## 🔧 Step 4: Update Frontend with Backend URL

1. **Edit `script.js`:**
   
Find this line:
```javascript
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://your-backend-url.workers.dev';
```

Replace `https://your-backend-url.workers.dev` with your actual Cloudflare Worker URL.

2. **Commit and push:**
```bash
git add script.js
git commit -m "Update backend URL"
git push
```

Cloudflare Pages will automatically redeploy!

## ✅ Step 5: Test Your Deployment

1. Visit your Cloudflare Pages URL
2. Click "Check API Status" - should show ✅ Connected
3. Try generating a post
4. Try generating an image

## 🔒 Security Checklist

- ✅ API keys are stored as Cloudflare secrets, not in code
- ✅ `.gitignore` prevents committing `.env` files
- ✅ All API calls go through your backend
- ✅ Users can't see or access your API keys
- ✅ CORS is configured to only allow your domain

## 📊 Monitor Usage

### Cloudflare Dashboard:
- Check Worker analytics for API calls
- Monitor costs (should be minimal with free tier)

### OpenAI Dashboard:
- Visit: https://platform.openai.com/usage
- Monitor API usage and costs
- Set spending limits if desired

## 🐛 Troubleshooting

### "Cannot reach API" error:
- Check that your Worker is deployed and running
- Verify the API_BASE_URL in script.js is correct
- Check Cloudflare Worker logs for errors

### "API key not configured" error:
- Make sure you added the secrets to Cloudflare Worker
- Redeploy the Worker after adding secrets

### CORS errors:
- Update CORS settings in backend/server.js
- Add your Cloudflare Pages domain to allowed origins

## 💰 Cost Estimates

### Cloudflare:
- **Workers**: 100,000 requests/day FREE
- **Pages**: Unlimited sites, unlimited bandwidth FREE

### OpenAI (GPT-4o-mini):
- **Per post**: ~$0.0003 (basically free!)
- **1000 posts**: ~$0.30
- **10,000 posts**: ~$3

### Kyyy.ai:
- Depends on your plan
- Check their pricing page

## 🔄 Updating Your App

When you make changes:

1. **Frontend changes:**
```bash
git add .
git commit -m "Your update message"
git push
```
Cloudflare Pages auto-deploys!

2. **Backend changes:**
```bash
wrangler deploy
```
Or push to GitHub and set up GitHub Actions.

## 📚 Additional Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [OpenAI API Docs](https://platform.openai.com/docs)

---

**Need help?** Check the main README.md or create an issue on GitHub!

