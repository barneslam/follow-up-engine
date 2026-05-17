import { Section, SectionEyebrow, Container } from '../components/Layout'
import { Button } from '../components/Button'
import { ContactDialog } from '../components/ContactDialog'
import { TrialRequestDialog } from '../components/TrialRequestDialog'
import { Check } from 'lucide-react'
import { useState } from 'react'

const FAQ = [
  {
    q: "What's included in Beta Team Trial?",
    a: "Beta Team Trial includes the core follow-up workflow, transcript-based outputs, follow-up email drafts, WhatsApp summaries, and action items during the launch testing period.",
  },
  {
    q: "What is the difference between Beta Team Trial and Launch Plan?",
    a: "Beta Team Trial is a lower-priced early access option. Launch Plan is the primary plan for active sales teams and includes broader usage, manager visibility, output library, priority support, and first-month-free launch access.",
  },
  {
    q: "Is the first month really free on the Launch Plan?",
    a: "Yes. During launch, the first month on the Launch Plan is free for selected users. Cancel anytime before the month ends and you will not be charged.",
  },
  {
    q: "Why are Solo Access and Team Setup marked Coming Soon?",
    a: "We are focusing the launch on the monthly subscription model first. Solo Access and Team Setup may be added later after launch validation.",
  },
  {
    q: "Where does my data go?",
    a: "In the demo, outputs are generated for evaluation purposes. Production use with real client data requires appropriate consent, security controls, retention settings, and deletion workflows.",
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
        <div className="flex items-center justify-between gap-6">
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

      <section className="border-b border-border bg-gradient-to-b from-white via-[#f0f7ff]/30 to-[#f5f4f1] px-6 py-24 sm:py-32">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <SectionEyebrow>Pricing</SectionEyebrow>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-slate">
              Beta access for SMB sales teams.
            </h1>
            <p className="mt-6 text-xl text-slate/70">
              Start with a 14-day team beta. Then continue at $59/month for up to 3 users.
            </p>

            <div className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-4">
              <div className="h-px flex-1 bg-primary/50" />
              <span className="rounded-full border border-amber-500 bg-amber-200 px-5 py-2 text-sm font-bold uppercase tracking-wide text-amber-950 shadow-sm">
                Beta Special
              </span>
              <div className="h-px flex-1 bg-primary/50" />
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-[#fefdf9]">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4 items-start">
            <PricingCard
              title="Beta Team Trial"
              price="14-day free trial"
              description="14-day free beta for SMB sales teams"
              features={[
                "Rep follow-up workflow",
                "Transcript-based outputs",
                "Email and WhatsApp follow-ups",
                "Action items and owners",
                "Limited launch access",
              ]}
              cta="Request Beta Team Trial"
              onSelect={() => handleSelectPlan('launch')}
            />

            <PricingCard
              title="Launch Plan"
              price="$59"
              description="Then $59/month for up to 3 users"
              features={[
                "Everything in Beta Team Trial",
                "Unlimited follow-up packs",
                "Manager update and visibility",
                "Shared team output history",
                "Priority support",
                "14-day free beta trial",
                "Calendar integration coming next",
              ]}
              cta="Start Launch Plan"
              isPrimary
              onSelect={() => handleSelectPlan('launch')}
            />

            <PricingCard
              title="Solo Access"
              price="Coming Soon"
              description="Future solo operator option"
              features={[
                "Individual workspace",
                "One-time access model",
                "Personal output library",
                "Future self-serve checkout",
              ]}
              cta="Coming Soon"
              isDisabled
              onSelect={() => {}}
            />

            <PricingCard
              title="Team Setup"
              price="Coming Soon"
              description="Future guided team implementation"
              features={[
                "Team onboarding",
                "CRM integrations",
                "Manager dashboards",
                "Custom workflows",
                "Dedicated support",
              ]}
              cta="Coming Soon"
              isDisabled
              onSelect={() => {}}
            />
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f8f7f6] border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate mb-12">
              Frequently asked questions
            </h2>
            <div className="bg-[#f4f7fb] border-2 border-slate/20 rounded-xl divide-y divide-slate/20 overflow-hidden shadow-sm">
              {FAQ.map((f) => (
                <AccordionItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f4f7fb]">
        <Container>
          <div className="rounded-3xl bg-gradient-to-r from-primary via-primary to-primary/90 px-8 py-20 text-center text-white sm:px-16 sm:py-28 shadow-lg">
            <h2 className="mx-auto max-w-3xl font-display text-4xl sm:text-5xl font-bold leading-tight">
              Ready to turn meetings into rep follow-up and manager visibility?
            </h2>
            <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
              Start with beta access or request the launch plan for active sales teams.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={() => setTrialOpen(true)}>
                Request Early Access
              </Button>
              <Button size="lg" className="border-white/40 bg-[#f4f7fb]/15 text-white hover:bg-[#f4f7fb]/25">
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
  isDisabled = false,
  onSelect,
}: {
  title: string
  price: string
  description: string
  features: string[]
  cta: string
  isPrimary?: boolean
  isDisabled?: boolean
  onSelect: () => void
}) {
  const isComingSoon = price.includes('Coming')

  return (
    <div className={`flex h-full min-h-[560px] flex-col rounded-3xl border p-8 transition-all ${
      isDisabled
        ? 'border-slate-200 bg-slate-50 opacity-60'
        : isPrimary
          ? 'border-primary bg-gradient-to-br from-[#f0f7ff] to-white shadow-xl ring-2 ring-primary/20 xl:scale-105'
          : 'border-slate-200 bg-[#f4f7fb] shadow-md hover:shadow-xl'
    }`}>
      {isPrimary && (
        <span className="mb-4 inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Recommended
        </span>
      )}

      {isDisabled && (
        <span className="mb-4 inline-block w-fit rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate/60">
          Coming Soon
        </span>
      )}

      <h3 className="min-h-[58px] font-display text-2xl font-bold leading-tight text-slate">
        {title}
      </h3>

      <div className="mt-4 flex min-h-[92px] flex-col justify-end">
        <span className={`${isComingSoon ? 'text-4xl' : 'text-5xl'} font-bold leading-tight text-slate`}>
          {price}
        </span>

        {!isComingSoon && (
          <span className="mt-1 text-sm text-muted-foreground">
            /month
          </span>
        )}
      </div>

      <p className="mt-4 min-h-[56px] text-base leading-relaxed text-slate/70">
        {description}
      </p>

      <Button
        className="mt-7 w-full font-bold"
        variant={isPrimary ? 'primary' : 'outline'}
        onClick={isDisabled ? undefined : onSelect}
        disabled={isDisabled}
      >
        {cta}
      </Button>

      <ul className="mt-9 space-y-4">
        {features.map((f) => (
          <li key={f} className="flex gap-3 text-sm leading-relaxed text-slate/70">
            <Check className={`h-5 w-5 shrink-0 ${isPrimary ? 'text-primary' : 'text-slate/40'}`} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}