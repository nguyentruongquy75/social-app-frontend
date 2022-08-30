import { AUTH_ENPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function registerApi(payload: any) {
  return await baseApi(
    AUTH_ENPOINT.BASE + AUTH_ENPOINT.SIGNUP,
    'POST',
    payload
  );
}
