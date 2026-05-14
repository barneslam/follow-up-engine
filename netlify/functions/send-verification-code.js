function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Mock email sender (replace with Resend, SendGrid, etc.)
async function sendVerificationEmail(email, code) {
  // TODO: Integrate with email service (Resend, SendGrid, etc.)
  console.log(`[MOCK] Sending code ${code} to ${email}`)
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  try {
    const { email } = JSON.parse(event.body)

    const code = generateVerificationCode()

    // Send email
    await sendVerificationEmail(email, code)

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Verification code sent',
        code, // Remove in production (for testing only)
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
