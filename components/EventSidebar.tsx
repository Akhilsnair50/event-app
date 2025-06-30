'use client'

import { CalendarIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
  title: string
  date: string
  time: string
  location: string
  price: number
  image: string
  onBuyClick: () => void
}
function formatFullDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',   // "Sun"
    day: '2-digit',     // "08"
    month: 'short',     // "Jun"
    year: 'numeric',    // "2025"
  });
}

// Example usage:

export default function EventSidebar({
  title,
  date,
  time,
  location,
  price,
  image,
  onBuyClick
}: Props) {
  const [imgSrc, setImgSrc] = useState(image)

  return (
    <aside className="event-sidebar">
      <Image
        src={imgSrc}
        alt={title}
        width={220}
        height={220}
        onError={() => setImgSrc('/assets/rihanna.png')}
        unoptimized
        priority
      />
      {/* <h2>{title}</h2> */}

      <div className="sidebar-meta">
        <div className="meta-item">
          <Image src="/assets/calendar.svg" alt="Date" width={20} height={20} />
          <span><span> {formatFullDate(date)}</span>
          , {time}</span>
        </div>
        <div className="meta-item">
          <Image src="/assets/location.svg" alt="Location" width={20} height={20} />
          <span>{location}</span>
        </div>
      </div>

      <button className="buy-btn" onClick={onBuyClick}>Buy Tickets</button>
      <p className="price-hint">Ticket rate starting from ${price}</p>
    </aside>
  )
}
