'use client'

import { useEffect, useState } from 'react'
import { fetchOrders } from '@/lib/api/ordersList'
import '../../styles/OrderHistory.scss'

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  if (loading) return <div className="orders-page"><p>Loading your tickets...</p></div>
  if (error) return <div className="orders-page"><p>{error}</p></div>

  return (
    <div className="orders-page">
      <h1>Your Tickets</h1>

      <div className="order-filters">
        <button>All Tickets</button>
        <button>Live Tickets</button>
        <button>Expired Tickets</button>
        <select>
          <option>Past 3 Months</option>
        </select>
      </div>

      <div className="order-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <img src="/assets/sample-event.jpg" alt="Event" />
              <div className="order-info">
                <h2>{order.eventName ?? 'Event Title'}</h2>
                <p>{order.eventDateTime ?? 'Date | Time'}</p>
                <p>{order.eventLocation ?? 'Venue'}</p>
                <div className="tags">
                  {order.tickets.map((t: any) => (
                    <span key={t.id}>×1 {t.attendeeName}</span>
                  ))}
                </div>
              </div>
              <div className="order-actions">
                <button>Download ticket</button>
                <button>Request refund</button>
                <p className="amount">${order.amount}</p>
              </div>
            </div>
            <div className="order-meta">
              <p>Purchase Date: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Order ID: {order.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
