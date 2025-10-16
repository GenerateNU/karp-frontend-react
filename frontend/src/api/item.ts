import { makeRequest } from './base';
import type {
  Item,
  CreateItemRequest,
  UpdateItemRequest,
  ItemSortParam,
  SortOrder,
} from '@/types/item';

export const itemApi = {
  // Get all items with optional filters
  getItems: async (
    searchText?: string,
    vendorId?: string,
    sortBy?: ItemSortParam,
    sortOrder: SortOrder = 'asc'
  ): Promise<Item[]> => {
    const params = new URLSearchParams();
    if (searchText) params.append('search_text', searchText);
    if (vendorId) params.append('vendor_id', vendorId);
    if (sortBy) params.append('sort_by', sortBy);
    params.append('sort_order', sortOrder);

    return makeRequest<Item[]>(`/item/all?${params.toString()}`, 'GET');
  },

  getItem: async (id: string): Promise<Item> => {
    return makeRequest<Item>(`/item/${id}`, 'GET');
  },

  createItem: async (item: CreateItemRequest): Promise<Item> => {
    return makeRequest<Item>('/item/new', 'POST', item);
  },

  updateItem: async (id: string, item: UpdateItemRequest): Promise<void> => {
    await makeRequest<void>(`/item/${id}`, 'PUT', item);
  },

  deactivateItem: async (id: string): Promise<void> => {
    await makeRequest<void>(`/item/${id}/deactivate`, 'DELETE');
  },

  activateItem: async (id: string): Promise<void> => {
    await makeRequest<void>(`/item/${id}/activate`, 'POST');
  },
};
