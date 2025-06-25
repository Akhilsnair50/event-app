// app/events/[id]/page.tsx

import { getEventById, CustomerEventResponse } from '@/lib/api/events'
import EventDetailPage from './EventDetailClient'
import { Metadata } from 'next'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event: CustomerEventResponse = await getEventById(Number(params.id))

  return {
    title: event.name,
    description: stripHtml(event.shortDescription || ''),
    openGraph: {
      title: event.name,
      description: stripHtml(event.shortDescription || ''),
      type: 'website',
      url: `https://prizmatix.nz/events/${event.id}`,
      images: [
        {
          url: event.bannerImage,
          width: 1200,
          height: 630,
          alt: event.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: event.name,
      description: stripHtml(event.shortDescription || ''),
      images: [event.bannerImage],
    },
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, '')
}

export default async function Page({ params }: Props) {
  const event = await getEventById(Number(params.id))
  return <EventDetailPage event={event} />
}
