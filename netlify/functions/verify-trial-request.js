const twilio = require('twilio')
const { createClient } = require('@supabase/supabase-js')

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

const client = twilio(accountSid, authToken)
const supabase = createClient(supabaseUrl, supabaseAnonKey)

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  try {
    const { phone, code } = JSON.parse(event.body)

    if (!phone || !code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Phone number and verification code are required' }),
      }
    }

    if (!accountSid || !authToken || !verifySid) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Twilio service not configured' }),
      }
    }

    // Format phone number to E.164 format (required by Twilio)
    const cleanPhone = phone.replace(/\D/g, '')
    const formattedPhone = cleanPhone.length === 10 ? `+1${cleanPhone}` : (cleanPhone.startsWith('1') && cleanPhone.length === 11 ? `+${cleanPhone}` : `+${cleanPhone}`)

    // Verify code via Twilio Verify Service
    const verification = await client.verify.v2.services(verifySid).verificationChecks.create({
      to: formattedPhone,
      code: code,
    })

    if (verification.status !== 'approved') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'The verification code is incorrect or expired. Please try again.' }),
      }
    }

    // Update trial request status to active
    const trialStartDate = new Date()
    const trialEndDate = new Date(trialStartDate.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days

    const { data, error } = await supabase
      .from('follow_up_engine_trial_requests')
      .update({
        verification_status: 'verified',
        phone_verified: true,
        trial_status: 'active',
        trial_start_date: trialStartDate.toISOString(),
        trial_end_date: trialEndDate.toISOString(),
      })
      .eq('phone_number', phone)
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
