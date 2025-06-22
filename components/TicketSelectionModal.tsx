'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import '@/styles/TicketSelectionModal.scss'
import { fetchTickets, TicketResponseDto } from '@/lib/api/tickets'
import Image from 'next/image'

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
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
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

  const getTotal = () =>
    tickets.reduce((sum, t) => sum + (cart[t.id] || 0) * (t.price + 3.69), 0)

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
      selections
    }

    localStorage.setItem('prizmatix_order', JSON.stringify(payload))
    onClose()
    router.push('/order/confirmation')
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
            <p>{eventDate} • {location}</p>
          </div>
        </div>

        {tickets.map(ticket => (
          <div key={ticket.id} className="ticket-row">
            <div className="info">
              <h4>{ticket.name}</h4>
              <p>{ticket.description}</p>
            </div>
            <div className="action">
              <div className="price">${ticket.price.toFixed(2)}</div>
              <div className="fee">+ $3.69 fee</div>
              {!ticket.soldOut ? (
                cart[ticket.id] ? (
                  <div className="counter">
                    <button onClick={() => decrement(ticket.id)}>-</button>
                    <span>{cart[ticket.id]}</span>
                    <button onClick={() => increment(ticket.id)}>+</button>
                  </div>
                ) : (
                  <button className="add-btn" onClick={() => increment(ticket.id)}>Add</button>
                )
              ) : (
                <span className="sold-out">Sold Out</span>
              )}
            </div>
          </div>
        ))}

        <div className="ticket-modal-footer">
          <div className="total">${getTotal().toFixed(2)} NZD</div>
          <button className="continue-btn" onClick={handleContinue}>Continue</button>
        </div>
      </div>
    </div>
  )
}
