import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || 'https://customer-api.prizmatix.nz',
  headers: {
    'Content-Type': 'application/json',
  },
})
