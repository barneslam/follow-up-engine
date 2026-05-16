import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { Section, SectionEyebrow, Container } from '../components/Layout'
import {
  CalendarDays,
  Upload,
  Target,
  Sparkles,
  FileText,
  Send,
  Users,
  ChevronRight,
  Check,
  X,
  Mail,
  MessageCircle,
  ListChecks,
  BarChart3,
  FolderOpen,
  HelpCircle,
  ClipboardList,
  ArrowRight,
  Shield,
} from 'lucide-react'
import { SiGmail, SiWhatsapp, SiGooglecalendar, SiGoogledrive } from 'react-icons/si'
import { useState } from 'react'
import { ContactDialog } from '../components/ContactDialog'
import { TrialRequestDialog } from '../components/TrialRequestDialog'

const PROBLEMS = [
  { icon: SiGooglecalendar, bg: 'bg-blue-50', color: 'text-blue-600', text: 'Meeting agendas are created too late or not at all' },
  { icon: HelpCircle, bg: 'bg-indigo-50', color: 'text-indigo-600', text: 'Salespeople forget to ask key questions' },
  { icon: SiGoogledrive, bg: 'bg-green-50', color: 'text-green-600', text: 'Relevant proposals and documents are scattered' },
  { icon: SiGmail, bg: 'bg-red-50', color: 'text-red-600', text: 'Follow-up emails take too long' },
  { icon: SiWhatsapp, bg: 'bg-green-50', color: 'text-green-600', text: 'WhatsApp summaries are inconsistent' },
  { icon: Users, bg: 'bg-purple-50', color: 'text-purple-600', text: 'Internal managers do not know what was promised' },
  { icon: ListChecks, bg: 'bg-blue-50', color: 'text-blue-600', text: 'Action items are not assigned clearly' },
  { icon: BarChart3, bg: 'bg-emerald-50', color: 'text-emerald-600', text: 'Pipeline impact is not captured' },
]
const WORKFLOW = [
  { icon: CalendarDays, label: "Calendar" },
  { icon: Upload, label: "Documents" },
  { icon: Target, label: "Objective" },
  { icon: Sparkles, label: "Prep Pack" },
  { icon: FileText, label: "Transcript" },
  { icon: Send, label: "Follow-Up" },
  { icon: Users, label: "Manager Update" },
]

const OUTPUTS = [
  { icon: ClipboardList, title: "Agenda", desc: "Client-ready meeting agenda." },
  { icon: HelpCircle, title: "Questions", desc: "Key questions to ask." },
  { icon: Mail, title: "Email", desc: "Follow-up email draft." },
  { icon: MessageCircle, title: "WhatsApp", desc: "Short message recap." },
  { icon: ListChecks, title: "Actions", desc: "Owners and next steps." },
  { icon: Users, title: "Manager Update", desc: "Internal status summary." },
  { icon: BarChart3, title: "Pipeline", desc: "Deal movement notes." },
  { icon: FolderOpen, title: "Documents", desc: "Context and assets used." },
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
  const [trialOpen, setTrialOpen] = useState(false)

  return (
    <>
      <ContactDialog isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <TrialRequestDialog isOpen={trialOpen} onClose={() => setTrialOpen(false)} />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-white via-[#f0f7ff]/30 to-[#f5f4f1] px-6 pt-24 pb-28 sm:pt-32 sm:pb-40">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <div>
              <div className="mb-6 inline-block rounded-full border border-primary/20 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-primary">
                Built for SME sales teams
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-[4.9rem] font-bold leading-[0.98] tracking-tight text-slate">
  One-click sales follow-up for growing teams.
</h1>

              <div className="mt-8 inline-flex items-center gap-3 rounded-xl border-2 border-primary/20 bg-gradient-to-r from-blue-50 to-white px-5 py-4 shadow-md">
                <span className="text-xs font-bold uppercase tracking-wide text-primary">Save</span>
                <span className="text-3xl font-bold text-primary">2+ hours</span>
                <span className="text-sm font-semibold text-slate/70">per sales meeting</span>
              </div>

              <p className="mt-8 max-w-2xl text-lg sm:text-[1.45rem] font-medium leading-[1.6] text-slate/80">
  Follow-Up Engine turns meeting transcripts into structured agendas,
  follow-up emails, WhatsApp summaries, action items, manager updates,
  and next steps — before momentum disappears.
</p>

              <p className="mt-5 text-base font-semibold text-primary">
  One meeting in. Seven sales-ready outputs out.
</p>

              <div className="mt-12 flex flex-wrap items-center gap-4">
  <Button size="lg" className="h-14 px-8 text-base font-semibold shadow-lg shadow-primary/20" onClick={() => setTrialOpen(true)}>
    Start 7-Day Trial
  </Button>

  <Button
    size="lg"
    variant="outline"
    className="h-14 px-8 text-base border-slate-300 hover:border-slate-400"
    asChild
  >
    <Link to="/demo">
      Watch Demo Flow
      <ArrowRight className="h-4 w-4" />
    </Link>
  </Button>
</div>
              <p className="mt-6 text-sm font-medium text-slate/60">
                Create unlimited follow-up packs during your 7-day launch test.
              </p>
            </div>

            <div className="relative lg:pt-6">
  <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-blue-100/40 blur-3xl" />

  <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/70">
    <div className="flex items-center gap-3 text-base font-bold text-primary">
      <SiGmail className="h-7 w-7 text-red-500" />
FOLLOW-UP EMAIL 
    </div>

    <div className="mt-6 space-y-4 text-base leading-relaxed text-slate">
      <p className="text-slate/70">To: prospect@company.com</p>
      <p className="font-bold">
        Subject: Next steps from our discovery call today
      </p>
      <p>Hi Sarah,</p>
      <p>Great conversation today. Here&apos;s what we discussed:</p>

      <ul className="ml-5 list-disc space-y-2">
        <li>Your team needs better visibility into pipeline health</li>
        <li>Currently using spreadsheets for tracking</li>
        <li>Interested in Q2 pilot with 3 reps</li>
      </ul>

      <p>
        Next: I&apos;ll send the one-pager by EOD Friday. Chat next week?
      </p>
    </div>
  </div>

  <div className="mt-6 grid gap-6 sm:grid-cols-2">
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60">
      <div className="flex items-center gap-3 text-base font-bold text-primary">
        <ListChecks className="h-7 w-7" />
        ACTION ITEMS
      </div>

      <ul className="mt-6 space-y-4 text-base text-slate">
        <li className="flex gap-3">
          <Check className="h-5 w-5 shrink-0 text-primary" />
          <span>Send solution one-pager</span>
        </li>
        <li className="flex gap-3">
          <Check className="h-5 w-5 shrink-0 text-primary" />
          <span>Confirm 3 pilot reps</span>
        </li>
        <li className="flex gap-3">
          <Check className="h-5 w-5 shrink-0 text-primary" />
          <span>Schedule kickoff call</span>
        </li>
      </ul>
    </div>

    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60">
      <div className="flex items-center gap-3 text-base font-bold text-primary">
        <SiWhatsapp className="h-7 w-7 text-green-500" />
WHATSAPP SUMMARY
      </div>

      <p className="mt-6 text-base leading-relaxed text-slate">
        Quick recap: Sarah&apos;s team is tracking pipeline manually,
        wants better visibility, and is interested in a Q2 pilot with 3 reps.
        Follow-up: send one-pager by Friday.
      </p>
    </div>
  </div>
</div>
          </div>
        </Container>
      </section>

      {/* Problem */}
      <Section className="border-b border-border bg-[#f5f4f1]">
        <div className="max-w-3xl mb-14">
          <SectionEyebrow>The problem</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate">
            Sales follow-up breaks before and after the meeting.
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {PROBLEMS.map((p) => (
  <div key={p.text} className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-primary">
      <p.icon className="h-6 w-6" />
    </div>
    <span className="text-base font-medium leading-relaxed text-slate">
      {p.text}
    </span>
  </div>
))}
           
        </div>
      </Section>

      {/* How It Works */}
      <Section className="bg-white border-b border-border">
        <div className="max-w-3xl mb-16">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate">
            One workflow, end-to-end — from calendar invite to manager update.
          </h2>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-[#f0f7ff] to-white border-2 border-slate-200 p-12 mb-20 shadow-sm">
          <div className="overflow-x-auto">
            <ol className="flex min-w-max items-center gap-3">
              {WORKFLOW.map((s, i) => (
                <li key={s.label} className="flex items-center gap-3">
                  <div className="flex flex-col items-center gap-3">
                    <div className="grid h-14 w-14 place-items-center rounded-xl border-2 border-primary/40 bg-white text-primary shadow-md hover:shadow-lg transition">
                      <s.icon className="h-6 w-6 font-bold" />
                    </div>
                    <span className="w-28 text-center text-xs font-semibold text-slate/70">{s.label}</span>
                  </div>
                  {i < WORKFLOW.length - 1 && <ChevronRight className="h-5 w-5 text-slate/20" />}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-10 shadow-md hover:shadow-lg transition-shadow">
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

          <div className="rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-10 shadow-md hover:shadow-lg transition-shadow">
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
      <Section className="border-b border-border bg-[#fefdf9]">
        <div className="max-w-3xl mb-16">
          <SectionEyebrow>Product output</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate">
            Eight outputs from one meeting — every time.
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OUTPUTS.map((o) => (
            <div key={o.title} className="rounded-2xl border-2 border-slate-200 bg-white p-8 hover:shadow-lg hover:border-primary/40 transition-all">
              <div className={`grid h-12 w-12 place-items-center rounded-lg ${o.bg} ${o.color} font-bold`}>
                <o.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-sm font-bold text-slate leading-snug">{o.title}</h3>
              <p className="mt-3 text-xs text-slate/70 leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Demo Teaser */}
      <Section className="bg-white border-b border-border">
        <div className="rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-[#f0f7ff] to-white p-12 text-center sm:p-20 shadow-md">
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
      <Section className="border-b border-border bg-[#f8f7f6]">
        <div className="max-w-3xl mb-16">
          <SectionEyebrow>Pricing</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate">
            Simple plans for solo operators and growing teams.
          </h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-3 lg:items-end">
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
        <div className="mt-16 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link to="/pricing">See full pricing & FAQs</Link>
          </Button>
        </div>
      </Section>

      {/* Who For */}
      <Section className="bg-white border-b border-border">
        <div className="max-w-3xl mb-16">
          <SectionEyebrow>Fit check</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate">Who it's for.</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-white to-[#f5f8f5] p-10 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="font-display text-2xl font-bold text-slate">Best for</h3>
            <ul className="mt-6 space-y-4">
              {BEST_FOR.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-slate/80">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary font-bold" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-10 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="font-display text-2xl font-bold text-slate">Not for</h3>
            <ul className="mt-6 space-y-4">
              {NOT_FOR.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-slate/70">
                  <span className="mt-2 h-0.5 w-4 shrink-0 bg-slate/30 rounded" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Roadmap */}
      <Section className="border-b border-border bg-[#f5f4f1]">
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
            <span key={i} className="rounded-full border-2 border-slate/30 bg-white px-4 py-2.5 text-sm font-medium text-slate shadow-sm hover:shadow-md hover:border-primary/40 transition">
              {i}
            </span>
          ))}
        </div>
        <p className="text-xs font-medium text-slate/60">Coming soon — not live in this version.</p>
      </Section>

      {/* Final CTA */}
      <Section className="bg-white">
        <div className="rounded-3xl bg-gradient-to-r from-primary via-primary to-primary/90 px-8 py-20 text-center text-white sm:px-16 sm:py-28 shadow-lg">
          <h2 className="mx-auto max-w-3xl font-display text-4xl sm:text-5xl font-bold leading-tight">
            Stop letting meetings end without clear follow-up.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
            Start with early access today. Request a demo, try the flow, or pick a plan.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => setTrialOpen(true)}>
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
