import { USER_ENDPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function getUserSearchApi(q: string) {
  return await baseApi(USER_ENDPOINT.BASE + USER_ENDPOINT.SEARCH + '?q=' + q);
}
