import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Section, Container } from '../components/Layout'
import { Button } from '../components/Button'
import { TrialRequestDialog } from '../components/TrialRequestDialog'
import { Mail, MessageCircle, ListChecks, Users, ArrowRight, Shield } from 'lucide-react'

type OutputTab = 'email' | 'whatsapp' | 'actions' | 'manager'

export function DemoPage() {
  const [trialOpen, setTrialOpen] = useState(false)
  const [notes, setNotes] = useState('')
  const [generated, setGenerated] = useState(false)
  const [activeTab, setActiveTab] = useState<OutputTab>('email')

  const handleGenerate = () => {
    setGenerated(true)
    setActiveTab('email')
  }

  const summarySource = notes.trim()
    ? notes.slice(0, 220)
    : 'The prospect is interested in improving sales follow-up consistency, manager visibility, and next-step accountability after sales meetings.'

  return (
    <>
      <TrialRequestDialog isOpen={trialOpen} onClose={() => setTrialOpen(false)} />

      <section className="border-b border-border bg-gradient-to-b from-white via-[#f7fbff] to-[#f5f4f1] px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <Container>
          <div className="max-w-4xl">
            <div className="mb-6 inline-block rounded-full border border-primary/20 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-primary">
              Try Product Demo
            </div>

            <h1 className="font-display text-5xl sm:text-6xl font-bold leading-[0.98] tracking-tight text-slate">
              Paste meeting notes. Generate team-ready follow-up.
            </h1>

            <p className="mt-8 max-w-3xl text-lg sm:text-[1.35rem] font-medium leading-[1.6] text-slate/80">
              Test how Follow-Up Engine turns a sales conversation into rep follow-up, action items,
              WhatsApp summary, and a manager update email.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => setTrialOpen(true)}>
                Start 14-Day Trial
              </Button>

              <Link
                to="/pricing"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-slate hover:bg-slate-50 transition"
              >
                Buy
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-[#f8f7f4] border-b border-border">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <div className="mb-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <Shield className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
              <p className="text-sm leading-relaxed text-amber-900/85">
                Demo use only. Do not paste confidential, regulated, legal, medical, financial,
                HR, or third-party client information unless you are authorized to do so.
              </p>
            </div>

            <label className="block text-sm font-bold text-slate mb-3">
              Meeting notes or transcript
            </label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={14}
              className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-sm leading-relaxed text-slate shadow-inner focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Paste sample meeting notes here. Example: Prospect wants better sales follow-up, has 3 reps, currently uses manual notes, manager lacks visibility, next step is proposal review..."
            />

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={handleGenerate}>
                Generate Follow-Up Pack
              </Button>

              <Link
                to="/pricing"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-slate hover:bg-slate-50 transition"
              >
                Buy
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <div className="mb-6">
              <h2 className="font-display text-3xl font-bold text-slate">
                Generated follow-up pack
              </h2>
              <p className="mt-2 text-sm text-slate/70">
                Four practical outputs for the rep and the manager.
              </p>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <OutputButton id="email" activeTab={activeTab} setActiveTab={setActiveTab} icon={<Mail className="h-4 w-4" />} label="Email" />
              <OutputButton id="whatsapp" activeTab={activeTab} setActiveTab={setActiveTab} icon={<MessageCircle className="h-4 w-4" />} label="WhatsApp" />
              <OutputButton id="actions" activeTab={activeTab} setActiveTab={setActiveTab} icon={<ListChecks className="h-4 w-4" />} label="Actions" />
              <OutputButton id="manager" activeTab={activeTab} setActiveTab={setActiveTab} icon={<Users className="h-4 w-4" />} label="Manager Email" />
            </div>

            <div className="min-h-[360px] rounded-2xl border border-slate-200 bg-slate-50 p-6">
              {!generated ? (
                <div className="flex h-[300px] flex-col items-center justify-center text-center">
                  <p className="text-lg font-semibold text-slate">Paste notes and generate a sample pack.</p>
                  <p className="mt-3 max-w-md text-sm text-slate/60">
                    This demo shows the intended workflow. Production logic and integrations will be expanded after beta feedback.
                  </p>
                </div>
              ) : (
                <OutputPanel activeTab={activeTab} summarySource={summarySource} />
              )}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => setTrialOpen(true)}>
                Start 14-Day Trial
              </Button>

              <Link
                to="/pricing"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-slate hover:bg-slate-50 transition"
              >
                View Pricing <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

function OutputButton({
  id,
  label,
  icon,
  activeTab,
  setActiveTab,
}: {
  id: OutputTab
  label: string
  icon: React.ReactNode
  activeTab: OutputTab
  setActiveTab: (tab: OutputTab) => void
}) {
  const active = activeTab === id

  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
        active
          ? 'border-primary bg-primary text-white shadow-md'
          : 'border-slate-200 bg-white text-slate hover:bg-slate-50'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function OutputPanel({ activeTab, summarySource }: { activeTab: OutputTab; summarySource: string }) {
  if (activeTab === 'email') {
    return (
      <div className="space-y-4 text-sm leading-relaxed text-slate">
        <p className="font-bold">Subject: Next steps from our sales conversation</p>
        <p>Hi Sarah,</p>
        <p>Thank you for the conversation today. Based on our discussion, your team is looking for a more consistent way to manage sales follow-up and next steps.</p>
        <p className="rounded-xl bg-white p-4 border border-slate-200">{summarySource}</p>
        <p>Next step: I will send a short summary and proposed pilot approach for your team to review.</p>
      </div>
    )
  }

  if (activeTab === 'whatsapp') {
    return (
      <div className="space-y-4 text-sm leading-relaxed text-slate">
        <p className="font-bold">WhatsApp / Short Message</p>
        <p className="rounded-xl bg-white p-4 border border-slate-200">
          Quick recap from today: your team wants better follow-up consistency and clearer manager visibility after sales calls. I’ll send the pilot summary and next steps for review.
        </p>
      </div>
    )
  }

  if (activeTab === 'actions') {
    return (
      <div className="space-y-4 text-sm leading-relaxed text-slate">
        <p className="font-bold">Action Items</p>
        <ul className="space-y-3">
          <li className="rounded-xl bg-white p-4 border border-slate-200">Owner: Rep — Send follow-up email today.</li>
          <li className="rounded-xl bg-white p-4 border border-slate-200">Owner: Rep — Confirm pilot users and timeline.</li>
          <li className="rounded-xl bg-white p-4 border border-slate-200">Owner: Manager — Review opportunity risk and next step.</li>
        </ul>
      </div>
    )
  }

  return (
    <div className="space-y-4 text-sm leading-relaxed text-slate">
      <p className="font-bold">Subject: Manager update — sales meeting follow-up</p>
      <p>Hi Manager,</p>
      <p>Quick update from the meeting: the prospect appears interested in improving follow-up discipline across a small sales team.</p>
      <p className="rounded-xl bg-white p-4 border border-slate-200">
        Opportunity: strong fit for team workflow. Risk: decision timeline and owner still need confirmation. Recommended next move: send pilot summary and secure a follow-up meeting.
      </p>
    </div>
  )
}
