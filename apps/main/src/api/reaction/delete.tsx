import { REACTION_ENDPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function deleteReactionAPi(id: number) {
  return await baseApi(
    REACTION_ENDPOINT.BASE + REACTION_ENDPOINT.DELETE,
    'DELETE',
    {
      reactionId: id,
    }
  );
}
