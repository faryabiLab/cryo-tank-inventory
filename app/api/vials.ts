import { api } from './client';
import type { IVial } from '~/utils/interfaces';

export const vialsApi = {
  getAll: (filters?: { boxId?: string; cellLineId?: string }) => {
    const params = new URLSearchParams(filters as Record<string, string>).toString();
    return api.get<IVial[]>(`/vials${params ? `?${params}` : ''}`);
  },
  getById: (id: string) => api.get<IVial>(`/vials/${id}`),
  create: (data: Omit<IVial, 'id'>) => api.post<IVial>('/vials', data),
  update: (id: string, data: Partial<Omit<IVial, 'id'>>) => api.patch<IVial>(`/vials/${id}`, data),
  delete: (id: string) => api.delete(`/vials/${id}`),
};