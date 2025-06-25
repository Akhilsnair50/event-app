'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import HeroBanner from '@/components/HeroBanner'
import SearchBar from '@/components/SearchBar'
import CategoryFilter from '@/components/CategoryFilter'
import EventCard from '@/components/EventCard'
import { getUpcomingEvents, searchEvents, CustomerEventResponse } from '@/lib/api/events'
import '../styles/Home.scss'

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState('')
  const [events, setEvents] = useState<CustomerEventResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = searchParams.get('q') || ''
    setSearchQuery(q)

    const fetch = async () => {
      setLoading(true)
      try {
        const data = q ? await searchEvents(q) : await getUpcomingEvents()
        setEvents(data)
      } catch (err) {
        console.error('Failed to fetch events:', err)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [searchParams])

  const handleSearch = (query: string) => {
    const trimmed = query.trim()
    router.replace(trimmed ? `/?q=${encodeURIComponent(trimmed)}` : '/', { scroll: false })
  }

  return (
    <div className="main-hero-container">
      <HeroBanner />
      <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
      <div className="home-container">
        <h2 className="section-heading">
          {searchQuery ? `Results for "${searchQuery}"` : 'Popular Events'} <span>Auckland</span>
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
                image={event.thumbnailImage}
                title={event.name}
                date={`${event.startDate} ${event.startTime}`}
                location={event.eventLocationName}
                price={`From $${event.minTicketPrice}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
