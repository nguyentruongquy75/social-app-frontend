import { COMMENT_ENDPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function createCommentApi(payload: any) {
  return await baseApi(
    COMMENT_ENDPOINT.BASE + COMMENT_ENDPOINT.CREATE,
    'POST',
    payload
  );
}
