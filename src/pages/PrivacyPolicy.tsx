import { Section, Container } from '../components/Layout'
import { Link } from 'react-router-dom'

export function PrivacyPolicyPage() {
  return (
    <>
      <section className="border-b border-border bg-surface px-6 py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl sm:text-5xl font-semibold">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Last updated: May 15, 2026
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="max-w-3xl space-y-8 text-muted-foreground">

            <div>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                1. Overview
              </h2>
              <p>
                Follow-Up Engine is operated by The Strategy Pitch in Ontario, Canada.
                This page explains how information submitted through the platform is handled.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                2. Information We Collect
              </h2>
              <p>
                We may collect your name, email address, phone number, company information,
                role, transcript preferences, referral information, and trial request details
                when voluntarily submitted through forms.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                3. Demo and Transcript Inputs
              </h2>
              <p>
                The public demo is intended for testing and evaluation purposes only.
                Do not upload confidential, regulated, or third-party information unless
                you are authorized to do so.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                4. Trial and Contact Requests
              </h2>
              <p>
                Trial requests, SMS verification status, consent records, contact requests,
                and referral information may be stored securely for operational,
                support, compliance, and product improvement purposes.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                5. Retention and Deletion
              </h2>
              <p>
                Demo session information is intended to be temporary. You may request deletion
                of submitted contact or trial information by emailing
                barnes@thestrategypitch.com.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                6. Security
              </h2>
              <p>
                Reasonable safeguards are used to protect submitted information. No system can
                guarantee complete security, and users are responsible for ensuring they have
                permission to submit any information entered into the platform.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                7. Contact
              </h2>
              <p>
                Privacy-related requests can be sent to:
                <br />
                barnes@thestrategypitch.com
              </p>
            </div>

            <div className="border-t border-border pt-8 mt-8">
              <Link to="/" className="text-primary hover:underline">
                Back to Home
              </Link>
            </div>

          </div>
        </Container>
      </Section>
    </>
  )
}