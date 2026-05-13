import { useState } from 'react'
import { X, CheckCircle } from 'lucide-react'
import { submitSurveyResponse } from '../lib/supabase'

interface SurveyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SurveyModal({ isOpen, onClose }: SurveyModalProps) {
  const [step, setStep] = useState<'survey' | 'success'>('survey')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    time_saved: '',
    most_valuable_output: '',
    pricing_49: '',
    pricing_99_fathom: '',
    phase2_feature: '',
    stopping_factor: '',
    referral_likelihood: '',
    referral_email: '',
    open_feedback: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.time_saved || !formData.most_valuable_output || !formData.pricing_49 ||
        !formData.pricing_99_fathom || !formData.phase2_feature || !formData.stopping_factor ||
        !formData.referral_likelihood) {
      setError('Please answer all required questions')
      return
    }

    setIsLoading(true)
    try {
      await submitSurveyResponse({
        time_saved: formData.time_saved,
        most_valuable_output: formData.most_valuable_output,
        pricing_49: formData.pricing_49,
        pricing_99_fathom: formData.pricing_99_fathom,
        phase2_feature: formData.phase2_feature,
        stopping_factor: formData.stopping_factor,
        referral_likelihood: formData.referral_likelihood,
        referral_email: formData.referral_email || null,
        open_feedback: formData.open_feedback || null,
      })
    } catch (err) {
      console.error('Survey submission error:', err)
      // Still show success message (graceful degradation)
    } finally {
      setIsLoading(false)
    }

    setStep('success')
    setTimeout(() => {
      setStep('survey')
      setFormData({
        time_saved: '',
        most_valuable_output: '',
        pricing_49: '',
        pricing_99_fathom: '',
        phase2_feature: '',
        stopping_factor: '',
        referral_likelihood: '',
        referral_email: '',
        open_feedback: '',
      })
      onClose()
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-surface rounded z-10"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 sm:p-8">
          {step === 'survey' && (
            <>
              <h2 className="font-display text-2xl font-semibold mb-2">Help Shape Follow-Up Engine</h2>
              <p className="text-sm text-muted-foreground mb-2">
                Tell us what would make this worth paying for.
              </p>
              <p className="text-xs text-muted-foreground mb-8">
                Your answers help us decide what to build next and whether the product should stay at $49/month or move to a higher feature tier.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Q1: Time Saved */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    How much time would this save after a typical sales meeting? *
                  </label>
                  <div className="space-y-2">
                    {[
                      'Less than 15 minutes',
                      '15–30 minutes',
                      '30–60 minutes',
                      '60–90 minutes',
                      '90+ minutes',
                    ].map(option => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="time_saved"
                          value={option}
                          checked={formData.time_saved === option}
                          onChange={handleChange}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-foreground">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Q2: Most Valuable Output */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Which output is most valuable to you? *
                  </label>
                  <select
                    name="most_valuable_output"
                    value={formData.most_valuable_output}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select an option</option>
                    <option value="Follow-up email">Follow-up email</option>
                    <option value="WhatsApp / short message summary">WhatsApp / short message summary</option>
                    <option value="Action items">Action items</option>
                    <option value="Manager update">Manager update</option>
                    <option value="Pre-meeting agenda">Pre-meeting agenda</option>
                    <option value="Questions to ask">Questions to ask</option>
                    <option value="Pipeline / next-step note">Pipeline / next-step note</option>
                    <option value="All of them together">All of them together</option>
                  </select>
                </div>

                {/* Q3: $49/month Pricing */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Would you pay $49/month for this if it helped your team follow up faster? *
                  </label>
                  <div className="space-y-2">
                    {['Yes', 'Maybe', 'No'].map(option => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="pricing_49"
                          value={option}
                          checked={formData.pricing_49 === option}
                          onChange={handleChange}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-foreground">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Q4: $99/month with Fathom + Calendar */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    If Follow-Up Engine connected directly to Fathom and your calendar, would $99/month feel reasonable? *
                  </label>
                  <div className="space-y-2">
                    {['Yes', 'Maybe', 'No', 'Only if it also connects to CRM'].map(option => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="pricing_99_fathom"
                          value={option}
                          checked={formData.pricing_99_fathom === option}
                          onChange={handleChange}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-foreground">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Q5: Phase 2 Feature Priority */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Which Phase 2 feature matters most? *
                  </label>
                  <select
                    name="phase2_feature"
                    value={formData.phase2_feature}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select a feature</option>
                    <option value="Fathom integration">Fathom integration</option>
                    <option value="Google Calendar / Outlook integration">Google Calendar / Outlook integration</option>
                    <option value="CRM integration">CRM integration</option>
                    <option value="Saved meeting history">Saved meeting history</option>
                    <option value="Manager dashboard">Manager dashboard</option>
                    <option value="Team templates">Team templates</option>
                    <option value="Automatic follow-up generation">Automatic follow-up generation</option>
                    <option value="Pipeline impact scoring">Pipeline impact scoring</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Q6: Stopping Factors */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    What would stop you from using this? *
                  </label>
                  <select
                    name="stopping_factor"
                    value={formData.stopping_factor}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select a reason</option>
                    <option value="Price">Price</option>
                    <option value="Data privacy concern">Data privacy concern</option>
                    <option value="Already use another tool">Already use another tool</option>
                    <option value="Too much setup">Too much setup</option>
                    <option value="Need CRM integration">Need CRM integration</option>
                    <option value="Need Fathom integration">Need Fathom integration</option>
                    <option value="Need team features">Need team features</option>
                    <option value="Not enough value">Not enough value</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Q7: Referral Likelihood */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Would you refer another SME owner, consultant, or sales team to try this? *
                  </label>
                  <div className="space-y-2">
                    {['Yes', 'Maybe', 'No'].map(option => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="referral_likelihood"
                          value={option}
                          checked={formData.referral_likelihood === option}
                          onChange={handleChange}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-foreground">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Q8: Referral Email */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Optional: Who would you refer?
                  </label>
                  <input
                    type="email"
                    name="referral_email"
                    value={formData.referral_email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Their email address (we'll credit you for the referral)</p>
                </div>

                {/* Q9: Open Feedback */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    What would make Follow-Up Engine a must-have for your business?
                  </label>
                  <textarea
                    name="open_feedback"
                    value={formData.open_feedback}
                    onChange={handleChange}
                    placeholder="Share your thoughts..."
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  />
                </div>

                {error && (
                  <div className="flex gap-2 rounded-lg bg-red-50 border border-red-200 p-3">
                    <p className="text-xs text-red-700">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition"
                >
                  {isLoading ? 'Submitting...' : 'Submit Feedback'}
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
                <h3 className="font-semibold text-foreground mb-2">Thank You!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your feedback helps shape the next version of Follow-Up Engine.
                </p>
                <p className="text-sm text-foreground font-medium mb-2">
                  As a launch tester, you're eligible for a founder discount when subscriptions open.
                </p>
                <p className="text-xs text-muted-foreground">
                  Final launch discount will be confirmed before paid subscriptions begin.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
