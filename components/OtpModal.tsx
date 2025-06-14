'use client'

import { useState } from 'react'
import '../styles/LoginModal.scss'
import { verifyOtp } from '@/lib/api/auth'

interface Props {
  email: string
  onClose: () => void
}

export default function OtpModal({ email, onClose }: Props) {
  const [otp, setOtp] = useState('')

  const handleVerify = async () => {
    try {
      const token = await verifyOtp(email, otp)
      localStorage.setItem('token', token)
      onClose()
    } catch {
      alert('Invalid or expired OTP')
    }
  }

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Sign Up</h2>
        <p>Please input the verification code that has been sent to your email address.</p>
        <input
          type="text"
          placeholder="Enter code here"
          value={otp}
          onChange={e => setOtp(e.target.value)}
        />
        <button className="continue-btn" onClick={handleVerify}>Continue</button>
        <p className="terms">
          I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}
