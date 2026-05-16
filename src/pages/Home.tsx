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
  ListChecks,
  BarChart3,
  FolderOpen,
  HelpCircle,
  ClipboardList,
  ArrowRight,
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
  { icon: CalendarDays, label: 'Calendar' },
  { icon: Upload, label: 'Documents' },
  { icon: Target, label: 'Objective' },
  { icon: Sparkles, label: 'Prep Pack' },
  { icon: FileText, label: 'Transcript' },
  { icon: Send, label: 'Follow-Up' },
  { icon: Users, label: 'Manager Update' },
]

const OUTPUTS = [
  { icon: ClipboardList, bg: 'bg-blue-50', color: 'text-blue-600', title: 'Agenda', desc: 'Client-ready meeting agenda.' },
  { icon: HelpCircle, bg: 'bg-indigo-50', color: 'text-indigo-600', title: 'Questions', desc: 'Key questions to ask.' },
  { icon: SiGmail, bg: 'bg-red-50', color: 'text-red-600', title: 'Email', desc: 'Follow-up email draft.' },
  { icon: SiWhatsapp, bg: 'bg-green-50', color: 'text-green-600', title: 'WhatsApp', desc: 'Short message recap.' },
  { icon: ListChecks, bg: 'bg-blue-50', color: 'text-blue-600', title: 'Actions', desc: 'Owners and next steps.' },
  { icon: Users, bg: 'bg-purple-50', color: 'text-purple-600', title: 'Manager Update', desc: 'Internal status summary.' },
  { icon: BarChart3, bg: 'bg-emerald-50', color: 'text-emerald-600', title: 'Pipeline', desc: 'Deal movement notes.' },
  { icon: SiGoogledrive, bg: 'bg-green-50', color: 'text-green-600', title: 'Documents', desc: 'Context and assets used.' },
]

const BEST_FOR = [
  'SMEs with regular sales calls',
  'Founder-led companies',
  'Consultants and agencies',
  'Sales teams using Fathom or Zoom',
  'Companies sending proposals or quotes',
  'Managers who need better visibility',
]

const NOT_FOR = [
  'Companies needing full CRM immediately',
  'Teams unwilling to use transcripts',
  'Companies expecting guaranteed outcomes',
]

const INTEGRATIONS = ['Fathom', 'Google Calendar', 'Outlook', 'Google Drive', 'Salesforce', 'HubSpot', 'Pipedrive', 'CRM Plug-In', 'Manager Dashboards']

function PricingCard({
  title,
  price,
  description,
  features,
  cta,
  isPrimary = false,
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
      : 'border-gray-light bg-card shadow-sm hover:shadow-md'
    }`}>
      <div className="p-8">
        {isPrimary && (
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary">
            Recommended
          </span>
        )}
        <h3 className="font-display text-xl font-semibold text-slate">{title}</h3>
        <div className="mt-3">
          <span className="text-4xl font-bold text-slate">{price}</span>
          {price !== 'Custom' && (
            <span className="text-sm ml-2 text-muted-foreground">
              {price.includes('Coming') ? '' : '/month'}
            </span>
          )}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{description}</p>

        <Button className="w-full mt-6 font-semibold" variant={isPrimary ? 'primary' : 'outline'}>
          {cta}
        </Button>

        <ul className="mt-8 space-y-3">
          {features.map((f) => (
            <li key={f} className="flex gap-3 text-sm text-muted-foreground">
              <Check className={`h-4 w-4 shrink-0 mt-0.5 ${isPrimary ? 'text-primary' : 'text-slate/40'}`} />
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

      <section className="border-b border-border bg-gradient-to-b from-white via-[#f0f7ff]/30 to-[#f5f4f1] px-6 pt-20 pb-24 sm:pt-32 sm:pb-40">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <div>
              <div className="mb-6 inline-block rounded-full border border-primary/20 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-primary">
                Built for SME sales teams
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.9rem] font-bold leading-[1.02] tracking-tight text-slate">
                One-click sales follow-up for growing teams.
              </h1>

              <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-primary/20 bg-white px-5 py-4 shadow-lg shadow-slate-200/70">
                <span className="text-xs font-bold uppercase tracking-wide text-primary">Save</span>
                <span className="text-3xl font-bold text-primary">2+ hours</span>
                <span className="text-sm font-semibold text-slate/70">per sales meeting</span>
              </div>

              <p className="mt-6 sm:mt-8 max-w-2xl text-lg sm:text-[1.45rem] font-medium leading-[1.6] text-slate/80">
                Follow-Up Engine turns meeting transcripts into structured agendas,
                follow-up emails, WhatsApp summaries, action items, manager updates,
                and next steps — before momentum disappears.
              </p>

              <p className="mt-5 text-base font-semibold text-primary">
                One meeting in. Seven sales-ready outputs out.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <Button size="lg" className="h-14 w-full sm:w-auto px-8 text-base font-semibold shadow-lg shadow-primary/20" onClick={() => setTrialOpen(true)}>
                  Start 7-Day Trial
                </Button>

               <Link
  to="/demo"
  className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-8 text-base font-semibold text-slate hover:border-slate-400 hover:bg-slate-50 transition"
>
  Watch Demo Flow
  <ArrowRight className="h-4 w-4" />
</Link> 
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
                  <p className="font-bold">Subject: Next steps from our discovery call today</p>
                  <p>Hi Sarah,</p>
                  <p>Great conversation today. Here&apos;s what we discussed:</p>

                  <ul className="ml-5 list-disc space-y-2">
                    <li>Your team needs better visibility into pipeline health</li>
                    <li>Currently using spreadsheets for tracking</li>
                    <li>Interested in Q2 pilot with 3 reps</li>
                  </ul>

                  <p>Next: I&apos;ll send the one-pager by EOD Friday. Chat next week?</p>
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
              <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${p.bg} ${p.color}`}>
                <p.icon className="h-6 w-6" />
              </div>
              <span className="text-base font-medium leading-relaxed text-slate">
                {p.text}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white border-b border-border">
        <div className="max-w-3xl mb-16">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate">
            One workflow, end-to-end — from calendar invite to manager update.
          </h2>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-[#f0f7ff] to-white border-2 border-slate-200 p-8 sm:p-12 mb-20 shadow-sm overflow-x-auto">
          <ol className="flex min-w-max items-center gap-3">
            {WORKFLOW.map((s, i) => (
              <li key={s.label} className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-3">
                  <div className="grid h-14 w-14 place-items-center rounded-xl border-2 border-primary/40 bg-white text-primary shadow-md">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <span className="w-28 text-center text-xs font-semibold text-slate/70">{s.label}</span>
                </div>
                {i < WORKFLOW.length - 1 && <ChevronRight className="h-5 w-5 text-slate/20" />}
              </li>
            ))}
          </ol>
        </div>
      </Section>

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

      <Section className="bg-white border-b border-border">
        <div className="rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-[#f0f7ff] to-white p-10 text-center sm:p-20 shadow-md">
          <SectionEyebrow>Try it</SectionEyebrow>
          <h2 className="mx-auto max-w-2xl font-display text-4xl sm:text-5xl font-bold text-slate">
            Paste a transcript. See the full follow-up pack in seconds.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate/70">
            A live, simulated demo runs entirely in your browser. No signup, no integrations, no data sent anywhere.
          </p>
          <div className="mt-10">
            <Link
              to="/demo"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition"
            >
              Open the demo flow
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      
<Section className="border-b border-border bg-[#f8f7f6]">
  <div className="max-w-3xl mb-16">
    <SectionEyebrow>Pricing</SectionEyebrow>
    <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate">
      Launch pricing for growing sales teams.
    </h2>
  </div>

  <div className="rounded-3xl border-2 border-slate-200 bg-white p-10 text-center shadow-md">
    <div className="mx-auto mb-6 flex max-w-2xl items-center justify-center gap-4">
      <div className="h-px flex-1 bg-primary/40" />
      <span className="rounded-full border border-amber-500 bg-amber-200 px-5 py-2 text-sm font-bold uppercase tracking-wide text-amber-950">
        Beta Special
      </span>
      <div className="h-px flex-1 bg-primary/40" />
    </div>

    <h3 className="font-display text-3xl font-bold text-slate">
      Limited Beta starts at $9.99 for the first month.
    </h3>

    <p className="mx-auto mt-4 max-w-xl text-base text-slate/70">
      See the full launch pricing structure, including the $19.99/month Launch Plan and future coming-soon tiers.
    </p>

    <div className="mt-8">
      <Button size="lg" asChild>
        <Link to="/pricing">View Launch Pricing</Link>
      </Button>
    </div>
  </div>
</Section>

<Section className="bg-white border-b border-border">
        <div className="max-w-3xl mb-16">
          <SectionEyebrow>Fit check</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate">Who it&apos;s for.</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-white to-[#f5f8f5] p-10 shadow-md">
            <h3 className="font-display text-2xl font-bold text-slate">Best for</h3>
            <ul className="mt-6 space-y-4">
              {BEST_FOR.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-slate/80">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-10 shadow-md">
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
            <span key={i} className="rounded-full border-2 border-slate/30 bg-white px-4 py-2.5 text-sm font-medium text-slate shadow-sm">
              {i}
            </span>
          ))}
        </div>
        <p className="text-xs font-medium text-slate/60">Coming soon — not live in this version.</p>
      </Section>

      <Section className="bg-white">
        <div className="rounded-3xl bg-gradient-to-r from-primary via-primary to-primary/90 px-8 py-20 text-center text-white sm:px-16 sm:py-28 shadow-lg">
          <h2 className="mx-auto max-w-3xl font-display text-4xl sm:text-5xl font-bold leading-tight">
            Stop letting meetings end without clear follow-up.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
            Start with early access today. Request a demo, try the flow, or pick a plan.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" onClick={() => setTrialOpen(true)}>
              Request Early Access
            </Button>
            <Link
              to="/demo"
              className="inline-flex h-14 items-center justify-center rounded-lg border border-white/40 bg-white/15 px-8 text-base font-semibold text-white hover:bg-white/25 transition"
            >
              Try Demo Flow
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}