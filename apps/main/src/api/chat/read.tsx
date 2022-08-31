import { CHAT_ENDPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function readRoomsApi() {
  return await baseApi(CHAT_ENDPOINT.BASE + CHAT_ENDPOINT.READ, 'PUT');
}
