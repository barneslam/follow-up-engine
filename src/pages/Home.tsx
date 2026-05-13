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

const INTEGRATIONS = ["Fathom", "Google Calendar", "Outlook", "Google Drive", "Salesforce", "HubSpot", "Pipedrive", "CRM Plug-In", "Manager Dashboards"]

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
    <div className={`rounded-2xl border transition-all ${isPrimary
      ? 'border-primary bg-gradient-to-br from-blue-50 to-white shadow-lg ring-2 ring-primary/30 scale-105'
      : 'border-gray-light bg-card shadow-sm hover:shadow-md opacity-60'
    }`}>
      <div className={`p-8 ${isPrimary ? '' : ''}`}>
        {isPrimary && (
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary">
            Recommended
          </span>
        )}
        <h3 className={`font-display text-xl font-semibold ${isPrimary ? 'text-slate' : 'text-slate opacity-75'}`}>{title}</h3>
        <div className="mt-3">
          <span className={`text-4xl font-bold ${isPrimary ? 'text-slate' : 'text-slate/70'}`}>{price}</span>
          {price !== 'Custom' && <span className={`text-sm ml-2 ${isPrimary ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>{title === 'Solo Access' ? 'one-time' : '/month'}</span>}
        </div>
        <p className={`mt-3 text-sm ${isPrimary ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>{description}</p>

        <Button
          className={`w-full mt-6 font-semibold ${isPrimary ? '' : 'opacity-75'}`}
          variant={isPrimary ? 'primary' : 'outline'}
        >
          {cta}
        </Button>

        <ul className={`mt-8 space-y-3 ${isPrimary ? '' : ''}`}>
          {features.map((f) => (
            <li key={f} className={`flex gap-3 text-sm ${isPrimary ? '' : 'text-muted-foreground/70'}`}>
              <Check className={`h-4 w-4 shrink-0 mt-0.5 ${isPrimary ? 'text-primary' : 'text-gray-light'}`} />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function HomePage() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      <ContactDialog isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-white via-blue-50/40 to-slate-100/30 px-6 pt-24 pb-28 sm:pt-32 sm:pb-40">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-8 inline-block rounded-full border border-primary/20 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-primary">
                Built for SME sales teams
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-slate">
                Turn sales meetings into follow-up emails, action items, and revenue next steps.
              </h1>
              <p className="mt-8 max-w-xl text-lg sm:text-xl text-slate/70 leading-relaxed">
                Follow-Up Engine helps SMEs turn meeting context, sales documents, call objectives, and transcripts
                into client agendas, follow-up emails, WhatsApp summaries, internal manager updates, action items,
                and next-step recommendations.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button size="lg" onClick={() => setContactOpen(true)}>
                  Request Early Access
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/demo">Try Demo Flow <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
              <p className="mt-8 text-sm font-medium text-slate/70">
                Before the meeting, prepare better. After the meeting, follow up faster.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 -z-10 rounded-3xl bg-gradient-to-br from-blue-100/40 via-transparent to-blue-50/40 blur-2xl" />
              <div className="space-y-3">
                <div className="rounded-xl border border-border bg-gradient-to-br from-white to-blue-50 p-6 shadow-md">
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                    <Mail className="h-4 w-4" /> FOLLOW-UP EMAIL
                  </div>
                  <div className="mt-4">
                    <div className="text-xs text-muted-foreground">To: prospect@company.com</div>
                    <div className="mt-2 text-sm font-semibold text-slate">Subject: Next steps from our discovery call today</div>
                    <div className="mt-3 space-y-2 text-xs leading-relaxed text-slate/80">
                      <p>Hi Sarah,</p>
                      <p>Great conversation today. Here's what we discussed:</p>
                      <p className="text-slate/60">• Your team needs better visibility into pipeline health<br/>• Currently using spreadsheets for tracking<br/>• Interested in Q2 pilot with 3 reps</p>
                      <p>Next: I'll send the one-pager by EOD Friday. Chat next week?</p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-border bg-gradient-to-br from-white to-slate-50 p-5 shadow-md">
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                      <ListChecks className="h-4 w-4" /> ACTION ITEMS
                    </div>
                    <ul className="mt-3 space-y-2 text-xs">
                      <li className="flex gap-2 text-slate"><Check className="h-4 w-4 shrink-0 text-primary" /> <span>Send solution one-pager</span></li>
                      <li className="flex gap-2 text-slate"><Check className="h-4 w-4 shrink-0 text-primary" /> <span>Confirm 3 pilot reps</span></li>
                      <li className="flex gap-2 text-slate"><Check className="h-4 w-4 shrink-0 text-primary" /> <span>Schedule kickoff call</span></li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border bg-gradient-to-br from-white to-slate-50 p-5 shadow-md">
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                      <MessageCircle className="h-4 w-4" /> WHATSAPP SUMMARY
                    </div>
                    <div className="mt-3 space-y-1.5 text-xs text-slate/80 leading-relaxed">
                      <p>Quick recap: Sarah's team is tracking pipeline manually, wants better visibility. Interested in Q2 pilot with 3 reps. Follow-up: solution one-pager by Fri EOD.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Problem */}
      <Section className="border-b border-border bg-white">
        <div className="max-w-3xl mb-14">
          <SectionEyebrow>The problem</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate">
            Sales follow-up breaks before and after the meeting.
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {PROBLEMS.map((p) => (
            <div key={p} className="flex gap-4 rounded-xl border-2 border-red-100 bg-red-50 p-6 shadow-sm hover:shadow-md transition">
              <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-red-200 text-red-700">
                <X className="h-4 w-4 font-bold" />
              </div>
              <span className="text-sm leading-relaxed text-slate/80">{p}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* How It Works */}
      <Section className="bg-gradient-to-b from-slate-50 to-white border-b border-border">
        <div className="max-w-3xl mb-16">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate">
            One workflow, end-to-end — from calendar invite to manager update.
          </h2>
        </div>

        <div className="overflow-x-auto mb-20">
          <ol className="flex min-w-max items-center gap-3">
            {WORKFLOW.map((s, i) => (
              <li key={s.label} className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-3">
                  <div className="grid h-14 w-14 place-items-center rounded-xl border-2 border-primary/30 bg-blue-50 text-primary shadow-md hover:shadow-lg transition">
                    <s.icon className="h-6 w-6 font-bold" />
                  </div>
                  <span className="w-28 text-center text-xs font-semibold text-slate/70">{s.label}</span>
                </div>
                {i < WORKFLOW.length - 1 && <ChevronRight className="h-5 w-5 text-slate/30" />}
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-blue-50 to-white p-10 shadow-md">
            <div className="text-xs font-bold uppercase tracking-widest text-primary">Prepare better</div>
            <h3 className="mt-3 font-display text-2xl font-bold text-slate">Before the meeting</h3>
            <ol className="mt-7 space-y-5">
              {[
                "Meeting is scheduled",
                "Sales team uploads relevant documents",
                "Salesperson selects objective",
                "Salesperson adds personal comments",
                "System generates client agenda and questions to ask",
              ].map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-white shadow-sm">{i + 1}</span>
                  <span className="pt-0.5 text-sm leading-relaxed text-slate/80">{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-blue-50 to-white p-10 shadow-md">
            <div className="text-xs font-bold uppercase tracking-widest text-primary">Follow up faster</div>
            <h3 className="mt-3 font-display text-2xl font-bold text-slate">After the meeting</h3>
            <ol className="mt-7 space-y-5">
              {[
                "Transcript is added",
                "System analyzes transcript and context",
                "User selects tone and urgency",
                "System generates follow-up email, WhatsApp summary, action items, internal manager email, and next steps",
              ].map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-white shadow-sm">{i + 1}</span>
                  <span className="pt-0.5 text-sm leading-relaxed text-slate/80">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Outputs */}
      <Section className="border-b border-border bg-white">
        <div className="max-w-3xl mb-16">
          <SectionEyebrow>Product output</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate">
            Eight outputs from one meeting — every time.
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OUTPUTS.map((o) => (
            <div key={o.title} className="rounded-xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-7 hover:shadow-lg hover:border-primary/30 transition-all">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/15 text-primary font-bold">
                <o.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-base font-bold text-slate">{o.title}</h3>
              <p className="mt-2 text-sm text-slate/70 leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Demo Teaser */}
      <Section className="bg-slate-50 border-b border-border">
        <div className="rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-blue-50 to-white p-12 text-center sm:p-20 shadow-lg">
          <SectionEyebrow>Try it</SectionEyebrow>
          <h2 className="mx-auto max-w-2xl font-display text-4xl sm:text-5xl font-bold text-slate">
            Paste a transcript. See the full follow-up pack in seconds.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate/70">
            A live, simulated demo runs entirely in your browser. No signup, no integrations, no data sent anywhere.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <Link to="/demo">Open the demo flow <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Pricing Teaser */}
      <Section className="border-b border-border bg-white">
        <div className="max-w-3xl mb-16">
          <SectionEyebrow>Pricing</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate">
            Simple plans for solo operators and growing teams.
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3 lg:items-end">
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
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link to="/pricing">See full pricing & FAQs</Link>
          </Button>
        </div>
      </Section>

      {/* Who For */}
      <Section className="bg-slate-50 border-b border-border">
        <div className="max-w-3xl mb-16">
          <SectionEyebrow>Fit check</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate">Who it's for.</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-white p-10 shadow-md">
            <h3 className="font-display text-2xl font-bold text-slate">Best for</h3>
            <ul className="mt-6 space-y-4">
              {BEST_FOR.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-slate/80">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600 font-bold" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white p-10 shadow-md">
            <h3 className="font-display text-2xl font-bold text-slate">Not for</h3>
            <ul className="mt-6 space-y-4">
              {NOT_FOR.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-slate/70">
                  <span className="mt-2 h-0.5 w-4 shrink-0 bg-slate/40 rounded" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Roadmap */}
      <Section className="border-b border-border bg-white">
        <div className="max-w-3xl mb-16">
          <SectionEyebrow>Roadmap</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate">
            Built for deeper workflow integration.
          </h2>
          <p className="mt-6 text-lg text-slate/70">
            Future phases may include Fathom connection, Google Calendar, Outlook Calendar, Google Drive,
            Salesforce, HubSpot, Pipedrive, and team manager dashboards.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 mb-6">
          {INTEGRATIONS.map((i) => (
            <span key={i} className="rounded-full border-2 border-slate/20 bg-gradient-to-br from-slate-50 to-white px-4 py-2.5 text-sm font-medium text-slate shadow-sm hover:shadow-md transition">
              {i}
            </span>
          ))}
        </div>
        <p className="text-xs font-medium text-slate/60">Coming soon — not live in this version.</p>
      </Section>

      {/* Final CTA */}
      <Section className="bg-fafbfc">
        <div className="rounded-3xl bg-gradient-to-r from-primary via-primary to-primary/90 px-8 py-20 text-center text-white sm:px-16 sm:py-28 shadow-lg">
          <h2 className="mx-auto max-w-3xl font-display text-4xl sm:text-5xl font-bold leading-tight">
            Stop letting meetings end without clear follow-up.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
            Start with early access today. Request a demo, try the flow, or pick a plan.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => setContactOpen(true)}>
              Request Early Access
            </Button>
            <Button size="lg" className="border-white/40 bg-white/15 text-white hover:bg-white/25" asChild>
              <Link to="/demo">Try Demo Flow</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
