'use client'

import { useEffect, useRef, useState } from 'react'
import '../styles/LoginModal.scss'
import { googleLogin, requestOtp, verifyOtp } from '@/lib/api/auth'

interface Props {
  onClose: () => void
}

// Extend the window object to include Google types

export default function LoginModal({ onClose }: Props) {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [error, setError] = useState('')
  const googleInitialized = useRef(false)
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [otpError, setOtpError] = useState('')

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isValidOtp = (otp: string) => /^\d{6}$/.test(otp)

  useEffect(() => {
    if (
      !googleInitialized.current &&
      typeof window !== 'undefined' &&
      window.google &&
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    ) {
      const gsiButton = document.getElementById('gsi-button')
      if (!gsiButton) return

      googleInitialized.current = true

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          try {
            const jwt = await googleLogin(response.credential)
            localStorage.setItem('token', jwt)
             const payload = JSON.parse(atob(response.credential.split('.')[1]))
            if (payload.email) {
              localStorage.setItem('user_email', payload.email)
            }
            onClose()
            window.location.reload()
          } catch (err) {
            console.error('Google login failed:', err)
            setError('Google login failed')
          }
        },
      })

      window.google.accounts.id.renderButton(gsiButton, {
      type: 'standard',         // or 'icon'
      theme: 'outline',         // or 'filled_blue', 'filled_black'
      size: 'large',            // or 'small', 'medium'
      shape: 'pill',     // optional: 'pill', 'circle', 'square'
      text: 'signin_with',      // optional: 'continue_with' or 'signup_with'
      logo_alignment: 'left',   // optional
      width: 100                // must be a number
    })


    }
  }, [])

  const handleSendOtp = async () => {
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    setEmailError('')
    setLoading(true)
    try {
      await requestOtp(email)
      setStep('otp')
      setError('')
    } catch {
      setError('Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (!isValidOtp(otp)) {
      setOtpError('OTP must be a 6-digit number')
      return
    }

    setOtpError('')
    setLoading(true)
    try {
      const jwt = await verifyOtp(email, otp)
      localStorage.setItem('token', jwt)
      localStorage.setItem('user_email', email)
      onClose()
      window.location.reload()
    } catch {
      setError('Invalid or expired OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {step === 'email' ? (
          <>
            <h2>Get Started</h2>
            <div id="gsi-button" className="google-button"></div>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="input-wrapper">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="error">{emailError}</p>}
            </div>
            <button
              className="continue-btn"
              onClick={handleSendOtp}
              disabled={loading || !isValidEmail(email)}
            >
              {loading ? <span className="loader"></span> : 'Continue'}
            </button>
          </>
        ) : (
          <>
            <h2>Sign Up</h2>
            <p className="otp-instruction">
              Please input the verification code that has been sent to your
              email address.
            </p>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Enter code here"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              {otpError && <p className="error">{otpError}</p>}
            </div>
            <button
              className="continue-btn"
              onClick={handleVerifyOtp}
              disabled={loading || !isValidOtp(otp)}
            >
              {loading ? <span className="loader"></span> : 'Continue'}
            </button>
          </>
        )}

        {error && <p className="error">{error}</p>}

        <p className="terms">
          I agree to the Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
