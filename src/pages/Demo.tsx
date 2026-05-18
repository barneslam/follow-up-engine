import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Layout'
import { Button } from '../components/Button'
import { TrialRequestDialog } from '../components/TrialRequestDialog'
import { logTemplateUsage, logProductEvent } from '../lib/templates/templateService'
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

type DemoScenario = {
  label: string
  clientName: string
  companyName: string
  prospectEmail: string
  meetingContext: string
  clientNeed: string
  keyMessage: string
  nextStep: string
  dealStatus: string
  risk: string
  managerAction: string
  repActions: string[]
  clientActions: string[]
  managerActions: string[]
}

const DEMO_SCENARIOS: DemoScenario[] = [
  {
    label: 'SMB sales team pilot',
    clientName: 'Sarah',
    companyName: 'ABC Company',
    prospectEmail: 'sarah@abccompany.com',
    meetingContext:
      'ABC Company has 3 sales reps. The team tracks pipeline follow-up manually in spreadsheets, and managers do not have consistent visibility into what was promised after sales calls.',
    clientNeed:
      'Better follow-up consistency, clearer rep accountability, and manager visibility after every sales meeting.',
    keyMessage:
      'A small 3-rep pilot can prove whether structured follow-up improves visibility without disrupting the current sales process.',
    nextStep: 'Schedule a 30-minute pilot review next week.',
    dealStatus: 'Moving forward, but early. Pilot interest is real; budget and final decision process still need validation.',
    risk: 'Decision authority and budget have not been confirmed yet.',
    managerAction: 'Review pilot pricing and be ready to support the next call if Sarah confirms interest.',
    repActions: ['Send solution one-pager', 'Prepare 3-rep pilot outline', 'Suggest two meeting times'],
    clientActions: ['Review one-pager', 'Confirm whether 3 pilot reps are available'],
    managerActions: ['Review pilot fit and pricing'],
  },
  {
    label: 'Manufacturing quote follow-up',
    clientName: 'Michael',
    companyName: 'Northstar Manufacturing',
    prospectEmail: 'michael@northstarmfg.com',
    meetingContext:
      'Northstar is comparing vendors for a production workflow improvement project. They asked for a revised quote, implementation timing, and clarification on support after rollout.',
    clientNeed:
      'A clear quote, realistic implementation timeline, and confidence that support will be available after deployment.',
    keyMessage:
      'The revised quote should reduce uncertainty and make the implementation path easier for the operations team to approve.',
    nextStep: 'Send the revised quote and book a decision review call this week.',
    dealStatus: 'Active opportunity. Commercial interest is strong, but timing and support expectations must be clarified.',
    risk: 'Competitor comparison is active and implementation support could become the deciding factor.',
    managerAction: 'Review quote assumptions and approve the support positioning before the client review call.',
    repActions: ['Send revised quote', 'Clarify implementation timeline', 'Prepare support summary'],
    clientActions: ['Review revised quote', 'Confirm internal approval timing'],
    managerActions: ['Validate pricing and support commitments'],
  },
  {
    label: 'Agency proposal follow-up',
    clientName: 'Priya',
    companyName: 'BrightPath Agency',
    prospectEmail: 'priya@brightpathagency.com',
    meetingContext:
      'BrightPath needs help improving client onboarding and follow-up after strategy meetings. The founder wants to reduce manual work while keeping client communication high quality.',
    clientNeed:
      'More consistent client follow-up, less manual admin, and better visibility into onboarding commitments.',
    keyMessage:
      'The proposal should show how the workflow saves time while improving the client experience after every meeting.',
    nextStep: 'Send the proposal and schedule a 20-minute scope confirmation call.',
    dealStatus: 'Strong fit. Buyer understands the pain and is looking for a practical workflow improvement.',
    risk: 'Scope could expand if onboarding, CRM, and client reporting are not separated clearly.',
    managerAction: 'Confirm proposal scope and guardrails before the client receives the final version.',
    repActions: ['Send proposal', 'Summarize scope boundaries', 'Offer two times for scope confirmation'],
    clientActions: ['Review proposal', 'Identify must-have onboarding workflows'],
    managerActions: ['Check scope and delivery assumptions'],
  },
  {
    label: 'IT services renewal risk',
    clientName: 'Daniel',
    companyName: 'Summit IT Services',
    prospectEmail: 'daniel@summititservices.com',
    meetingContext:
      'Summit is reviewing its current vendor relationship. The client raised concerns about slow response times, unclear ownership, and lack of proactive account updates.',
    clientNeed:
      'Clearer accountability, faster follow-up, and a proactive communication process before renewal decisions are made.',
    keyMessage:
      'The follow-up should acknowledge the concern directly, rebuild confidence, and propose a concrete service review cadence.',
    nextStep: 'Book a service review meeting and confirm the action plan before renewal discussions continue.',
    dealStatus: 'At risk. The account can be recovered, but only if ownership and response process are clarified quickly.',
    risk: 'Renewal may be delayed or lost if the client does not see immediate accountability.',
    managerAction: 'Join the next service review and confirm ownership of the recovery plan.',
    repActions: ['Send recovery follow-up email', 'Confirm service review agenda', 'Document response ownership'],
    clientActions: ['Confirm priority issues', 'Share preferred review time'],
    managerActions: ['Join service review', 'Approve recovery commitments'],
  },
]

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
  const [sampleIndex, setSampleIndex] = useState(0)

  const currentScenario = DEMO_SCENARIOS[sampleIndex]

  useEffect(() => {
    if (!generated) return

    const timer = window.setInterval(() => {
      setSampleIndex((current) => (current + 1) % DEMO_SCENARIOS.length)
    }, 7500)

    return () => window.clearInterval(timer)
  }, [generated])

  const sampleContext = useMemo(() => {
    return notes.trim()
      ? notes.trim().slice(0, 420)
      : currentScenario.meetingContext
  }, [notes, currentScenario])

  const handleGenerate = async () => {
    setGenerated(true)
    setActiveTab('email')

    await logProductEvent('demo_generate_follow_up_pack', {
      objective,
      tone,
      framework,
      has_notes: Boolean(notes.trim()),
    })

    await Promise.all([
      logTemplateUsage({
        output_type: 'client_email',
        intent: objective,
        tone,
        framework,
        page_path: window.location.pathname,
        input_character_count: notes.length,
        attachment_count: 0,
      }),
      logTemplateUsage({
        output_type: 'whatsapp',
        intent: objective,
        tone,
        framework,
        page_path: window.location.pathname,
        input_character_count: notes.length,
        attachment_count: 0,
      }),
      logTemplateUsage({
        output_type: 'action_items',
        intent: objective,
        tone,
        framework,
        page_path: window.location.pathname,
        input_character_count: notes.length,
        attachment_count: 0,
      }),
      logTemplateUsage({
        output_type: 'manager_email',
        intent: objective,
        tone,
        framework,
        page_path: window.location.pathname,
        input_character_count: notes.length,
        attachment_count: 0,
      }),
    ])
  }

  return (
    <>
      <TrialRequestDialog isOpen={trialOpen} onClose={() => setTrialOpen(false)} />

      <section className="border-b border-slate-200 bg-white px-6 py-10">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex rounded-full border border-primary/20 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Try Product Demo
            </div>
            <h1 className="font-display text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Turn meeting notes into intent-driven sales follow-up.
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg">
              Paste notes, add your communication intent, choose the tone, and generate a client email,
              WhatsApp summary, action items, and manager update.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-slate-200 bg-gradient-to-b from-[#f8fafc] to-[#eef2f7] px-6 py-10 lg:py-14">
        <Container>
          <div className="mx-auto grid max-w-7xl items-start gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:p-7">
              <div className="mb-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                <p className="text-sm font-medium leading-6 text-amber-950/80">
                  Demo use only. Do not paste confidential, regulated, legal, medical, financial,
                  HR, or third-party client information unless you are authorized to do so.
                </p>
              </div>

              <FieldLabel>1. Meeting notes or transcript</FieldLabel>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                className="w-full resize-none rounded-xl border border-slate-300 bg-white p-4 text-[15px] font-medium leading-7 text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Paste sample meeting notes here. Example: Prospect wants better sales follow-up, has 3 reps, currently uses manual notes, manager lacks visibility, next step is proposal review..."
              />

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel>2. Communication objective</FieldLabel>
                  <select
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-[15px] font-semibold text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                  <FieldLabel>3. Desired tone</FieldLabel>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-[15px] font-semibold text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                <FieldLabel>4. Key message to communicate</FieldLabel>
                <textarea
                  value={keyMessage}
                  onChange={(e) => setKeyMessage(e.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white p-4 text-[15px] font-medium leading-7 text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="What should the client clearly understand after reading the follow-up?"
                />
              </div>

              <div className="mt-5">
                <FieldLabel>5. Desired next step</FieldLabel>
                <textarea
                  value={nextStep}
                  onChange={(e) => setNextStep(e.target.value)}
                  rows={2}
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white p-4 text-[15px] font-medium leading-7 text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Example: Schedule a 30-minute pilot review next week."
                />
              </div>

              <div className="mt-5">
                <FieldLabel>6. Attachments / context <span className="font-medium normal-case tracking-normal text-slate-400">(Optional)</span></FieldLabel>
                <div className="grid gap-3 sm:grid-cols-3">
                  {['Proposal.pdf', 'Pricing.pdf', 'Prior Email.docx'].map((file) => (
                    <div key={file} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center shadow-sm">
                      <Paperclip className="mx-auto h-5 w-5 text-slate-500" />
                      <p className="mt-2 truncate text-xs font-bold text-slate-800">{file}</p>
                      <p className="mt-1 text-[11px] font-medium text-slate-500">Placeholder</p>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
                  Upload support is coming next. Demo shows how context will improve follow-up quality. Max 3 files.
                </p>
              </div>

              <div className="mt-5">
                <FieldLabel>7. Sales framework template</FieldLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  <FrameworkButton id="general" label="General Follow-Up" framework={framework} setFramework={setFramework} />
                  <FrameworkButton id="discovery" label="Discovery" framework={framework} setFramework={setFramework} />
                  <DisabledFramework label="SPIN" />
                  <DisabledFramework label="CHAIN" />
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_160px]">
                <Button size="lg" onClick={handleGenerate} className="w-full">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Follow-Up Pack
                </Button>
                <Link
                  to="/pricing"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Buy
                </Link>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:p-7">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Rotating scenario</p>
                  <p className="mt-1 text-base font-bold text-slate-950">{currentScenario.label}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSampleIndex((current) => (current + 1) % DEMO_SCENARIOS.length)}
                  className="h-10 rounded-xl border border-primary/20 bg-white px-4 text-sm font-bold text-primary shadow-sm transition hover:bg-blue-50"
                >
                  Next example
                </button>
              </div>

              <div className="mb-5 grid grid-cols-2 gap-3">
                <OutputButton id="email" activeTab={activeTab} setActiveTab={setActiveTab} icon={<Mail className="h-4 w-4" />} label="Client Email" />
                <OutputButton id="whatsapp" activeTab={activeTab} setActiveTab={setActiveTab} icon={<MessageCircle className="h-4 w-4" />} label="WhatsApp" />
                <OutputButton id="actions" activeTab={activeTab} setActiveTab={setActiveTab} icon={<ListChecks className="h-4 w-4" />} label="Actions" />
                <OutputButton id="manager" activeTab={activeTab} setActiveTab={setActiveTab} icon={<Users className="h-4 w-4" />} label="Manager Email" />
              </div>

              <div className="min-h-[470px] rounded-2xl border border-slate-200 bg-white p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_35px_rgba(15,23,42,0.06)]">
                {!generated ? (
                  <div className="flex h-[420px] flex-col items-center justify-center text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-primary">
                      <Sparkles className="h-9 w-9" />
                    </div>
                    <p className="text-2xl font-bold leading-tight text-slate-950">Add intent and generate<br />a sample pack.</p>
                    <p className="mt-5 max-w-md text-sm font-medium leading-6 text-slate-600">
                      This demo shows how transcript, communication intent, next step, and supporting context shape the output.
                    </p>
                  </div>
                ) : (
                  <OutputPanel
                    activeTab={activeTab}
                    scenario={currentScenario}
                    summarySource={sampleContext}
                    objective={objective}
                    tone={tone}
                    keyMessage={keyMessage}
                    nextStep={notes.trim() ? nextStep : currentScenario.nextStep}
                    framework={framework}
                  />
                )}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button size="lg" onClick={() => setTrialOpen(true)} className="w-full">
                  Start 14-Day Trial
                </Button>
                <Link
                  to="/pricing"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  View Pricing <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-slate-800">
      {children}
    </label>
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
      type="button"
      onClick={() => setFramework(id)}
      className={`min-h-12 rounded-xl border px-4 py-3 text-sm font-bold leading-tight transition ${
        active ? 'border-primary bg-primary text-white shadow-md' : 'border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50'
      }`}
    >
      {label}
    </button>
  )
}

function DisabledFramework({ label }: { label: string }) {
  return (
    <div className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-center text-sm font-bold leading-tight text-slate-500">
      <Lock className="h-4 w-4" />
      <span>{label}<br /><span className="text-xs font-semibold">Coming Soon</span></span>
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
      type="button"
      onClick={() => setActiveTab(id)}
      className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition ${
        active
          ? 'border-primary bg-primary text-white shadow-md'
          : 'border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function OutputPanel({
  activeTab,
  scenario,
  summarySource,
  objective,
  tone,
  keyMessage,
  nextStep,
  framework,
}: {
  activeTab: OutputTab
  scenario: DemoScenario
  summarySource: string
  objective: string
  tone: string
  keyMessage: string
  nextStep: string
  framework: Framework
}) {
  const frameworkLabel = framework === 'discovery' ? 'Discovery follow-up' : 'General follow-up'
  const appliedKeyMessage = keyMessage.trim() || scenario.keyMessage

  if (activeTab === 'email') {
    return (
      <div className="space-y-4 text-sm font-medium leading-7 text-slate-800">
        <p className="font-bold text-slate-950">Subject: Next steps from our conversation — {scenario.companyName}</p>
        <p>Hi {scenario.clientName},</p>
        <p>
          Thank you again for the conversation today. Based on our discussion, the priority is {scenario.clientNeed.toLowerCase()}
        </p>
        <p className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <strong>Context used:</strong> {summarySource}
        </p>
        <p>The key message I want to reinforce is: {appliedKeyMessage}</p>
        <p>
          From a {tone.toLowerCase()} perspective, the recommended next step is to {nextStep.charAt(0).toLowerCase() + nextStep.slice(1)}
        </p>
        <p>
          Would Tuesday or Wednesday work for a short follow-up discussion so we can review the next step together and keep momentum moving?
        </p>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
          Template: {frameworkLabel} · Objective: {objective}
        </p>
      </div>
    )
  }

  if (activeTab === 'whatsapp') {
    return (
      <div className="space-y-4 text-sm font-medium leading-7 text-slate-800">
        <p className="font-bold text-slate-950">WhatsApp / Short Message</p>
        <p className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          Hi {scenario.clientName}, quick recap from today: the main focus is {scenario.clientNeed.toLowerCase()} Next step: {nextStep} Would Tuesday or Wednesday work for a quick follow-up?
        </p>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
          Rule applied: short recap + one next step + one scheduling question
        </p>
      </div>
    )
  }

  if (activeTab === 'actions') {
    return (
      <div className="space-y-4 text-sm font-medium leading-7 text-slate-800">
        <p className="font-bold text-slate-950">Action Items</p>
        <div className="space-y-3">
          <ActionGroup title="Rep Actions" items={scenario.repActions} owner="Rep" />
          <ActionGroup title="Client Actions" items={scenario.clientActions} owner={scenario.clientName} />
          <ActionGroup title="Manager Actions" items={scenario.managerActions} owner="Manager" />
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950">
          <strong>Risk / Unknown:</strong> {scenario.risk}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 text-sm font-medium leading-7 text-slate-800">
      <p className="font-bold text-slate-950">Subject: Manager update — {scenario.companyName}</p>
      <p>Hi Manager,</p>
      <p>Quick update from the meeting with {scenario.clientName}: {scenario.meetingContext}</p>
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p><strong>Opportunity:</strong> {scenario.clientNeed}</p>
        <p className="mt-2"><strong>Deal status:</strong> {scenario.dealStatus}</p>
        <p className="mt-2"><strong>Risk:</strong> {scenario.risk}</p>
        <p className="mt-2"><strong>Next step:</strong> {nextStep}</p>
        <p className="mt-2"><strong>Recommended manager action:</strong> {scenario.managerAction}</p>
      </div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
        Objective: {objective} · Tone: {tone} · Framework: {frameworkLabel}
      </p>
    </div>
  )
}

function ActionGroup({ title, items, owner }: { title: string; items: string[]; owner: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="font-bold text-slate-950">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item}>- {item} — Owner: {owner} — Due: Before next meeting</li>
        ))}
      </ul>
    </div>
  )
}
