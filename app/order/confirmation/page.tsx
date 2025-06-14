'use client'

import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { createCheckoutSession } from '@/lib/api/orders/create-checkout-session'
import '@/styles/OrderConfirmation.scss'

type TicketSelection = {
  ticketStructureId: number
  name: string
  quantity: number
  price: number
}

type Attendee = {
  ticketStructureId: number
  firstName: string
  lastName: string
}

export default function OrderConfirmationPage() {
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerFirstName, setCustomerFirstName] = useState('')
  const [customerLastName, setCustomerLastName] = useState('')
  const [customerMobile, setCustomerMobile] = useState('')
  const [selections, setSelections] = useState<TicketSelection[]>([])
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [showOrderDetails, setShowOrderDetails] = useState(true)
  const [showAttendeeDetails, setShowAttendeeDetails] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('prizmatix_order')
    if (!saved) return

    const parsed = JSON.parse(saved)
    setCustomerEmail(parsed.customerEmail || '')
    const valid = parsed.selections?.filter((sel: any) => sel.quantity > 0) || []
    setSelections(valid)

    const flat: Attendee[] = []
    valid.forEach((sel: TicketSelection) => {
      for (let i = 0; i < sel.quantity; i++) {
        flat.push({ ticketStructureId: sel.ticketStructureId, firstName: '', lastName: '' })
      }
    })
    setAttendees(flat)
  }, [])

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

  const totalPrice = selections.reduce(
    (sum, sel) => sum + sel.quantity * (sel.price + 3.69),
    0
  )

  const submitOrder = async () => {
    setIsLoading(true)
    try {
      const payload = {
        customerEmail,
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
    <div className="order-page-wrapper">
      <div className="order-left">
        <h2 className="page-title">Order Confirmation</h2>

        {/* Order Details Section */}
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
              <input placeholder="Email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} />
              <input placeholder="Mobile" value={customerMobile} onChange={e => setCustomerMobile(e.target.value)} />
              <div className="checkboxes">
                <label><input type="checkbox" defaultChecked /> Prizmatix can send me emails about upcoming events and news (optional)</label>
                <label><input type="checkbox" defaultChecked /> Keep me updated on latest news and offers (optional)</label>
              </div>
              <button className="primary-btn" onClick={() => {
                setShowOrderDetails(false)
                setShowAttendeeDetails(true)
              }}>Continue to attendee details</button>
            </div>
          )}
        </div>

        {/* Attendee Details Section */}
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
                      <input
                        placeholder="First Name"
                        value={att.firstName}
                        onChange={e => handleAttendeeChange(idx, 'firstName', e.target.value)}
                      />
                      <input
                        placeholder="Last Name"
                        value={att.lastName}
                        onChange={e => handleAttendeeChange(idx, 'lastName', e.target.value)}
                      />
                    </div>
                  </div>
                )
              })}
              <button className="primary-btn" onClick={submitOrder} disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Continue to Payment'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="order-right">
        <div className="summary-card">
          <div className="summary-header">
            <img src="/assets/rihanna.png" alt="event" />
            <div>
              <strong>Only Rihanna! | EUR Roma</strong>
              <p>Sun 08 Jun 2025</p>
            </div>
          </div>
          <h4>Order Summary</h4>
          {selections.map((sel, i) => (
            <div key={i} className="summary-line">
              <span>×{sel.quantity} {sel.name} Ticket</span>
              <span>${(sel.quantity * (sel.price + 3.69)).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-line"><span>Platform Fee</span><span>$6.54</span></div>
          <div className="summary-line"><span>Tax</span><span>$6.54</span></div>
          <div className="summary-line"><span>Discount</span><span>−$6.54</span></div>
          <div className="summary-line bold"><span>Order Total</span><span>${totalPrice.toFixed(2)}</span></div>
          <div className="summary-note">Your total saving on this order <strong>$34.99</strong></div>
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
  )
}
