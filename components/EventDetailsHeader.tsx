import Image from 'next/image'
import { useState } from 'react'

export default function EventDetailsHeader({ banner }: { banner: string }) {
  const [imgSrc, setImgSrc] = useState(banner)

  return (
    <div className="event-header">
      <Image
        src={imgSrc}
        alt="Banner"
        width={1200}
        height={300}
        onError={() => setImgSrc('/assets/bannner.png')}
        unoptimized
        priority
      />
    </div>
  )
}
