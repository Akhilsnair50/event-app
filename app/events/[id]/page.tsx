
import { getEventById } from '@/lib/api/events'
import EventDetailClientPage from './EventDetailClientPage'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

// ✅ `params` is now async
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const event = await getEventById(Number(id))

  if (!event) return {}

  return {
    title: event.name,
    description: event.shortDescription?.replace(/<[^>]+>/g, '').slice(0, 160),
    openGraph: {
      title: event.name,
      description: event.shortDescription?.replace(/<[^>]+>/g, '').slice(0, 160),
      images: [
        {
          url: event.bannerImage || '/assets/bannner.png',
          width: 1200,
          height: 630,
          alt: event.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: event.name,
      description: event.shortDescription?.replace(/<[^>]+>/g, '').slice(0, 160),
      images: [event.bannerImage || '/assets/bannner.png'],
    },
  }
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = await getEventById(Number(id))

  if (!event) return notFound()

  return <EventDetailClientPage event={event} />
}
