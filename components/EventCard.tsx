'use client'

import Image from 'next/image'
import '../styles/EventCard.scss'
import Link from 'next/link'
import { useState } from 'react'

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

  return (
    <Link href={`/events/${id}`}>
      <div className="event-card">
        <Image
          src={imgSrc}
          alt={title}
          width={300}
          height={300}
          className="event-image"
          unoptimized
          priority
          onError={() => setImgSrc('/assets/rihanna.png')} // fallback image
        />
        <h3>{title}</h3>
        <p>{date}</p>
        <p>{location}</p>
        <p className="price">{price}</p>
      </div>
    </Link>
  )
}
