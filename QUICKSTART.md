# Follow-Up Engine - Quick Start Guide

Get the Follow-Up Engine running locally in 5 minutes.

## 1. Install Dependencies

```bash
cd follow-up-engine
npm install
```

## 2. Set Up Environment Variables

Copy the example file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values (get from Stripe and Supabase dashboards):

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... # From Stripe Dashboard
STRIPE_SECRET_KEY=sk_test_...                   # From Stripe Dashboard
STRIPE_WEBHOOK_SECRET=whsec_...                 # From Stripe Dashboard
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co # From Supabase Project
NEXT_PUBLIC_SUPABASE_ANON_KEY=...              # From Supabase Project
SUPABASE_SERVICE_ROLE_KEY=...                   # From Supabase Project
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 4. What You'll See

### Landing Page (`/`)
- Hero section with product promise
- Problem/solution workflow
- Pricing cards
- CTA buttons

### Pricing Page (`/pricing`)
- Three pricing tiers
- Stripe checkout integration (test mode)
- FAQ section

### Dashboard (`/dashboard`)
- Meeting list (placeholder)
- Integration setup buttons
- Meeting prep/follow-up actions

### Meeting Prep (`/meetings/:id/prep`)
- Call objective selector
- Document upload
- Generate button
- Pre-meeting outputs (agenda, questions, brief)

### Meeting Follow-Up (`/meetings/:id/follow-up`)
- Follow-up email template
- WhatsApp summary
- Action items
- Manager email
- Pipeline impact
- Risk assessment

## 5. Project Structure

```
follow-up-engine/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Landing page
│   ├── pricing/page.tsx          # Pricing page
│   ├── signup/page.tsx           # Sign up
│   ├── success/page.tsx          # Payment success
│   ├── dashboard/page.tsx        # Dashboard
│   ├── meetings/[id]/
│   │   ├── prep/page.tsx         # Pre-meeting prep
│   │   └── follow-up/page.tsx    # Post-meeting follow-up
│   ├── team-setup/page.tsx       # Team setup request
│   ├── api/stripe/               # Stripe API routes
│   ├── globals.css               # Tailwind styles
│   └── layout.tsx                # Root layout
├── next.config.ts                # Next.js config
├── tailwind.config.ts            # Tailwind CSS config
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
├── .env.example                  # Environment template
└── README.md                      # Full documentation
```

## 6. Key Features Implemented

✅ **Landing Page**
- Hero section with CTAs
- Problem/solution workflow
- Pricing showcase
- Future roadmap
- Responsive design

✅ **Pricing Page**
- Three pricing tiers (One-Time, Monthly, Team)
- Stripe Checkout integration
- FAQ section
- Test mode ready

✅ **Dashboard**
- Meeting list
- Meeting status
- Integration setup prompts
- Prep/follow-up actions

✅ **Meeting Prep**
- Call objective selector (12 presets)
- Document upload
- Custom comments
- Generate button
- Output sections: agenda, email, questions, brief, risks

✅ **Meeting Follow-Up**
- Thank-you note
- Follow-up email
- WhatsApp summary
- Action items table
- Manager email
- Pipeline impact
- Revenue potential
- Risk assessment
- Recommended next steps
- Missing information

✅ **Design System**
- Navy/slate color palette (#0F172A, #334155)
- Plus Jakarta Sans typography
- Flat design style
- Tailwind CSS utilities
- Responsive at all breakpoints

## 7. Next Steps for Development

### API Routes to Implement
```
POST /api/stripe/create-checkout-session    # Create Stripe checkout
POST /api/stripe/webhook                     # Handle Stripe events
POST /api/calendar/connect                   # Google Calendar OAuth
POST /api/fathom/connect                     # Fathom OAuth
POST /api/fathom/webhook                     # Receive Fathom transcripts
POST /api/meetings/:id/generate-prep         # Claude API for prep
POST /api/meetings/:id/generate-followup     # Claude API for follow-up
GET  /api/meetings/:id                       # Get meeting details
GET  /api/meetings                           # List meetings
```

### Database Setup
1. Create Supabase project
2. Run SQL schema (see DATABASE_SCHEMA.md)
3. Enable RLS for security
4. Create indexes for performance

### Authentication
1. Integrate Supabase Auth
2. Protect routes with middleware
3. Implement session management
4. Add sign out functionality

### AI Integration
1. Integrate Claude API for pre-meeting prep
2. Integrate Claude API for follow-up generation
3. Implement prompt templates
4. Handle streaming responses

### Integrations
1. Google Calendar OAuth flow
2. Fathom webhook receiver
3. Calendar event sync
4. Transcript parsing

## 8. Testing Stripe Locally

Use Stripe test cards:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Any future expiry date (e.g., 12/25)
- Any 3-digit CVC

## 9. Deployment

See DEPLOYMENT.md for:
- Vercel deployment (recommended)
- Netlify deployment
- Custom domain setup
- Production checklist

## 10. Useful Commands

```bash
# Development
npm run dev              # Start dev server on :3000

# Build
npm run build           # Build for production
npm start              # Start production server

# Code quality
npm run lint           # Run ESLint

# Database
# See DATABASE_SCHEMA.md for SQL setup
```

## 11. Common Issues

**Issue**: Stripe checkout returns 404
- **Fix**: Ensure STRIPE_SECRET_KEY and publishable key are set in .env.local

**Issue**: Tailwind classes not applied
- **Fix**: Restart dev server after updating tailwind.config.ts

**Issue**: TypeScript errors in IDE
- **Fix**: Run `npm run build` to check for real errors (IDE cache issues are common)

## 12. Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Lucide Icons](https://lucide.dev)

## 13. File Checklist

All files created:
- ✅ Landing page
- ✅ Pricing page
- ✅ Signup page
- ✅ Success page
- ✅ Dashboard
- ✅ Meeting prep page
- ✅ Meeting follow-up page
- ✅ Team setup form
- ✅ Stripe API route (skeleton)
- ✅ Next.js config
- ✅ Tailwind config
- ✅ TypeScript config
- ✅ Global styles
- ✅ README
- ✅ Deployment guide
- ✅ Database schema
- ✅ Environment template
- ✅ .gitignore

Ready to extend with:
- API routes (in app/api/)
- Components (create app/components/)
- Utilities (create app/lib/)
- Database integration (Supabase)
- Authentication (Supabase Auth)
- AI integration (Claude API)

## 14. Need Help?

- Check README.md for full documentation
- See DATABASE_SCHEMA.md for database setup
- Review DEPLOYMENT.md for production deployment
- Look at each page file for component examples

---

**You're all set! Start building.** 🚀
