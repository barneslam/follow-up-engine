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
    const { phone } = JSON.parse(event.body)

    if (!phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Phone number is required' }),
      }
    }

    console.log('[send-verification-code] function invoked')
    console.log(`[send-verification-code] phone exists: ${phone ? 'yes' : 'no'}`)
    console.log(`[send-verification-code] phone last 4 digits: ${phone.slice(-4)}`)
    console.log(`[send-verification-code] TWILIO_VERIFY_SERVICE_SID present: ${verifySid ? 'yes' : 'no'}`)

    if (!accountSid || !authToken || !verifySid) {
      console.error('[send-verification-code] Missing Twilio credentials')
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Twilio service not configured' }),
      }
    }

    // Send verification code via Twilio Verify Service
    const verification = await client.verify.v2.services(verifySid).verifications.create({
      to: phone,
      channel: 'sms',
    })

    console.log(`[send-verification-code] Twilio response status: ${verification.status}`)

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Verification code sent via SMS',
        verificationSid: verification.sid,
      }),
    }
  } catch (err) {
    console.error('[send-verification-code] Error:', err instanceof Error ? err.message : 'Unknown error')
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err instanceof Error ? err.message : 'Failed to send verification code',
      }),
    }
  }
}
