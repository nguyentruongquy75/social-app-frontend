import { baseApi } from './base-api';

export async function fetcher(url = '', method = 'GET', body = {}) {
  return await baseApi(url, method, body);
}
