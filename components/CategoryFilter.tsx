'use client'

import '../styles/CategoryFilter.scss'
import { useState } from 'react'

const categories = ['All', 'DJ', 'EDM', 'Live', 'Hip Hop']

export default function CategoryFilter() {
  const [active, setActive] = useState('All')

  return (
    <div className="category-filter">
      {categories.map((cat) => (
        <button
          key={cat}
          className={active === cat ? 'active' : ''}
          onClick={() => setActive(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
