import { Section, SectionEyebrow, Container } from '../components/Layout'
import { Link } from 'react-router-dom'

export function TermsAndConditionsPage() {
  return (
    <>
      <section className="border-b border-border bg-surface px-6 py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl sm:text-5xl font-semibold">
              Terms and Conditions
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Last updated: May 12, 2026
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="max-w-3xl prose prose-sm">
            <div className="space-y-8">

              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                <p className="text-muted-foreground mb-4">
                  By accessing and using Follow-Up Engine (the "Service"), you agree to be bound by these Terms and Conditions. If you do not agree to abide by the above, please do not use this service. Follow-Up Engine is operated by The Strategy Pitch.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">2. Demo Session Terms</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>2.1 Data Handling</strong><br/>
                    The demo flow is designed for simulation and testing purposes only. Any data you input into the demo, including meeting transcripts, company information, and generated outputs, is processed locally in your browser and is NOT stored on our servers.
                  </p>
                  <p>
                    <strong>2.2 Automatic Data Removal</strong><br/>
                    Upon closing your demo session or after 5 minutes of inactivity, all data submitted during that session is automatically deleted. You will receive a notification before automatic session closure, giving you the option to continue or exit.
                  </p>
                  <p>
                    <strong>2.3 No Data Retention</strong><br/>
                    Follow-Up Engine does NOT retain, store, or track usage patterns from demo sessions. We do not maintain files of your interactions, meeting transcripts, company information, or any outputs generated during the demo. Each session is independent and leaves no trace on our systems.
                  </p>
                  <p>
                    <strong>2.4 File Uploads</strong><br/>
                    You may upload up to 3 attachments per session, with a maximum file size of 20 MB per file. All uploaded files are removed immediately after session closure or after 5 minutes of inactivity. No copies or backups are retained.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">3. Outputs and Generated Content</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>3.1 User-Input Generated Content</strong><br/>
                    All outputs (follow-up emails, action items, WhatsApp summaries, manager updates, pipeline notes) are generated exclusively based on information you provide during the session. Follow-Up Engine does not add, modify, delete, or supplement any content beyond what is directly derived from your inputs.
                  </p>
                  <p>
                    <strong>3.2 Accuracy</strong><br/>
                    While we aim for accuracy, the outputs are AI-generated and should be reviewed before use in production. We make no guarantees regarding accuracy, completeness, or suitability for your specific use case. You are responsible for all content you generate and distribute.
                  </p>
                  <p>
                    <strong>3.3 Copyright</strong><br/>
                    All outputs generated during your session remain your responsibility. You may use, modify, and distribute generated content as you see fit. We make no claim to ownership of generated content.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">4. Internal Analytics</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>4.1 Interaction Patterns</strong><br/>
                    For service improvement purposes, we may analyze general interaction patterns and flow types across all demo sessions in aggregate. This analysis is performed using anonymized, non-identifiable data only.
                  </p>
                  <p>
                    <strong>4.2 No Personal Data</strong><br/>
                    This internal analysis does NOT include any personal information, company names, transcripts, or specific user inputs. We only track interaction flow and feature usage patterns to optimize the demo experience.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">5. Disclaimers</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>5.1 Service as-is</strong><br/>
                    The Service is provided on an "as-is" basis. Follow-Up Engine makes no warranties, express or implied, regarding the Service, including any implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                  </p>
                  <p>
                    <strong>5.2 Limitation of Liability</strong><br/>
                    In no event shall The Strategy Pitch, Follow-Up Engine, or their affiliates be liable for any direct, indirect, incidental, special, or consequential damages arising out of your use of the Service.
                  </p>
                  <p>
                    <strong>5.3 No Legal Advice</strong><br/>
                    Outputs generated by Follow-Up Engine are not legal, financial, or business advice. You should not rely solely on generated content for decision-making. Always consult with qualified professionals for important business decisions.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">6. Acceptable Use</h2>
                <p className="text-muted-foreground mb-4">
                  You agree not to use the Service for any illegal, fraudulent, or harmful purposes. This includes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                  <li>Uploading malicious files or code</li>
                  <li>Attempting to access systems or data not intended for you</li>
                  <li>Violating any applicable laws or regulations</li>
                  <li>Harassing, defaming, or infringing on others' rights</li>
                  <li>Reverse engineering or attempting to extract proprietary information</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">7. Modification of Terms</h2>
                <p className="text-muted-foreground">
                  Follow-Up Engine reserves the right to modify these Terms at any time. Changes become effective upon posting to the Service. Your continued use constitutes acceptance of modified terms.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">8. Contact Information</h2>
                <p className="text-muted-foreground">
                  For questions about these Terms and Conditions, contact us at:<br/>
                  <strong>Email:</strong> barnes@thestrategypitch.com<br/>
                  <strong>Company:</strong> The Strategy Pitch<br/>
                  <strong>Jurisdiction:</strong> Ontario, Canada
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">9. Ontario Digital Laws Compliance</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>9.1 Personal Information Protection and Electronic Documents Act (PIPEDA)</strong><br/>
                    Follow-Up Engine complies with PIPEDA requirements. As we do not collect or retain personal information from demo sessions, PIPEDA's data handling requirements do not apply to demo usage. Contact form submissions are processed securely and retained only for communication purposes.
                  </p>
                  <p>
                    <strong>9.2 Consumer Protection Act</strong><br/>
                    Any services provided by The Strategy Pitch comply with Ontario's Consumer Protection Act, including clear disclosure of terms, pricing, and cancellation rights for paid plans.
                  </p>
                  <p>
                    <strong>9.3 Accessibility Standards</strong><br/>
                    We are committed to providing accessible services in compliance with the Accessibility for Ontarians with Disabilities Act (AODA).
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">10. Acknowledgment</h2>
                <p className="text-muted-foreground">
                  By using Follow-Up Engine, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
              </div>

              <div className="border-t border-border pt-8 mt-8">
                <p className="text-sm text-muted-foreground">
                  © 2026 The Strategy Pitch. All rights reserved.<br/>
                  <Link to="/" className="text-primary hover:underline">Back to home</Link>
                </p>
              </div>

            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
