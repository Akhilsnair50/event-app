import { api } from './axios'

export interface CustomerEventResponse {
  id: number
  name: string
  shortDescription: string
  bannerImage: string
  thumbnailImage: string
  startDate: string
  startTime: string
  timezone: string
  eventLocationName: string
  eventLocationType: string
  soldOut: boolean
  minTicketPrice: number
}

export const getUpcomingEvents = async (): Promise<CustomerEventResponse[]> => {
  const res = await api.get('/public/events/upcoming')
  return res.data
}
export const getEventById = async (id: number): Promise<CustomerEventResponse> => {
  const res = await api.get(`/public/events/${id}`)
  return res.data
}
export async function searchEvents(query: string): Promise<CustomerEventResponse[]> {
  const res = await api.get(`/public/events/search?q=${encodeURIComponent(query)}`)
  return res.data
}