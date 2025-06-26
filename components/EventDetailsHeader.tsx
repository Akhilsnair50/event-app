'use client'

import Image from 'next/image'
import { useState } from 'react'


export default function EventDetailsHeader({ banner }: { banner: string }) {
  const [imgSrc, setImgSrc] = useState(banner)

  return (
    <div className="event-header">
      <div className="banner-wrapper">
        <Image
          src={imgSrc}
          alt="Banner"
          fill
          onError={() => setImgSrc('/assets/bannner.png')}
          unoptimized
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}
