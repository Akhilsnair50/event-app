'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import '@/styles/TicketSelectionModal.scss'
import { fetchTickets, TicketResponseDto } from '@/lib/api/tickets'
import Image from 'next/image'
import { Calendar, MapPin, ShoppingCart } from 'lucide-react'

interface Props {
  eventId: number
  eventTitle: string
  eventDate: string
  location: string
  eventImage: string
  onClose: () => void
}

export default function TicketSelectionModal({
  eventId,
  eventTitle,
  eventDate,
  location,
  eventImage,
  onClose,
}: Props) {
  const [tickets, setTickets] = useState<TicketResponseDto[]>([])
  const [cart, setCart] = useState<{ [ticketId: number]: number }>({})
  const [imgSrc, setImgSrc] = useState(eventImage)

  const router = useRouter()

  useEffect(() => {
    fetchTickets(eventId).then(setTickets).catch(console.error)
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'auto' }
  }, [eventId])

  const increment = (id: number) => {
    const ticket = tickets.find(t => t.id === id)
    if (!ticket) return
    const currentQty = cart[id] || 0
    const maxQty = Math.min(ticket.maxPurchasePerOrder ?? Infinity, ticket.remainingQuantity ?? Infinity)
    if (currentQty >= maxQty) return
    setCart(prev => ({ ...prev, [id]: currentQty + 1 }))
  }

  const decrement = (id: number) => {
    setCart(prev => {
      const current = prev[id] || 0
      if (current <= 1) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: current - 1 }
    })
  }

  const calculateBookingFee = (price: number) => {
    const platformFee = price * 0.07 + 0.49
    const gst = platformFee * 0.15
    return platformFee + gst
  }

  const getTotal = () =>
    tickets.reduce((sum, t) => {
      const qty = cart[t.id] || 0
      const fee = calculateBookingFee(t.price)
      return sum + qty * (t.price + fee)
    }, 0)

  const handleContinue = () => {
    const selections = Object.entries(cart)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => {
        const ticket = tickets.find(t => t.id === Number(id))
        return {
          ticketStructureId: Number(id),
          name: ticket?.name || '',
          quantity: qty,
          price: ticket?.price || 0
        }
      })

    const payload = {
      customerEmail: '',
      selections,
      eventTitle,
      eventDate,
      eventImage
    }

    localStorage.setItem('prizmatix_order', JSON.stringify(payload))
    onClose()
    router.push('/order/confirmation')
  }

  const formatFullDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="ticket-modal-overlay" onClick={onClose}>
      <div className="ticket-modal" onClick={e => e.stopPropagation()}>
        <button className="ticket-modal-close" onClick={onClose}>×</button>

        <div className="ticket-modal-header">
          <Image
            src={imgSrc}
            alt={eventTitle}
            width={60}
            height={60}
            className="rounded"
            onError={() => setImgSrc('/assets/rihanna.png')}
            unoptimized
            priority
          />
          <div>
            <h2>{eventTitle}</h2>
            <p className="event-meta">
              <Calendar /> {formatFullDate(eventDate)}<span className="dot">•</span>
              <MapPin /> {location}
            </p>
          </div>
        </div>

        {tickets.map(ticket => {
          const quantity = cart[ticket.id] || 0
          const bookingFee = calculateBookingFee(ticket.price)
          const maxQty = Math.min(ticket.maxPurchasePerOrder ?? Infinity, ticket.remainingQuantity ?? Infinity)
          const isSoldOut = ticket.soldOut || ticket.remainingQuantity <= 0
          const isMaxReached = quantity >= maxQty

          return (
            <div key={ticket.id} className="ticket-row">
              <div className="info">
                <h4>{ticket.name}</h4>
                <p>{ticket.description}</p>
                {!isSoldOut && ticket.remainingQuantity <= 5 && (
                  <div className="remaining-warning">Only {ticket.remainingQuantity} left</div>
                )}
              </div>

              <div className="action">
                <div className="price-info">
                  <div className="price">${ticket.price.toFixed(2)}</div>
                  {/* <div className="fee">+ booking fee</div> */}
                </div>

                {!isSoldOut ? (
                  quantity > 0 ? (
                    <div className="counter">
                      <button onClick={() => decrement(ticket.id)}>-</button>
                      <span>{quantity}</span>
                      <button onClick={() => increment(ticket.id)} disabled={isMaxReached}>+</button>
                    </div>
                  ) : (
                    <button
                      className="add-btn"
                      onClick={() => increment(ticket.id)}
                      disabled={isMaxReached}
                    >
                      Add
                    </button>
                  )
                ) : (
                  <span className="sold-out">Sold Out</span>
                )}
              </div>
            </div>
          )
        })}

        <div className="ticket-modal-footer">
          <div className="total">
            <ShoppingCart />
            ${getTotal().toFixed(2)} NZD
          </div>
          <button className="continue-btn" onClick={handleContinue} disabled={Object.keys(cart).length === 0}>
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
