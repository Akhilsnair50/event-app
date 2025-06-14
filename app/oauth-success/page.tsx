'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function OAuthSuccessPage() {
  const params = useSearchParams()
  const router = useRouter()
  const token = params.get('token')

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      router.push('/')
    }
  }, [token, router])

  return <p className="text-center mt-20">Logging you in...</p>
}
