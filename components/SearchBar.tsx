'use client'

import Image from 'next/image'
import '../styles/SearchBar.scss'

export default function SearchBar() {
  return (
    <div className="search-bar-wrapper">
      <input
        type="text"
        placeholder="Search for events, artist, music type..."
      />
      <button className="location-btn">
        <Image src="/assets/pin.svg" alt="Location" width={14} height={14} />
        <span>Auckland, NZ</span>
      </button>
      <button className="search-btn">
        <Image src="/assets/search.svg" alt="Search" width={16} height={16} />
      </button>
    </div>
  )
}
