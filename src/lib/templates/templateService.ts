import { supabase } from '../supabase'

export async function logTemplateUsage(payload: {
  output_type: string
  intent: string
  tone: string
  framework: string
  page_path?: string
  input_character_count?: number
  attachment_count?: number
  metadata?: Record<string, unknown>
}) {
  if (!supabase) return

  await supabase.from('template_usage_logs').insert({
    ...payload,
    source: 'demo',
    session_id: getSessionId(),
    generated: true,
  })
}

export async function logProductEvent(event_name: string, metadata = {}) {
  if (!supabase) return

  await supabase.from('product_usage_events').insert({
    event_name,
    page_path: window.location.pathname,
    source: 'website',
    session_id: getSessionId(),
    metadata,
  })
}

function getSessionId() {
  const key = 'followup_engine_session_id'
  let id = localStorage.getItem(key)

  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(key, id)
  }

  return id
}
