import { AUTH_ENPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function meApi() {
  return await baseApi(AUTH_ENPOINT.BASE + AUTH_ENPOINT.ME);
}
