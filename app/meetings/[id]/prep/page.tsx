'use client';

import Link from 'next/link';
import { ArrowLeft, FileUp, Zap } from 'lucide-react';
import { useState } from 'react';

export default function MeetingPrepPage({ params: _params }: { params: { id: string } }) {
  const [objective, setObjective] = useState('discovery');
  const [documents, setDocuments] = useState<string[]>([]);
  const [customComments, setCustomComments] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [prepPack, setPrepPack] = useState<any>(null);

  const objectives = [
    'Discovery',
    'Qualification',
    'Proposal Review',
    'Demo',
    'Pricing Discussion',
    'Objection Handling',
    'Implementation Scoping',
    'Renewal',
    'Expansion',
    'Project Update',
    'Decision Confirmation',
    'Stale Opportunity Recovery',
  ];

  const handleGeneratePrep = async () => {
    setIsGenerating(true);

    // Placeholder: In production, call Claude API to generate prep
    // const response = await fetch(`/api/meetings/${params.id}/generate-prep`, {
    //   method: 'POST',
    //   body: JSON.stringify({ objective, documents, customComments })
    // });
    // const data = await response.json();
    // setPrepPack(data);

    // For demo, show mock output
    setTimeout(() => {
      setPrepPack({
        agenda: 'Client-facing agenda will be generated here',
        agendaEmail: 'Email template for the client...',
        questions: ['Key question 1', 'Key question 2', 'Key question 3'],
        internalBrief: 'Internal preparation notes...',
        risks: 'Potential risk areas...',
      });
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
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
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">Pre-Meeting Preparation</h1>
          <p className="text-secondary">Acme Corp - Discovery Call</p>
          <p className="text-sm text-gray-500 mt-2">May 15, 2026 • 10:00 AM</p>
        </div>

        {!prepPack ? (
          <>
            {/* Setup Form */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Prepare Your Meeting</h2>

              <div className="space-y-6">
                {/* Call Objective */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-3">
                    Call Objective
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {objectives.map((obj) => (
                      <button
                        key={obj}
                        onClick={() => setObjective(obj.toLowerCase().replace(/\s+/g, '_'))}
                        className={`px-4 py-2 rounded border transition-all duration-200 text-sm font-semibold ${
                          objective === obj.toLowerCase().replace(/\s+/g, '_')
                            ? 'bg-cta text-white border-cta'
                            : 'border-gray-300 text-secondary hover:border-cta'
                        }`}
                      >
                        {obj}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Document Upload */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-3">
                    Upload Relevant Documents
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FileUp className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    <p className="text-secondary mb-2">Drop files here or click to upload</p>
                    <p className="text-xs text-gray-500">Proposals, previous notes, account context</p>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []).map((f) => f.name);
                        setDocuments(files);
                      }}
                    />
                  </div>
                  {documents.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-primary mb-2">Uploaded:</p>
                      <ul className="space-y-1">
                        {documents.map((doc) => (
                          <li key={doc} className="text-sm text-secondary flex items-center gap-2">
                            <span className="text-cta">✓</span> {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Custom Comments */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-3">
                    Custom Comments / Context
                  </label>
                  <textarea
                    value={customComments}
                    onChange={(e) => setCustomComments(e.target.value)}
                    placeholder="Any specific context, known risks, or desired outcomes for this meeting..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent"
                  />
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGeneratePrep}
                  disabled={isGenerating}
                  className="w-full px-4 py-3 bg-cta text-white font-semibold rounded hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  {isGenerating ? 'Generating...' : 'Generate Prep Pack'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Generated Prep Pack */}
            <div className="space-y-8">
              {/* Agenda */}
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-primary mb-4">Client-Facing Agenda</h3>
                <p className="text-secondary mb-4">{prepPack.agenda}</p>
                <button
                  onClick={() => handleCopyToClipboard(prepPack.agenda)}
                  className="px-4 py-2 border border-cta text-cta font-semibold text-sm rounded hover:bg-blue-50 transition-colors duration-200"
                >
                  Copy Agenda
                </button>
              </div>

              {/* Agenda Email */}
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-primary mb-4">Agenda Email Template</h3>
                <div className="bg-gray-50 p-4 rounded mb-4 text-sm text-secondary whitespace-pre-wrap">
                  {prepPack.agendaEmail}
                </div>
                <button
                  onClick={() => handleCopyToClipboard(prepPack.agendaEmail)}
                  className="px-4 py-2 border border-cta text-cta font-semibold text-sm rounded hover:bg-blue-50 transition-colors duration-200"
                >
                  Copy Email
                </button>
              </div>

              {/* Key Questions */}
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-primary mb-4">Key Questions to Ask</h3>
                <ul className="space-y-2 mb-4">
                  {prepPack.questions.map((q: string, i: number) => (
                    <li key={i} className="flex gap-3 text-secondary">
                      <span className="font-bold text-cta min-w-6">{i + 1}.</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleCopyToClipboard(prepPack.questions.join('\n'))}
                  className="px-4 py-2 border border-cta text-cta font-semibold text-sm rounded hover:bg-blue-50 transition-colors duration-200"
                >
                  Copy Questions
                </button>
              </div>

              {/* Internal Brief */}
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-primary mb-4">Internal Preparation Brief</h3>
                <p className="text-secondary mb-4">{prepPack.internalBrief}</p>
                <button
                  onClick={() => handleCopyToClipboard(prepPack.internalBrief)}
                  className="px-4 py-2 border border-cta text-cta font-semibold text-sm rounded hover:bg-blue-50 transition-colors duration-200"
                >
                  Copy Brief
                </button>
              </div>

              {/* Risks */}
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-primary mb-4">Potential Risk Areas</h3>
                <p className="text-secondary mb-4">{prepPack.risks}</p>
                <button
                  onClick={() => handleCopyToClipboard(prepPack.risks)}
                  className="px-4 py-2 border border-cta text-cta font-semibold text-sm rounded hover:bg-blue-50 transition-colors duration-200"
                >
                  Copy Risks
                </button>
              </div>

              {/* Back to Dashboard */}
              <div className="text-center">
                <Link
                  href="/dashboard"
                  className="text-cta font-semibold hover:underline"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
