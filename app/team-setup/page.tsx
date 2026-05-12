'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TeamSetupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // In a real implementation, send this to a backend API
    // For now, just mark as submitted
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', company: '', teamSize: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-primary">
            Follow-Up Engine
          </Link>
          <Link href="/" className="text-secondary hover:text-primary transition-colors duration-200">
            Back Home
          </Link>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="rounded-lg border border-gray-200 bg-white p-8 sm:p-12">
            <h1 className="text-4xl font-bold text-primary mb-2">Team Setup Request</h1>
            <p className="text-secondary mb-8">
              Tell us about your team and we'll contact you with a custom pricing and implementation plan.
            </p>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h2 className="text-2xl font-bold text-green-700 mb-2">Request Submitted!</h2>
                <p className="text-green-600">
                  We'll contact you within 24 hours to discuss your team's setup and pricing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Smith"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      placeholder="Acme Corp"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Team Size
                    </label>
                    <select
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent"
                    >
                      <option value="">Select team size</option>
                      <option value="2-5">2–5 users</option>
                      <option value="6-10">6–10 users</option>
                      <option value="11-25">11–25 users</option>
                      <option value="25+">25+ users</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Tell us about your needs (optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="e.g., We need shared templates, manager visibility, and integration with our CRM..."
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-cta text-white font-semibold rounded hover:opacity-90 transition-opacity duration-200"
                >
                  Submit Team Setup Request
                </button>

                <p className="text-xs text-secondary text-center">
                  We'll contact you within 24 business hours to discuss pricing and implementation.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
