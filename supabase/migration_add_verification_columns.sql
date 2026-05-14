-- Add verification code columns to follow_up_engine_trial_requests
ALTER TABLE follow_up_engine_trial_requests
ADD COLUMN IF NOT EXISTS verification_code TEXT,
ADD COLUMN IF NOT EXISTS verification_code_expires_at TIMESTAMP WITH TIME ZONE;

-- Update the verification_method default from 'sms' to 'email'
ALTER TABLE follow_up_engine_trial_requests
ALTER COLUMN verification_method SET DEFAULT 'email';
