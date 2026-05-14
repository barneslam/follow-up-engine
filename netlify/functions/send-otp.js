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
    const { phone } = JSON.parse(event.body)

    if (!phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Phone number is required' }),
      }
    }

    console.log('[send-otp] function invoked')
    console.log(`[send-otp] phone number received, masked: ${phone.slice(-4).padStart(phone.length, '*')}`)
    console.log(`[send-otp] Twilio Verify Service SID present: ${verifySid ? 'yes' : 'no'}`)

    if (!accountSid || !authToken || !verifySid) {
      console.error('[send-otp] Missing Twilio credentials')
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

    console.log(`[send-otp] Twilio response status: ${verification.status}`)

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Verification code sent',
        verificationSid: verification.sid,
      }),
    }
  } catch (err) {
    console.error('[send-otp] Error:', err instanceof Error ? err.message : 'Unknown error')
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err instanceof Error ? err.message : 'Failed to send verification code',
      }),
    }
  }
}
