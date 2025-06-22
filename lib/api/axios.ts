import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://customer-api.prizmatix.nz',
  headers: {
    'Content-Type': 'application/json',
  },
})
