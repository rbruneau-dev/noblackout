export const API_URL =
  'https://637f3a195b1cc8d6f93e222a.mockapi.io/api/blackout/';

export const callApi = (url: string, method: string = 'GET', body?: any) => {
  return fetch(`${API_URL}${url}`, {
    method,
    body: method === 'POST' ? body : undefined,
  }).then((response) => response.json());
};
