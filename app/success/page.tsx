'use client';

import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

export default function SuccessPage() {
  useEffect(() => {
    // In a real implementation, verify the payment and create the user account
    // using the Stripe session ID from the URL query parameter
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mb-6">
          <CheckCircle2 className="w-16 h-16 text-cta mx-auto" />
        </div>

        <h1 className="text-4xl font-bold text-primary mb-4">Payment Successful!</h1>

        <p className="text-lg text-secondary mb-8">
          Thank you for your purchase. Your Follow-Up Engine account is being set up.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-semibold text-primary mb-4">Next Steps:</h3>
          <ol className="space-y-3 text-secondary text-sm">
            <li className="flex gap-3">
              <span className="font-bold text-cta">1</span>
              <span>Check your email for account confirmation</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-cta">2</span>
              <span>Sign in to your dashboard</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-cta">3</span>
              <span>Connect your Google Calendar and Fathom</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-cta">4</span>
              <span>Upload documents and start generating prep content</span>
            </li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/signup"
            className="flex-1 px-4 py-3 bg-cta text-white font-semibold rounded hover:opacity-90 transition-opacity duration-200"
          >
            Sign In to Dashboard
          </Link>
          <Link
            href="/"
            className="flex-1 px-4 py-3 border-2 border-primary text-primary font-semibold rounded hover:bg-primary hover:text-white transition-all duration-200"
          >
            Back Home
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-secondary">
            Questions? Email us at{' '}
            <a href="mailto:support@followupengine.com" className="text-cta font-semibold hover:underline">
              support@followupengine.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
