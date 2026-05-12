'use client';

import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string, mode: 'payment' | 'subscription') => {
    setIsLoading(priceId);
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, mode }),
      });

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout using the session ID
      window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
    } catch (error) {
      console.error('Checkout error:', error);
      setIsLoading(null);
    }
  };

  const handleTeamSetup = () => {
    // Navigate to team setup request page
    window.location.href = '/team-setup';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-primary">Follow-Up Engine</Link>
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-secondary hover:text-primary transition-colors duration-200">
              Home
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-cta text-white rounded hover:opacity-90 transition-opacity duration-200">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Pricing Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl font-bold text-primary mb-6">Simple, Transparent Pricing</h1>
        <p className="text-xl text-secondary max-w-2xl mx-auto">
          Choose the plan that fits your needs. No hidden fees. Cancel anytime.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* One-Time */}
          <div className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow duration-200 flex flex-col">
            <h3 className="text-2xl font-bold text-primary mb-2">One-Time Access</h3>
            <p className="text-sm text-secondary mb-6">Perfect for solo founders and SME owners</p>

            <div className="mb-8 flex-grow">
              <div className="mb-6">
                <p className="text-5xl font-bold text-primary">$199.99</p>
                <p className="text-sm text-secondary mt-2">CAD • One-time payment</p>
              </div>

              <ul className="space-y-4 text-sm text-secondary mb-8">
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                  <span>Calendar connection & auto-detection</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                  <span>Document upload & storage</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                  <span>Pre-meeting agenda & questions</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                  <span>Fathom transcript integration</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                  <span>Post-meeting follow-up generation</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                  <span>Copy, edit, export outputs</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleCheckout('price_1', 'payment')}
              disabled={isLoading === 'price_1'}
              className="w-full px-4 py-3 bg-cta text-white font-semibold rounded hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
            >
              {isLoading === 'price_1' ? 'Processing...' : 'Buy Now'}
            </button>
          </div>

          {/* Monthly */}
          <div className="border-2 border-cta rounded-lg p-8 relative flex flex-col">
            <div className="absolute -top-4 left-4 bg-cta text-white px-3 py-1 rounded text-xs font-semibold">LAUNCH OFFER</div>

            <h3 className="text-2xl font-bold text-primary mb-2 mt-4">Monthly Plan</h3>
            <p className="text-sm text-secondary mb-6">For ongoing access and future-proofing</p>

            <div className="mb-8 flex-grow">
              <div className="mb-6">
                <p className="text-5xl font-bold text-primary">$99</p>
                <p className="text-sm text-secondary mt-2">/month • 12-month term</p>
                <p className="text-xs text-cta font-semibold mt-2">🎉 First month free with launch promotion</p>
              </div>

              <ul className="space-y-4 text-sm text-secondary mb-8">
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                  <span>Everything in One-Time plan</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                  <span>Saved meeting history & archives</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                  <span>Monthly product updates</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                  <span>Improved templates & AI outputs</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                  <span>Priority email support</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                  <span>Early access to future features</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleCheckout('price_2', 'subscription')}
              disabled={isLoading === 'price_2'}
              className="w-full px-4 py-3 bg-cta text-white font-semibold rounded hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
            >
              {isLoading === 'price_2' ? 'Processing...' : 'Start Free Month'}
            </button>
          </div>

          {/* Team */}
          <div className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow duration-200 flex flex-col">
            <h3 className="text-2xl font-bold text-primary mb-2">Team Setup</h3>
            <p className="text-sm text-secondary mb-6">For sales teams and networks (2+ users)</p>

            <div className="mb-8 flex-grow">
              <div className="mb-6">
                <p className="text-3xl font-bold text-primary">Custom</p>
                <p className="text-sm text-secondary mt-2">Starting from $999 + monthly service</p>
              </div>

              <ul className="space-y-4 text-sm text-secondary mb-8">
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                  <span>Multiple team members</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                  <span>Shared team workspace</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                  <span>Manager visibility & reporting</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                  <span>Team templates & shared context</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                  <span>Onboarding & setup support</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                  <span>Dedicated account manager</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleTeamSetup}
              className="w-full px-4 py-3 border-2 border-primary text-primary font-semibold rounded hover:bg-primary hover:text-white transition-all duration-200"
            >
              Request Team Setup
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <details className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-sm transition-shadow">
            <summary className="font-semibold text-primary">Can I upgrade from One-Time to Monthly?</summary>
            <p className="mt-4 text-secondary">Yes. If you purchase one-time access and later want ongoing updates, we'll credit your purchase toward a monthly subscription.</p>
          </details>

          <details className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-sm transition-shadow">
            <summary className="font-semibold text-primary">What payment methods do you accept?</summary>
            <p className="mt-4 text-secondary">We accept all major credit and debit cards through Stripe. Secure, encrypted, and PCI-compliant.</p>
          </details>

          <details className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-sm transition-shadow">
            <summary className="font-semibold text-primary">Can I cancel anytime?</summary>
            <p className="mt-4 text-secondary">Yes. Monthly subscriptions can be canceled anytime. One-time purchases are non-refundable, but you keep access forever.</p>
          </details>

          <details className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-sm transition-shadow">
            <summary className="font-semibold text-primary">Do you offer refunds?</summary>
            <p className="mt-4 text-secondary">One-time purchases are non-refundable. Monthly subscriptions can be canceled within 7 days for a full refund.</p>
          </details>

          <details className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-sm transition-shadow">
            <summary className="font-semibold text-primary">What about data privacy and security?</summary>
            <p className="mt-4 text-secondary">All data is encrypted at rest and in transit. You maintain full ownership of your meeting transcripts, documents, and outputs. We never sell your data.</p>
          </details>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-gray-300 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2026 Follow-Up Engine. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
