'use client'

import { useEffect, useState } from 'react'
import { CustomerEventResponse, getEventById } from '@/lib/api/events'
import EventDetailPage from './EventDetailClient'

export default function EventDetailWrapper({ id }: { id: number }) {
  const [event, setEvent] = useState<CustomerEventResponse | null>(null)

  useEffect(() => {
    getEventById(id).then(setEvent).catch(console.error)
  }, [id])

  if (!event) return <p>Loading event...</p>

  return <EventDetailPage event={event} />
}
