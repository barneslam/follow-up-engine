const twilio = require('twilio')

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID

const client = twilio(accountSid, authToken)

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

    console.log('[verify-otp] function invoked')
    console.log(`[verify-otp] phone number received, masked: ${phone.slice(-4).padStart(phone.length, '*')}`)
    console.log(`[verify-otp] Twilio Verify Service SID present: ${verifySid ? 'yes' : 'no'}`)

    if (!accountSid || !authToken || !verifySid) {
      console.error('[verify-otp] Missing Twilio credentials')
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Twilio service not configured' }),
      }
    }

    // Verify code via Twilio Verify Service
    const verification = await client.verify.v2.services(verifySid).verificationChecks.create({
      to: phone,
      code: code,
    })

    console.log(`[verify-otp] Twilio response status: ${verification.status}`)

    if (verification.status === 'approved') {
      return {
        statusCode: 200,
        body: JSON.stringify({
          verified: true,
          message: 'Phone number verified successfully',
        }),
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          verified: false,
          error: 'The verification code is incorrect or expired. Please try again.',
        }),
      }
    }
  } catch (err) {
    console.error('[verify-otp] Error:', err instanceof Error ? err.message : 'Unknown error')
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err instanceof Error ? err.message : 'Failed to verify code',
      }),
    }
  }
}
