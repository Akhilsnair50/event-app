import { api } from '../axios'

export async function createCheckoutSession(payload: any) {
  const res = await api.post('/api/orders/create-checkout-session', payload)
  return res.data
}
