import { Section, SectionEyebrow, Container } from '../components/Layout'
import { Button } from '../components/Button'
import { ContactDialog } from '../components/ContactDialog'
import { TrialRequestDialog } from '../components/TrialRequestDialog'
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
    <div className="border-b border-slate/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 text-left font-semibold text-slate hover:text-primary transition"
      >
        <div className="flex items-center justify-between">
          <span className="text-base">{q}</span>
          <span className="text-xl text-slate/40">{isOpen ? '−' : '+'}</span>
        </div>
      </button>
      {isOpen && (
        <div className="pb-5 text-slate/70 text-sm leading-relaxed">
          {a}
        </div>
      )}
    </div>
  )
}

export function PricingPage() {
  const [contactOpen, setContactOpen] = useState(false)
  const [trialOpen, setTrialOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'solo' | 'launch' | 'team' | null>(null)

  const handleSelectPlan = (plan: 'solo' | 'launch' | 'team') => {
    if (plan === 'launch') {
      setTrialOpen(true)
    } else {
      setSelectedPlan(plan)
      setContactOpen(true)
    }
  }

  return (
    <>
      <ContactDialog isOpen={contactOpen} onClose={() => setContactOpen(false)} selectedPlan={selectedPlan} />
      <TrialRequestDialog isOpen={trialOpen} onClose={() => setTrialOpen(false)} />

      {/* Header */}
      <section className="border-b border-border bg-gradient-to-b from-white via-blue-50/40 to-slate-100/30 px-6 py-24 sm:py-32">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <SectionEyebrow>Pricing</SectionEyebrow>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-slate">
              Pricing that fits how you sell.
            </h1>
            <p className="mt-6 text-xl text-slate/70">
              Start with a single license, scale to a monthly plan, or set up your full team.
            </p>
          </div>
        </Container>
      </section>

      {/* Pricing Cards */}
      <Section className="bg-white">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3 lg:items-end">
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
      <Section className="bg-slate-50 border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate mb-12">
              Frequently asked questions
            </h2>
            <div className="bg-white border-2 border-slate/20 rounded-xl divide-y divide-slate/20 overflow-hidden shadow-sm">
              {FAQ.map((f) => (
                <AccordionItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section className="bg-fafbfc">
        <Container>
          <div className="rounded-3xl bg-gradient-to-r from-primary via-primary to-primary/90 px-8 py-20 text-center text-white sm:px-16 sm:py-28 shadow-lg">
            <h2 className="mx-auto max-w-3xl font-display text-4xl sm:text-5xl font-bold leading-tight">
              Ready to turn meetings into revenue next steps?
            </h2>
            <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
              Start with Solo Access or request a demo of the full team platform.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={() => setTrialOpen(true)}>
                Request Early Access
              </Button>
              <Button size="lg" className="border-white/40 bg-white/15 text-white hover:bg-white/25">
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
    <div className={`rounded-2xl border-2 transition-all cursor-pointer ${isPrimary
      ? 'border-primary bg-gradient-to-br from-blue-50 to-white shadow-lg ring-2 ring-primary/30 scale-105'
      : 'border-gray-light bg-white shadow-sm hover:shadow-md opacity-60'
    } p-8`}>
      {isPrimary && (
        <span className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary">
          Recommended
        </span>
      )}
      <h3 className={`font-display text-2xl font-bold ${isPrimary ? 'text-slate' : 'text-slate/70'}`}>{title}</h3>
      <div className="mt-4">
        <span className={`text-5xl font-bold ${isPrimary ? 'text-slate' : 'text-slate/70'}`}>{price}</span>
        {price !== 'Custom' && <span className={`text-sm ml-2 ${isPrimary ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>{title === 'Solo Access' ? 'one-time' : '/month'}</span>}
      </div>
      <p className={`mt-3 text-base ${isPrimary ? 'text-slate/80' : 'text-slate/60'}`}>{description}</p>

      <Button
        className="w-full mt-7 font-bold"
        variant={isPrimary ? 'primary' : 'outline'}
        onClick={onSelect}
      >
        {cta}
      </Button>

      <ul className="mt-9 space-y-4">
        {features.map((f) => (
          <li key={f} className={`flex gap-3 text-sm leading-relaxed ${isPrimary ? 'text-slate/80' : 'text-slate/60'}`}>
            <Check className={`h-5 w-5 shrink-0 mt-0 font-bold ${isPrimary ? 'text-primary' : 'text-gray-light'}`} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
