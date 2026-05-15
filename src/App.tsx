import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header, Footer } from './components/Layout'
import { HomePage } from './pages/Home'
import { DemoPage } from './pages/Demo'
import { PricingPage } from './pages/Pricing'
import { TeamSetupPage } from './pages/TeamSetup'
import { TermsAndConditionsPage } from './pages/TermsAndConditions'
import { TrialProvider } from './contexts/TrialContext'
import { PrivacyPolicyPage } from './pages/PrivacyPolicy'

function App() {
  return (
    <TrialProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/demo" element={<DemoPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/team-setup" element={<TeamSetupPage />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </TrialProvider>
  )
}

export default App
