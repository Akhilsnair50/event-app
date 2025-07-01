'use client';

import '@/styles/TermsModal.scss';

export default function EventPolicyModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="terms-modal-overlay" onClick={handleOverlayClick}>
      <div className="terms-modal-content">
        <button className="close-btn" onClick={onClose}>×</button>

        <h2>Moksha Group Ltd — Event Terms & Conditions</h2>
        <p><strong>Last Updated: 29/06/2025</strong></p>

        <h3>1. Your Ticket</h3>
        <p>Bring a valid ticket (digital or printed) to exchange for a wristband. Wristbands must be worn at all times. Lost or damaged wristbands will not be replaced.</p>

        <h3>2. Entry & Age</h3>
        <p>Events are R18 unless specified otherwise. A valid photo ID is required. Entry is refused without valid ID, and refunds will not be issued.</p>

        <h3>3. Behaviour & Conduct</h3>
        <p>Attendees must behave respectfully and responsibly. We may remove anyone for misconduct, intoxication, harassment, or unsafe behaviour.</p>

        <h3>4. Prohibited Items</h3>
        <ul>
          <li>No alcohol allowed on-site</li>
          <li>No illegal substances or paraphernalia</li>
          <li>No glass, weapons, fireworks, or hazardous materials</li>
          <li>No unauthorized promotional items or signage</li>
          <li>No professional photography gear without approval</li>
        </ul>

        <h3>5. Alcohol & Drug Policy</h3>
        <p>Alcohol is prohibited. Possession or supply will result in removal. Illicit drugs are not tolerated and may involve police.</p>

        <h3>6. Event Cancellations & Refunds</h3>
        <p>All sales are final unless required by the Consumer Guarantees Act 1993. Cancellations by us result in refunds (excluding fees). No refunds for lineup/date/venue changes or refusal due to ID/behaviour.</p>

        <h3>7. Photography & Promotional Use</h3>
        <p>By entering, you consent to being photographed/filmed. Media may be used for promotion without compensation.</p>

        <h3>8. Lost Property & Tickets</h3>
        <p>We do not replace lost or stolen tickets or personal items.</p>

        <h3>9. Safety & Risk</h3>
        <ul>
          <li>Entry is at your own risk</li>
          <li>We are not liable for injury, damage, or loss</li>
          <li>Wear appropriate attire and footwear</li>
          <li>No crowd surfing, moshing, or stage diving</li>
          <li>We’re not responsible for hearing damage – ear protection is recommended</li>
          <li>Emergency assistance may be provided at your expense</li>
        </ul>

        <h3>10. Release</h3>
        <p>By attending, you waive rights to claim for any injury, damage, or loss. This applies regardless of cause and includes all activities at or near the event.</p>

        <h3>11. Privacy</h3>
        <p>We comply with the Privacy Act 2020. Payment details are not stored; processed securely via providers like Stripe.</p>

        <h3>12. Environmental Responsibility</h3>
        <p>Help care for the land. Use bins and leave no trace.</p>

        <h3>Contact</h3>
        <p>Email: <a href="mailto:teammoksha.nz@gmail.com" className="themed-link">teammoksha.nz@gmail.com</a></p>
      </div>
    </div>
  );
}
