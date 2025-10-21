const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export async function makeRequest<T>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any
): Promise<T> {
  const token = localStorage.getItem('auth_token');

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Request failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  return response.json() as Promise<T>;
}
