import { makeRequest } from '@/api/base';
import type { AdminProfile } from '@/types/user';

// get all admins
export async function getAllAdmins(): Promise<AdminProfile[]> {
  return makeRequest<AdminProfile[]>('/admin/all', 'GET');
}
