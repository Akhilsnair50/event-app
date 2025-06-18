'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import '@/styles/StripeResult.scss'

export default function OrderSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="stripe-result-wrapper success">
      <div className="card">
        <h2>✅ Payment Successful</h2>
        <p>Your ticket has been emailed to you.</p>
        <p>You’ll be redirected to the homepage in a few seconds.</p>
      </div>
    </div>
  )
}
