'use client'

import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { createCheckoutSession, getPricePreview } from '@/lib/api/orders/create-checkout-session'
import '@/styles/OrderConfirmation.scss'
import { Info } from 'lucide-react'
import Image from 'next/image'
import TermsModal from '@/components/TermsModal'
import PrivacyModal from '@/components/PrivacyModal'
import EventPolicyModal from '@/components/EventPolicyModal'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

interface TicketSelection {
  ticketStructureId: number
  name: string
  quantity: number
  price: number
}

interface Attendee {
  ticketStructureId: number
  firstName: string
  lastName: string
}

interface OrderSummary {
  ticketSubtotal: number
  platformFee: number
  gstOnPlatformFee: number
  bookingFee: number
  grandTotal: number
}

export default function OrderConfirmationPage() {
  const [customerEmail, setCustomerEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [customerFirstName, setCustomerFirstName] = useState('')
  const [customerLastName, setCustomerLastName] = useState('')
  const [selections, setSelections] = useState<TicketSelection[]>([])
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [eventTitle, setEventTitle] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventImage, setEventImage] = useState('')
  const [showOrderDetails, setShowOrderDetails] = useState(true)
  const [showAttendeeDetails, setShowAttendeeDetails] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(true)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [confirmEmailError, setConfirmEmailError] = useState('')
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showEventPolicyModal, setShowEventPolicyModal] = useState(false);
  useEffect(() => {
    const tooltipIcons = document.querySelectorAll('.tooltip-icon')
    tooltipIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        icon.classList.toggle('active')
      })
    })
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('prizmatix_order')
    if (!saved) return

    const parsed = JSON.parse(saved)
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)

    setCustomerEmail(parsed.customerEmail || '')
    const valid: TicketSelection[] = parsed.selections?.filter((sel: TicketSelection) => sel.quantity > 0) || []
    setSelections(valid)

    setEventTitle(parsed.eventTitle || '')
    setEventDate(parsed.eventDate || '')
    setEventImage(parsed.eventImage || '')

    const flat: Attendee[] = []
    valid.forEach((sel: TicketSelection) => {
      for (let i = 0; i < sel.quantity; i++) {
        flat.push({ ticketStructureId: sel.ticketStructureId, firstName: '', lastName: '' })
      }
    })
    setAttendees(flat)

    const preview = async () => {
      const tickets = valid.map((s: TicketSelection) => ({
        ticketStructureId: s.ticketStructureId,
        quantity: s.quantity
      }))
      const summary = await getPricePreview(tickets)
      setOrderSummary(summary)
    }
    preview()
  }, [])

  useEffect(() => {
    if (!customerEmail) {
      setEmailError('Email is required')
    } else if (!isValidEmail(customerEmail)) {
      setEmailError('Invalid email format')
    } else {
      setEmailError('')
    }
  }, [customerEmail])

  useEffect(() => {
    if (!isLoggedIn) {
      if (!confirmEmail) {
        setConfirmEmailError('Confirm email is required')
      } else if (confirmEmail !== customerEmail) {
        setConfirmEmailError('Emails do not match')
      } else {
        setConfirmEmailError('')
      }
    }
  }, [confirmEmail, customerEmail, isLoggedIn])

  const handleAttendeeChange = (index: number, field: 'firstName' | 'lastName', value: string) => {
    setAttendees(prev => {
      const copy = [...prev]
      copy[index] = { ...copy[index], [field]: value }
      return copy
    })
  }

  const groupAttendeesByTicket = () => {
    const grouped: Record<number, string[]> = {}
    attendees.forEach(att => {
      const fullName = `${att.firstName.trim()} ${att.lastName.trim()}`
      if (!grouped[att.ticketStructureId]) grouped[att.ticketStructureId] = []
      grouped[att.ticketStructureId].push(fullName)
    })
    return Object.entries(grouped).map(([ticketStructureId, names]) => ({
      ticketStructureId: Number(ticketStructureId),
      attendeeNames: names
    }))
  }

  const canProceedToAttendees = customerFirstName && customerEmail && !emailError && (isLoggedIn || (!confirmEmailError && confirmEmail))
  const canSubmitOrder = attendees.every(a => a.firstName) && isValidEmail(customerEmail) && (!isLoggedIn ? confirmEmail === customerEmail : true)

  const submitOrder = async () => {
    setIsLoading(true)
    try {
      const payload = {
        customerEmail,
        customerFirstName,
        customerLastName,
        ticketQuantities: groupAttendeesByTicket()
      }

      const { sessionId } = await createCheckoutSession(payload)
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      await stripe?.redirectToCheckout({ sessionId })
    } catch (err) {
      console.error('Payment failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="order-page-wrapper">
        <div className="order-left">
          <h2 className="page-title">Order Confirmation</h2>

          <div className="accordion-card">
            <div className="accordion-header" onClick={() => setShowOrderDetails(prev => !prev)}>
              <h3>Order Details</h3>
            </div>
            {showOrderDetails && (
              <div className="accordion-body">
                <div className="form-grid">
                  <input placeholder="First Name" value={customerFirstName} onChange={e => setCustomerFirstName(e.target.value)} />
                  <input placeholder="Last Name" value={customerLastName} onChange={e => setCustomerLastName(e.target.value)} />
                </div>
                {emailError && <div className="error-text">{emailError}</div>}
                <input placeholder="Email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} className={emailError ? 'invalid' : ''}/>
                {!isLoggedIn && (
                  <>
                    {confirmEmailError && <div className="error-text">{confirmEmailError}</div>}
                    <input placeholder="Confirm Email" value={confirmEmail} onChange={e => setConfirmEmail(e.target.value)} onPaste={e => e.preventDefault()} className={confirmEmailError ? 'invalid' : ''} />
                  </>
                )}
<div className="checkboxes">
  <label>
  <input
    type="checkbox"
    checked={agreedToTerms}
    onChange={(e) => setAgreedToTerms(e.target.checked)}
  />
  <span>
    By continuing, you agree to the{' '}
    <a href="#" onClick={(e) => { e.preventDefault(); setShowTermsModal(true) }}>
      Attendee Terms
    </a>
    ,{' '}
    <a href="#" onClick={(e) => { e.preventDefault(); setShowPrivacyModal(true) }}>
      Cookies & Privacy Policy
    </a>
    , and{' '}
    <a href="#" onClick={(e) => { e.preventDefault(); setShowEventPolicyModal(true) }}>
      Event Policy
    </a>.
  </span>
</label>


  <label>
    <input type="checkbox" defaultChecked />
    <span>
      Prizmatix can send me emails about upcoming events and news
      <span className="optional"> (optional)</span>
    </span>
  </label>

  <label>
    <input type="checkbox" defaultChecked />
    <span>
      Keep me updated on the latest news, events, and exclusive offers from [event org]
      <span className="optional"> (optional)</span>
    </span>
  </label>
</div>



                <button className="primary-btn" onClick={() => { setShowOrderDetails(false); setShowAttendeeDetails(true) }} disabled={!canProceedToAttendees || !agreedToTerms}>Continue to attendee details</button>
              </div>
            )}
          </div>

          <div className="accordion-card">
            <div className="accordion-header" onClick={() => setShowAttendeeDetails(prev => !prev)}>
              <h3>Attendees Details</h3>
            </div>
            {showAttendeeDetails && (
              <div className="accordion-body">
                {attendees.map((att, idx) => {
                  const ticket = selections.find(s => s.ticketStructureId === att.ticketStructureId)
                  return (
                    <div key={idx} className="attendee-block">
                      <label>×1 {ticket?.name}</label>
                      <div className="form-grid">
                        <input placeholder="First Name" value={att.firstName} onChange={e => handleAttendeeChange(idx, 'firstName', e.target.value)} />
                        <input placeholder="Last Name" value={att.lastName} onChange={e => handleAttendeeChange(idx, 'lastName', e.target.value)} />
                      </div>
                    </div>
                  )
                })}
                <button className="primary-btn hide-on-mobile" onClick={submitOrder} disabled={!canSubmitOrder || isLoading || !agreedToTerms}>
                  {isLoading ? 'Processing...' : 'Continue to Payment'}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="order-right">
          <div className="summary-header">
            <Image src={eventImage || '/assets/rihanna.png'} alt="event" width={48} height={48} className="rounded" />
            <div>
              <strong>{eventTitle || 'Event Name'}</strong>
              <p>{eventDate || 'Date not available'}</p>
            </div>
          </div>

          <div className="summary-card">
            <h4>Order Summary</h4>
            {selections.map((sel, i) => (
              <div key={i} className="summary-line">
                <span>×{sel.quantity} {sel.name} Ticket</span>
                <span>${(sel.quantity * sel.price).toFixed(2)}</span>
              </div>
            ))}
            {orderSummary && (
              <>
                <div className="summary-line"><span>Ticket Subtotal</span><span>${orderSummary.ticketSubtotal.toFixed(2)}</span></div>
                <div className="summary-line tooltip-container">
                  <span>
                    Booking Fee
                    <span className="tooltip-icon">
                      <Info size={14} />
                      <span className="tooltip-text">
                        Platform Fee: ${orderSummary.platformFee.toFixed(2)}<br />
                        GST on Platform Fee: ${orderSummary.gstOnPlatformFee.toFixed(2)}
                      </span>
                    </span>
                  </span>
                  <span>${orderSummary.bookingFee.toFixed(2)}</span>
                </div>
                <div className="summary-line bold"><span>Order Total</span><span>${orderSummary.grandTotal.toFixed(2)}</span></div>
              </>
            )}
          </div>

          <div className="discount-card">
            <h4>Discount Code</h4>
            <div className="discount-row">
              <input placeholder="Discount code" />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>

      <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
      <PrivacyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
      <EventPolicyModal isOpen={showEventPolicyModal} onClose={() => setShowEventPolicyModal(false)} />

      <div className="mobile-fixed-footer show-on-mobile">
        <button className="primary-btn" onClick={submitOrder} disabled={!canSubmitOrder || isLoading}>
          {isLoading ? 'Processing...' : 'Continue to Payment'}
        </button>
      </div>
    </>
  )
}
