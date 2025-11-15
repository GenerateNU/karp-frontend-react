import { makeRequest } from '@/api/base';

type CreateVendorRequest = {
  name: string;
  business_type: string;
};

type VendorResponse = {
  id: string;
  name: string;
  business_type: string;
  [key: string]: unknown;
};

export async function createVendor(
  vendorData: CreateVendorRequest
): Promise<VendorResponse> {
  return makeRequest<VendorResponse>('/vendor/new', 'POST', vendorData);
}
