import { useState } from 'react'
import { X } from 'lucide-react'
import { submitContactForm } from '../lib/supabase'

interface ContactDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactDialog({ isOpen, onClose }: ContactDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    interested_plan: '',
    biggest_challenge: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await submitContactForm(formData)
      setIsSuccess(true)
      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        interested_plan: '',
        biggest_challenge: '',
      })
      setTimeout(() => {
        setIsSuccess(false)
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
          <h2 className="font-display text-xl font-semibold mb-2">Get Early Access</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Join the waitlist for Follow-Up Engine. We'll reach out soon.
          </p>

          {isSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-green-800">
                Thank you! We've received your request and will be in touch soon.
              </p>
            </div>
          ) : (
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
                disabled={isLoading}
                className="w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition"
              >
                {isLoading ? 'Submitting...' : 'Request Access'}
              </button>
            </form>
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
