import { Section, SectionEyebrow, Container } from '../components/Layout'
import { Button } from '../components/Button'
import { ContactDialog } from '../components/ContactDialog'
import { Check } from 'lucide-react'
import { useState } from 'react'

const FAQ = [
  {
    q: "What's actually included in the Solo Access model?",
    a: "Full meeting prep workflow, transcript-based follow-up, document context input, follow-up email, WhatsApp summary, action items, manager update, and pipeline notes. One-time payment, no subscription.",
  },
  {
    q: "Is the first month really free on the Launch Plan?",
    a: "Yes. During launch, your first month on the monthly plan is on us. Cancel anytime before the month ends and you won't be charged.",
  },
  {
    q: "What does Team Setup involve?",
    a: "We work with you on a short onboarding to set up multi-user access, manager visibility, a shared output library, and any integrations you need. Pricing depends on team size and scope.",
  },
  {
    q: "Where does my data go?",
    a: "In the demo, outputs are generated locally in your browser. In production, transcripts and outputs are encrypted and stored in Supabase with enterprise-grade security.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes. If Solo Access doesn't fit your workflow within 14 days of purchase, email us for a full refund — no questions asked.",
  },
  {
    q: "Can I upgrade from Solo to Launch Plan later?",
    a: "Absolutely. Start with Solo, and upgrade to Launch Plan anytime. We'll credit your one-time purchase toward your first month.",
  },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 text-left font-medium text-foreground hover:text-primary transition"
      >
        <div className="flex items-center justify-between">
          <span>{q}</span>
          <span className="text-lg">{isOpen ? '−' : '+'}</span>
        </div>
      </button>
      {isOpen && (
        <div className="pb-4 text-muted-foreground text-sm">
          {a}
        </div>
      )}
    </div>
  )
}

export function PricingPage() {
  const [contactOpen, setContactOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'solo' | 'launch' | 'team' | null>(null)

  const handleSelectPlan = (plan: 'solo' | 'launch' | 'team') => {
    setSelectedPlan(plan)
    setContactOpen(true)
  }

  return (
    <>
      <ContactDialog isOpen={contactOpen} onClose={() => setContactOpen(false)} selectedPlan={selectedPlan} />

      {/* Header */}
      <section className="border-b border-border bg-surface px-6 py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <SectionEyebrow>Pricing</SectionEyebrow>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold">
              Pricing that fits how you sell.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Start with a single license, scale to a monthly plan, or set up your full team.
            </p>
          </div>
        </Container>
      </section>

      {/* Pricing Cards */}
      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <PricingCard
              title="Solo Access"
              price="$199.99"
              description="One-time purchase, lifetime access"
              features={[
                "Meeting prep workflow",
                "Transcript-based follow-up",
                "8 output types",
                "Document context upload",
                "All future updates included",
                "Email support",
              ]}
              cta="Get Solo Access"
              isPrimary={false}
              onSelect={() => handleSelectPlan('solo')}
            />
            <PricingCard
              title="Launch Plan"
              price="$99/mo"
              description="First month free during launch period"
              features={[
                "Everything in Solo Access",
                "Team visibility (2-3 users)",
                "Shared output library",
                "Manager dashboards",
                "Priority email support",
                "Monthly team check-ins",
              ]}
              cta="Start Launch Plan"
              isPrimary={true}
              onSelect={() => handleSelectPlan('launch')}
            />
            <PricingCard
              title="Team Setup"
              price="Custom"
              description="For sales teams with custom needs"
              features={[
                "Unlimited team members",
                "Multi-workspace setup",
                "CRM integrations (Salesforce, HubSpot)",
                "Dedicated onboarding",
                "SLA support & training",
                "Custom workflows",
              ]}
              cta="Request Team Setup"
              isPrimary={false}
              onSelect={() => handleSelectPlan('team')}
            />
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="bg-surface border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-8">
              Frequently asked questions
            </h2>
            <div className="border border-border rounded-lg divide-y divide-border overflow-hidden">
              {FAQ.map((f) => (
                <AccordionItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section>
        <Container>
          <div className="rounded-3xl bg-primary px-8 py-16 text-center text-white sm:px-16 sm:py-20">
            <h2 className="mx-auto max-w-3xl font-display text-3xl sm:text-4xl font-semibold">
              Ready to turn meetings into revenue next steps?
            </h2>
            <p className="mt-4 text-white/90">
              Start with Solo Access or request a demo of the full team platform.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" variant="secondary">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                Request Demo
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

function PricingCard({
  title,
  price,
  description,
  features,
  cta,
  isPrimary = false,
  onSelect
}: {
  title: string
  price: string
  description: string
  features: string[]
  cta: string
  isPrimary?: boolean
  onSelect: () => void
}) {
  return (
    <div className={`rounded-2xl border p-8 transition cursor-pointer hover:shadow-lg ${isPrimary ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-border bg-card hover:border-primary/50'}`}>
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <div className="mt-3">
        <span className="text-4xl font-semibold">{price}</span>
        {price !== 'Custom' && <span className="text-sm text-muted-foreground ml-1">{title === 'Solo Access' ? 'one-time' : '/month'}</span>}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>

      <Button
        className="w-full mt-6"
        variant={isPrimary ? 'primary' : 'outline'}
        onClick={onSelect}
      >
        {cta}
      </Button>

      <ul className="mt-8 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex gap-3 text-sm">
            <Check className="h-4 w-4 shrink-0 text-success mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
