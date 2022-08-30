import { NOTIFICATION_ENDPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function readNotificationApi(userId: number) {
  return await baseApi(
    NOTIFICATION_ENDPOINT.BASE + NOTIFICATION_ENDPOINT.READ,
    'POST',
    {
      userId,
    }
  );
}
