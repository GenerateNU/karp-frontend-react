import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { itemApi } from '@/api/item';
import type {
  CreateItemRequest,
  UpdateItemRequest,
  ItemSortParam,
  SortOrder,
} from '@/types/item';

export function useItems(
  searchText?: string,
  vendorId?: string,
  sortBy?: ItemSortParam,
  sortOrder: SortOrder = 'asc'
) {
  return useQuery({
    queryKey: ['items', searchText, vendorId, sortBy, sortOrder],
    queryFn: () => itemApi.getItems(searchText, vendorId, sortBy, sortOrder),
  });
}

export function useItem(id: string) {
  return useQuery({
    queryKey: ['item', id],
    queryFn: () => itemApi.getItem(id),
    enabled: !!id,
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: CreateItemRequest) => itemApi.createItem(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, item }: { id: string; item: UpdateItemRequest }) =>
      itemApi.updateItem(id, item),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['item', id] });
    },
  });
}

export function useDeactivateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => itemApi.deactivateItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
}

export function useActivateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => itemApi.activateItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
}
