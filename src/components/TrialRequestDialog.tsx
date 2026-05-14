import { useState } from 'react'
import { X, AlertCircle, CheckCircle } from 'lucide-react'
import { submitTrialRequest, sendSmsOtp, verifySmsOtp, storeReferral } from '../lib/supabase'

interface TrialRequestDialogProps {
  isOpen: boolean
  onClose: () => void
}

const GENERIC_EMAILS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'proton.me', 'aol.com']

export function TrialRequestDialog({ isOpen, onClose }: TrialRequestDialogProps) {
  const [step, setStep] = useState<'form' | 'sms' | 'success'>('form')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [genericEmailWarning, setGenericEmailWarning] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [trialRequestId, setTrialRequestId] = useState<string | null>(null)
  const [phoneForSms, setPhoneForSms] = useState('')
  const [generatedReferralCode, setGeneratedReferralCode] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    corporate_email: '',
    phone_number: '',
    company_name: '',
    role: '',
    company_size: '',
    meetings_per_week: '',
    transcript_tool: '',
    biggest_followup_challenge: '',
    referral_code: '',
    consent_terms: false,
    consent_updates: false,
  })

  const getEmailDomain = (email: string) => {
    return email.split('@')[1]?.toLowerCase() || ''
  }

  const isGenericEmail = (email: string) => {
    return GENERIC_EMAILS.includes(getEmailDomain(email))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const isCheckbox = type === 'checkbox'
    setFormData(prev => ({ ...prev, [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value }))
    setError('')

    if (name === 'corporate_email') {
      setGenericEmailWarning(isGenericEmail(value))
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.first_name || !formData.last_name || !formData.corporate_email ||
        !formData.phone_number || !formData.company_name || !formData.role ||
        !formData.company_size || !formData.biggest_followup_challenge) {
      setError('Please fill in all required fields')
      return
    }

    if (!formData.corporate_email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    if (!formData.consent_terms) {
      setError('You must agree to the Terms and Conditions')
      return
    }

    setIsLoading(true)
    setError('')
    try {
      setPhoneForSms(formData.phone_number)
      await sendSmsOtp(formData.phone_number)
      setStep('sms')
    } catch (err) {
      setError('We could not send the verification code. Please check your phone number or try again.')
      console.error('Send OTP error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!verificationCode.trim()) {
      setError('Please enter the verification code')
      return
    }

    setIsLoading(true)
    setError('')
    try {
      const verifyResponse = await verifySmsOtp(phoneForSms, verificationCode)

      if (verifyResponse.verified) {
        const result = await submitTrialRequest({
          first_name: formData.first_name,
          last_name: formData.last_name,
          corporate_email: formData.corporate_email,
          phone_number: formData.phone_number,
          phone_verified: true,
          company_name: formData.company_name,
          role: formData.role,
          company_size: formData.company_size,
          meetings_per_week: formData.meetings_per_week || undefined,
          transcript_tool: formData.transcript_tool || undefined,
          biggest_followup_challenge: formData.biggest_followup_challenge,
          referral_code: formData.referral_code || undefined,
          consent_terms: formData.consent_terms,
          consent_updates: formData.consent_updates,
        })

        setTrialRequestId(result.id)
        setGeneratedReferralCode(result.generated_referral_code)

        if (formData.referral_code && result.generated_referral_code) {
          await storeReferral({
            referral_code: result.generated_referral_code,
            referred_by_code: formData.referral_code,
            signup_email: formData.corporate_email,
            signup_name: `${formData.first_name} ${formData.last_name}`,
          })
        }

        setStep('success')
        setTimeout(() => {
          setStep('form')
          setFormData({
            first_name: '',
            last_name: '',
            corporate_email: '',
            phone_number: '',
            company_name: '',
            role: '',
            company_size: '',
            meetings_per_week: '',
            transcript_tool: '',
            biggest_followup_challenge: '',
            referral_code: '',
            consent_terms: false,
            consent_updates: false,
          })
          setVerificationCode('')
          setTrialRequestId(null)
          setPhoneForSms('')
          setGeneratedReferralCode(null)
          onClose()
        }, 4000)
      }
    } catch (err) {
      setError('Your phone was verified, but we could not save your request. Please try again or email barnes@thestrategypitch.com.')
      console.error('Verification error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-md w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-surface rounded z-10"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6">
          {step === 'form' && (
            <>
              <h2 className="font-display text-xl font-semibold mb-2">Start Your 7-Day Trial</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Get unlimited access to Follow-Up Engine for 7 days. We'll verify your phone number and send you access details.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    name="corporate_email"
                    value={formData.corporate_email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="john@company.com"
                  />
                  {genericEmailWarning && formData.corporate_email && (
                    <div className="mt-2 flex gap-2 rounded-lg bg-yellow-50 border border-yellow-200 p-3">
                      <AlertCircle className="h-4 w-4 shrink-0 text-yellow-700 mt-0.5" />
                      <p className="text-xs text-yellow-700">
                        Business email is preferred for trial access.
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="+1 (555) 000-0000"
                  />
                  <p className="text-xs text-muted-foreground mt-1">We'll send a verification code here</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                    Role *
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Sales Manager"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                    Company Size *
                  </label>
                  <select
                    name="company_size"
                    value={formData.company_size}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select company size</option>
                    <option value="Solo">Solo</option>
                    <option value="2-5">2–5 employees</option>
                    <option value="6-20">6–20 employees</option>
                    <option value="21-50">21–50 employees</option>
                    <option value="51-100">51–100 employees</option>
                    <option value="100+">100+ employees</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                    Meetings Per Week
                  </label>
                  <select
                    name="meetings_per_week"
                    value={formData.meetings_per_week}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select meeting frequency</option>
                    <option value="1-2">1–2 meetings/week</option>
                    <option value="3-5">3–5 meetings/week</option>
                    <option value="6-10">6–10 meetings/week</option>
                    <option value="11-20">11–20 meetings/week</option>
                    <option value="20+">20+ meetings/week</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                    Transcript Tool Used
                  </label>
                  <select
                    name="transcript_tool"
                    value={formData.transcript_tool}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select tool</option>
                    <option value="Fathom">Fathom</option>
                    <option value="Zoom transcript">Zoom transcript</option>
                    <option value="Microsoft Teams">Microsoft Teams</option>
                    <option value="Google Meet">Google Meet</option>
                    <option value="Fireflies">Fireflies</option>
                    <option value="Otter">Otter</option>
                    <option value="Manual notes">Manual notes</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                    Biggest Follow-Up Challenge *
                  </label>
                  <select
                    name="biggest_followup_challenge"
                    value={formData.biggest_followup_challenge}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select challenge</option>
                    <option value="Follow-up emails take too long">Follow-up emails take too long</option>
                    <option value="Notes are messy">Notes are messy</option>
                    <option value="Action items are unclear">Action items are unclear</option>
                    <option value="CRM is not updated">CRM is not updated</option>
                    <option value="Manager does not know what happened">Manager does not know what happened</option>
                    <option value="Leads go quiet">Leads go quiet</option>
                    <option value="No consistent follow-up process">No consistent follow-up process</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                    Referral Code (Optional)
                  </label>
                  <input
                    type="text"
                    name="referral_code"
                    value={formData.referral_code}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Enter referral code if you have one"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consent_terms"
                      checked={formData.consent_terms}
                      onChange={handleChange}
                      className="w-4 h-4 mt-1"
                    />
                    <span className="text-xs text-foreground">
                      I agree to the Terms and Conditions and Privacy Policy *
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consent_updates"
                      checked={formData.consent_updates}
                      onChange={handleChange}
                      className="w-4 h-4 mt-1"
                    />
                    <span className="text-xs text-foreground">
                      I agree to receive product updates, trial information, and promotional messages
                    </span>
                  </label>
                </div>

                {error && (
                  <div className="flex gap-2 rounded-lg bg-red-50 border border-red-200 p-3">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-700 mt-0.5" />
                    <p className="text-xs text-red-700">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition"
                >
                  {isLoading ? 'Sending Code...' : 'Continue'}
                </button>
              </form>
            </>
          )}

          {step === 'sms' && (
            <>
              <h2 className="font-display text-xl font-semibold mb-2">Verify Your Phone</h2>
              <p className="text-sm text-muted-foreground mb-6">
                We've sent a verification code to <strong>{phoneForSms}</strong>. Enter it below to activate your 7-day trial.
              </p>

              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => {
                      setVerificationCode(e.target.value.toUpperCase())
                      setError('')
                    }}
                    maxLength={6}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent text-center tracking-widest font-mono text-lg"
                    placeholder="000000"
                    autoFocus
                  />
                  <p className="text-xs text-muted-foreground mt-1">Check your phone for a 6-character code</p>
                </div>

                {error && (
                  <div className="flex gap-2 rounded-lg bg-red-50 border border-red-200 p-3">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-700 mt-0.5" />
                    <p className="text-xs text-red-700">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || verificationCode.length !== 6}
                  className="w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition"
                >
                  {isLoading ? 'Verifying...' : 'Activate Trial'}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="w-full text-primary text-sm font-semibold hover:text-primary/80 py-2"
                >
                  Back to Form
                </button>
              </form>
            </>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Trial Activated!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Thank you. Your 7-day test request has been verified and received. We will send next steps and access details shortly.
                </p>
              </div>
              {generatedReferralCode && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-xs text-blue-700 mb-2">
                    Your referral code:
                  </p>
                  <p className="text-sm font-mono font-semibold text-blue-900 mb-2">
                    {generatedReferralCode}
                  </p>
                  <p className="text-xs text-blue-700">
                    Share it with another SME owner or sales team. If they join, you may receive a launch discount when paid subscriptions open.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
