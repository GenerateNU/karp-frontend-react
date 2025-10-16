export type UserType = 'VOLUNTEER' | 'VENDOR' | 'ORGANIZATION' | 'ADMIN';

export type AuthUser = {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  user_type: UserType;
  entity_id: string | null;
};

export type VolunteerProfile = {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  date_of_birth: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  skills: string[];
  interests: string[];
  availability: string;
  created_at: string;
  updated_at: string;
};

export type VendorProfile = {
  id: string;
  user_id: string;
  business_name: string;
  contact_name: string;
  email: string;
  phone: string;
  address: string;
  business_type: string;
  description: string;
  website: string;
  created_at: string;
  updated_at: string;
};

export type OrganizationProfile = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  created_at: string;
  updated_at: string;
};

export type AdminProfile = {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  permissions: string[];
  created_at: string;
  updated_at: string;
};
