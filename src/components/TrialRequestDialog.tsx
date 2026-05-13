import { useState } from 'react'
import { X, AlertCircle, CheckCircle } from 'lucide-react'
import { submitTrialRequest, sendVerificationCode, verifyCode, storeReferral } from '../lib/supabase'

interface TrialRequestDialogProps {
  isOpen: boolean
  onClose: () => void
}

const GENERIC_EMAILS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'proton.me', 'aol.com']

export function TrialRequestDialog({ isOpen, onClose }: TrialRequestDialogProps) {
  const [step, setStep] = useState<'form' | 'verify' | 'success'>('form')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [genericEmailWarning, setGenericEmailWarning] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [trialRequestId, setTrialRequestId] = useState<string | null>(null)
  const [trialEndDate, setTrialEndDate] = useState<string | null>(null)
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    corporate_email: '',
    phone_number: '',
    company_name: '',
    role: '',
    company_size: '',
    biggest_followup_challenge: '',
    referral_code: '',
  })

  const getEmailDomain = (email: string) => {
    return email.split('@')[1]?.toLowerCase() || ''
  }

  const isGenericEmail = (email: string) => {
    return GENERIC_EMAILS.includes(getEmailDomain(email))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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

    setIsLoading(true)
    setError('')
    try {
      const result = await submitTrialRequest({
        first_name: formData.first_name,
        last_name: formData.last_name,
        corporate_email: formData.corporate_email,
        phone_number: formData.phone_number,
        company_name: formData.company_name,
        role: formData.role,
        company_size: formData.company_size,
        biggest_followup_challenge: formData.biggest_followup_challenge,
        referral_code: formData.referral_code || undefined,
      })

      setTrialRequestId(result.id)

      await sendVerificationCode(formData.corporate_email, result.id)
      setStep('verify')
    } catch (err) {
      setError('Failed to submit form. Please try again.')
      console.error('Trial request submission error:', err)
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

    if (!trialRequestId) {
      setError('Verification ID not found')
      return
    }

    setIsLoading(true)
    setError('')
    try {
      const result = await verifyCode(trialRequestId, verificationCode)

      if (result.verified) {
        const code = result.referral_code || result.generated_referral_code
        setTrialEndDate(result.trial_end_date)
        setReferralCode(code)

        await storeReferral({
          referral_code: code,
          referred_by_code: formData.referral_code || undefined,
          signup_email: formData.corporate_email,
          signup_name: `${formData.first_name} ${formData.last_name}`,
        })

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
            biggest_followup_challenge: '',
            referral_code: '',
          })
          setVerificationCode('')
          setTrialRequestId(null)
          setTrialEndDate(null)
          setReferralCode(null)
          onClose()
        }, 4000)
      } else {
        setError('Invalid verification code. Please try again.')
      }
    } catch (err) {
      setError('Verification failed. Please try again.')
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
                Get unlimited access to Follow-Up Engine for 7 days. We'll send a verification code to your corporate email.
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
                        We recommend using your corporate email for trial access.
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
                  <p className="text-xs text-muted-foreground mt-1">For setup and trial access confirmation</p>
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

          {step === 'verify' && (
            <>
              <h2 className="font-display text-xl font-semibold mb-2">Verify Your Email</h2>
              <p className="text-sm text-muted-foreground mb-6">
                We've sent a verification code to <strong>{formData.corporate_email}</strong>. Enter it below to activate your 7-day trial.
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
                  <p className="text-xs text-muted-foreground mt-1">Check your email for a 6-character code</p>
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
                  Your 7-day trial is now active. You have until <strong>{trialEndDate}</strong> to test Follow-Up Engine.
                </p>
              </div>
              {referralCode && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-xs text-blue-700 mb-2">
                    Your referral code:
                  </p>
                  <p className="text-sm font-mono font-semibold text-blue-900 mb-2">
                    {referralCode}
                  </p>
                  <p className="text-xs text-blue-700">
                    Share it with another SME owner or sales team. If they join, you may receive a launch discount when paid subscriptions open.
                  </p>
                </div>
              )}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-xs text-green-700">
                  Check your email for login details and a quick setup guide.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
