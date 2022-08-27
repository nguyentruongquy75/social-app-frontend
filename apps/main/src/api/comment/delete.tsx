import { COMMENT_ENDPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function deleteCommentApi(commentId: number) {
  return await baseApi(
    COMMENT_ENDPOINT.BASE + `/${commentId}` + COMMENT_ENDPOINT.DELETE,
    'DELETE'
  );
}
