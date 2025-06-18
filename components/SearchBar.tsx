'use client'

import Image from 'next/image'
import '../styles/SearchBar.scss'
import { useState, useEffect } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  initialValue?: string
}

export default function SearchBar({ onSearch, initialValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue)

  useEffect(() => {
    setQuery(initialValue)
  }, [initialValue])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    window.history.replaceState(null, '', trimmed ? `/?q=${encodeURIComponent(trimmed)}` : '/')
    onSearch(trimmed)
  }

  return (
    <form className="search-bar-wrapper" onSubmit={handleSubmit}>
      <div className="search-bar-inner">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search for events, artist, music type...."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className="clear-btn"
              onClick={() => {
                setQuery('')
                onSearch('')
              }}
            >
              ✕
            </button>
          )}
        </div>

        <button className="location-btn" type="button">
          <Image src="/assets/pin.svg" alt="Location" width={20} height={20} />
          <span>Auckland, NZ</span>
        </button>
      </div>

      <button className="search-btn" type="submit">
        <Image src="/assets/search.svg" alt="Search" width={28} height={28} />
      </button>
</form>

  )
}
