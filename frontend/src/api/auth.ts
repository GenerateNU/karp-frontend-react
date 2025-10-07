import { makeRequest } from '@/api/base';

type LoginResponse = {
  access_token: string;
  token_type: string;
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
