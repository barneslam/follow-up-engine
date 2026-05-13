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
  const cleanPhone = phoneNumber.replace(/\D/g, '')
  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  const otpData = {
    phone: cleanPhone,
    otp: otp,
    createdAt: Date.now(),
    expiresAt: Date.now() + 10 * 60 * 1000,
  }

  localStorage.setItem(`otp_${cleanPhone}`, JSON.stringify(otpData))

  try {
    const response = await fetch('/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: phoneNumber,
        code: otp,
      }),
    })

    if (!response.ok) {
      console.warn('Failed to send SMS OTP via API, using local verification')
    }
  } catch (error) {
    console.warn('SMS service unavailable, using local verification for demo')
  }

  return true
}

export async function verifySmsOtp(phoneNumber: string, otpCode: string): Promise<boolean> {
  const cleanPhone = phoneNumber.replace(/\D/g, '')
  const otpDataStr = localStorage.getItem(`otp_${cleanPhone}`)

  if (!otpDataStr) {
    throw new Error('OTP not found. Please request a new code.')
  }

  const otpData = JSON.parse(otpDataStr)

  if (Date.now() > otpData.expiresAt) {
    localStorage.removeItem(`otp_${cleanPhone}`)
    throw new Error('OTP expired. Please request a new code.')
  }

  const isValid = otpData.otp === otpCode.trim()

  if (isValid) {
    localStorage.removeItem(`otp_${cleanPhone}`)
    localStorage.setItem(`verified_phone_${cleanPhone}`, 'true')
  }

  return isValid
}

export interface TrialRequestData {
  first_name: string
  last_name: string
  corporate_email: string
  phone_number: string
  company_name: string
  role: string
  company_size: string
  biggest_followup_challenge: string
  referral_code?: string
}

export async function submitTrialRequest(data: TrialRequestData) {
  const { data: result, error } = await supabase
    .from('follow_up_engine_trial_requests')
    .insert([{
      ...data,
      referral_code: data.referral_code || null,
      verification_status: 'pending',
      verification_method: 'email',
      trial_status: 'pending',
    }])
    .select()
    .single()

  if (error) throw error
  return result
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
