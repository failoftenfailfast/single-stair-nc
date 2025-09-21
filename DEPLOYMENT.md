# Deployment Guide

## GitHub Repository Setup

1. Create a new repository on GitHub named `single-stair-nc`
2. Connect your local repository:
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/single-stair-nc.git
   git branch -M main
   git push -u origin main
   ```

## Vercel Deployment

### Automatic Deployment (Recommended)

1. **Sign up/Login to Vercel**: Go to [vercel.com](https://vercel.com)
2. **Import from GitHub**: Click "New Project" → "Import Git Repository"
3. **Select Repository**: Choose `single-stair-nc` from your GitHub repositories
4. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

5. **Environment Variables**: Add these in Vercel dashboard:
   ```
   SANITY_PROJECT_ID=your_sanity_project_id
   SANITY_DATASET=production
   SANITY_API_VERSION=2024-03-01
   SANITY_API_TOKEN=your_sanity_api_token
   MAPBOX_ACCESS_TOKEN=your_mapbox_token
   NEXT_PUBLIC_SITE_URL=https://your-vercel-url.vercel.app
   ```

6. **Deploy**: Click "Deploy" - Vercel will automatically build and deploy your site

### Manual Deployment via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## Environment Variables Setup

### Required Variables

- `SANITY_PROJECT_ID`: Your Sanity project ID
- `SANITY_DATASET`: Usually 'production'
- `SANITY_API_VERSION`: '2024-03-01'
- `SANITY_API_TOKEN`: API token with read/write permissions
- `MAPBOX_ACCESS_TOKEN`: For map functionality

### Optional Variables

- `NEXT_PUBLIC_GA_ID`: Google Analytics ID
- `SMTP_HOST`: Email server host
- `SMTP_USER`: Email username
- `SMTP_PASS`: Email password
- `SUBSTACK_RSS_URL`: RSS feed URL

## Custom Domain Setup

1. **In Vercel Dashboard**: Go to your project → Settings → Domains
2. **Add Domain**: Enter your custom domain (e.g., `singlestair-nc.org`)
3. **Configure DNS**: Add the provided DNS records to your domain registrar
4. **SSL Certificate**: Vercel automatically provides SSL certificates

## Performance Optimization

The site is optimized for production with:
- ✅ Static Site Generation (SSG) for most pages
- ✅ Incremental Static Regeneration (ISR) for CMS content
- ✅ Image optimization with Next.js Image component
- ✅ Code splitting and tree shaking
- ✅ CSS optimization with Tailwind CSS purging
- ✅ Compression and minification

## Monitoring

### Analytics
- Add Google Analytics or privacy-focused alternatives
- Monitor Core Web Vitals in Vercel dashboard
- Set up error tracking with Sentry (optional)

### Performance
- Use Vercel Analytics for detailed performance metrics
- Monitor build times and deployment success
- Set up alerts for downtime or errors

## Continuous Deployment

Once connected to GitHub:
- ✅ **Automatic deployments** on push to main branch
- ✅ **Preview deployments** for pull requests
- ✅ **Rollback capability** to previous deployments
- ✅ **Branch deployments** for testing

## Troubleshooting

### Common Issues

1. **Build Failures**: Check build logs in Vercel dashboard
2. **Environment Variables**: Ensure all required variables are set
3. **CSS Not Loading**: Verify Tailwind CSS configuration
4. **404 Errors**: Check Next.js routing configuration

### Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

## Security

- ✅ Content Security Policy headers
- ✅ XSS protection headers
- ✅ HTTPS enforcement
- ✅ Environment variable encryption
- ✅ No sensitive data in client-side code

Your site will be live at: `https://your-project-name.vercel.app`

