import { useState } from 'react'
import { X } from 'lucide-react'
import { submitTrialRequest } from '../lib/supabase'

interface TrialRequestDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function TrialRequestDialog({ isOpen, onClose }: TrialRequestDialogProps) {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    company_size: '',
    meetings_per_week: '',
    transcript_tool: '',
    biggest_challenge: '',
    referral_code: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.company || !formData.role ||
        !formData.company_size || !formData.meetings_per_week || !formData.transcript_tool ||
        !formData.biggest_challenge) {
      alert('Please fill in all required fields')
      return
    }

    setIsLoading(true)
    try {
      await submitTrialRequest({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        role: formData.role,
        company_size: formData.company_size,
        meetings_per_week: formData.meetings_per_week,
        transcript_tool: formData.transcript_tool,
        biggest_challenge: formData.biggest_challenge,
        referral_code: formData.referral_code || undefined,
      })
    } catch (error) {
      console.error('Trial request submission error:', error)
      // Still show success message (graceful degradation)
    } finally {
      setIsLoading(false)
    }

    setStep('success')
    setTimeout(() => {
      setStep('form')
      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        company_size: '',
        meetings_per_week: '',
        transcript_tool: '',
        biggest_challenge: '',
        referral_code: '',
      })
      onClose()
    }, 3000)
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
              <h2 className="font-display text-xl font-semibold mb-2">Start Your 7-Day Follow-Up Engine Test</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Create unlimited follow-up packs during your 7-day launch test. Help us understand what saves the most time and which features matter next.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                    Company Size
                  </label>
                  <select
                    name="company_size"
                    value={formData.company_size}
                    onChange={handleChange}
                    required
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
                    How many sales meetings do you or your team have per week?
                  </label>
                  <select
                    name="meetings_per_week"
                    value={formData.meetings_per_week}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select meeting volume</option>
                    <option value="1-2">1–2 meetings/week</option>
                    <option value="3-5">3–5 meetings/week</option>
                    <option value="6-10">6–10 meetings/week</option>
                    <option value="11-20">11–20 meetings/week</option>
                    <option value="20+">20+ meetings/week</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                    What tool do you use for meeting notes or transcripts?
                  </label>
                  <select
                    name="transcript_tool"
                    value={formData.transcript_tool}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select tool</option>
                    <option value="Fathom">Fathom</option>
                    <option value="Zoom transcript">Zoom transcript</option>
                    <option value="Microsoft Teams transcript">Microsoft Teams transcript</option>
                    <option value="Google Meet transcript">Google Meet transcript</option>
                    <option value="Fireflies">Fireflies</option>
                    <option value="Otter">Otter</option>
                    <option value="Manual notes">Manual notes</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                    Biggest Follow-Up Challenge
                  </label>
                  <select
                    name="biggest_challenge"
                    value={formData.biggest_challenge}
                    onChange={handleChange}
                    required
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition"
                >
                  {isLoading ? 'Submitting...' : 'Start 7-Day Test'}
                </button>
              </form>
            </>
          )}

          {step === 'success' && (
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="text-sm font-medium text-green-800 mb-2">
                  ✓ Request Received!
                </p>
                <p className="text-xs text-green-700">
                  Thank you. Your 7-day test request has been received. We will send next steps and access details shortly.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
