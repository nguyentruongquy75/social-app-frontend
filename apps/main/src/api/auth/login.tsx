import { AUTH_ENPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function loginApi(payload: any) {
  return await baseApi(AUTH_ENPOINT.BASE + AUTH_ENPOINT.LOGIN, 'POST', payload);
}
