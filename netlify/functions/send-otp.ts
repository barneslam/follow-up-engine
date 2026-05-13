import twilio from 'twilio'

const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const { phone } = JSON.parse(event.body || '{}')

    if (!phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Phone number is required' }),
      }
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID

    if (!accountSid || !authToken || !verifySid) {
      console.error('Twilio credentials not configured')
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'SMS service not configured' }),
      }
    }

    const client = twilio(accountSid, authToken)

    const verification = await client.verify.v2.services(verifySid).verifications.create({
      to: phone,
      channel: 'sms',
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        verificationSid: verification.sid,
      }),
    }
  } catch (error) {
    console.error('Send OTP error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send verification code',
      }),
    }
  }
}

export { handler }
