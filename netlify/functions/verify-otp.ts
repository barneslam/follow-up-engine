import twilio from 'twilio'

const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const { phone, code } = JSON.parse(event.body || '{}')

    if (!phone || !code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Phone number and verification code required' }),
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

    const verification = await client.verify.v2.services(verifySid).verificationChecks.create({
      to: phone,
      code: code,
    })

    if (verification.status === 'approved') {
      return {
        statusCode: 200,
        body: JSON.stringify({
          verified: true,
        }),
      }
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({
          verified: false,
          error: 'Invalid verification code',
        }),
      }
    }
  } catch (error) {
    console.error('Verify OTP error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Verification failed',
      }),
    }
  }
}

export { handler }
