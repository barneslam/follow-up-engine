const { createClient } = require('@supabase/supabase-js')
const { Resend } = require('resend')

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY
const resendApiKey = process.env.RESEND_API_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)
const resend = new Resend(resendApiKey)

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  try {
    const { email } = JSON.parse(event.body)

    const code = generateVerificationCode()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes

    // Store code in database
    const { error: dbError } = await supabase
      .from('follow_up_engine_trial_requests')
      .update({
        verification_code: code,
        verification_code_expires_at: expiresAt,
      })
      .eq('corporate_email', email)

    if (dbError) {
      console.error('Failed to store verification code:', dbError)
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Failed to store verification code' }),
      }
    }

    // Send email via Resend
    try {
      await resend.emails.send({
        from: 'onboarding@uat-galoras.site',
        to: email,
        subject: 'Your Follow-Up Engine Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
            <h2>Verify Your Email</h2>
            <p>Your verification code is:</p>
            <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 20px 0;">
              ${code}
            </div>
            <p>This code expires in 10 minutes.</p>
            <p style="color: #666; font-size: 12px;">Do not share this code with anyone.</p>
          </div>
        `,
      })
    } catch (emailErr) {
      console.error('Resend email error:', emailErr)
      // Don't fail the request if email fails to send
      // The code is stored and can be used for testing
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Verification code sent to email',
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
