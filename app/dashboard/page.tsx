'use client';

import Link from 'next/link';
import { Calendar, Plus, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  // Placeholder data
  const meetings = [
    {
      id: 1,
      title: 'Acme Corp - Discovery Call',
      date: '2026-05-15T10:00:00Z',
      status: 'scheduled',
      prepGenerated: false,
    },
    {
      id: 2,
      title: 'TechFlow Inc - Proposal Review',
      date: '2026-05-12T14:00:00Z',
      status: 'completed',
      prepGenerated: true,
      followupGenerated: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-primary">
            Follow-Up Engine
          </Link>
          <div className="flex gap-4 items-center">
            <span className="text-secondary">Welcome back</span>
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200">
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Meetings</h1>
            <p className="text-secondary">Manage your sales meetings and generate prep & follow-up content</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-cta text-white font-semibold rounded hover:opacity-90 transition-opacity duration-200">
            <Plus className="w-5 h-5" />
            New Meeting
          </button>
        </div>

        {/* Settings CTA */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <h3 className="font-semibold text-primary mb-2">🔗 Connect Your Integrations</h3>
          <p className="text-secondary text-sm mb-4">
            Connect your Google Calendar and Fathom to unlock automatic meeting detection and transcript integration.
          </p>
          <div className="flex gap-4">
            <Link
              href="/settings/calendar"
              className="text-cta font-semibold text-sm hover:underline flex items-center gap-1"
            >
              Connect Calendar <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/settings/fathom"
              className="text-cta font-semibold text-sm hover:underline flex items-center gap-1"
            >
              Connect Fathom <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Meetings List */}
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary">{meeting.title}</h3>
                  <p className="text-sm text-secondary flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(meeting.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded ${
                  meeting.status === 'scheduled'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {meeting.status === 'scheduled' ? 'Scheduled' : 'Completed'}
                </span>
              </div>

              <div className="flex gap-3">
                {meeting.status === 'scheduled' ? (
                  <>
                    {meeting.prepGenerated ? (
                      <Link
                        href={`/meetings/${meeting.id}/prep`}
                        className="px-4 py-2 border border-cta text-cta font-semibold text-sm rounded hover:bg-blue-50 transition-colors duration-200"
                      >
                        View Prep
                      </Link>
                    ) : (
                      <Link
                        href={`/meetings/${meeting.id}/prep`}
                        className="px-4 py-2 bg-cta text-white font-semibold text-sm rounded hover:opacity-90 transition-opacity duration-200"
                      >
                        Generate Prep
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <Link
                      href={`/meetings/${meeting.id}/prep`}
                      className="px-4 py-2 border border-gray-300 text-secondary font-semibold text-sm rounded hover:bg-gray-50 transition-colors duration-200"
                    >
                      View Prep
                    </Link>
                    {meeting.followupGenerated ? (
                      <Link
                        href={`/meetings/${meeting.id}/follow-up`}
                        className="px-4 py-2 border border-cta text-cta font-semibold text-sm rounded hover:bg-blue-50 transition-colors duration-200"
                      >
                        View Follow-Up
                      </Link>
                    ) : (
                      <Link
                        href={`/meetings/${meeting.id}/follow-up`}
                        className="px-4 py-2 bg-cta text-white font-semibold text-sm rounded hover:opacity-90 transition-opacity duration-200"
                      >
                        Generate Follow-Up
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {meetings.length === 0 && (
          <div className="text-center py-20">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-secondary mb-4">No meetings yet. Connect your calendar to get started.</p>
            <Link href="/settings/calendar" className="text-cta font-semibold hover:underline">
              Connect Calendar
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
