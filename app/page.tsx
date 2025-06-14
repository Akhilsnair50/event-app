'use client'

import { useEffect, useState } from 'react'
import HeroBanner from '@/components/HeroBanner'
import SearchBar from '@/components/SearchBar'
import CategoryFilter from '@/components/CategoryFilter'
import EventCard from '@/components/EventCard'
import { getUpcomingEvents, CustomerEventResponse } from '@/lib/api/events'
import '../styles/Home.scss'

export default function Home() {
  const [events, setEvents] = useState<CustomerEventResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getUpcomingEvents()
        setEvents(data)
      } catch (err) {
        console.error('Failed to fetch events:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div className="main-hero-container">
      <HeroBanner />
      <SearchBar />
      <div className="home-container">
        <h2 className="section-heading">
          Popular Events <span>Auckland</span>
        </h2>
        <CategoryFilter />

        {loading ? (
          <p>Loading events...</p>
        ) : (
          <div className="event-grid">
            {events.map(event => (
              <EventCard
                key={event.id}
                id={event.id}
                image={event.bannerImage}
                title={event.name}
                date={`${event.startDate} ${event.startTime}`}
                location={event.eventLocationName}
                price={`From ₹${event.minTicketPrice}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
