import { makeRequest } from '@/api/base';
import type {
  Organization,
  UpdateOrganizationRequest,
} from '@/types/organization';

export async function getAllOrganizations(): Promise<Organization[]> {
  return makeRequest<Organization[]>('/organization/all', 'GET');
}

export async function updateOrganization(
  organizationId: string,
  updateData: UpdateOrganizationRequest
): Promise<Organization> {
  return makeRequest<Organization>(
    `/organization/${organizationId}`,
    'PUT',
    updateData
  );
}
