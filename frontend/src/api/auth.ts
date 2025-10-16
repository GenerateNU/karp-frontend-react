import { makeRequest } from '@/api/base';

type LoginResponse = {
  access_token: string;
  token_type: string;
  user_type: string;
  entity_id: string | null;
};

export async function loginApi(
  username: string,
  password: string
): Promise<LoginResponse> {
  return makeRequest<LoginResponse>('/user/token', 'POST', {
    username,
    password,
  });
}
