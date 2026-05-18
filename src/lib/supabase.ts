import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export async function submitContactForm(payload: Record<string, unknown>) {
  if (!supabase) return { success: false, error: 'Supabase not configured' }

  const { error } = await supabase.from('product_usage_events').insert({
    event_name: 'contact_form_submit',
    page_path: window.location.pathname,
    source: 'website',
    metadata: payload,
  })

  return { success: !error, error }
}

export async function submitTrialRequest(payload: Record<string, unknown>) {
  if (!supabase) return { success: false, error: 'Supabase not configured' }

  const { error } = await supabase.from('product_usage_events').insert({
    event_name: 'trial_request_submit',
    page_path: window.location.pathname,
    source: 'website',
    metadata: payload,
  })

  return { success: !error, error }
}

export async function storeReferral(payload: Record<string, unknown>) {
  if (!supabase) return { success: false, error: 'Supabase not configured' }

  const { error } = await supabase.from('product_usage_events').insert({
    event_name: 'referral_captured',
    page_path: window.location.pathname,
    source: 'website',
    metadata: payload,
  })

  return { success: !error, error }
}

export async function sendSmsOtp(phone: string) {
  return {
    success: true,
    message: 'SMS verification placeholder enabled',
    phone,
  }
}

export async function verifySmsOtp(phone: string, code: string) {
  return {
    success: true,
    verified: true,
    phone,
    code,
  }
}
