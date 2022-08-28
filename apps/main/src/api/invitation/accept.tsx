import { INVITATION_ENDPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function acceptInvitationApi(id: number) {
  return await baseApi(
    INVITATION_ENDPOINT.BASE + INVITATION_ENDPOINT.ACCEPT,
    'PUT',
    {
      invitationId: id,
    }
  );
}
