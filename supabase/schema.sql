-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  interested_plan TEXT NOT NULL,
  biggest_challenge TEXT,
  consent_updates BOOLEAN DEFAULT FALSE,
  consent_terms BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

-- Create index on phone for verification tracking
CREATE INDEX IF NOT EXISTS idx_contact_submissions_phone ON contact_submissions(phone);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users (optional, adjust as needed)
CREATE POLICY "Allow insert from anonymous users" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow select for authenticated users" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create demo_outputs table
CREATE TABLE IF NOT EXISTS demo_outputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_id TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  action_items TEXT NOT NULL,
  manager_email TEXT NOT NULL,
  next_steps TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email_id for lookups
CREATE INDEX IF NOT EXISTS idx_demo_outputs_email_id ON demo_outputs(email_id);

-- Enable RLS for demo_outputs
ALTER TABLE demo_outputs ENABLE ROW LEVEL SECURITY;

-- Create policy for demo_outputs
CREATE POLICY "Allow insert from anonymous users" ON demo_outputs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow select for authenticated users" ON demo_outputs
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create follow_up_engine_trial_requests table
CREATE TABLE IF NOT EXISTS follow_up_engine_trial_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  corporate_email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  company_name TEXT NOT NULL,
  role TEXT NOT NULL,
  company_size TEXT NOT NULL,
  biggest_followup_challenge TEXT NOT NULL,
  referral_code TEXT,
  verification_status TEXT DEFAULT 'pending',
  verification_method TEXT DEFAULT 'email',
  trial_start_date TIMESTAMP WITH TIME ZONE,
  trial_end_date TIMESTAMP WITH TIME ZONE,
  trial_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_trial_requests_email ON follow_up_engine_trial_requests(corporate_email);
CREATE INDEX IF NOT EXISTS idx_trial_requests_status ON follow_up_engine_trial_requests(verification_status);
CREATE INDEX IF NOT EXISTS idx_trial_requests_trial_status ON follow_up_engine_trial_requests(trial_status);

-- Enable RLS
ALTER TABLE follow_up_engine_trial_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow anon insert on trial_requests" ON follow_up_engine_trial_requests
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow auth select on trial_requests" ON follow_up_engine_trial_requests
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow anon update on trial_requests" ON follow_up_engine_trial_requests
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Create follow_up_engine_survey_responses table
CREATE TABLE IF NOT EXISTS follow_up_engine_survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  time_saved TEXT NOT NULL,
  most_valuable_output TEXT NOT NULL,
  pricing_49 TEXT NOT NULL,
  pricing_99_fathom TEXT NOT NULL,
  phase2_feature TEXT NOT NULL,
  stopping_factor TEXT NOT NULL,
  referral_likelihood TEXT NOT NULL,
  referral_email TEXT,
  open_feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE follow_up_engine_survey_responses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow insert from anonymous users" ON follow_up_engine_survey_responses
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow select for authenticated users" ON follow_up_engine_survey_responses
  FOR SELECT TO authenticated USING (true);
