import { CHAT_ENDPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function seenMessageApi(chatRoomId: number) {
  return await baseApi(CHAT_ENDPOINT.BASE + CHAT_ENDPOINT.SEEN, 'POST', {
    chatRoomId,
  });
}
