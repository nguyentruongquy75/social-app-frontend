import { CHATROOM_TYPE, CHAT_ENDPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function getChatRoomApi(
  users: number[] | null,
  id?: number,
  type = CHATROOM_TYPE.DEFAULT
) {
  const payload: any = {
    type,
  };

  if (id) payload.chatRoomId = id;
  if (users) payload.users = users;

  return await baseApi(CHAT_ENDPOINT.BASE, 'POST', payload);
}
