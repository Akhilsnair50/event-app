'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import '@/styles/StripeResult.scss'

export default function OrderFailurePage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="stripe-result-wrapper failure">
      <div className="card">
        <h2>❌ Payment Cancelled</h2>
        <p>Something went wrong while processing your payment.</p>
        <p>Redirecting you back to the homepage in a few seconds.</p>
      </div>
    </div>
  )
}
