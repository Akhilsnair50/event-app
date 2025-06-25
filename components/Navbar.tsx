'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import LoginModal from './LoginModal'
import '../styles/Navbar.scss'

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user_email')
    window.location.href = '/'
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link href="/">
            <Image src="/assets/logo.svg" alt="Logo" width={120} height={30} />
          </Link>
          <div className="desktop-menu">
            <a href="#">About</a>
            <a href="#">Contact Us</a>
          </div>
        </div>

        <div className="navbar-right">
          <div className="desktop-menu">
            <a className="cta-text" href="https://console.prizmatix.nz">
              Create Event for <span className="highlight-free">Free</span>
            </a>
            {isLoggedIn ? (
              <div className="profile-dropdown" ref={dropdownRef}>
                <button className="avatar-icon" onClick={() => setDropdownOpen(!dropdownOpen)}>👤</button>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link href="/orders">My Tickets</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <button className="sign-in-btn" onClick={() => setShowLogin(true)}>Sign In</button>
            )}
          </div>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <a href="#">About</a>
            <a href="#">Contact Us</a>
            <a href="https://console.prizmatix.nz" className="create-event-link">
               Create Event for<span className="highlight-free">Free</span>
            </a>
            {isLoggedIn ? (
              <>
                <Link href="/orders"> My Tickets</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <button className="sign-in-btn" onClick={() => setShowLogin(true)}>Sign In</button>
            )}
          </div>
        )}
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  )
}
