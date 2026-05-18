import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import {
  CalendarDays,
  Upload,
  Target,
  Sparkles,
  FileText,
  Send,
  Users,
  ListChecks,
  BarChart3,
  HelpCircle,
  ClipboardList,
  Clock,
  ShieldCheck,
  Heart,
  Zap,
  Check,
  X,
  Linkedin,
  Github,
  Mail,
  Rocket,
  ExternalLink,
} from 'lucide-react'
import { SiGmail, SiWhatsapp, SiGoogledrive } from 'react-icons/si'
import { type ComponentType, useState } from 'react'
import { ContactDialog } from '../components/ContactDialog'
import { TrialRequestDialog } from '../components/TrialRequestDialog'

const WORKFLOW = [
  { icon: CalendarDays, number: '01', label: 'Calendar', desc: 'Meeting is scheduled and confirmed.', color: 'text-blue-600', ring: 'ring-blue-100', x: '50%', y: '4%', align: 'center' },
  { icon: Upload, number: '02', label: 'Documents', desc: 'Agenda and relevant docs are shared.', color: 'text-violet-600', ring: 'ring-violet-100', x: '80%', y: '24%', align: 'right' },
  { icon: Target, number: '03', label: 'Objectives', desc: 'Key talking points and meeting goals are defined.', color: 'text-green-600', ring: 'ring-green-100', x: '84%', y: '58%', align: 'right' },
  { icon: Sparkles, number: '04', label: 'Prep Pack', desc: 'AI creates your meeting prep pack.', color: 'text-orange-500', ring: 'ring-orange-100', x: '60%', y: '86%', align: 'bottom' },
  { icon: FileText, number: '05', label: 'Transcript', desc: 'Meeting is captured and structured.', color: 'text-blue-600', ring: 'ring-blue-100', x: '35%', y: '86%', align: 'bottom' },
  { icon: Send, number: '06', label: 'Follow-Up', desc: 'Emails, WhatsApp, and next steps are prepared.', color: 'text-cyan-600', ring: 'ring-cyan-100', x: '15%', y: '58%', align: 'left' },
  { icon: Users, number: '07', label: 'Manager Update', desc: 'Management gets a clear Follow-Up Engine summary.', color: 'text-purple-600', ring: 'ring-purple-100', x: '20%', y: '24%', align: 'left' },
]

const OUTPUTS = [
  { icon: ClipboardList, bg: 'bg-blue-50', color: 'text-blue-600', title: 'Agenda', desc: 'Client-ready meeting agenda.' },
  { icon: HelpCircle, bg: 'bg-indigo-50', color: 'text-indigo-600', title: 'Questions', desc: 'Key questions to ask.' },
  { icon: SiGmail, bg: 'bg-red-50', color: 'text-red-600', title: 'Email', desc: 'Follow-up email draft.' },
  { icon: SiWhatsapp, bg: 'bg-green-50', color: 'text-green-600', title: 'WhatsApp', desc: 'Short message recap.' },
  { icon: ListChecks, bg: 'bg-blue-50', color: 'text-blue-600', title: 'Actions', desc: 'Owners and next steps.' },
  { icon: Users, bg: 'bg-purple-50', color: 'text-purple-600', title: 'Manager Update', desc: 'Internal status summary.' },
  { icon: BarChart3, bg: 'bg-emerald-50', color: 'text-emerald-600', title: 'Pipeline', desc: 'Deal movement notes.' },
  { icon: SiGoogledrive, bg: 'bg-amber-50', color: 'text-amber-600', title: 'Documents', desc: 'Context and assets used.' },
]

const BENEFITS = [
  { icon: Clock, title: 'Save 5+ hours per week', desc: 'By automating post-meeting work' },
  { icon: Zap, title: 'Never lose momentum', desc: 'Every action, captured and tracked' },
  { icon: ShieldCheck, title: 'Manager visibility', desc: 'Clear updates without extra work' },
  { icon: Heart, title: 'More deals, less admin', desc: 'Focus on conversations, not busywork' },
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

type IconType = ComponentType<{ className?: string }>

export function HomePage() {
  const [contactOpen, setContactOpen] = useState(false)
  const [trialOpen, setTrialOpen] = useState(false)

  return (
    <>
      <ContactDialog isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <TrialRequestDialog isOpen={trialOpen} onClose={() => setTrialOpen(false)} />

      <main className="bg-[radial-gradient(circle_at_top_left,#ffffff_0%,#f8fbff_44%,#edf6ff_100%)] text-slate-950">
        <section id="how-it-works" className="px-6 pb-8 pt-10 sm:pt-14 lg:pb-10">
          <div className="mx-auto max-w-[1320px]">
            <div className="grid items-start gap-10 xl:grid-cols-[350px_440px_1fr] xl:gap-9">
              <div className="xl:pt-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">How it works</p>
                <h1 className="mt-4 max-w-[520px] font-display text-[2.6rem] font-black leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-6xl xl:text-[3.5rem]">
                  One workflow, end-to-end — from calendar invite to manager update.
                </h1>
                <p className="mt-6 max-w-[520px] text-base font-medium leading-7 text-slate-700 xl:text-[1.02rem] xl:leading-8">
                  A circular operating loop shows how Follow-Up Engine keeps the whole sales workflow connected before,
                  during, and after every meeting.
                </p>
              </div>

              <div className="relative mx-auto h-[545px] w-full max-w-[500px] xl:mx-0 xl:mt-2">
                <div className="absolute left-1/2 top-1/2 h-[282px] w-[282px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_24px_70px_rgba(37,99,235,0.10)] ring-1 ring-slate-200" />
                <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[14px] border-blue-100/80" />
                <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[14px] border-transparent border-b-amber-400 border-l-cyan-400 border-r-violet-500 border-t-blue-500 opacity-85" />

                <div className="absolute left-1/2 top-1/2 flex h-[218px] w-[218px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white p-8 text-center shadow-[0_18px_60px_rgba(15,23,42,0.10)]">
                  <p className="text-sm font-black text-violet-600">Follow-Up Engine</p>
                  <h2 className="mt-2 font-display text-[1.65rem] font-black leading-[1.05] tracking-[-0.035em] text-slate-950">
                    End-to-end sales continuity
                  </h2>
                  <p className="mt-3 text-sm font-medium leading-5 text-slate-700">
                    Everything connected. Nothing falls through the cracks.
                  </p>
                </div>

                {WORKFLOW.map((step) => {
                  const Icon = step.icon
                  return (
                    <div
                      key={step.label}
                      className={`absolute flex items-center gap-3 ${step.align === 'left' ? '-translate-x-[98%] -translate-y-1/2 text-right' : ''} ${step.align === 'right' ? '-translate-y-1/2 text-left' : ''} ${step.align === 'center' ? '-translate-x-1/2 -translate-y-[18%] flex-col text-center' : ''} ${step.align === 'bottom' ? '-translate-x-1/2 -translate-y-[12%] flex-col text-center' : ''}`}
                      style={{ left: step.x, top: step.y }}
                    >
                      <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white ${step.color} shadow-[0_14px_38px_rgba(15,23,42,0.12)] ring-8 ${step.ring}`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="max-w-[135px]">
                        <p className={`text-lg font-black leading-none ${step.color}`}>{step.number}</p>
                        <h3 className="mt-1 text-[0.86rem] font-black leading-tight text-slate-950">{step.label}</h3>
                        <p className="mt-1 text-[0.72rem] font-semibold leading-[1.35] text-slate-700">{step.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8 xl:mt-2">
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">What you get</p>
                    <h2 className="mt-3 max-w-[420px] font-display text-[1.85rem] font-black leading-[1.05] tracking-[-0.035em] text-slate-950">
                      Eight outputs from one meeting.
                    </h2>
                  </div>
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-blue-50 text-center text-xs font-black leading-tight text-primary sm:h-20 sm:w-20 sm:text-sm">
                    Every<br />time
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {OUTPUTS.map((output) => {
                    const Icon = output.icon
                    return (
                      <div key={output.title} className="flex min-h-[108px] items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg sm:p-5">
                        <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${output.bg} ${output.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-base font-black leading-tight text-slate-950">{output.title}</h3>
                          <p className="mt-2 text-sm font-medium leading-5 text-slate-700">{output.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-5 flex items-center justify-center gap-3 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-center">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm font-black text-primary sm:text-base">All connected. All automated. All in one place.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white/95 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((benefit) => {
                const Icon = benefit.icon
                return (
                  <div key={benefit.title} className="flex items-start gap-4 border-slate-200 p-6 lg:border-r last:border-r-0">
                    <Icon className="h-8 w-8 shrink-0 text-primary" />
                    <div>
                      <h3 className="text-base font-black leading-tight text-slate-950">{benefit.title}</h3>
                      <p className="mt-2 text-sm font-medium leading-6 text-slate-700">{benefit.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-6 pb-12 pt-4 lg:pb-16">
          <div className="mx-auto max-w-[1320px]">
            <div className="grid items-stretch gap-8 lg:grid-cols-[0.92fr_1.08fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Fit check</p>
                <h2 className="mt-2 font-display text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
                  Who it&apos;s for.
                </h2>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <FitCard title="Best for" items={BEST_FOR} positive />
                  <FitCard title="Not for" items={NOT_FOR} />
                </div>
              </div>

              <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white/95 p-7 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8 xl:grid-cols-[1.05fr_0.62fr_0.9fr]">
                <div className="flex gap-6">
                  <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-blue-50 text-primary">
                    <Rocket className="h-10 w-10" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-3xl">
                      Built for sales teams that close.
                    </h3>
                    <p className="mt-4 text-base font-medium leading-7 text-slate-700">
                      From first meeting to final follow-up, Follow-Up Engine keeps your team aligned, consistent, and winning.
                    </p>
                    <Button className="mt-6" onClick={() => setTrialOpen(true)}>Try Product</Button>
                  </div>
                </div>

                <div className="border-slate-200 xl:border-l xl:px-8">
                  <h3 className="text-xl font-black text-slate-950">Connect with us</h3>
                  <div className="mt-6 space-y-5">
                    <SocialLink icon={Linkedin} label="LinkedIn" href="https://www.linkedin.com/company/the-strategy-pitch" />
                    <SocialLink icon={Github} label="GitHub" href="https://github.com/thestrategypitch/followup-engine" />
                    <button onClick={() => setContactOpen(true)} className="flex items-center gap-4 text-left text-base font-semibold text-slate-700 transition hover:text-primary">
                      <Mail className="h-7 w-7 text-primary" />
                      Email Us
                    </button>
                  </div>
                </div>

                <div className="border-slate-200 xl:border-l xl:pl-8">
                  <h3 className="text-xl font-black text-slate-950">GitHub Repository</h3>
                  <p className="mt-4 text-base font-medium leading-7 text-slate-700">
                    Explore the code, contribute, or request a feature.
                  </p>
                  <a
                    href="https://github.com/thestrategypitch/followup-engine"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-base font-semibold leading-6 text-slate-700 transition hover:border-primary/40 hover:bg-blue-50"
                  >
                    github.com/thestrategypitch/followup-engine
                    <ExternalLink className="h-5 w-5 shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            <footer className="mt-12 flex flex-col gap-4 text-sm font-medium text-slate-600 sm:flex-row sm:items-center sm:justify-between">
              <p>© 2025 Follow-Up Engine by The Strategy Pitch</p>
              <p>All rights reserved.</p>
            </footer>
          </div>
        </section>
      </main>
    </>
  )
}

function FitCard({ title, items, positive = false }: { title: string; items: string[]; positive?: boolean }) {
  return (
    <div className={`rounded-2xl border border-slate-200 p-7 shadow-[0_14px_36px_rgba(15,23,42,0.06)] ${positive ? 'bg-gradient-to-br from-white to-green-50/60' : 'bg-gradient-to-br from-white to-red-50/40'}`}>
      <h3 className="text-xl font-black text-slate-950">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-700">
            {positive ? <Check className="mt-1 h-4 w-4 shrink-0 text-green-600" /> : <X className="mt-1 h-4 w-4 shrink-0 text-red-500" />}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialLink({ icon: Icon, label, href }: { icon: IconType; label: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-base font-semibold text-slate-700 transition hover:text-primary">
      <Icon className="h-7 w-7 text-primary" />
      {label}
    </a>
  )
}
