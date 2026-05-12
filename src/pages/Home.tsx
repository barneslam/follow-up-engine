import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { Section, SectionEyebrow, Container } from '../components/Layout'
import {
  Calendar, FileUp, Target, Sparkles, FileText, Send, UserCheck, ChevronRight,
  X, Check, FileSearch, MessagesSquare, ListChecks, Mail, MessageCircle, UserCog, TrendingUp, ArrowRight,
} from 'lucide-react'
import { useState } from 'react'
import { ContactDialog } from '../components/ContactDialog'

const PROBLEMS = [
  "Meeting agendas are created too late or not at all",
  "Salespeople forget to ask key questions",
  "Relevant proposals and documents are scattered",
  "Follow-up emails take too long",
  "WhatsApp summaries are inconsistent",
  "Internal managers do not know what was promised",
  "Action items are not assigned clearly",
  "Pipeline impact is not captured",
]

const WORKFLOW = [
  { icon: Calendar, label: "Calendar Meeting" },
  { icon: FileUp, label: "Upload Documents" },
  { icon: Target, label: "Select Objective" },
  { icon: Sparkles, label: "Generate Prep Pack" },
  { icon: FileText, label: "Add Transcript" },
  { icon: Send, label: "Generate Follow-Up" },
  { icon: UserCheck, label: "Manager Update" },
]

const OUTPUTS = [
  { icon: FileSearch, title: "Client-facing agenda", desc: "Structured agenda the client sees ahead of time." },
  { icon: MessagesSquare, title: "Questions to ask", desc: "Right questions for the objective and stage." },
  { icon: Mail, title: "Follow-up email", desc: "On-tone email, ready to send within minutes." },
  { icon: MessageCircle, title: "WhatsApp summary", desc: "Short, friendly recap for fast channels." },
  { icon: ListChecks, title: "Action items", desc: "Owners and deadlines, clearly captured." },
  { icon: UserCog, title: "Manager update", desc: "What was promised and what's next." },
  { icon: TrendingUp, title: "Pipeline impact", desc: "Stage changes and revenue implications." },
  { icon: ArrowRight, title: "Next steps", desc: "Concrete moves to keep momentum." },
]

const BEST_FOR = [
  "SMEs with regular sales calls",
  "Founder-led companies",
  "Consultants and agencies",
  "Sales teams using Fathom or Zoom",
  "Companies sending proposals or quotes",
  "Managers who need better visibility",
]

const NOT_FOR = [
  "Companies needing full CRM immediately",
  "Teams unwilling to use transcripts",
  "Companies expecting guaranteed outcomes",
]

const INTEGRATIONS = ["Fathom", "Google Calendar", "Outlook", "Google Drive", "Salesforce", "HubSpot", "Pipedrive", "Manager Dashboards"]

function PricingCard({
  title,
  price,
  description,
  features,
  cta,
  isPrimary = false
}: {
  title: string
  price: string
  description: string
  features: string[]
  cta: string
  isPrimary?: boolean
}) {
  return (
    <div className={`rounded-2xl border p-8 ${isPrimary ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <div className="mt-2">
        <span className="text-3xl font-semibold">{price}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <ul className="mt-6 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex gap-3 text-sm">
            <Check className="h-4 w-4 shrink-0 text-success mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full mt-6" variant={isPrimary ? 'primary' : 'outline'}>
        {cta}
      </Button>
    </div>
  )
}

export function HomePage() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      <ContactDialog isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {/* Hero */}
      <section className="border-b border-border bg-surface px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 inline-block rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                Built for SME sales teams
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
                Turn sales meetings into follow-up emails, action items, and revenue next steps.
              </h1>
              <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                Follow-Up Engine helps SMEs turn meeting context, sales documents, call objectives, and transcripts
                into client agendas, follow-up emails, WhatsApp summaries, internal manager updates, action items,
                and next-step recommendations.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => setContactOpen(true)}>
                  Request Early Access
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/demo">Try Demo Flow <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
              <p className="mt-6 text-sm font-medium text-foreground">
                Before the meeting, prepare better. After the meeting, follow up faster.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 -z-10 rounded-3xl bg-gradient-to-br from-accent/5 via-transparent to-primary/5 blur-2xl" />
              <div className="space-y-3">
                <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="h-3.5 w-3.5 text-accent" /> FOLLOW-UP EMAIL
                  </div>
                  <div className="mt-3 text-sm font-medium">Subject: Next steps from our discovery call</div>
                  <div className="mt-2 space-y-1.5">
                    <div className="h-2 w-full rounded bg-muted" />
                    <div className="h-2 w-11/12 rounded bg-muted" />
                    <div className="h-2 w-9/12 rounded bg-muted" />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ListChecks className="h-3.5 w-3.5 text-accent" /> ACTION ITEMS
                    </div>
                    <ul className="mt-3 space-y-2 text-xs">
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-success" /> Send pilot one-pager</li>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-success" /> Confirm 2 reps</li>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-success" /> Lock kickoff date</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MessageCircle className="h-3.5 w-3.5 text-accent" /> WHATSAPP
                    </div>
                    <div className="mt-3 space-y-1.5">
                      <div className="h-2 w-full rounded bg-muted" />
                      <div className="h-2 w-10/12 rounded bg-muted" />
                      <div className="h-2 w-7/12 rounded bg-muted" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Problem */}
      <Section className="border-b border-border">
        <div className="max-w-3xl mb-12">
          <SectionEyebrow>The problem</SectionEyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">
            Sales follow-up breaks before and after the meeting.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {PROBLEMS.map((p) => (
            <div key={p} className="flex gap-3 rounded-xl border border-border bg-card p-5">
              <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive">
                <X className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm leading-relaxed">{p}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* How It Works */}
      <Section className="bg-surface border-b border-border">
        <div className="max-w-3xl mb-12">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">
            One workflow, end-to-end — from calendar invite to manager update.
          </h2>
        </div>

        <div className="overflow-x-auto mb-16">
          <ol className="flex min-w-max items-center gap-2">
            {WORKFLOW.map((s, i) => (
              <li key={s.label} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-2">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-card text-primary shadow-sm">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className="w-28 text-center text-xs font-medium text-muted-foreground">{s.label}</span>
                </div>
                {i < WORKFLOW.length - 1 && <ChevronRight className="h-4 w-4 text-border" />}
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-accent">Prepare better</div>
            <h3 className="mt-2 font-display text-2xl font-semibold">Before the meeting</h3>
            <ol className="mt-6 space-y-4">
              {[
                "Meeting is scheduled",
                "Sales team uploads relevant documents",
                "Salesperson selects objective",
                "Salesperson adds personal comments",
                "System generates client agenda and questions to ask",
              ].map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/8 text-xs font-semibold text-primary">{i + 1}</span>
                  <span className="pt-0.5 text-sm leading-relaxed text-foreground">{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-accent">Follow up faster</div>
            <h3 className="mt-2 font-display text-2xl font-semibold">After the meeting</h3>
            <ol className="mt-6 space-y-4">
              {[
                "Transcript is added",
                "System analyzes transcript and context",
                "User selects tone and urgency",
                "System generates follow-up email, WhatsApp summary, action items, internal manager email, and next steps",
              ].map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/8 text-xs font-semibold text-primary">{i + 1}</span>
                  <span className="pt-0.5 text-sm leading-relaxed text-foreground">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Outputs */}
      <Section className="border-b border-border">
        <div className="max-w-3xl mb-12">
          <SectionEyebrow>Product output</SectionEyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">
            Eight outputs from one meeting — every time.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OUTPUTS.map((o) => (
            <div key={o.title} className="rounded-xl border border-border bg-card p-6 hover:shadow-sm transition">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                <o.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{o.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{o.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Demo Teaser */}
      <Section className="bg-surface border-b border-border">
        <div className="rounded-3xl border border-border bg-card p-10 text-center sm:p-16">
          <SectionEyebrow>Try it</SectionEyebrow>
          <h2 className="mx-auto max-w-2xl font-display text-3xl sm:text-4xl font-semibold">
            Paste a transcript. See the full follow-up pack in seconds.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            A live, simulated demo runs entirely in your browser. No signup, no integrations, no data sent anywhere.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link to="/demo">Open the demo flow <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Pricing Teaser */}
      <Section className="border-b border-border">
        <div className="max-w-3xl mb-12">
          <SectionEyebrow>Pricing</SectionEyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">
            Simple plans for solo operators and growing teams.
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <PricingCard
            title="Solo Access"
            price="$199.99"
            description="One-time purchase, lifetime access"
            features={[
              "Meeting prep workflow",
              "Transcript-based follow-up",
              "8 output types",
              "Document context",
              "All future updates",
            ]}
            cta="Get Solo Access"
          />
          <PricingCard
            title="Launch Plan"
            price="$99/mo"
            description="First month free during launch"
            features={[
              "Everything in Solo",
              "Team visibility (2-3 users)",
              "Output library",
              "Manager dashboards",
              "Priority support",
            ]}
            cta="Start Launch Plan"
            isPrimary
          />
          <PricingCard
            title="Team Setup"
            price="Custom"
            description="For sales teams with custom needs"
            features={[
              "Unlimited team members",
              "Multi-workspace setup",
              "CRM integrations",
              "Dedicated onboarding",
              "SLA support",
            ]}
            cta="Request Team Setup"
          />
        </div>
        <div className="mt-8 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link to="/pricing">See full pricing & FAQs</Link>
          </Button>
        </div>
      </Section>

      {/* Who For */}
      <Section className="bg-surface border-b border-border">
        <div className="max-w-3xl mb-12">
          <SectionEyebrow>Fit check</SectionEyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">Who it's for.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="font-display text-xl font-semibold">Best for</h3>
            <ul className="mt-5 space-y-3">
              {BEST_FOR.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="font-display text-xl font-semibold">Not for</h3>
            <ul className="mt-5 space-y-3">
              {NOT_FOR.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-2 h-px w-3 shrink-0 bg-muted-foreground" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Roadmap */}
      <Section className="border-b border-border">
        <div className="max-w-3xl mb-12">
          <SectionEyebrow>Roadmap</SectionEyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">
            Built for deeper workflow integration.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Future phases may include Fathom connection, Google Calendar, Outlook Calendar, Google Drive,
            Salesforce, HubSpot, Pipedrive, and team manager dashboards.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          {INTEGRATIONS.map((i) => (
            <span key={i} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground">
              {i}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Coming soon — not live in this version.</p>
      </Section>

      {/* Final CTA */}
      <Section className="bg-background">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-white sm:px-16 sm:py-20">
          <h2 className="mx-auto max-w-3xl font-display text-3xl sm:text-4xl font-semibold">
            Stop letting meetings end without clear follow-up.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" variant="secondary" onClick={() => setContactOpen(true)}>
              Request Early Access
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10" asChild>
              <Link to="/demo">Try Demo Flow</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
