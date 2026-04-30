import { api } from './client';
import type { ICellLine } from '~/utils/interfaces';

export const cellLinesApi = {
  getAll: (filters?: { category?: string; userId?: string }) => {
    const params = new URLSearchParams(filters as Record<string, string>).toString();
    return api.get<ICellLine[]>(`/cell-lines${params ? `?${params}` : ''}`);
  },
  getById: (id: string) => api.get<ICellLine>(`/cell-lines/${id}`),
  create: (data: Omit<ICellLine, 'id'>) => api.post<ICellLine>('/cell-lines', data),
  update: (id: string, data: Partial<Omit<ICellLine, 'id'>>) => api.patch<ICellLine>(`/cell-lines/${id}`, data),
  delete: (id: string) => api.delete(`/cell-lines/${id}`),
};