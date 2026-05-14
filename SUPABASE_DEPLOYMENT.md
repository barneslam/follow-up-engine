# Supabase Deployment Guide

## Step 1: Set Up Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a project (or use existing)
2. Note your **Project URL** and **Anon Key** (Settings → API)

## Step 2: Deploy Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase/schema.sql`
4. Paste into the SQL Editor
5. Click **Run**

This creates:
- `follow_up_engine_trial_requests` — Trial signup form submissions
- `follow_up_engine_survey_responses` — Post-trial survey responses
- `follow_up_engine_referrals` — Referral tracking
- All tables with RLS policies enabled

## Step 3: Configure Netlify Environment Variables

1. Go to [app.netlify.com](https://app.netlify.com) → Your Site → **Site Settings** → **Build & deploy** → **Environment**
2. Add two variables:
   - `VITE_SUPABASE_URL` = Your Supabase Project URL (from Step 1)
   - `VITE_SUPABASE_ANON_KEY` = Your Anon Key (from Step 1)
3. Trigger a rebuild (or manually push to GitHub to trigger deploy)

## Step 4: (Optional) Email Service Integration

The `send-verification-code` function currently has a mock email sender.

To send real verification emails, integrate one of:

### Resend (Recommended)
```bash
npm install resend
```

Then in `netlify/functions/send-verification-code.ts`, replace the mock with:
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

async function sendVerificationEmail(email: string, code: string): Promise<void> {
  await resend.emails.send({
    from: 'no-reply@followupengine.com',
    to: email,
    subject: 'Verify your Follow-Up Engine trial',
    html: `<p>Your verification code is: <strong>${code}</strong></p>`,
  })
}
```

Add `RESEND_API_KEY` to Netlify environment variables.

### SendGrid
```bash
npm install @sendgrid/mail
```

Or use Twilio for SMS verification (requires `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`).

## Step 5: Test Connection

1. Open https://followup-engine.netlify.app (or your live URL)
2. Fill out trial form → Click Submit
3. Check Supabase dashboard → `follow_up_engine_trial_requests` table
4. Verify new row appeared with your data

## Verification Code for Testing

The `verify-trial-request` function currently accepts code `123456` for local testing.

Before production:
- Implement actual code verification against stored codes
- Configure email delivery
- Store verification codes with TTL (short-lived)

## Troubleshooting

**Error: "VITE_SUPABASE_URL not set"**
- Confirm environment variables are set in Netlify
- Redeploy after adding them

**Error: "relation 'follow_up_engine_trial_requests' does not exist"**
- Schema SQL wasn't run. Run it again in Supabase SQL Editor

**Emails not received**
- Email service not integrated yet. Use mock code `123456` for testing
- Or integrate Resend/SendGrid following Step 4

**Data not saving**
- Check RLS policies. Confirm `INSERT` policy allows anonymous users
- Check Supabase logs for detailed error messages
