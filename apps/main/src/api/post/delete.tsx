import { POST_ENDPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function deletePostApi(postId: number) {
  return await baseApi(POST_ENDPOINT.BASE + POST_ENDPOINT.DELETE, 'DELETE', {
    postId,
  });
}
