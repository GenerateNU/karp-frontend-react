import { useQuery } from '@tanstack/react-query';
import { getAllOrganizations } from '@/api/organization';

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
