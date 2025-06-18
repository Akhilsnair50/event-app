import { api } from './axios'
import { API } from '@/app/config/api-routes'


export const googleLogin = async (idToken: string): Promise<string> => {
  const res = await api.post(API.AUTH.GOOGLE_LOGIN, { idToken })
  return res.data.token
}

export const requestOtp = async (email: string): Promise<void> => {
  await api.post(API.AUTH.REQUEST_OTP, { email })
}

export const verifyOtp = async (email: string, otp: string): Promise<string> => {
  const res = await api.post(API.AUTH.VERIFY_OTP, { email, otp })
  return res.data.token
}
