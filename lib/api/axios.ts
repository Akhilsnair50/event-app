import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
})
