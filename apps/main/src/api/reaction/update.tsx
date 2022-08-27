import { REACTION_ENDPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function updateReactionApi(payload: any) {
  return await baseApi(
    REACTION_ENDPOINT.BASE + REACTION_ENDPOINT.UPDATE,
    'PUT',
    payload
  );
}
