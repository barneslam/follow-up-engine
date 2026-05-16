import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-semibold text-foreground">
          Follow-Up Engine
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition">Home</Link>
          <Link to="/demo" className="text-sm text-muted-foreground hover:text-foreground transition">How It Works</Link>
          <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition">Pricing</Link>
          <Link to="/team-setup" className="text-sm text-muted-foreground hover:text-foreground transition">Team Setup</Link>
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
  <nav className="md:hidden border-t border-border px-6 py-4 flex flex-col gap-4">
    <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition" onClick={() => setIsOpen(false)}>
      Home
    </Link>
    <Link to="/demo" className="text-sm text-muted-foreground hover:text-foreground transition" onClick={() => setIsOpen(false)}>
      How It Works
    </Link>
    <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition" onClick={() => setIsOpen(false)}>
      Pricing
    </Link>
    <Link to="/team-setup" className="text-sm text-muted-foreground hover:text-foreground transition" onClick={() => setIsOpen(false)}>
      Team Setup
    </Link>
  </nav>
)}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface px-6 py-12">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          Follow-Up Engine — a product by{' '}
          <a href="https://www.thestrategypitch.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            The Strategy Pitch
          </a>
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          © 2026 The Strategy Pitch. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-3 flex justify-center gap-4">
          <Link to="/terms-and-conditions" className="hover:text-foreground transition">
            Terms
          </Link>
          <Link to="/privacy-policy" className="hover:text-foreground transition">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  )
}

export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`max-w-6xl mx-auto px-6 ${className}`}>
      {children}
    </div>
  )
}

export function Section({
  children,
  className = '',
  id,
  background = 'bg-background'
}: {
  children: React.ReactNode
  className?: string
  id?: string
  background?: string
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${background} ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
      {children}
    </div>
  )
}
