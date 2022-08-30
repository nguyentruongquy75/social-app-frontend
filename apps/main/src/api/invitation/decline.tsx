import { INVITATION_ENDPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function declineInvitationApi(id: number) {
  return await baseApi(
    INVITATION_ENDPOINT.BASE + INVITATION_ENDPOINT.DECLINE,
    'DELETE',
    {
      invitationId: id,
    }
  );
}
