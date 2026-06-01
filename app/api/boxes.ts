import { api } from './client';
import type { IBox } from '~/utils/interfaces';

export const boxesApi = {
  getAll: () => api.get<IBox[]>('/boxes'),
  getById: (id: string) => api.get<IBox>(`/boxes/${id}`),
  create: (data: Omit<IBox, 'id' | 'userId'>) => api.post<IBox>('/boxes', data),
  update: (id: string, data: Partial<Omit<IBox, 'id'>>) => api.patch<IBox>(`/boxes/${id}`, data),
  delete: (id: string) => api.delete(`/boxes/${id}`),
};