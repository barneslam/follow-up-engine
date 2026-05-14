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
    const {
      first_name,
      last_name,
      corporate_email,
      phone_number,
      company_name,
      role,
      company_size,
      biggest_followup_challenge,
      referral_code,
    } = JSON.parse(event.body)

    const { data, error } = await supabase
      .from('follow_up_engine_trial_requests')
      .insert([
        {
          first_name,
          last_name,
          corporate_email,
          phone_number,
          company_name,
          role,
          company_size,
          biggest_followup_challenge,
          referral_code: referral_code || null,
          verification_status: 'pending',
          trial_status: 'pending',
        },
      ])
      .select()

    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message }),
      }
    }

    return {
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        message: 'Trial request saved',
        data,
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
