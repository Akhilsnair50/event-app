'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchOrders } from '@/lib/api/ordersList'
import '../../styles/OrderHistory.scss'
import { api } from '@/lib/api/axios'

interface Attendee {
  attendeeName: string
  ticketType: string
}

interface CustomerOrderDto {
  orderId: number
  grandTotal: number | null
  createdAt: string
  eventName: string
  eventLocation: string
  eventBannerImage: string | null
  eventDateTime: string
  attendees: Attendee[]
}

// Helper to validate remote image URL or fallback
const getSafeImageUrl = (url: string | null | undefined): string => {
  return url && url.startsWith('http')
    ? url
    : '/assets/sample-event.jpg'
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<CustomerOrderDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'live' | 'expired'>('all')

  useEffect(() => {
    fetchOrders()
      .then(data => {
        setOrders(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError('Failed to fetch orders. Please log in again.')
        setLoading(false)
      })
  }, [])

  const now = new Date()
  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    const eventDate = new Date(order.eventDateTime)
    return filter === 'live' ? eventDate >= now : eventDate < now
  })

  const handleDownload = async (orderId: number) => {
  try {
    await api.post(`/api/orders/${orderId}/resend-ticket`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    })

    alert('Ticket email has been resent to your email.')
  } catch (err) {
    console.error(err)
    alert('Failed to resend ticket. Please try again later.')
  }
}



  if (loading) {
    return (
      <div className="orders-page">
        <p>Loading your tickets...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="orders-page">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="orders-page">
      <h1>Your Tickets</h1>

      <div className="order-filters">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
          All Tickets
        </button>
        {/* <button onClick={() => setFilter('live')} className={filter === 'live' ? 'active' : ''}>
          Live Tickets
        </button>
        <button onClick={() => setFilter('expired')} className={filter === 'expired' ? 'active' : ''}>
          Expired Tickets
        </button>
        <select>
          <option>Past 3 Months</option>
        </select> */}
      </div>

      <div className="order-list">
        {filteredOrders.length === 0 ? (
    <p className="no-orders">You haven’t purchased any tickets yet.</p>
  ) : 
        (filteredOrders.map(order => (
          <div key={order.orderId} className="order-card">
            <div className="order-header">
              <Image
                src={getSafeImageUrl(order.eventBannerImage)}
                alt="Event"
                width={300}
                height={180}
              />
              <div className="order-info">
                <h2>{order.eventName}</h2>
                <p>{order.eventDateTime}</p>
                <p>{order.eventLocation}</p>
                <div className="tags">
                  {order.attendees.map((attendee, index) => (
                    <span key={index}>
                      ×1 {attendee.attendeeName} ({attendee.ticketType})
                    </span>
                  ))}
                </div>
              </div>
              <div className="order-actions">
                {/* <button onClick={() => handleDownload(order.orderId)}>Resend ticket</button> */}
                <a
                href={`mailto:support@prizmatix.nz?subject=Refund%20Request%20for%20Order%20${order.orderId}&body=Hi%20Prizmatix%20Team%2C%0A%0AI'd%20like%20to%20request%20a%20refund%20for%20my%20order.%0AOrder%20ID%3A%20${order.orderId}%0A%0AThanks%2C`}
                className="refund-link"
                >
                Request refund
                </a>

                <p className="amount">
                  ${typeof order.grandTotal === 'number' ? order.grandTotal.toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
            <div className="order-meta">
              <p>Purchase Date: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Order ID: {order.orderId}</p>
            </div>
          </div>
        )))}
      </div>
    </div>
  )
}
