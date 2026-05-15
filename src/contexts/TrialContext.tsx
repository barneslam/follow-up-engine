import { createContext, useContext, useState, useEffect } from 'react'

export interface TrialSession {
  id: string
  email: string
  firstName: string
  lastName: string
  company: string
  trialStartDate: string
  trialEndDate: string
  referralCode: string
}

interface TrialContextType {
  trialSession: TrialSession | null
  startTrial: (session: TrialSession) => void
  endTrial: () => void
  clearReferralCode: () => void
  isTrialActive: () => boolean
  isTrialExpired: () => boolean
  daysRemaining: () => number
}

const TrialContext = createContext<TrialContextType | undefined>(undefined)

export function TrialProvider({ children }: { children: React.ReactNode }) {
  const [trialSession, setTrialSession] = useState<TrialSession | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('trial_session')
    if (stored) {
      try {
        setTrialSession(JSON.parse(stored))
      } catch {
        localStorage.removeItem('trial_session')
      }
    }
  }, [])

  const startTrial = (session: TrialSession) => {
    setTrialSession(session)
    localStorage.setItem('trial_session', JSON.stringify(session))
  }

  const endTrial = () => {
    setTrialSession(null)
    localStorage.removeItem('trial_session')
    localStorage.removeItem('trial_referral_code')
  }

  const clearReferralCode = () => {
    if (trialSession) {
      setTrialSession({ ...trialSession, referralCode: '' })
      localStorage.removeItem('trial_referral_code')
    }
  }

  const isTrialActive = () => {
    if (!trialSession) return false
    const now = new Date()
    const endDate = new Date(trialSession.trialEndDate)
    return now < endDate
  }

  const isTrialExpired = () => {
    if (!trialSession) return true
    const now = new Date()
    const endDate = new Date(trialSession.trialEndDate)
    return now >= endDate
  }

  const daysRemaining = () => {
    if (!trialSession) return 0
    const now = new Date()
    const endDate = new Date(trialSession.trialEndDate)
    const diff = endDate.getTime() - now.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  return (
    <TrialContext.Provider value={{ trialSession, startTrial, endTrial, clearReferralCode, isTrialActive, isTrialExpired, daysRemaining }}>
      {children}
    </TrialContext.Provider>
  )
}

export function useTrialSession() {
  const context = useContext(TrialContext)
  if (!context) {
    throw new Error('useTrialSession must be used within TrialProvider')
  }
  return context
}
