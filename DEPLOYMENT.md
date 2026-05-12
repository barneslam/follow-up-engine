# Deployment Guide - Follow-Up Engine

Deploy Follow-Up Engine to production in minutes.

## Prerequisites

- Next.js project fully configured locally
- All environment variables collected
- Stripe and Supabase accounts set up
- GitHub repository created

## Option 1: Deploy to Vercel (Recommended)

Vercel is optimized for Next.js and offers the best experience.

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/follow-up-engine.git
git push -u origin main
```

### 2. Import on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Connect your GitHub account
3. Select the `follow-up-engine` repository
4. Click "Import"

### 3. Add Environment Variables

In the Vercel import dialog, add all variables from `.env.local`:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_APP_URL=https://follow-up-engine.vercel.app
```

### 4. Deploy

Click "Deploy" and wait for the deployment to complete. Vercel will show your live URL.

### 5. Configure Stripe Webhook

In Stripe Dashboard:

1. Go to **Developers → Webhooks**
2. Click **Add Endpoint**
3. URL: `https://your-vercel-url.vercel.app/api/stripe/webhook`
4. Select events: `checkout.session.completed`, `invoice.paid`, `customer.subscription.created`
5. Copy the signing secret to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

## Option 2: Deploy to Netlify

### 1. Push to GitHub (same as Vercel)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/follow-up-engine.git
git push -u origin main
```

### 2. Connect on Netlify

1. Go to [netlify.com/new](https://netlify.com/new)
2. Click "Connect to Git"
3. Select GitHub and authorize
4. Select `follow-up-engine` repository

### 3. Configure Build Settings

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Functions directory**: `netlify/functions` (optional, for serverless)

### 4. Add Environment Variables

In Netlify dashboard → **Site Settings → Build & deploy → Environment**:

Add all variables from `.env.local`:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_APP_URL=https://your-netlify-domain.netlify.app
```

### 5. Deploy

Click "Deploy site" and Netlify will build and deploy automatically.

### 6. Configure Stripe Webhook

Same as Vercel:
- URL: `https://your-netlify-domain.netlify.app/api/stripe/webhook`

## Custom Domain Setup

### Vercel

1. Go to **Project Settings → Domains**
2. Add your custom domain
3. Follow DNS instructions (usually CNAME to Vercel)
4. Update `NEXT_PUBLIC_APP_URL` environment variable

### Netlify

1. Go to **Domain Settings**
2. Add custom domain
3. Update DNS records
4. Update `NEXT_PUBLIC_APP_URL` environment variable

## Production Checklist

Before going live:

- [ ] Update environment variables with production keys
- [ ] Configure Stripe with live keys (not test keys)
- [ ] Set up email notifications (configure in code)
- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Test full checkout flow
- [ ] Test Stripe webhooks
- [ ] Test Supabase connections
- [ ] Configure monitoring/error tracking (optional: Sentry)
- [ ] Set up backup strategy for database
- [ ] Configure domain and SSL

## Monitoring

### Error Tracking (Optional)

Set up Sentry for error monitoring:

```bash
npm install @sentry/nextjs
```

### Uptime Monitoring

Services like Pingdom or UptimeRobot can monitor your endpoints:
- Health check: `GET /api/health` (implement this endpoint)

## Troubleshooting

### Stripe Webhook Not Working

1. Verify webhook URL is correct (no trailing slash)
2. Check signing secret is correct
3. View webhook logs in Stripe Dashboard → **Developers → Events**

### Database Connection Issues

1. Verify Supabase credentials are correct
2. Check that database allows connections from your deployment
3. Review Supabase logs for errors

### Deployment Fails

1. Check build logs in Vercel/Netlify dashboard
2. Verify all environment variables are set
3. Ensure all dependencies are in `package.json`
4. Test build locally: `npm run build`

## Rolling Back

### Vercel

1. Go to **Deployments**
2. Find the previous working deployment
3. Click **Redeploy** or the three dots → **Promote to Production**

### Netlify

1. Go to **Deploys**
2. Find the previous working deployment
3. Click "Restore this deploy"

## Performance Optimization

### Image Optimization

Next.js automatically optimizes images. Use `next/image`:

```tsx
import Image from 'next/image';

export default function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={1200}
      height={600}
      priority
    />
  );
}
```

### Database Query Optimization

1. Use indexes (see DATABASE_SCHEMA.md)
2. Implement query caching where appropriate
3. Use connection pooling for database

### Bundle Size

Monitor with:

```bash
npm install -D @next/bundle-analyzer

# Add to next.config.ts:
# const withBundleAnalyzer = require('@next/bundle-analyzer')({
#   enabled: process.env.ANALYZE === 'true',
# })

# Run with:
# ANALYZE=true npm run build
```

## Scaling Considerations

- **Database**: Supabase auto-scales; monitor for slow queries
- **Storage**: Use Supabase Storage for documents
- **Functions**: Next.js API routes auto-scale on Vercel/Netlify
- **CDN**: Vercel/Netlify include CDN; cache static assets

## Security Checklist

- [ ] Never commit `.env.local` or secrets
- [ ] Use environment variables for all credentials
- [ ] Enable HTTPS everywhere
- [ ] Implement RLS on Supabase (see DATABASE_SCHEMA.md)
- [ ] Validate all user inputs
- [ ] Sanitize database queries
- [ ] Keep dependencies updated: `npm audit`

## Next Steps

1. Deploy to Vercel or Netlify
2. Configure custom domain
3. Test production environment
4. Monitor errors and performance
5. Iterate based on user feedback
