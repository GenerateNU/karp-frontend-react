import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllOrganizations, updateOrganization } from '@/api/organization';
import type { UpdateOrganizationRequest } from '@/types/organization';

export const organizationKeys = {
  all: ['organizations'] as const,
  lists: () => [...organizationKeys.all, 'list'] as const,
};

export function useOrganizations() {
  return useQuery({
    queryKey: organizationKeys.lists(),
    queryFn: getAllOrganizations,
  });
}

export function useUpdateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateOrganizationRequest;
    }) => updateOrganization(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationKeys.lists() });
    },
  });
}
