import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Section, Container } from '../components/Layout'
import { Button } from '../components/Button'
import { TrialRequestDialog } from '../components/TrialRequestDialog'
import {
  Mail,
  MessageCircle,
  ListChecks,
  Users,
  ArrowRight,
  Shield,
  Paperclip,
  Sparkles,
  Lock,
} from 'lucide-react'

type OutputTab = 'email' | 'whatsapp' | 'actions' | 'manager'
type Framework = 'general' | 'discovery' | 'spin' | 'chain'

export function DemoPage() {
  const [trialOpen, setTrialOpen] = useState(false)
  const [notes, setNotes] = useState('')
  const [objective, setObjective] = useState('Secure next meeting')
  const [tone, setTone] = useState('Consultative')
  const [keyMessage, setKeyMessage] = useState('Reinforce that the team needs better follow-up consistency and manager visibility.')
  const [nextStep, setNextStep] = useState('Schedule a 30-minute pilot review next week.')
  const [framework, setFramework] = useState<Framework>('general')
  const [generated, setGenerated] = useState(false)
  const [activeTab, setActiveTab] = useState<OutputTab>('email')

  const sampleContext = useMemo(() => {
    return notes.trim()
      ? notes.trim().slice(0, 420)
      : 'The prospect is interested in improving sales follow-up consistency, manager visibility, and next-step accountability after sales meetings.'
  }, [notes])

  const handleGenerate = () => {
    setGenerated(true)
    setActiveTab('email')
  }

  return (
    <>
      <TrialRequestDialog isOpen={trialOpen} onClose={() => setTrialOpen(false)} />

      <section className="border-b border-border bg-gradient-to-b from-[#f7fbff] via-[#edf6ff] to-[#f4f1eb] px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <Container>
          <div className="max-w-4xl">
            <div className="mb-6 inline-block rounded-full border border-primary/20 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-primary">
              Try Product Demo
            </div>

            <h1 className="font-display text-5xl sm:text-6xl font-bold leading-[0.98] tracking-tight text-slate">
              Turn meeting notes into intent-driven sales follow-up.
            </h1>

            <p className="mt-8 max-w-3xl text-lg sm:text-[1.35rem] font-medium leading-[1.6] text-slate/80">
              Paste notes, add your communication intent, choose the tone, and generate a client email,
              WhatsApp summary, action items, and manager update.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => setTrialOpen(true)}>
                Start 14-Day Trial
              </Button>

              <Link
                to="/pricing"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-slate hover:bg-[#f5f7fb] transition"
              >
                Buy
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-[#f4f1eb] border-b border-border">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="mb-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <Shield className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
              <p className="text-sm leading-relaxed text-amber-900/85">
                Demo use only. Do not paste confidential, regulated, legal, medical, financial,
                HR, or third-party client information unless you are authorized to do so.
              </p>
            </div>

            <label className="block text-sm font-bold text-slate mb-3">
              1. Meeting notes or transcript
            </label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={9}
              className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-sm leading-relaxed text-slate shadow-inner focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Paste sample meeting notes here. Example: Prospect wants better sales follow-up, has 3 reps, currently uses manual notes, manager lacks visibility, next step is proposal review..."
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate/70">
                  2. Communication Objective
                </label>
                <select
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Move deal forward</option>
                  <option>Secure next meeting</option>
                  <option>Proposal follow-up</option>
                  <option>Build trust</option>
                  <option>Clarify misunderstanding</option>
                  <option>Re-engage opportunity</option>
                  <option>Executive follow-up</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate/70">
                  3. Desired Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Executive</option>
                  <option>Consultative</option>
                  <option>Strategic advisor</option>
                  <option>Friendly</option>
                  <option>Direct</option>
                  <option>Technical</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate/70">
                4. Key message to communicate
              </label>
              <textarea
                value={keyMessage}
                onChange={(e) => setKeyMessage(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="What should the client clearly understand after reading the follow-up?"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate/70">
                5. Desired next step
              </label>
              <textarea
                value={nextStep}
                onChange={(e) => setNextStep(e.target.value)}
                rows={2}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Example: Schedule a 30-minute pilot review next week."
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate/70">
                6. Attachments / context
              </label>

              <div className="grid gap-3 sm:grid-cols-3">
                {['Proposal.pdf', 'Pricing.pdf', 'Prior Email.docx'].map((file) => (
                  <div key={file} className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center">
                    <Paperclip className="mx-auto h-5 w-5 text-slate/50" />
                    <p className="mt-2 text-xs font-semibold text-slate/70">{file}</p>
                    <p className="mt-1 text-[11px] text-slate/50">Placeholder</p>
                  </div>
                ))}
              </div>

              <p className="mt-2 text-xs text-slate/50">
                Upload support is coming next. Demo shows how context will improve follow-up quality. Max 3 files.
              </p>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate/70">
                7. Sales framework template
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <FrameworkButton id="general" label="General Follow-Up" framework={framework} setFramework={setFramework} />
                <FrameworkButton id="discovery" label="Discovery" framework={framework} setFramework={setFramework} />
                <DisabledFramework label="SPIN" />
                <DisabledFramework label="CHAIN" />
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={handleGenerate}>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Follow-Up Pack
              </Button>

              <Link
                to="/pricing"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-slate hover:bg-[#f5f7fb] transition"
              >
                Buy
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="mb-6">
              <h2 className="font-display text-3xl font-bold text-slate">
                Generated follow-up pack
              </h2>
              <p className="mt-2 text-sm text-slate/70">
                Intent-driven outputs for the rep and the manager.
              </p>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <OutputButton id="email" activeTab={activeTab} setActiveTab={setActiveTab} icon={<Mail className="h-4 w-4" />} label="Client Email" />
              <OutputButton id="whatsapp" activeTab={activeTab} setActiveTab={setActiveTab} icon={<MessageCircle className="h-4 w-4" />} label="WhatsApp" />
              <OutputButton id="actions" activeTab={activeTab} setActiveTab={setActiveTab} icon={<ListChecks className="h-4 w-4" />} label="Actions" />
              <OutputButton id="manager" activeTab={activeTab} setActiveTab={setActiveTab} icon={<Users className="h-4 w-4" />} label="Manager Email" />
            </div>

            <div className="min-h-[430px] rounded-2xl border border-slate-200 bg-[#f8fafc] p-6">
              {!generated ? (
                <div className="flex h-[360px] flex-col items-center justify-center text-center">
                  <p className="text-lg font-semibold text-slate">Add intent and generate a sample pack.</p>
                  <p className="mt-3 max-w-md text-sm text-slate/60">
                    This demo shows how transcript, communication intent, next step, and supporting context shape the output.
                  </p>
                </div>
              ) : (
                <OutputPanel
                  activeTab={activeTab}
                  summarySource={sampleContext}
                  objective={objective}
                  tone={tone}
                  keyMessage={keyMessage}
                  nextStep={nextStep}
                  framework={framework}
                />
              )}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => setTrialOpen(true)}>
                Start 14-Day Trial
              </Button>

              <Link
                to="/pricing"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-slate hover:bg-[#f5f7fb] transition"
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

function FrameworkButton({
  id,
  label,
  framework,
  setFramework,
}: {
  id: Framework
  label: string
  framework: Framework
  setFramework: (framework: Framework) => void
}) {
  const active = framework === id

  return (
    <button
      onClick={() => setFramework(id)}
      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
        active ? 'border-primary bg-primary text-white shadow-md' : 'border-slate-200 bg-white text-slate hover:bg-[#f5f7fb]'
      }`}
    >
      {label}
    </button>
  )
}

function DisabledFramework({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate/40">
      <Lock className="h-4 w-4" />
      {label} Coming Soon
    </div>
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
          : 'border-slate-200 bg-white text-slate hover:bg-[#f5f7fb]'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function OutputPanel({
  activeTab,
  summarySource,
  objective,
  tone,
  keyMessage,
  nextStep,
  framework,
}: {
  activeTab: OutputTab
  summarySource: string
  objective: string
  tone: string
  keyMessage: string
  nextStep: string
  framework: Framework
}) {
  const frameworkLabel = framework === 'discovery' ? 'Discovery follow-up' : 'General follow-up'

  if (activeTab === 'email') {
    return (
      <div className="space-y-4 text-sm leading-relaxed text-slate">
        <p className="font-bold">Subject: Next steps from today’s conversation</p>
        <p>Hi Sarah,</p>
        <p>
          Thank you again for the conversation today. Based on our discussion, the priority appears to be moving from meeting activity to consistent follow-through across the team.
        </p>
        <p className="rounded-xl bg-white p-4 border border-slate-200">
          <strong>Context used:</strong> {summarySource}
        </p>
        <p>
          The key message I want to reinforce is: {keyMessage}
        </p>
        <p>
          From a {tone.toLowerCase()} perspective, the recommended next step is to {nextStep.charAt(0).toLowerCase() + nextStep.slice(1)}
        </p>
        <p>
          Would Tuesday or Wednesday work for a short follow-up discussion so we can review the next step together and keep momentum moving?
        </p>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          Template: {frameworkLabel} · Objective: {objective}
        </p>
      </div>
    )
  }

  if (activeTab === 'whatsapp') {
    return (
      <div className="space-y-4 text-sm leading-relaxed text-slate">
        <p className="font-bold">WhatsApp / Short Message</p>
        <p className="rounded-xl bg-white p-4 border border-slate-200">
          Quick recap from today: the main focus is improving team follow-up consistency and manager visibility. Next step: {nextStep} I’ll send the short summary and we can confirm a time to review.
        </p>
      </div>
    )
  }

  if (activeTab === 'actions') {
    return (
      <div className="space-y-4 text-sm leading-relaxed text-slate">
        <p className="font-bold">Action Items</p>
        <ul className="space-y-3">
          <li className="rounded-xl bg-white p-4 border border-slate-200">Owner: Rep — Send client follow-up email with clear next meeting CTA.</li>
          <li className="rounded-xl bg-white p-4 border border-slate-200">Owner: Rep — Confirm preferred time for follow-up discussion.</li>
          <li className="rounded-xl bg-white p-4 border border-slate-200">Owner: Manager — Review opportunity risk, next step, and timeline.</li>
        </ul>
      </div>
    )
  }

  return (
    <div className="space-y-4 text-sm leading-relaxed text-slate">
      <p className="font-bold">Subject: Manager update — sales meeting follow-up</p>
      <p>Hi Manager,</p>
      <p>
        Quick update from the meeting: the prospect appears aligned with the need for better follow-up discipline and visibility across a small sales team.
      </p>
      <p className="rounded-xl bg-white p-4 border border-slate-200">
        <strong>Opportunity:</strong> Strong fit for team workflow. <br />
        <strong>Risk:</strong> Decision timeline and owner still need confirmation. <br />
        <strong>Next step:</strong> {nextStep}
      </p>
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        Objective: {objective} · Tone: {tone} · Framework: {frameworkLabel}
      </p>
    </div>
  )
}
