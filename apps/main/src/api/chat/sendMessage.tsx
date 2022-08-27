import { CHAT_ENDPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function sendMessageApi(payload: any) {
  return await baseApi(
    CHAT_ENDPOINT.BASE + CHAT_ENDPOINT.MESSAGE,
    'POST',
    payload
  );
}
