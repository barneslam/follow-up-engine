import { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  try {
    const { email, code } = JSON.parse(event.body)

    // TODO: Verify code against stored/sent codes
    // For now, accept code '123456' for testing
    if (code !== '123456') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid verification code' }),
      }
    }

    // Update trial request status to active
    const trialStartDate = new Date()
    const trialEndDate = new Date(trialStartDate.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days

    const { data, error } = await supabase
      .from('follow_up_engine_trial_requests')
      .update({
        verification_status: 'verified',
        trial_status: 'active',
        trial_start_date: trialStartDate.toISOString(),
        trial_end_date: trialEndDate.toISOString(),
      })
      .eq('corporate_email', email)
      .select()

    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message }),
      }
    }

    if (!data || data.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Trial request not found' }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Trial activated',
        trialEndDate: trialEndDate.toISOString(),
        data: data[0],
      }),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err instanceof Error ? err.message : 'Unknown error',
      }),
    }
  }
}

export { handler }
