'use client'

import Link from "next/link"

export default function TermsPage() {
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
      <h1 style={{ textAlign: 'left', marginBottom: '1rem' }}>Attendee Terms of Use</h1>
      <p style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
        <strong>Last Updated: 29/06/2025</strong>
      </p>

      <h3>1. Introduction</h3>
      <p>
        Welcome to Prizmatix Ltd ("Prizmatix," "we," "us," or "our")...
      </p>

      <h3>2. Nature of Our Platform</h3>
      <p>
        Prizmatix provides a platform that connects event organisers ("Hosts") with attendees...
      </p>

      <h3>3. Attendee Responsibilities</h3>
      <ul>
        <li>Provide accurate and complete information at checkout.</li>
        <li>Review the event listing and any terms set by the Host.</li>
        <li>Comply with all venue rules, event policies, and laws.</li>
      </ul>
      <p>Prizmatix is not liable if you are denied entry or removed...</p>

      <h3>4. Payments and Pricing</h3>
      <ul>
        <li>All ticket prices are set by the Host and may include GST or other fees.</li>
        <li>Payment is processed via third-party providers such as Stripe.</li>
        <li>Prizmatix does not guarantee the availability or accuracy of pricing information.</li>
      </ul>

      <h3>5. Refunds and Cancellations</h3>
      <ul>
        <li>Refunds are governed by the Host’s refund policy...</li>
        <li>Prizmatix may assist in processing refunds but is not responsible for the outcome.</li>
        <li>Event cancellation without reschedule may allow for a refund at the Host's discretion.</li>
        <li>Booking fees, service charges, and payment gateway fees are non-refundable.</li>
      </ul>

      <h3>6. Free Events</h3>
      <ul>
        <li>No payment or service fee applies.</li>
        <li>Registration is still subject to these Terms.</li>
      </ul>

      <h3>7. Ticket Transfers and Resale</h3>
      <ul>
        <li>Ticket resale is not permitted unless explicitly allowed by the Host.</li>
        <li>Prizmatix is not liable for fraudulent or unofficial ticket sales.</li>
      </ul>

      <h3>8. Event Changes</h3>
      <p>
        The Host may change the date, time, venue, or content of the event...
      </p>

      <h3>9. Privacy</h3>
      <ul>
        <li>We collect and use personal info according to our Privacy Policy.</li>
        <li>Your data may be shared with the Host for event management.</li>
        <li>Marketing messages require separate consent.</li>
      </ul>

      <h3>10. Platform Use</h3>
      <ul>
        <li>Do not misuse or disrupt the platform.</li>
        <li>Do not use it for unlawful purposes.</li>
        <li>Do not upload malware, spam, or harmful content.</li>
      </ul>

      <h3>11. Intellectual Property</h3>
      <ul>
        <li>All content belongs to Prizmatix or its licensors.</li>
        <li>Do not copy, modify, or redistribute materials.</li>
        <li>Hosts retain rights to their own content.</li>
      </ul>

      <h3>12. Limitation of Liability</h3>
      <ul>
        <li>We are not responsible for event quality, safety, or refunds.</li>
        <li>No guarantee of access, uptime, or satisfaction.</li>
        <li>No liability for loss, damage, or claims under any legal theory.</li>
      </ul>

      <h3>13. Termination</h3>
      <p>
        We may suspend or terminate your access for breach of terms.
      </p>

      <h3>14. Dispute Resolution</h3>
      <p>
        Contact:{' '}
        <a href="mailto:support@prizmatix.nz" style={{ color: '#8ab4f8' }}>
          support@prizmatix.nz
        </a>. Legal matters governed by NZ law, courts of Wellington.
      </p>

      <h3>15. Changes to Terms</h3>
      <p>
        Terms may be updated at any time. Continued use = acceptance.
      </p>

      <h3>16. Contact</h3>
      <p>
        Prizmatix Ltd<br />
        30 Manor Drive, Stokes Valley<br />
        Lower Hutt 5019, New Zealand<br />
        Email:{' '}
        <a href="mailto:support@prizmatix.nz" style={{ color: '#8ab4f8' }}>
          support@prizmatix.nz
        </a>
      </p>
    </main>
  )
}
