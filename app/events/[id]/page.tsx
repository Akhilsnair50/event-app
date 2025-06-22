'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getEventById, CustomerEventResponse } from '@/lib/api/events'
import EventDetailsHeader from '@/components/EventDetailsHeader'
import EventSidebar from '@/components/EventSidebar'
import EventAbout from '@/components/EventAbout'
import VenueSection from '@/components/VenueSection'
import Footer from '@/components/Footer'
import TicketSelectionModal from '@/components/TicketSelectionModal'
import Portal from '@/components/Portal'

import '@/styles/EventDetails.scss'

export default function EventDetailPage() {
  const { id } = useParams()
  const [event, setEvent] = useState<CustomerEventResponse | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (id) {
      getEventById(Number(id)).then(setEvent).catch(console.error)
    }
  }, [id])

  if (!event) return <p>Loading event...</p>

  const bgImage = event.bannerImage?.startsWith('http')
    ? event.bannerImage
    : '/assets/rihanna.png'

  return (
    <div className="event-page-wrapper" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="event-blur-overlay">
        <div className="event-gradient-overlay" />

        {/* ✅ Shared container for aligned layout */}
        <div className="event-container">
          <EventDetailsHeader banner={event.bannerImage} />

          <div className="event-detail-layout">
            <EventSidebar
              title={event.name}
              date={event.startDate}
              time={event.startTime}
              location={event.eventLocationName}
              price={event.minTicketPrice}
              image={event.thumbnailImage}
              onBuyClick={() => setShowModal(true)}
            />
            <div className="event-content">
              <EventAbout description={event.shortDescription} />
              <VenueSection location={event.eventLocationName} />
            </div>
          </div>

          {/* ✅ Footer inside event-container */}
          <Footer />
        </div>

        {showModal && (
          <Portal>
            <TicketSelectionModal
              eventId={event.id}
              eventTitle={event.name}
              eventDate={event.startDate}
              location={event.eventLocationName}
              eventImage={event.bannerImage}
              onClose={() => setShowModal(false)}
            />
          </Portal>
        )}
      </div>

      {/* ✅ Mobile sticky bar untouched */}
      <div className="mobile-buy-bar">
        <div className="buy-bar-inner">
          <span>
            Ticket rate starting from <strong>${event.minTicketPrice}</strong>
          </span>
          <button className="buy-btn" onClick={() => setShowModal(true)}>Buy Tickets</button>
        </div>
      </div>
    </div>
  )
}
