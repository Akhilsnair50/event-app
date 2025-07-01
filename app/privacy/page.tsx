'use client'

import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main
      style={{
        padding: '2rem 1rem',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#0d0d0d',
        color: 'white',
        minHeight: '100vh',
      }}
    >
      {/* Back Button */}
      <div style={{ marginBottom: '2rem' }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: 'white',
            fontSize: '1rem',
            textDecoration: 'none',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>&#x2190;</span>
          <span>Back</span>
        </Link>
      </div>

      <h1 style={{ textAlign: 'left', marginBottom: '1rem' }}>
        Prizmatix Ltd — Privacy & Cookie Policy
      </h1>
      <p style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
        <strong>Last Updated: 29/06/2025</strong>
      </p>

      <h3 style={{ textAlign: 'left', marginTop: '2rem', marginBottom: '1rem' }}>1. Introduction</h3>
      <p style={{ textAlign: 'left', marginBottom: '1rem' }}>
        Prizmatix Ltd ("we," "us," or "our") is committed to protecting the privacy of individuals who
        use our platform. This Privacy & Cookie Policy outlines how we collect, use, store, and
        protect your personal information when you visit our website, register for events, or use our
        services. This policy is governed by the New Zealand Privacy Act 2020.
      </p>

      <h3 style={{ textAlign: 'left', marginTop: '2rem', marginBottom: '1rem' }}>2. Who This Policy Applies To</h3>
      <p style={{ textAlign: 'left', marginBottom: '0.5rem' }}>This policy applies to:</p>
      <ul style={{ textAlign: 'left', listStyle: 'disc', paddingLeft: '20px', marginBottom: '1rem' }}>
        <li>Attendees and ticket purchasers on our platform</li>
        <li>Event organisers who use our services</li>
        <li>Anyone who visits or interacts with our website or app</li>
      </ul>

      <h3 style={{ textAlign: 'left', marginTop: '2rem', marginBottom: '1rem' }}>3. What Information We Collect</h3>
      <ul style={{ textAlign: 'left', listStyle: 'disc', paddingLeft: '20px', marginBottom: '1rem' }}>
        <li>Account Information: name, email address, phone number, password, organisation name</li>
        <li>Event Information: ticket orders, event registrations, preferences</li>
        <li>Payment Data: transaction info (processed by Stripe; we do not store credit card numbers)</li>
        <li>Technical Data: browser type, device info, IP address, referral URL</li>
        <li>Communication Records: emails, messages, and support interactions</li>
      </ul>

      <h3 style={{ textAlign: 'left', marginTop: '2rem', marginBottom: '1rem' }}>4. How We Use Your Information</h3>
      <ul style={{ textAlign: 'left', listStyle: 'disc', paddingLeft: '20px', marginBottom: '1rem' }}>
        <li>Deliver event registration and ticketing services</li>
        <li>Process payments securely through third-party providers</li>
        <li>Send confirmations, updates, and relevant notifications</li>
        <li>Respond to inquiries or support requests</li>
        <li>Improve our platform and user experience</li>
        <li>Comply with legal obligations or resolve disputes</li>
      </ul>
      <p style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
        <strong>We do not sell your data to third parties.</strong>
      </p>

      <h3 style={{ textAlign: 'left', marginTop: '2rem', marginBottom: '1rem' }}>5. Sharing Information with Third Parties</h3>
      <ul style={{ textAlign: 'left', listStyle: 'disc', paddingLeft: '20px', marginBottom: '1rem' }}>
        <li>Event Organisers: to manage registrations and send updates</li>
        <li>Payment Processors: such as Stripe</li>
        <li>Service Providers: hosting, analytics, customer support</li>
        <li>Legal Authorities: if required by law or to protect legal rights</li>
      </ul>
      <p style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
        We ensure third parties handle your data securely.
      </p>

      <h3 style={{ textAlign: 'left', marginTop: '2rem', marginBottom: '1rem' }}>6. Cookies & Tracking Technologies</h3>
      <ul style={{ textAlign: 'left', listStyle: 'disc', paddingLeft: '20px', marginBottom: '1rem' }}>
        <li>Maintain website functionality and session preferences</li>
        <li>Analyse site traffic and user behaviour (e.g., Google Analytics)</li>
        <li>Improve content, features, and marketing</li>
      </ul>
      <p style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
        You can manage cookies via your browser settings.
      </p>

      <h3 style={{ textAlign: 'left', marginTop: '2rem', marginBottom: '1rem' }}>7. Data Retention</h3>
      <p style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
        We retain data as long as needed to provide services or fulfil legal obligations. Account
        deletion requests are honoured, though some data may be retained for audit or legal reasons.
      </p>

      <h3 style={{ textAlign: 'left', marginTop: '2rem', marginBottom: '1rem' }}>8. Data Security</h3>
      <p style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
        We implement appropriate technical and organisational safeguards. While no online system is
        fully secure, we minimise risks using encryption, access controls, and best practices.
      </p>

      <h3 style={{ textAlign: 'left', marginTop: '2rem', marginBottom: '1rem' }}>9. Your Rights</h3>
      <ul style={{ textAlign: 'left', listStyle: 'disc', paddingLeft: '20px', marginBottom: '1rem' }}>
        <li>Access personal data we hold</li>
        <li>Request corrections</li>
        <li>Withdraw consent or request deletion where applicable</li>
      </ul>
      <p style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
        To exercise rights, contact:{' '}
        <a href="mailto:support@prizmatix.nz" style={{ color: '#8ab4f8' }}>
          support@prizmatix.nz
        </a>
      </p>

      <h3 style={{ textAlign: 'left', marginTop: '2rem', marginBottom: '1rem' }}>10. Third-Party Links</h3>
      <p style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
        Our platform may link to third-party websites. We are not responsible for their privacy
        practices. Review their policies before submitting information.
      </p>

      <h3 style={{ textAlign: 'left', marginTop: '2rem', marginBottom: '1rem' }}>11. Changes to This Policy</h3>
      <p style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
        We may update this policy. Significant changes will be notified via email or the platform.
        Continued use constitutes acceptance.
      </p>

      <h3 style={{ textAlign: 'left', marginTop: '2rem', marginBottom: '1rem' }}>12. Contact Us</h3>
      <p style={{ textAlign: 'left', marginBottom: '2rem' }}>
        Prizmatix Ltd
        <br />
        30 Manor Drive, Stokes Valley
        <br />
        Lower Hutt 5019, New Zealand
        <br />
        Email:{' '}
        <a href="mailto:support@prizmatix.nz" style={{ color: '#8ab4f8' }}>
          support@prizmatix.nz
        </a>
      </p>
    </main>
  )
}
