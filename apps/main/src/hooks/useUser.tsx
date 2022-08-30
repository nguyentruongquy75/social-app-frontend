import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { meApi } from '../api/auth/me';
import { AUTH_ENPOINT, EVENTS } from '../constants';

export async function useUser() {
  const navigate = useNavigate();

  const savedToken = localStorage.getItem('token');

  const navigateToLogin = () =>
    navigate(AUTH_ENPOINT.BASE + AUTH_ENPOINT.LOGIN, { replace: true });

  if (!savedToken) {
    console.log('navigate');
    navigateToLogin();
    return;
  }

  useEffect(() => {
    const getUser = async () => {
      const user = await meApi();

      if (!user) {
        navigateToLogin();
        return;
      }

      return user;
    };

    getUser();
  }, []);

  return;
}
