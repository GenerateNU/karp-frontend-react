import { makeRequest } from '@/api/base';
import type { OrganizationProfile } from '@/types/user';

export async function getAllOrganizations(): Promise<OrganizationProfile[]> {
  return makeRequest<OrganizationProfile[]>('/organization/all', 'GET');
}
