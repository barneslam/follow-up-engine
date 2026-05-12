'use client';

import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { useState } from 'react';

export default function MeetingFollowUpPage({ params: _params }: { params: { id: string } }) {
  const [followupPack] = useState({
    thankYouNote: 'Thank you for taking the time to meet with us today...',
    detailedFollowupEmail: 'Hi [Client Name],\n\nThank you for the great discussion today. We covered several important topics...',
    whatsappSummary: '✅ Great call today! Key takeaways:\n• Project scope: Q3 launch\n• Budget: Pending final review\n• Next steps: Demo on Friday\nTalk soon!',
    actionItems: [
      { item: 'Send proposal draft', owner: 'You', dueDate: '2026-05-17', priority: 'High' },
      { item: 'Prepare technical specifications', owner: 'Engineering Team', dueDate: '2026-05-20', priority: 'High' },
      { item: 'Schedule follow-up call', owner: 'You', dueDate: '2026-05-16', priority: 'Medium' },
    ],
    internalManagerEmail: 'Hi [Manager Name],\n\nAttached is a summary of today\'s call with Acme Corp...',
    pipelineImpact: 'Deal value: $50K | Probability: 60% → 75% | Timeline: Q3 2026',
    revenuePotential: 'Monthly recurring revenue potential: $4,200 if signed by end of Q2',
    riskAssessment: 'Budget concerns: Customer hesitant on price. Mitigation: Offer extended payment plan.',
    recommendedNextSteps: [
      'Send proposal within 24 hours',
      'Schedule technical discovery call',
      'Prepare ROI analysis for pricing discussion',
      'Confirm stakeholder availability for demo',
    ],
    missingInformation: [
      'Final budget approval from their finance team',
      'Exact implementation timeline',
      'Number of users/licenses needed',
    ],
  });

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleExportPDF = () => {
    alert('PDF export feature coming soon');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2 text-secondary hover:text-primary transition-colors duration-200">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-secondary font-semibold rounded hover:bg-gray-50 transition-colors duration-200"
          >
            <Download className="w-5 h-5" />
            Export as PDF
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">Post-Meeting Follow-Up</h1>
          <p className="text-secondary">Acme Corp - Discovery Call</p>
          <p className="text-sm text-gray-500 mt-2">Completed: May 15, 2026</p>
        </div>

        {/* Follow-Up Content */}
        <div className="space-y-8">
          {/* Thank You Note */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-primary mb-4">Thank-You Note</h3>
            <p className="text-secondary mb-4 whitespace-pre-wrap">{followupPack.thankYouNote}</p>
            <button
              onClick={() => handleCopyToClipboard(followupPack.thankYouNote)}
              className="px-4 py-2 border border-cta text-cta font-semibold text-sm rounded hover:bg-blue-50 transition-colors duration-200"
            >
              Copy
            </button>
          </div>

          {/* Detailed Follow-Up Email */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-primary mb-4">Detailed Follow-Up Email</h3>
            <div className="bg-gray-50 p-4 rounded mb-4 text-sm text-secondary whitespace-pre-wrap max-h-48 overflow-y-auto">
              {followupPack.detailedFollowupEmail}
            </div>
            <button
              onClick={() => handleCopyToClipboard(followupPack.detailedFollowupEmail)}
              className="px-4 py-2 border border-cta text-cta font-semibold text-sm rounded hover:bg-blue-50 transition-colors duration-200"
            >
              Copy Email
            </button>
          </div>

          {/* WhatsApp Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-primary mb-4">WhatsApp Summary</h3>
            <div className="bg-green-50 p-4 rounded mb-4 text-sm text-secondary whitespace-pre-wrap font-mono">
              {followupPack.whatsappSummary}
            </div>
            <button
              onClick={() => handleCopyToClipboard(followupPack.whatsappSummary)}
              className="px-4 py-2 border border-cta text-cta font-semibold text-sm rounded hover:bg-blue-50 transition-colors duration-200"
            >
              Copy Summary
            </button>
          </div>

          {/* Action Items */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-primary mb-4">Action Items</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-primary">Action</th>
                    <th className="text-left py-3 px-4 font-semibold text-primary">Owner</th>
                    <th className="text-left py-3 px-4 font-semibold text-primary">Due Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-primary">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {followupPack.actionItems.map((item, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-secondary">{item.item}</td>
                      <td className="py-3 px-4 text-secondary">{item.owner}</td>
                      <td className="py-3 px-4 text-secondary">{new Date(item.dueDate).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          item.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => handleCopyToClipboard(
                followupPack.actionItems.map(a => `${a.item} (${a.owner}, Due: ${a.dueDate}, ${a.priority})`).join('\n')
              )}
              className="px-4 py-2 border border-cta text-cta font-semibold text-sm rounded hover:bg-blue-50 transition-colors duration-200"
            >
              Copy Action Items
            </button>
          </div>

          {/* Internal Manager Email */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-primary mb-4">Internal Manager Email</h3>
            <div className="bg-gray-50 p-4 rounded mb-4 text-sm text-secondary whitespace-pre-wrap max-h-48 overflow-y-auto">
              {followupPack.internalManagerEmail}
            </div>
            <button
              onClick={() => handleCopyToClipboard(followupPack.internalManagerEmail)}
              className="px-4 py-2 border border-cta text-cta font-semibold text-sm rounded hover:bg-blue-50 transition-colors duration-200"
            >
              Copy Manager Email
            </button>
          </div>

          {/* Pipeline Impact */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-primary mb-4">Pipeline Impact</h3>
            <p className="text-secondary mb-4">{followupPack.pipelineImpact}</p>
            <button
              onClick={() => handleCopyToClipboard(followupPack.pipelineImpact)}
              className="px-4 py-2 border border-cta text-cta font-semibold text-sm rounded hover:bg-blue-50 transition-colors duration-200"
            >
              Copy
            </button>
          </div>

          {/* Revenue Potential */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-primary mb-4">Revenue Potential</h3>
            <p className="text-secondary mb-4">{followupPack.revenuePotential}</p>
            <button
              onClick={() => handleCopyToClipboard(followupPack.revenuePotential)}
              className="px-4 py-2 border border-cta text-cta font-semibold text-sm rounded hover:bg-blue-50 transition-colors duration-200"
            >
              Copy
            </button>
          </div>

          {/* Risk Assessment */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-primary mb-4">Risk Assessment</h3>
            <p className="text-secondary mb-4">{followupPack.riskAssessment}</p>
            <button
              onClick={() => handleCopyToClipboard(followupPack.riskAssessment)}
              className="px-4 py-2 border border-cta text-cta font-semibold text-sm rounded hover:bg-blue-50 transition-colors duration-200"
            >
              Copy
            </button>
          </div>

          {/* Recommended Next Steps */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-primary mb-4">Recommended Next Steps</h3>
            <ol className="space-y-2 mb-4 text-secondary">
              {followupPack.recommendedNextSteps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-bold text-cta min-w-6">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <button
              onClick={() => handleCopyToClipboard(followupPack.recommendedNextSteps.join('\n'))}
              className="px-4 py-2 border border-cta text-cta font-semibold text-sm rounded hover:bg-blue-50 transition-colors duration-200"
            >
              Copy Next Steps
            </button>
          </div>

          {/* Missing Information */}
          <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-8">
            <h3 className="text-xl font-bold text-primary mb-4">Missing Information / Open Questions</h3>
            <ul className="space-y-2 text-secondary">
              {followupPack.missingInformation.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-yellow-600">⚠</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Back to Dashboard */}
          <div className="text-center">
            <Link href="/dashboard" className="text-cta font-semibold hover:underline">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
