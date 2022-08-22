import { useNavigate } from 'react-router-dom';
import { meApi } from '../api/auth/me';
import { AUTH_ENPOINT } from '../constants';

export async function useUser() {
  const navigate = useNavigate();

  const savedToken = localStorage.getItem('token');

  const navigateToLogin = () =>
    navigate(AUTH_ENPOINT.BASE + AUTH_ENPOINT.LOGIN);

  if (!savedToken) {
    navigateToLogin();
    return;
  }

  const user = await meApi();

  user && navigateToLogin();

  return user;
}
