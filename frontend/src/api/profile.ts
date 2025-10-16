import { makeRequest } from '@/api/base';
import type {
  AuthUser,
  VolunteerProfile,
  VendorProfile,
  OrganizationProfile,
  AdminProfile,
  UserType,
} from '@/types/user';

export async function getUserProfile(): Promise<AuthUser> {
  return makeRequest<AuthUser>('/users/me', 'GET');
}

export async function getVolunteerProfile(): Promise<VolunteerProfile> {
  return makeRequest<VolunteerProfile>('/volunteers/me', 'GET');
}

export async function getVendorProfile(): Promise<VendorProfile> {
  return makeRequest<VendorProfile>('/vendors/me', 'GET');
}

export async function getOrganizationProfile(): Promise<OrganizationProfile> {
  return makeRequest<OrganizationProfile>('/organizations/me', 'GET');
}

export async function getAdminProfile(): Promise<AdminProfile> {
  return makeRequest<AdminProfile>('/admins/me', 'GET');
}

export async function getProfileByUserType(
  userType: UserType
): Promise<
  VolunteerProfile | VendorProfile | OrganizationProfile | AdminProfile
> {
  switch (userType) {
    case 'VOLUNTEER':
      return getVolunteerProfile();
    case 'VENDOR':
      return getVendorProfile();
    case 'ORGANIZATION':
      return getOrganizationProfile();
    case 'ADMIN':
      return getAdminProfile();
    default:
      throw new Error(`Unknown user type: ${userType}`);
  }
}
