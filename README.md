# Deploying Your Blog to GitHub Pages

This repository contains a static blog site. Deploy it in a few steps.

## Quick Deploy

1. Push all files to the `main` branch of your GitHub repository.
2. Go to **Settings > Pages**.
3. Set **Source** to **Deploy from a branch**.
4. Select branch `main`, folder `/ (root)`, and save.
5. Wait 1-2 minutes, then visit `https://<username>.github.io/<repo-name>/`.

## Custom Domain (Optional)

1. In **Settings > Pages > Custom domain**, enter your domain.
2. Add a `CNAME` record pointing to `<username>.github.io` at your DNS provider.
3. Check **Enforce HTTPS** after the DNS propagates.

See `DEPLOYMENT-GUIDE.md` for the full step-by-step guide (in Chinese).
