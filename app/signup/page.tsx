'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Placeholder: In a real implementation, call Supabase auth
      // const { error } = await supabase.auth.signUp({ email, password });
      // if (error) throw error;

      // For now, redirect to dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-primary">Follow-Up Engine</Link>
          <Link href="/" className="text-secondary hover:text-primary transition-colors duration-200">
            Back Home
          </Link>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="rounded-lg border border-gray-200 bg-white p-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Create Account</h1>
            <p className="text-secondary mb-8">Get started with Follow-Up Engine</p>

            {error && (
              <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent"
                />
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" required className="mt-1" />
                <label htmlFor="terms" className="text-sm text-secondary">
                  I agree to the{' '}
                  <a href="#" className="text-cta hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-cta hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" id="consent" required className="mt-1" />
                <label htmlFor="consent" className="text-sm text-secondary">
                  I confirm I have the right to upload meeting transcripts, documents, and customer information into this system
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 bg-cta text-white font-semibold rounded hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <p className="mt-6 text-center text-secondary">
              Already have an account?{' '}
              <a href="#" className="text-cta hover:underline font-semibold">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
