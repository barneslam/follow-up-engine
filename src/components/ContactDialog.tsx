import { useState } from 'react'
import { X } from 'lucide-react'
import { submitContactForm, sendSmsOtp, verifySmsOtp } from '../lib/supabase'

function getPlanValue(plan: 'solo' | 'launch' | 'team' | null | undefined): string {
  switch (plan) {
    case 'solo':
      return 'solo'
    case 'launch':
      return 'launch'
    case 'team':
      return 'team'
    default:
      return ''
  }
}

interface ContactDialogProps {
  isOpen: boolean
  onClose: () => void
  selectedPlan?: 'solo' | 'launch' | 'team' | null
}

export function ContactDialog({ isOpen, onClose, selectedPlan }: ContactDialogProps) {
  const [step, setStep] = useState<'form' | 'otp' | 'consent' | 'success'>('form')
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    interested_plan: getPlanValue(selectedPlan),
    biggest_challenge: '',
  })
  const [otpCode, setOtpCode] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [consentUpdates, setConsentUpdates] = useState(false)
  const [consentTerms, setConsentTerms] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.phone.trim()) {
      alert('Please enter a phone number')
      return
    }

    setIsLoading(true)
    try {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/
      if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
        alert('Please enter a valid phone number')
        setIsLoading(false)
        return
      }

      await sendSmsOtp(formData.phone)
      setOtpSent(true)
      setStep('otp')
    } catch (error) {
      console.error('OTP send error:', error)
      alert('Failed to send OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!otpCode.trim()) {
      alert('Please enter the OTP code')
      return
    }

    setIsLoading(true)
    try {
      const isValid = await verifySmsOtp(formData.phone, otpCode)
      if (isValid) {
        setStep('consent')
      } else {
        alert('Invalid OTP code. Please try again.')
      }
    } catch (error) {
      console.error('OTP verification error:', error)
      alert('Failed to verify OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!consentTerms) {
      alert('Please agree to the terms and conditions')
      return
    }

    setIsLoading(true)
    try {
      await submitContactForm({
        ...formData,
        consent_updates: consentUpdates,
        consent_terms: consentTerms,
      })
      setStep('success')
      setTimeout(() => {
        setStep('form')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          role: '',
          interested_plan: '',
          biggest_challenge: '',
        })
        setOtpCode('')
        setOtpSent(false)
        setConsentUpdates(false)
        setConsentTerms(false)
        onClose()
      }, 2000)
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Failed to submit form. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-surface rounded"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6">
          {step === 'form' && (
            <>
              <h2 className="font-display text-xl font-semibold mb-2">Get Early Access</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Join the waitlist for Follow-Up Engine. We'll verify your phone to prevent spam.
              </p>

              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="+1 (555) 123-4567"
                  />
                  <p className="text-xs text-muted-foreground mt-1">We'll send a verification code to this number</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Your role"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                    Interested Plan
                  </label>
                  <select
                    name="interested_plan"
                    value={formData.interested_plan}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select a plan</option>
                    <option value="solo">Solo Access ($199.99)</option>
                    <option value="launch">Launch Plan ($99/month)</option>
                    <option value="team">Team Setup</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                    Biggest Follow-Up Challenge
                  </label>
                  <textarea
                    name="biggest_challenge"
                    value={formData.biggest_challenge}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="What's your biggest follow-up challenge?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !formData.phone}
                  className="w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition"
                >
                  {isLoading ? 'Sending OTP...' : 'Continue & Verify Phone'}
                </button>
              </form>
            </>
          )}

          {step === 'otp' && otpSent && (
            <>
              <h2 className="font-display text-xl font-semibold mb-2">Verify Your Phone</h2>
              <p className="text-sm text-muted-foreground mb-6">
                We've sent a code to {formData.phone}. Enter it below to continue.
              </p>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    maxLength={6}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm text-center font-mono focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="000000"
                  />
                  <p className="text-xs text-muted-foreground mt-1">6-digit code from your SMS</p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition"
                >
                  {isLoading ? 'Verifying...' : 'Verify Code'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep('form')
                    setOtpSent(false)
                    setOtpCode('')
                  }}
                  className="w-full text-sm text-muted-foreground hover:text-foreground"
                >
                  Back to form
                </button>
              </form>
            </>
          )}

          {step === 'consent' && (
            <>
              <h2 className="font-display text-xl font-semibold mb-2">Contact Permissions</h2>
              <p className="text-sm text-muted-foreground mb-6">
                We respect your privacy. Let us know how we can reach you.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentUpdates}
                      onChange={(e) => setConsentUpdates(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-border"
                    />
                    <span className="text-sm text-muted-foreground">
                      Yes, I'd like to receive updates about Follow-Up Engine via email and SMS
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentTerms}
                      onChange={(e) => setConsentTerms(e.target.checked)}
                      required
                      className="mt-1 w-4 h-4 rounded border-border"
                    />
                    <span className="text-sm text-muted-foreground">
                      I agree to the{' '}
                      <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Terms and Conditions
                      </a>
                      {' '}and Privacy Policy
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !consentTerms}
                  className="w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition"
                >
                  {isLoading ? 'Submitting...' : 'Complete Access Request'}
                </button>
              </form>
            </>
          )}

          {step === 'success' && (
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="text-sm font-medium text-green-800 mb-2">
                  ✓ Request Submitted!
                </p>
                <p className="text-xs text-green-700">
                  Thank you for verifying your phone. We'll reach out soon with your early access details.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function useContactDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    Component: <ContactDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />,
  }
}
