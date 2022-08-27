import { REACTION_ENDPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function createReactionApi(payload: any) {
  return await baseApi(
    REACTION_ENDPOINT.BASE + REACTION_ENDPOINT.CREATE,
    'POST',
    payload
  );
}
