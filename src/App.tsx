import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header, Footer } from './components/Layout'
import { HomePage } from './pages/Home'
import { DemoPage } from './pages/Demo'
import { PricingPage } from './pages/Pricing'
import { TeamSetupPage } from './pages/TeamSetup'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/team-setup" element={<TeamSetupPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
