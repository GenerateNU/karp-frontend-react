import { makeRequest } from '@/api/base';
import type {
  Organization,
  UpdateOrganizationRequest,
} from '@/types/organization';

type CreateOrganizationRequest = {
  name: string;
  description: string;
  address: string;
};

type OrganizationResponse = {
  id: string;
  name: string;
  description: string;
  address: string;
  [key: string]: unknown;
};

export async function getAllOrganizations(): Promise<Organization[]> {
  return makeRequest<Organization[]>('/organization/all', 'GET');
}

export async function createOrganization(
  organizationData: CreateOrganizationRequest
): Promise<OrganizationResponse> {
  return makeRequest<OrganizationResponse>(
    '/organization/new',
    'POST',
    organizationData
  );
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
