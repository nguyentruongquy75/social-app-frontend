import { POST_ENDPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function updatePostApi(payload: any) {
  return await baseApi(
    POST_ENDPOINT.BASE + POST_ENDPOINT.UPDATE,
    'PUT',
    payload
  );
}
