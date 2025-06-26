'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import '../styles/EventCard.scss'

interface Props {
  id: number
  image: string
  title: string
  date: string
  location: string
  price: string
}

export default function EventCard({ id, image, title, date, location, price }: Props) {
  const [imgSrc, setImgSrc] = useState(image)

  const formatFullDate = (dateStr: string): string => {
    const parsed = new Date(dateStr)
    return parsed.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <Link href={`/events/${id}`}>
      <motion.div
        className="event-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <Image
          src={imgSrc}
          alt={title}
          width={300}
          height={300}
          className="event-image"
          unoptimized
          loading="lazy"
          onError={() => setImgSrc('/assets/rihanna.png')}
        />

        <h3>{title}</h3>

        <p className="event-meta">
          <Calendar size={16} strokeWidth={1.5} />
          {formatFullDate(date)}
        </p>

        <p className="event-meta">
          <MapPin size={16} strokeWidth={1.5} />
          {location}
        </p>

        <p className="price">{price}</p>
      </motion.div>
    </Link>
  )
}
