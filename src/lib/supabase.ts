import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export type ContactFormData = {
  name: string
  email: string
  company: string
  role: string
  interested_plan: string
  biggest_challenge: string
}

export async function submitContactForm(data: ContactFormData) {
  const { data: result, error } = await supabase
    .from('contact_submissions')
    .insert([data])
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
