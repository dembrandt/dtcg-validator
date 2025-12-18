# Deployment Guide

## GitHub Pages Setup

The project is configured to deploy to GitHub Pages automatically.

### First Time Setup (Already Done)

1. Repository initialized and pushed to GitHub
2. GitHub Pages configuration added to vite.config.js
3. gh-pages package installed
4. Deploy script added to package.json

### Deploying Updates

Whenever you want to deploy changes to GitHub Pages:

```bash
# Make your changes, then:
git add .
git commit -m "Your commit message"
git push

# Deploy to gh-pages
npm run deploy
```

### Live Site

Your site is live at: **https://dembrandt.github.io/dtcg-validator/**

### How It Works

1. `npm run deploy` builds the production version of your app
2. The `gh-pages` package creates/updates the `gh-pages` branch
3. GitHub Pages automatically serves content from the `gh-pages` branch

### GitHub Pages Settings

Make sure GitHub Pages is configured in your repository settings:
- Go to: Repository Settings → Pages
- Source: Deploy from a branch
- Branch: `gh-pages` / `root`

The first deployment may take a few minutes to become active.
