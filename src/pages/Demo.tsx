import { useState } from 'react'
import { Section, SectionEyebrow, Container } from '../components/Layout'
import { Button } from '../components/Button'
import { Copy, Check } from 'lucide-react'

export function DemoPage() {
  const [formData, setFormData] = useState({
    meetingType: 'sales-discovery',
    purpose: '',
    company: '',
    comments: '',
    tone: 'professional',
    urgency: 'normal',
    transcript: '',
  })

  const [outputs, setOutputs] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const generateOutputs = () => {
    if (!formData.transcript.trim()) {
      alert('Please paste a transcript to generate outputs.')
      return
    }

    setIsGenerating(true)
    setTimeout(() => {
      const tonePrefix = formData.tone === 'casual' ? 'Hey ' : 'Hello '
      const urgencyText = formData.urgency === 'high' ? 'ASAP' : 'soon'

      setOutputs({
        email: `Subject: Next steps from our ${formData.meetingType === 'sales-discovery' ? 'discovery' : formData.meetingType} call\n\n${tonePrefix}${formData.company} team,\n\nThank you for taking the time to meet with us today. We discussed ${formData.purpose}. Here's what we're taking forward:\n\n**Key Points:**\n• We explored how our solution fits your workflow\n• Discussed implementation timeline and success metrics\n• Identified 3 key areas for immediate impact\n\n**Next Steps:**\n1. Send you a detailed proposal by Friday\n2. Schedule a follow-up demo with your team\n3. Prepare a pilot plan for your review\n\nPlease let me know if you have any questions or need anything in the meantime.\n\nBest regards,\nYour Sales Team`,

        whatsapp: `Thanks for the call today! 🎯\n\nQuick recap:\n✓ Discussed your ${formData.purpose}\n✓ Reviewed solution fit\n✓ Identified 3 impact areas\n\nSending detailed proposal Friday. Chat soon! 👋`,

        actionItems: `Action Items\n\n1. [YOU] Send proposal to ${formData.company}\n   Due: Friday 5pm\n\n2. [THEM] Review solution and send feedback\n   Due: Next Tuesday\n\n3. [YOU] Schedule follow-up demo\n   Due: Friday EOD\n\n4. [THEM] Coordinate team for pilot discussion\n   Due: Next Wednesday`,

        managerEmail: `Subject: ${formData.company} - Sales Update\n\nMet with ${formData.company} today to discuss ${formData.purpose}.\n\n**Opportunity Status:** Active\n**Deal Stage:** Discovery → Proposal\n**Est. Timeline:** 2-3 weeks to pilot\n**Est. Value:** Pending pricing discussion\n\n**What We're Doing:**\n• Sending proposal Friday\n• Scheduling follow-up demo\n• Preparing pilot plan\n\n**What They're Doing:**\n• Reviewing solution fit\n• Gathering internal feedback\n• Coordinating team members\n\n**Risk Factors:** None identified\n**Next Touch:** Friday proposal send`,

        nextSteps: `Pipeline & Next Steps\n\n**Move to:** Proposal Stage\n**Timeline:** 2-3 weeks\n\n1. Friday: Send $${Math.floor(Math.random() * 50000) + 20000} proposal\n2. Tuesday: Follow-up demo with full team\n3. Thursday: Incorporate feedback\n4. Next week: Pilot project kickoff\n\n**Success Metrics:**\n• Response within 48 hours of proposal\n• Demo attendance: 3+ team members\n• Pilot commitment: 2-week trial\n\n**Required Actions:**\n• Customize proposal for their use case\n• Prepare demo scenarios\n• Draft pilot SLA`,
      })

      setIsGenerating(false)
    }, 1200)
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <>
      <section className="border-b border-border bg-surface px-6 py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <SectionEyebrow>Simulated demo</SectionEyebrow>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold">
              Generate a complete follow-up pack.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Adjust the inputs, paste a transcript, and click generate. Outputs are produced locally — nothing is sent to a server in this version.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-24">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-2">
                    Meeting Type
                  </label>
                  <select
                    name="meetingType"
                    value={formData.meetingType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="sales-discovery">Sales Discovery</option>
                    <option value="follow-up">Follow-up Call</option>
                    <option value="demo">Demo Call</option>
                    <option value="close">Close Call</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-2">
                    Purpose of Call
                  </label>
                  <input
                    type="text"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    placeholder="e.g., Discuss implementation timeline"
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g., Acme Corp"
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-2">
                    Your Comments
                  </label>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Additional context or notes..."
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-2">
                    Tone
                  </label>
                  <select
                    name="tone"
                    value={formData.tone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual & Friendly</option>
                    <option value="formal">Formal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-2">
                    Urgency
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-2">
                  Meeting Transcript
                </label>
                <textarea
                  name="transcript"
                  value={formData.transcript}
                  onChange={handleChange}
                  placeholder="Paste your meeting transcript here..."
                  rows={12}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  💡 Tip: Paste a transcript from Fathom, Otter.ai, or any transcription service.
                </p>
              </div>

              <Button
                size="lg"
                onClick={generateOutputs}
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? 'Generating...' : 'Generate Follow-Up Pack'}
              </Button>

              {outputs && (
                <div className="mt-12 space-y-8">
                  <OutputBox
                    title="📧 Follow-Up Email"
                    content={outputs.email}
                    field="email"
                    copiedField={copiedField}
                    onCopy={copyToClipboard}
                  />

                  <OutputBox
                    title="💬 WhatsApp Summary"
                    content={outputs.whatsapp}
                    field="whatsapp"
                    copiedField={copiedField}
                    onCopy={copyToClipboard}
                  />

                  <OutputBox
                    title="✅ Action Items"
                    content={outputs.actionItems}
                    field="actionItems"
                    copiedField={copiedField}
                    onCopy={copyToClipboard}
                  />

                  <OutputBox
                    title="👔 Manager Email"
                    content={outputs.managerEmail}
                    field="managerEmail"
                    copiedField={copiedField}
                    onCopy={copyToClipboard}
                  />

                  <OutputBox
                    title="📈 Pipeline & Next Steps"
                    content={outputs.nextSteps}
                    field="nextSteps"
                    copiedField={copiedField}
                    onCopy={copyToClipboard}
                  />
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

function OutputBox({
  title,
  content,
  field,
  copiedField,
  onCopy
}: {
  title: string
  content: string
  field: string
  copiedField: string | null
  onCopy: (text: string, field: string) => void
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <button
          onClick={() => onCopy(content, field)}
          className="p-2 hover:bg-surface rounded transition"
          title="Copy to clipboard"
        >
          {copiedField === field ? (
            <Check className="h-4 w-4 text-success" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </div>
      <pre className="text-xs whitespace-pre-wrap break-words text-muted-foreground font-mono overflow-auto max-h-64">
        {content}
      </pre>
    </div>
  )
}
