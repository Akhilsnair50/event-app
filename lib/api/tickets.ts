import { api } from './axios'

export interface TicketResponseDto {
  remainingQuantity: number
  id: number
  name: string
  description: string
  price: number
  currency: string
  soldOut: boolean
  maxPurchasePerOrder: number
  limitedQuantity: boolean
}

export const fetchTickets = async (eventId: number): Promise<TicketResponseDto[]> => {
  const res = await api.get(`/public/events/${eventId}/tickets`)
  if (res.status !== 200) throw new Error('Failed to fetch tickets')
  return res.data
}
