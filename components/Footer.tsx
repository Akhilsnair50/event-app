'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">© 2025 Prizmatix. All rights reserved.</div>
      <div className="footer-right">
        <Link href="/">Home</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/privacy">Privacy</Link>
      </div>
    </footer>
  )
}
