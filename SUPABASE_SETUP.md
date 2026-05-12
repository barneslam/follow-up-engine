# Supabase Setup Guide

Follow these steps to set up your Supabase database for Follow-Up Engine.

## Prerequisites

- Supabase account (free tier available at supabase.com)
- Supabase project created

## 1. Create Tables and Policies

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Create a new query and run the SQL from `supabase/schema.sql`

This will create:
- `contact_submissions` table with fields: name, email, phone, company, role, interested_plan, biggest_challenge, consent_updates, consent_terms
- `demo_outputs` table for storing demo session outputs
- Row-level security policies
- Indexes for performance

## 2. Get Your Credentials

1. Go to **Settings** → **API**
2. Copy your:
   - `Project URL` (VITE_SUPABASE_URL)
   - `anon` (public) key (VITE_SUPABASE_ANON_KEY)

## 3. Configure Environment Variables

Create or update `.env.local` in the project root:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 4. Test the Connection

1. Start the dev server: `npm run dev`
2. Click "Get Early Access" on the home page
3. Fill in the form and submit
4. Check Supabase dashboard → `contact_submissions` table to verify data was inserted

## Table Schema

### contact_submissions
- `id` (UUID, Primary Key)
- `name` (TEXT)
- `email` (TEXT)
- `phone` (TEXT)
- `company` (TEXT)
- `role` (TEXT)
- `interested_plan` (TEXT)
- `biggest_challenge` (TEXT)
- `consent_updates` (BOOLEAN)
- `consent_terms` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### demo_outputs
- `id` (UUID, Primary Key)
- `email_id` (TEXT)
- `email` (TEXT)
- `whatsapp` (TEXT)
- `action_items` (TEXT)
- `manager_email` (TEXT)
- `next_steps` (TEXT)
- `created_at` (TIMESTAMP)

## Policies

Both tables have Row-Level Security (RLS) enabled with:
- **INSERT**: Allow from anonymous users (for public forms)
- **SELECT**: Allow for authenticated users only

Adjust these policies in Supabase as needed for your security requirements.

## Next Steps

- Integrate SMS OTP service (optional, currently uses localStorage for demo)
- Set up email notifications for new contact submissions
- Monitor submissions in the Supabase dashboard
