const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  try {
    const {
      signup_email,
      signup_name,
      referral_code,
      time_saved,
      most_valuable_output,
      pricing_49,
      pricing_99_fathom,
      phase2_feature,
      stopping_factor,
      referral_likelihood,
      referral_email,
      open_feedback,
    } = JSON.parse(event.body)

    // Save survey response
    const { data: surveyData, error: surveyError } = await supabase
      .from('follow_up_engine_survey_responses')
      .insert([
        {
          time_saved,
          most_valuable_output,
          pricing_49,
          pricing_99_fathom,
          phase2_feature,
          stopping_factor,
          referral_likelihood,
          referral_email: referral_email || null,
          open_feedback: open_feedback || null,
        },
      ])
      .select()

    if (surveyError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: surveyError.message }),
      }
    }

    // If referral code provided, save to referrals table
    if (referral_code) {
      const { error: referralError } = await supabase
        .from('follow_up_engine_referrals')
        .insert([
          {
            referral_code,
            signup_email,
            signup_name,
            referred_by_code: null, // This trial wasn't referred by someone else
          },
        ])

      if (referralError) {
        console.error('Referral save error:', referralError)
        // Don't fail the survey save if referral save fails
      }
    }

    return {
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        message: 'Survey response saved',
        data: surveyData,
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
