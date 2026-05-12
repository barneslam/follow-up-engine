"use client";

import Link from "next/link";
import { ArrowRight, Calendar, FileText, CheckCircle2, Zap, MessageSquare, TrendingUp, Target } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [hoveredFooterLink, setHoveredFooterLink] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "#FFFFFF", color: "#1a1a1a", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Navigation */}
      <nav style={{ borderBottom: "1px solid #e5e5e5", position: "sticky", top: 0, background: "#FFFFFF", zIndex: 40 }}>
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <div style={{ fontSize: "16px", fontWeight: "700", letterSpacing: "-0.5px" }}>Follow-Up Engine</div>
          <div className="flex gap-8 items-center">
            <Link href="/pricing" style={{ fontSize: "14px", color: "#666", textDecoration: "none" }} className="hover:text-black transition-colors">
              Pricing
            </Link>
            <Link href="/signup" style={{ fontSize: "14px", fontWeight: "600", color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #1a1a1a", paddingBottom: "2px" }}>
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px", borderBottom: "1px solid #e5e5e5" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ fontSize: "13px", fontWeight: "600", color: "#999", marginBottom: "24px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
            AI-powered meeting toolkit
          </p>
          <h1 style={{ fontSize: "52px", fontWeight: "700", marginBottom: "28px", lineHeight: "1.2", letterSpacing: "-1px" }}>
            Turn sales meetings into follow-up emails and action items
          </h1>
          <p style={{ fontSize: "18px", color: "#666", maxWidth: "540px", margin: "0 auto 48px", lineHeight: "1.6" }}>
            Connect your calendar. Upload context. Generate agendas, follow-up emails, WhatsApp summaries, and manager updates in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className="inline-flex items-center justify-center px-8 py-3 font-600" style={{ background: "#1a1a1a", color: "#FFFFFF", textDecoration: "none", borderRadius: "4px", fontSize: "14px" }}>
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link href="#team-setup" style={{ fontSize: "14px", fontWeight: "600", color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #1a1a1a", paddingBottom: "2px" }}>
              Request Team Setup
            </Link>
          </div>
        </div>
      </section>

      {/* Workflow Preview */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px", borderBottom: "1px solid #e5e5e5" }}>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div style={{ width: "48px", height: "48px", background: "#f5f5f5", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Calendar className="w-6 h-6" style={{ color: "#1a1a1a" }} />
            </div>
            <p style={{ fontSize: "14px", fontWeight: "600", color: "#1a1a1a" }}>Connect calendar</p>
            <p style={{ fontSize: "13px", color: "#999", marginTop: "8px" }}>Automatic meeting detection</p>
          </div>
          <div>
            <div style={{ width: "48px", height: "48px", background: "#f5f5f5", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <FileText className="w-6 h-6" style={{ color: "#1a1a1a" }} />
            </div>
            <p style={{ fontSize: "14px", fontWeight: "600", color: "#1a1a1a" }}>Upload context</p>
            <p style={{ fontSize: "13px", color: "#999", marginTop: "8px" }}>Proposals, notes, documents</p>
          </div>
          <div>
            <div style={{ width: "48px", height: "48px", background: "#f5f5f5", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Zap className="w-6 h-6" style={{ color: "#1a1a1a" }} />
            </div>
            <p style={{ fontSize: "14px", fontWeight: "600", color: "#1a1a1a" }}>Generate instantly</p>
            <p style={{ fontSize: "13px", color: "#999", marginTop: "8px" }}>Agendas, emails, summaries</p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px", borderBottom: "1px solid #e5e5e5" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "16px" }}>Why follow-up breaks</h2>
        <p style={{ fontSize: "16px", color: "#666", maxWidth: "500px", marginBottom: "48px", lineHeight: "1.6" }}>
          Preparation is inconsistent. Context is scattered. Follow-ups are delayed. Managers have no visibility.
        </p>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "24px" }}>Before the meeting</h3>
            <ul className="space-y-4" style={{ fontSize: "14px", color: "#666" }}>
              <li className="flex gap-3">
                <span style={{ color: "#ccc" }}>•</span>
                <span>Agendas created late or skipped entirely</span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: "#ccc" }}>•</span>
                <span>Key questions forgotten mid-call</span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: "#ccc" }}>•</span>
                <span>Context scattered across files and emails</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "24px" }}>After the meeting</h3>
            <ul className="space-y-4" style={{ fontSize: "14px", color: "#666" }}>
              <li className="flex gap-3">
                <span style={{ color: "#ccc" }}>•</span>
                <span>Follow-ups written manually, hours later</span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: "#ccc" }}>•</span>
                <span>Managers unaware of commitments made</span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: "#ccc" }}>•</span>
                <span>Action items unclear or forgotten</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px", borderBottom: "1px solid #e5e5e5" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "64px", textAlign: "center" }}>How it works</h2>
        <div className="grid md:grid-cols-2 gap-16">
          {/* Before Meeting */}
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "32px" }}>Before the meeting</h3>
            <ol className="space-y-6">
              {[
                { num: 1, title: "Connect your calendar", desc: "We detect meetings automatically" },
                { num: 2, title: "Upload context", desc: "Documents, proposals, notes" },
                { num: 3, title: "Set your objective", desc: "Discovery, demo, pricing, etc." },
                { num: 4, title: "Generate prep pack", desc: "Agenda, questions, talking points" },
              ].map((item) => (
                <li key={item.num} className="flex gap-4">
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "14px", flexShrink: 0, color: "#1a1a1a" }}>{item.num}</div>
                  <div>
                    <p style={{ fontWeight: "600", fontSize: "14px", color: "#1a1a1a", marginBottom: "4px" }}>{item.title}</p>
                    <p style={{ fontSize: "13px", color: "#999" }}>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* After Meeting */}
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "32px" }}>After the meeting</h3>
            <ol className="space-y-6">
              {[
                { num: 1, title: "Capture transcript", desc: "Automatic recording and transcript" },
                { num: 2, title: "Analyze the call", desc: "Transcript + context + objectives" },
                { num: 3, title: "Generate follow-up pack", desc: "Email, WhatsApp, action items" },
                { num: 4, title: "Review and send", desc: "Copy, edit, or send immediately" },
              ].map((item) => (
                <li key={item.num} className="flex gap-4">
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "14px", flexShrink: 0, color: "#1a1a1a" }}>{item.num}</div>
                  <div>
                    <p style={{ fontWeight: "600", fontSize: "14px", color: "#1a1a1a", marginBottom: "4px" }}>{item.title}</p>
                    <p style={{ fontSize: "13px", color: "#999" }}>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Product Outputs */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px", borderBottom: "1px solid #e5e5e5" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "64px" }}>What you get</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: CheckCircle2, title: "Pre-meeting agenda", desc: "Client-ready agenda + email template" },
            { icon: Zap, title: "Key questions", desc: "Smart questions aligned to your objective" },
            { icon: FileText, title: "Follow-up email", desc: "Professional, comprehensive draft" },
            { icon: MessageSquare, title: "WhatsApp summary", desc: "Short, mobile-friendly recap" },
            { icon: TrendingUp, title: "Manager email", desc: "Internal update on commitments" },
            { icon: Target, title: "Action items", desc: "Clear ownership, timeline, priorities" },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                padding: "32px 24px",
                border: "1px solid #e5e5e5",
                borderRadius: "4px",
              }}
            >
              <div style={{ width: "40px", height: "40px", background: "#f5f5f5", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <item.icon className="w-5 h-5" style={{ color: "#1a1a1a" }} />
              </div>
              <h3 style={{ fontWeight: "600", color: "#1a1a1a", marginBottom: "8px", fontSize: "14px" }}>{item.title}</h3>
              <p style={{ fontSize: "13px", color: "#999" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px", borderBottom: "1px solid #e5e5e5" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "64px", textAlign: "center" }}>Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* One-Time */}
          <div style={{ padding: "40px 32px", border: "1px solid #e5e5e5", borderRadius: "4px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px" }}>One-time</h3>
            <p style={{ fontSize: "13px", color: "#999", marginBottom: "32px" }}>For solo founders</p>
            <p style={{ fontSize: "28px", fontWeight: "700", marginBottom: "24px" }}>$199</p>
            <ul className="space-y-3 mb-12" style={{ fontSize: "13px", color: "#666" }}>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4" style={{ color: "#1a1a1a", flexShrink: 0, marginTop: "2px" }} />
                Calendar connection
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4" style={{ color: "#1a1a1a", flexShrink: 0, marginTop: "2px" }} />
                Document upload
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4" style={{ color: "#1a1a1a", flexShrink: 0, marginTop: "2px" }} />
                Pre & post meeting generation
              </li>
            </ul>
            <Link href="/pricing" style={{ display: "block", width: "100%", padding: "12px", fontSize: "14px", fontWeight: "600", color: "#1a1a1a", border: "1px solid #1a1a1a", borderRadius: "4px", textAlign: "center", textDecoration: "none" }}>
              Buy now
            </Link>
          </div>

          {/* Monthly - Highlighted */}
          <div style={{ padding: "40px 32px", border: "2px solid #1a1a1a", borderRadius: "4px", position: "relative" }}>
            <div style={{ position: "absolute", top: "-12px", left: "16px", background: "#1a1a1a", color: "#FFFFFF", padding: "4px 12px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.5px" }}>RECOMMENDED</div>
            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px", marginTop: "4px" }}>Monthly</h3>
            <p style={{ fontSize: "13px", color: "#999", marginBottom: "32px" }}>For ongoing access</p>
            <p style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>$99</p>
            <p style={{ fontSize: "12px", color: "#999", marginBottom: "24px" }}>/month • 12-month term • First month free</p>
            <ul className="space-y-3 mb-12" style={{ fontSize: "13px", color: "#666" }}>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4" style={{ color: "#1a1a1a", flexShrink: 0, marginTop: "2px" }} />
                Everything in one-time
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4" style={{ color: "#1a1a1a", flexShrink: 0, marginTop: "2px" }} />
                Saved meeting history
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4" style={{ color: "#1a1a1a", flexShrink: 0, marginTop: "2px" }} />
                Updates & templates
              </li>
            </ul>
            <Link href="/pricing" style={{ display: "block", width: "100%", padding: "12px", fontSize: "14px", fontWeight: "600", color: "#FFFFFF", background: "#1a1a1a", borderRadius: "4px", textAlign: "center", textDecoration: "none" }}>
              Start free month
            </Link>
          </div>

          {/* Team */}
          <div style={{ padding: "40px 32px", border: "1px solid #e5e5e5", borderRadius: "4px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px" }}>Team</h3>
            <p style={{ fontSize: "13px", color: "#999", marginBottom: "32px" }}>For sales teams</p>
            <p style={{ fontSize: "28px", fontWeight: "700", marginBottom: "24px" }}>Custom</p>
            <ul className="space-y-3 mb-12" style={{ fontSize: "13px", color: "#666" }}>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4" style={{ color: "#1a1a1a", flexShrink: 0, marginTop: "2px" }} />
                Multiple users
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4" style={{ color: "#1a1a1a", flexShrink: 0, marginTop: "2px" }} />
                Team workspace
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4" style={{ color: "#1a1a1a", flexShrink: 0, marginTop: "2px" }} />
                Manager reporting
              </li>
            </ul>
            <Link href="#team-setup" style={{ display: "block", width: "100%", padding: "12px", fontSize: "14px", fontWeight: "600", color: "#1a1a1a", border: "1px solid #1a1a1a", borderRadius: "4px", textAlign: "center", textDecoration: "none" }}>
              Request quote
            </Link>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px", borderBottom: "1px solid #e5e5e5" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "64px", textAlign: "center" }}>Who this is for</h2>
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "24px" }}>Perfect fit</h3>
            <ul className="space-y-3" style={{ fontSize: "14px", color: "#666" }}>
              <li className="flex gap-3">
                <CheckCircle2 className="w-4 h-4" style={{ color: "#1a1a1a", flexShrink: 0, marginTop: "2px" }} />
                <span>Founder-led SMEs handling their own sales</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-4 h-4" style={{ color: "#1a1a1a", flexShrink: 0, marginTop: "2px" }} />
                <span>Small B2B service businesses</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-4 h-4" style={{ color: "#1a1a1a", flexShrink: 0, marginTop: "2px" }} />
                <span>Sales teams needing consistent follow-up</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-4 h-4" style={{ color: "#1a1a1a", flexShrink: 0, marginTop: "2px" }} />
                <span>Anyone tired of manual meeting prep</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "24px" }}>Not a fit if</h3>
            <ul className="space-y-3" style={{ fontSize: "14px", color: "#666" }}>
              <li className="flex gap-3">
                <span style={{ color: "#ccc" }}>•</span>
                <span>You need complex CRM integrations</span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: "#ccc" }}>•</span>
                <span>You require advanced video analysis</span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: "#ccc" }}>•</span>
                <span>You need automatic CRM data push</span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: "#ccc" }}>•</span>
                <span>You want AI to make final decisions</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Future Roadmap */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px", borderBottom: "1px solid #e5e5e5" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "24px" }}>Future integrations</h2>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "32px", maxWidth: "600px", lineHeight: "1.6" }}>
          In Phase 2, Follow-Up Engine will connect to your CRM to sync outputs, pipeline impact, and revenue targets in real-time.
        </p>
        <div className="flex flex-wrap gap-3">
          {["Salesforce", "HubSpot", "Pipedrive", "Zoho", "Microsoft Dynamics"].map((crm) => (
            <div key={crm} style={{ padding: "8px 16px", border: "1px solid #e5e5e5", borderRadius: "4px", fontSize: "13px", color: "#999" }}>
              {crm}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px", borderBottom: "1px solid #e5e5e5", textAlign: "center" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "24px" }}>Ready to get started?</h2>
        <p style={{ fontSize: "16px", color: "#666", marginBottom: "48px", maxWidth: "500px", margin: "0 auto 48px", lineHeight: "1.6" }}>
          Start with a one-time purchase or try the monthly plan with your first month free.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/pricing" className="inline-flex items-center justify-center" style={{ padding: "12px 32px", fontSize: "14px", fontWeight: "600", color: "#FFFFFF", background: "#1a1a1a", borderRadius: "4px", textDecoration: "none" }}>
            Get started
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link href="#team-setup" style={{ padding: "12px 32px", fontSize: "14px", fontWeight: "600", color: "#1a1a1a", border: "1px solid #1a1a1a", borderRadius: "4px", textDecoration: "none" }}>
            Request team setup
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#f5f5f5", paddingTop: "64px", paddingBottom: "48px" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <p style={{ fontWeight: "700", fontSize: "14px", marginBottom: "16px" }}>Follow-Up Engine</p>
              <p style={{ fontSize: "13px", color: "#999", lineHeight: "1.6" }}>Turn sales meetings into follow-up emails and action items instantly.</p>
            </div>
            <div>
              <p style={{ fontWeight: "700", fontSize: "14px", marginBottom: "16px" }}>Product</p>
              <ul className="space-y-2" style={{ fontSize: "13px" }}>
                <li>
                  <Link href="/pricing" style={{ color: "#999", textDecoration: "none" }} className="hover:text-black transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/" style={{ color: "#999", textDecoration: "none" }} className="hover:text-black transition-colors">
                    Features
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p style={{ fontWeight: "700", fontSize: "14px", marginBottom: "16px" }}>Legal</p>
              <ul className="space-y-2" style={{ fontSize: "13px" }}>
                <li>
                  <a href="#" style={{ color: "#999", textDecoration: "none" }} className="hover:text-black transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#999", textDecoration: "none" }} className="hover:text-black transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p style={{ fontWeight: "700", fontSize: "14px", marginBottom: "16px" }}>Contact</p>
              <p style={{ fontSize: "13px", color: "#999" }}>questions@followupengine.com</p>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "32px", textAlign: "center", fontSize: "12px", color: "#999" }}>
            <p>&copy; 2026 Follow-Up Engine. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
