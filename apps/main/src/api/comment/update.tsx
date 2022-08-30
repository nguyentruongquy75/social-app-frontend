import { COMMENT_ENDPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function updateCommentApi(commentId: number, payload: any) {
  return await baseApi(
    COMMENT_ENDPOINT.BASE + '/' + commentId + COMMENT_ENDPOINT.UPDATE,
    'PUT',
    payload
  );
}
