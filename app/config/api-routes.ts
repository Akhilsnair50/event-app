const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const API = {
  AUTH: {
    GOOGLE_LOGIN: `${API_BASE_URL}/auth/google-login`,
    REQUEST_OTP: '/auth/request-otp',
    VERIFY_OTP: '/auth/verify-otp'
  },
};
