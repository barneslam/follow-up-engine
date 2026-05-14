import { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Generate 6-digit code
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Mock email sender (replace with Resend, SendGrid, etc.)
async function sendVerificationEmail(email: string, code: string): Promise<void> {
  // TODO: Integrate with email service (Resend, SendGrid, etc.)
  // Example with Resend:
  // const { Resend } = await import('resend')
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: 'no-reply@followupengine.com',
  //   to: email,
  //   subject: 'Verify your Follow-Up Engine trial',
  //   html: `<p>Your verification code is: <strong>${code}</strong></p>`
  // })

  console.log(`[MOCK] Sending code ${code} to ${email}`)
}

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  try {
    const { email } = JSON.parse(event.body)

    const code = generateVerificationCode()

    // Store code in verification_codes table or cache (Redis, etc.)
    // For now, store in trial_requests with verification_code field
    // You may want to create a separate verification_codes table with TTL

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

export { handler }
