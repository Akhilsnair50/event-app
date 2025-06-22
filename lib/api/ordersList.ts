import { api } from './axios'


export const fetchOrders = async (): Promise<any[]> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User not authenticated');

  const res = await api.get('/api/orders/getOrders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

