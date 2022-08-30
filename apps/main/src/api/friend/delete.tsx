import { USER_ENDPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function deleteFriendApi(id: number) {
  return await baseApi(
    USER_ENDPOINT.BASE + USER_ENDPOINT.FRIENDS + '/delete',
    'DELETE',
    { friendId: id }
  );
}
