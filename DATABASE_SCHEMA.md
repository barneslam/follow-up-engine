# Follow-Up Engine - Database Schema

Complete schema for Supabase PostgreSQL database.

## Tables Overview

### Users
Stores authenticated users.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  company_id UUID NOT NULL REFERENCES companies(id),
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP DEFAULT now(),
  
  FOREIGN KEY (company_id) REFERENCES companies(id)
);
```

### Companies
Stores company/organization information and subscription status.

```sql
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  plan_type TEXT CHECK (plan_type IN ('one-time', 'monthly', 'team')),
  stripe_customer_id TEXT UNIQUE,
  subscription_status TEXT CHECK (subscription_status IN ('active', 'canceled', 'past_due')),
  created_at TIMESTAMP DEFAULT now()
);
```

### Integrations
Stores OAuth tokens for calendar and Fathom connections.

```sql
CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  provider TEXT NOT NULL CHECK (provider IN ('google_calendar', 'fathom')),
  provider_account_id TEXT,
  access_token_encrypted TEXT,
  refresh_token_encrypted TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'disconnected')),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  
  UNIQUE(company_id, provider),
  FOREIGN KEY (company_id) REFERENCES companies(id)
);
```

### Meetings
Stores calendar meetings and their status.

```sql
CREATE TABLE meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  calendar_event_id TEXT,
  title TEXT NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  attendees_json JSONB,
  meeting_url TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN (
    'scheduled', 'prep_pending', 'prep_generated', 
    'completed', 'transcript_received', 'followup_generated', 
    'reviewed', 'sent'
  )),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  
  FOREIGN KEY (company_id) REFERENCES companies(id)
);
```

### Meeting Documents
Stores uploaded documents for a meeting.

```sql
CREATE TABLE meeting_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id UUID NOT NULL REFERENCES meetings(id),
  company_id UUID NOT NULL REFERENCES companies(id),
  file_name TEXT NOT NULL,
  file_type TEXT,
  storage_url TEXT,
  document_text TEXT,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now(),
  
  FOREIGN KEY (meeting_id) REFERENCES meetings(id),
  FOREIGN KEY (company_id) REFERENCES companies(id)
);
```

### Meeting Objectives
Stores call objective and custom context for a meeting.

```sql
CREATE TABLE meeting_objectives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id UUID NOT NULL REFERENCES meetings(id),
  objective_type TEXT NOT NULL CHECK (objective_type IN (
    'discovery', 'qualification', 'proposal_review', 'demo',
    'pricing_discussion', 'objection_handling', 'implementation_scoping',
    'renewal', 'expansion', 'project_update', 'decision_confirmation',
    'stale_opportunity_recovery'
  )),
  manual_objective TEXT,
  desired_outcome TEXT,
  custom_comments TEXT,
  tone TEXT DEFAULT 'professional',
  urgency TEXT DEFAULT 'normal' CHECK (urgency IN ('low', 'normal', 'high')),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  
  FOREIGN KEY (meeting_id) REFERENCES meetings(id)
);
```

### Prep Outputs
Stores generated pre-meeting preparation content.

```sql
CREATE TABLE prep_outputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id UUID NOT NULL REFERENCES meetings(id),
  agenda TEXT,
  agenda_email TEXT,
  question_list_json JSONB,
  internal_prep_brief TEXT,
  risk_notes TEXT,
  created_at TIMESTAMP DEFAULT now(),
  
  FOREIGN KEY (meeting_id) REFERENCES meetings(id)
);
```

### Transcripts
Stores meeting transcripts from Fathom.

```sql
CREATE TABLE transcripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id UUID NOT NULL REFERENCES meetings(id),
  fathom_recording_id TEXT,
  transcript_text TEXT,
  summary_text TEXT,
  action_items_json JSONB,
  source_payload_json JSONB,
  created_at TIMESTAMP DEFAULT now(),
  
  FOREIGN KEY (meeting_id) REFERENCES meetings(id)
);
```

### Follow-Up Outputs
Stores generated post-meeting follow-up content.

```sql
CREATE TABLE followup_outputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id UUID NOT NULL REFERENCES meetings(id),
  thank_you_email TEXT,
  detailed_followup_email TEXT,
  whatsapp_summary TEXT,
  action_items_json JSONB,
  internal_manager_email TEXT,
  pipeline_impact_note TEXT,
  revenue_target_impact_note TEXT,
  risk_assessment TEXT,
  recommended_next_steps_json JSONB,
  missing_information TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  
  FOREIGN KEY (meeting_id) REFERENCES meetings(id)
);
```

### Purchases
Stores Stripe payment records.

```sql
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  user_id UUID NOT NULL REFERENCES users(id),
  stripe_checkout_session_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  plan_type TEXT NOT NULL,
  payment_status TEXT,
  amount DECIMAL(10, 2),
  currency TEXT DEFAULT 'CAD',
  created_at TIMESTAMP DEFAULT now(),
  
  FOREIGN KEY (company_id) REFERENCES companies(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Row-Level Security (RLS)

Enable RLS on all tables and create policies for tenant isolation:

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE prep_outputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE followup_outputs ENABLE ROW LEVEL SECURITY;

-- Users can view their own company's data
CREATE POLICY "Users see own company" ON meetings
  FOR SELECT USING (
    company_id IN (
      SELECT company_id FROM users WHERE id = auth.uid()
    )
  );

-- Similar policies for all tables
```

## Indexes

```sql
-- Improve query performance
CREATE INDEX idx_meetings_company_id ON meetings(company_id);
CREATE INDEX idx_meetings_status ON meetings(status);
CREATE INDEX idx_meetings_start_time ON meetings(start_time);
CREATE INDEX idx_users_company_id ON users(company_id);
CREATE INDEX idx_documents_meeting_id ON meeting_documents(meeting_id);
CREATE INDEX idx_transcripts_meeting_id ON transcripts(meeting_id);
CREATE INDEX idx_followup_meeting_id ON followup_outputs(meeting_id);
```

## Data Types Reference

- **UUID**: Unique identifier (primary keys)
- **TEXT**: Long text content (documents, emails)
- **TIMESTAMP**: Date/time with timezone
- **JSONB**: JSON binary format (arrays, objects)
- **DECIMAL(10,2)**: Money amounts ($9,999,999.99)

## Migration Steps

1. Create all tables in order (users → companies first, then references)
2. Enable RLS on all tables
3. Create security policies for tenant isolation
4. Create indexes for performance
5. Test authentication and data access

## Future Tables (Phase 2)

### CRM Integrations
```sql
CREATE TABLE crm_integrations (
  id UUID PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id),
  crm_platform TEXT CHECK (crm_platform IN ('salesforce', 'hubspot', 'pipedrive', 'zoho')),
  api_key_encrypted TEXT,
  status TEXT DEFAULT 'pending'
);
```

### Manager Dashboard Views
```sql
CREATE TABLE team_reports (
  id UUID PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id),
  manager_id UUID NOT NULL REFERENCES users(id),
  report_date DATE,
  total_meetings INT,
  followup_sent INT,
  pipeline_value DECIMAL(12,2)
);
```
