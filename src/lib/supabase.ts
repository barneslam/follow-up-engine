import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export type ContactFormData = {
  name: string
  email: string
  phone: string
  company: string
  role: string
  interested_plan: string
  biggest_challenge: string
  consent_updates?: boolean
  consent_terms?: boolean
}

export async function submitContactForm(data: ContactFormData) {
  const { data: result, error } = await supabase
    .from('contact_submissions')
    .insert([{
      ...data,
      phone: data.phone,
      consent_updates: data.consent_updates ?? false,
      consent_terms: data.consent_terms ?? false,
    }])
    .select()

  if (error) throw error
  return result
}

export type DemoOutput = {
  email_id: string
  email: string
  whatsapp: string
  action_items: string
  manager_email: string
  next_steps: string
}

export async function saveDemoOutput(data: DemoOutput) {
  const { data: result, error } = await supabase
    .from('demo_outputs')
    .insert([data])
    .select()

  if (error) throw error
  return result
}

export async function sendSmsOtp(phoneNumber: string) {
  try {
    const response = await fetch('/.netlify/functions/send-verification-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: phoneNumber }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to send verification code')
    }

    const data = await response.json()
    return { success: true, verificationSid: data.verificationSid }
  } catch (error) {
    console.error('Send OTP error:', error)
    throw error
  }
}

export async function verifySmsOtp(phoneNumber: string, otpCode: string) {
  try {
    const response = await fetch('/.netlify/functions/verify-trial-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: phoneNumber, code: otpCode }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Verification failed')
    }

    const data = await response.json()
    return { verified: true, trialStartDate: data.trialStartDate, trialEndDate: data.trialEndDate }
  } catch (error) {
    console.error('Verify OTP error:', error)
    throw error
  }
}

export interface TrialRequestData {
  first_name: string
  last_name: string
  corporate_email: string
  phone_number: string
  phone_verified: boolean
  company_name: string
  role: string
  company_size: string
  meetings_per_week?: string
  transcript_tool?: string
  biggest_followup_challenge: string
  referral_code?: string
  consent_terms: boolean
  consent_updates: boolean
  trial_start_date?: string
  trial_end_date?: string
}

export function generateReferralCode(firstName: string, lastName: string): string {
  if (firstName && lastName) {
    const initials = (firstName.charAt(0) + lastName).substring(0, 8).toUpperCase()
    return `${initials}10`
  }
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `FUE-${randomPart}`
}

export async function submitTrialRequest(data: TrialRequestData) {
  const generatedCode = generateReferralCode(data.first_name, data.last_name)

  const { data: result, error } = await supabase
    .from('follow_up_engine_trial_requests')
    .insert([{
      first_name: data.first_name,
      last_name: data.last_name,
      corporate_email: data.corporate_email,
      phone_number: data.phone_number,
      phone_verified: data.phone_verified,
      company_name: data.company_name,
      role: data.role,
      company_size: data.company_size,
      meetings_per_week: data.meetings_per_week || null,
      transcript_tool: data.transcript_tool || null,
      biggest_followup_challenge: data.biggest_followup_challenge,
      referral_code: data.referral_code || generatedCode,
      verification_status: data.phone_verified ? 'verified' : 'pending',
      verification_method: 'sms',
      trial_status: data.phone_verified ? 'active' : 'pending',
      trial_start_date: data.trial_start_date || null,
      trial_end_date: data.trial_end_date || null,
      consent_terms: data.consent_terms,
      consent_updates: data.consent_updates,
      consent_timestamp: new Date().toISOString(),
    }])
    .select()
    .single()

  if (error) throw error
  return { ...result, generated_referral_code: generatedCode }
}

export async function sendVerificationCode(email: string, requestId: string) {
  // TODO: Connect to email service (SendGrid, Resend, etc.)
  // For MVP: Generate a random code and store it
  const code = Math.random().toString(36).substring(2, 8).toUpperCase()

  // TODO: Send email with verification code
  console.log(`[TODO] Send verification code ${code} to ${email}`)

  // Store verification code in browser localStorage for demo (production: use backend)
  localStorage.setItem(`trial_code_${requestId}`, code)
  localStorage.setItem(`trial_code_email_${requestId}`, email)

  return { code }
}

export async function verifyCode(requestId: string, providedCode: string) {
  // TODO: In production, verify code against backend-stored code
  // For MVP: Check localStorage
  const storedCode = localStorage.getItem(`trial_code_${requestId}`)

  if (storedCode && storedCode === providedCode.toUpperCase()) {
    // Mark as verified in database
    const now = new Date()
    const trialEndDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

    const { data: result, error } = await supabase
      .from('follow_up_engine_trial_requests')
      .update({
        verification_status: 'verified',
        trial_status: 'active',
        trial_start_date: now.toISOString(),
        trial_end_date: trialEndDate.toISOString(),
      })
      .eq('id', requestId)
      .select()
      .single()

    if (error) throw error

    // Clean up localStorage
    localStorage.removeItem(`trial_code_${requestId}`)
    localStorage.removeItem(`trial_code_email_${requestId}`)

    return {
      verified: true,
      trial_end_date: trialEndDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      ...result
    }
  }

  return { verified: false }
}

export interface SurveyResponseData {
  time_saved: string
  most_valuable_output: string
  pricing_49: string
  pricing_99_fathom: string
  phase2_feature: string
  stopping_factor: string
  referral_likelihood: string
  referral_email?: string
  open_feedback?: string
}

export async function submitSurveyResponse(data: SurveyResponseData) {
  const { data: result, error } = await supabase
    .from('follow_up_engine_survey_responses')
    .insert([{
      ...data,
      referral_email: data.referral_email || null,
      open_feedback: data.open_feedback || null,
    }])
    .select()

  if (error) throw error
  return result
}

export interface ReferralData {
  referral_code: string
  referred_by_code?: string
  signup_email: string
  signup_name: string
}

export async function storeReferral(data: ReferralData) {
  const { data: result, error } = await supabase
    .from('follow_up_engine_referrals')
    .insert([{
      referral_code: data.referral_code,
      referred_by_code: data.referred_by_code || null,
      signup_email: data.signup_email,
      signup_name: data.signup_name,
    }])
    .select()

  if (error) throw error
  return result
}
