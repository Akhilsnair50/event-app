import { api } from '../axios'

export async function createCheckoutSession(payload: any) {
  const res = await api.post('/api/orders/create-checkout-session', payload)
  return res.data
}

export const getPricePreview = async (
  tickets: { ticketStructureId: number; quantity: number }[]
): Promise<{
  ticketSubtotal: number
  platformFee: number
  gstOnPlatformFee: number
  bookingFee: number
  grandTotal: number
}> => {
  const res = await api.post('/api/orders/preview-summary', { tickets }) // ✅ WRAPPED as object
  return res.data
}
