import { Section, SectionEyebrow, Container } from '../components/Layout'
import { Button } from '../components/Button'
import { Users, BarChart3, Zap, Shield, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { submitTeamSetupRequest } from '../lib/supabase'

const FEATURES = [
  {
    icon: Users,
    title: "Multi-User Access",
    desc: "Set up unlimited team members with role-based access control. Managers see everything, reps see their own outputs."
  },
  {
    icon: BarChart3,
    title: "Manager Dashboards",
    desc: "Real-time visibility into all team meetings, follow-ups, and pipeline impact. Track metrics that matter."
  },
  {
    icon: Zap,
    title: "CRM Integrations",
    desc: "Connect to Salesforce, HubSpot, or Pipedrive. Follow-up outputs sync automatically to your pipeline."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "GDPR-compliant data handling, SSO support, and end-to-end encryption for all transcripts and outputs."
  },
]

export function TeamSetupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '',
    integrations: '',
    timeline: '',
    budget: '',
    challenge: '',
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    await submitTeamSetupRequest({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      team_size: formData.teamSize,
      integrations: formData.integrations,
      timeline: formData.timeline,
      budget: formData.budget,
      challenge: formData.challenge,
    })

    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        teamSize: '',
        integrations: '',
        timeline: '',
        budget: '',
        challenge: '',
      })
    }, 3000)
  } catch (error) {
    console.error('Team setup submission error:', error)
    alert('We could not submit your request. Please email barnes@thestrategypitch.com directly.')
  }
}
  

  return (
    <>
      {/* Header */}
      <section className="border-b border-border bg-surface px-6 py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <SectionEyebrow>Team setup</SectionEyebrow>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold">
              Build a sales follow-up system for your entire team.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              From individual contributors to enterprise sales teams. Custom setup, integrations, and dedicated support.
            </p>
          </div>
        </Container>
      </section>

      {/* Features */}
      <Section className="border-b border-border">
        <Container>
          <div className="max-w-3xl mb-12">
            <SectionEyebrow>What's included</SectionEyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">
              Everything your team needs to execute at scale.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-6">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Setup Process */}
      <Section className="bg-surface border-b border-border">
        <Container>
          <div className="max-w-3xl mb-12">
            <SectionEyebrow>How it works</SectionEyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">
              A simple setup process designed for your team.
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl">
            <SetupStep
              number="1"
              title="Discovery Call"
              description="We learn about your team structure, workflows, pain points, and integration needs. Takes 30 minutes."
            />
            <SetupStep
              number="2"
              title="Custom Configuration"
              description="We set up user roles, CRM connections, manager dashboards, and any custom workflows your team needs."
            />
            <SetupStep
              number="3"
              title="Team Training"
              description="Live onboarding session with your team to ensure everyone knows how to use Follow-Up Engine effectively."
            />
            <SetupStep
              number="4"
              title="Go Live"
              description="Your team starts generating follow-up packs immediately. We provide 30 days of enhanced support."
            />
          </div>
        </Container>
      </Section>

      {/* Request Form */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold mb-8">Request a team setup consultation</h2>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <h3 className="font-semibold text-green-800 mb-2">Thank you!</h3>
                <p className="text-sm text-green-700">
                  We've received your request. Our team will reach out within 24 hours to schedule your discovery call.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 border border-border rounded-lg p-8 bg-surface">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Company name"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-2">
                      Team Size
                    </label>
                    <select
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Select size</option>
                      <option value="2-5">2-5 salespeople</option>
                      <option value="6-15">6-15 salespeople</option>
                      <option value="16-50">16-50 salespeople</option>
                      <option value="50+">50+ salespeople</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-2">
                      CRM Integrations Needed
                    </label>
                    <select
                      name="integrations"
                      value={formData.integrations}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Select CRM</option>
                      <option value="salesforce">Salesforce</option>
                      <option value="hubspot">HubSpot</option>
                      <option value="pipedrive">Pipedrive</option>
                      <option value="other">Other / None for now</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-2">
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP (this week)</option>
                      <option value="2weeks">Within 2 weeks</option>
                      <option value="month">Within a month</option>
                      <option value="later">Exploring options</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-2">
                      Estimated Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Select range</option>
                      <option value="under-500">Under $500/month</option>
                      <option value="500-2k">$500–$2,000/month</option>
                      <option value="2k-5k">$2,000–$5,000/month</option>
                      <option value="5k+">$5,000+/month</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-2">
                    Biggest Team Challenge
                  </label>
                  <textarea
                    name="challenge"
                    value={formData.challenge}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="What's your team's biggest challenge with meeting follow-ups?"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Request Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </Container>
      </Section>
    </>
  )
}

function SetupStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-primary font-semibold">
          {number}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
