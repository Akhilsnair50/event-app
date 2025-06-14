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
        width={200}
        height={200}
        onError={() => setImgSrc('/assets/rihanna.png')}
        unoptimized
        priority
      />
      <h2>{title}</h2>
      <p>{date}, {time}</p>
      <p>📍 {location}</p>
      <button className="buy-btn" onClick={onBuyClick}>Buy Tickets</button>
      <p className="price-hint">Tickets from ₹{price}</p>
    </aside>
  )
}
