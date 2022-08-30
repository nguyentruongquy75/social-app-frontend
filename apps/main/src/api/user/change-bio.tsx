import { USER_ENDPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function changeBioApi(bio: string) {
  return await baseApi(USER_ENDPOINT.BASE + USER_ENDPOINT.UPDATE, 'PUT', {
    bio,
  });
}
