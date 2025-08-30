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

        <h2>MOKSHA GROUP LTD – EVENT TERMS & CONDITIONS</h2>
        <p>Welcome!</p>
        <p>We’re thrilled to have you join us for a Moksha Group Ltd event. By purchasing a ticket and entering our event, you agree to the following Terms & Conditions designed to keep our community safe and our events running smoothly.</p>

        <h3>1. YOUR TICKET</h3>
        <p>Please bring a valid ticket (digital or printed) to be exchanged for a wristband at the entrance. Your wristband must be worn at all times. If removed, lost, or damaged, it won’t be replaced.</p>

        <h3>2. ENTRY & AGE</h3>
        <p>Our events are R18 unless otherwise specified. Valid photo ID must be presented at the gate. Entry will be refused without acceptable ID, and refunds will not be issued in such cases.</p>

        <h3>3. BEHAVIOUR & CONDUCT</h3>
        <p>All attendees are expected to behave respectfully and responsibly. We reserve the right to remove any person for misconduct, intoxication, aggression, harassment, or other behaviour deemed inappropriate or unsafe by staff.</p>

        <h3>4. PROHIBITED ITEMS</h3>
        <ul>
          <p>The following items are not permitted:</p>
          <li>Alcohol (strictly no alcohol allowed on-site)</li>
          <li>Illegal substances or paraphernalia</li>
          <li>Glass, weapons, fireworks, or other hazardous materials</li>
          <li>Unauthorized promotional items or signage</li>
          <li>Professional photography gear without prior accreditation</li>
        </ul>

        <h3>5. ALCOHOL & DRUG POLICY</h3>
        <p>No alcohol is permitted on the event site under any circumstances.</p>
        <p>Supply or possession of alcohol will result in removal from the event.</p>
        <p>Possession or use of illicit substances is not tolerated and may be referred to law enforcement.</p>

        <h3>6. EVENT CANCELLATIONS & REFUNDS</h3>
        <p>All sales are final unless required by the Consumer Guarantees Act 1993.</p>
        <p>If an event is cancelled by us, we will issue refunds less booking and payment fees.</p>
        <p>Changes in lineup, date, or venue do not warrant refunds. No refunds will be issued if you’re refused entry due to ID, age, behaviour, or a decision not to attend.</p>

        <h3>7. PHOTOGRAPHY & PROMOTIONAL USE</h3>
        <p>By entering the event site, you consent to being filmed or photographed. Images and footage may be used for promotional purposes without compensation or further notice.</p>

        <h3>8. LOST PROPERTY & TICKETS</h3>
        <p>We do not replace lost or stolen tickets or personal items. Keep your belongings safe.</p>

        <h3>9. SAFETY & RISK – LEGAL NOTICE</h3>
        <p>Entry to any Moksha Group Ltd event is at your own risk. To the extent permitted by law:</p>
        <ul>
          <li>Moksha Group Ltd, and the owner/lessee of the event site, are not liable for any injury, loss, or damage to persons or property sustained while attending or entering the event, whether caused by negligence or otherwise.</li>
          <li>All attendees accept full responsibility for their own safety.</li>
          <li>Attendees must wear appropriate footwear and attire at all times.</li>
          <li>Crowd surfing, moshing, stage diving, or any similar behaviour is not permitted.</li>
          <li>Moksha Group Ltd takes no responsibility for hearing damage due to sound levels. Ear protection is recommended.</li>
          <li>In the event of injury or illness, we may arrange emergency medical assistance or evacuation at your expense.</li>
        </ul>

        <h3>10. RELEASE</h3>
        <p>To the fullest extent permitted by law, by attending the event you waive all legal rights of action and fully release Moksha Group Ltd, the event site owner or lessee, and all affiliated staff, volunteers, contractors, and partners from any liability for:</p>
        <ul>
          <li>Loss, damage, personal injury, death, economic loss, or consequential loss</li>
          <li>Arising from negligence, failure, or default related to your attendance at the event</li>
        </ul>
        <p>This release applies regardless of the cause and covers all activities on or near the event site.</p>

        <h3>11. PRIVACY</h3>
        <p>We handle personal information according to the Privacy Act 2020. We do not store payment details – all transactions are processed through secure third-party providers such as Stripe.</p>

        <h3>12. ENVIRONMENTAL RESPONSIBILITY</h3>
        <p>Help us care for the land. Use waste bins provided and reduce your environmental footprint. Leave no trace.</p>

        <h3>CONTACT</h3>
        <p>Email: <a href="mailto:teammoksha.nz@gmail.com" className="themed-link">- teammoksha.nz@gmail.com</a></p>
      </div>
    </div>
  );
}