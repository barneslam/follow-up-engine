import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Section, SectionEyebrow, Container } from '../components/Layout'
import { Button } from '../components/Button'
import { SurveyModal } from '../components/SurveyModal'
import { Copy, Check, File, X, AlertCircle } from 'lucide-react'
import { useTrialSession } from '../contexts/TrialContext'

export function DemoPage() {
  const navigate = useNavigate()
  const { trialSession, isTrialActive, isTrialExpired, daysRemaining, endTrial, clearReferralCode } = useTrialSession()
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
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [sessionWarning, setSessionWarning] = useState(false)
  const [sessionClosed, setSessionClosed] = useState(false)
  const [lastActivity, setLastActivity] = useState(Date.now())
  const [surveyOpen, setSurveyOpen] = useState(false)
  const [showCreateAccountPrompt, setShowCreateAccountPrompt] = useState(false)

  const SESSION_TIMEOUT = 5 * 60 * 1000
  const MAX_FILES = 3
  const MAX_FILE_SIZE = 20 * 1024 * 1024

  useEffect(() => {
    if (!isTrialActive()) {
      if (isTrialExpired() && trialSession) {
        setShowCreateAccountPrompt(true)
      } else if (!trialSession) {
        navigate('/')
      }
    }
  }, [isTrialActive, isTrialExpired, trialSession, navigate])

  const trackInteraction = (interactionType: string) => {
    const pattern = {
      type: interactionType,
      timestamp: new Date().toISOString(),
      flowType: formData.meetingType,
      tonePreference: formData.tone,
      urgencyLevel: formData.urgency,
    }
    localStorage.setItem(`pattern_${Date.now()}`, JSON.stringify(pattern))
  }

  useEffect(() => {
    const handleActivity = () => {
      if (!sessionClosed) {
        setLastActivity(Date.now())
        setSessionWarning(false)
      }
    }

    window.addEventListener('click', handleActivity)
    window.addEventListener('keypress', handleActivity)
    window.addEventListener('scroll', handleActivity)

    return () => {
      window.removeEventListener('click', handleActivity)
      window.removeEventListener('keypress', handleActivity)
      window.removeEventListener('scroll', handleActivity)
    }
  }, [sessionClosed])

  useEffect(() => {
    if (sessionClosed) return

    const warningTimer = setTimeout(() => {
      const timeSinceActivity = Date.now() - lastActivity
      if (timeSinceActivity >= SESSION_TIMEOUT - 30000) {
        setSessionWarning(true)
        trackInteraction('session_warning_shown')
      }
    }, SESSION_TIMEOUT - 30000)

    const closeTimer = setTimeout(() => {
      cleanupSession()
      setSessionClosed(true)
      trackInteraction('session_auto_closed')
    }, SESSION_TIMEOUT)

    return () => {
      clearTimeout(warningTimer)
      clearTimeout(closeTimer)
    }
  }, [lastActivity, sessionClosed])

  const cleanupSession = () => {
    setFormData({
      meetingType: 'sales-discovery',
      purpose: '',
      company: '',
      comments: '',
      tone: 'professional',
      urgency: 'normal',
      transcript: '',
    })
    setOutputs(null)
    setUploadedFiles([])
  }

  const handleContinueSession = () => {
    setSessionWarning(false)
    setLastActivity(Date.now())
    trackInteraction('session_continued')
  }

  const handleCloseSession = () => {
    cleanupSession()
    setSessionClosed(true)
    trackInteraction('session_manually_closed')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    trackInteraction('form_input_change')
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newFiles = [...uploadedFiles]

    for (const file of files) {
      if (newFiles.length >= MAX_FILES) {
        alert(`Maximum ${MAX_FILES} files allowed`)
        break
      }
      if (file.size > MAX_FILE_SIZE) {
        alert(`File ${file.name} exceeds 20 MB limit`)
        continue
      }
      newFiles.push(file)
    }

    setUploadedFiles(newFiles)
    trackInteraction('files_uploaded')
    e.target.value = ''
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
    trackInteraction('file_removed')
  }

  const generateOutputs = () => {
    if (!formData.transcript.trim()) {
      alert('Please paste a transcript to generate outputs.')
      return
    }

    setIsGenerating(true)
    trackInteraction('outputs_generated')

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

      setSurveyOpen(true)
      setIsGenerating(false)
    }, 1200)
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    trackInteraction('output_copied')
    setTimeout(() => setCopiedField(null), 2000)
  }

  if (showCreateAccountPrompt) {
    return (
      <>
        <section className="border-b border-border bg-surface px-6 py-16 sm:py-20">
          <Container>
            <div className="max-w-3xl">
              <div className="flex gap-4 mb-6">
                <AlertCircle className="h-8 w-8 text-amber-600 flex-shrink-0" />
                <div>
                  <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4">
                    Your Trial Has Ended
                  </h1>
                  <p className="text-lg text-muted-foreground mb-6">
                    Thank you for testing Follow-Up Engine! Your 7-day trial has ended.
                    Create an account to continue using the platform and unlock additional features.
                  </p>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => {
                        clearReferralCode()
                        endTrial()
                        navigate('/')
                      }}
                      className="mt-4"
                    >
                      Create Account
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        endTrial()
                        navigate('/')
                      }}
                      className="mt-4"
                    >
                      Return Home
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </>
    )
  }

  if (sessionClosed) {
    return (
      <>
        <section className="border-b border-border bg-surface px-6 py-16 sm:py-20">
          <Container>
            <div className="max-w-3xl">
              <h1 className="font-display text-4xl sm:text-5xl font-semibold text-destructive">
                Session Expired
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Your demo session has ended due to inactivity. All data has been automatically cleared for your privacy and security.
              </p>
              <Button
                onClick={() => {
                  setSessionClosed(false)
                  setLastActivity(Date.now())
                  trackInteraction('session_restarted')
                }}
                className="mt-6"
              >
                Start New Session
              </Button>
            </div>
          </Container>
        </section>
      </>
    )
  }

  return (
    <>
      <SurveyModal isOpen={surveyOpen} onClose={() => setSurveyOpen(false)} />

      {trialSession && isTrialActive() && daysRemaining() <= 2 && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-4">
          <Container>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-amber-700" />
                <p className="text-sm text-amber-800">
                  Your trial expires in {daysRemaining()} day{daysRemaining() !== 1 ? 's' : ''}. Create an account to keep using Follow-Up Engine.
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  clearReferralCode()
                  navigate('/')
                }}
                className="bg-amber-700 text-white hover:bg-amber-800"
              >
                Create Account
              </Button>
            </div>
          </Container>
        </div>
      )}

      {sessionWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-8 max-w-md shadow-lg">
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              Session Timeout Warning
            </h2>
            <p className="text-muted-foreground mb-6">
              Your session will close in 30 seconds due to inactivity. All data will be automatically cleared.
            </p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={handleCloseSession}
                className="flex-1"
              >
                Close Session
              </Button>
              <Button
                onClick={handleContinueSession}
                className="flex-1"
              >
                Continue Session
              </Button>
            </div>
          </div>
        </div>
      )}

      <section className="border-b border-border bg-surface px-6 py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <SectionEyebrow>Simulated demo</SectionEyebrow>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold">
              Generate a complete follow-up pack.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Adjust the inputs, paste a transcript, and click generate. Outputs are produced locally — nothing is sent to a server in this version. Session auto-closes after 5 minutes of inactivity.
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
                    Attachments
                  </label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      disabled={uploadedFiles.length >= MAX_FILES}
                      className="w-full text-sm"
                      accept="*/*"
                    />
                    <p className="text-xs text-muted-foreground">
                      Max {MAX_FILES} files, 20 MB each. Files auto-delete on session close.
                    </p>
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2 mt-3">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-surface p-2 rounded text-xs">
                            <div className="flex items-center gap-2 min-w-0">
                              <File className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{file.name}</span>
                            </div>
                            <button
                              onClick={() => removeFile(index)}
                              className="p-1 hover:bg-border rounded flex-shrink-0"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
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
                <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-5">
  <h3 className="text-sm font-bold text-amber-900 mb-2">
    Data Use Notice
  </h3>

  <div className="space-y-2 text-sm text-amber-900/80 leading-relaxed">
    <p>
      This demo is for evaluation and workflow testing only.
    </p>

    <p>
      Do not enter confidential, regulated, legal, medical, financial, HR,
      government, or third-party client information unless you are authorized
      to do so.
    </p>

    <p>
      Production use with real client data requires appropriate customer
      consent, security controls, retention settings, and deletion workflows.
    </p>
  </div>
</div>
               
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
