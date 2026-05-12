# Follow-Up Engine

A modern SaaS product landing site built with React, Vite, and Tailwind CSS. Features a simulated demo, pricing pages, and team setup flow with Supabase integration for form submissions.

## Features

- **Product Landing Page** — Hero section, problem/solution, how-it-works, outputs showcase
- **Live Demo** — Simulated follow-up pack generation from meeting transcripts (client-side only)
- **Pricing Page** — Three pricing tiers with FAQ accordion
- **Team Setup** — Custom team onboarding request form with Supabase integration
- **Responsive Design** — Mobile-first, accessible UI using Tailwind CSS
- **Supabase Integration** — Contact form submissions stored in Supabase

## Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool and dev server
- **TypeScript** — Type safety
- **Tailwind CSS** — Utility-first styling
- **React Router** — Client-side routing
- **Supabase** — Backend for form submissions
- **Lucide React** — Icon library

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env file with Supabase credentials
cp .env.example .env
# Then edit .env with your Supabase URL and anon key
```

### Development

```bash
npm run dev
```

Opens the app at `http://localhost:5173`

### Building

```bash
npm run build
```

Generates optimized production build in `dist/` directory.

### Preview

```bash
npm run preview
```

Preview the production build locally.

## Environment Variables

Create a `.env` file with:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Supabase Setup

### Create Tables

```sql
-- Contact submissions table
create table contact_submissions (
  id bigint primary key generated always as identity,
  created_at timestamp with time zone default now(),
  name text not null,
  email text not null,
  company text not null,
  role text not null,
  interested_plan text,
  biggest_challenge text
);

alter table contact_submissions enable row level security;

create policy "allow_insert" on contact_submissions
  for insert
  with check (true);
```

## Netlify Deployment

### Build Settings

- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Environment Variables

```
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key
```

## Project Structure

```
src/
├── components/      (Layout, Button, ContactDialog)
├── pages/          (Home, Demo, Pricing, TeamSetup)
├── lib/            (Supabase client)
├── App.tsx         (Routes)
└── main.tsx        (Entry point)

public/
└── _redirects      (SPA routing for Netlify)

dist/              (Production build output)
```

## Support

Contact: barnes@thestrategypitch.com
