'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import LoginModal from './LoginModal'
import '../styles/Navbar.scss'

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link href="/">
            <Image src="/assets/logo.svg" alt="Logo" width={120} height={30} />
          </Link>
          <Link href="/">Explore Events</Link>
          <a href="#">About</a>
          <a href="#">Contact Us</a>
        </div>
        <div className="navbar-right">
          <a className="cta-text" href="#">Create Event for free</a>
          {isLoggedIn ? (
            <>
              <button className="avatar-icon">👤</button>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button className="sign-in-btn" onClick={() => setShowLogin(true)}>Sign In</button>
          )}
        </div>
      </nav>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  )
}
