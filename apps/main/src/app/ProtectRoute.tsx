import { Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { AUTH_ENPOINT } from '../constants';
import { userState } from '../stores';

type Props = {
  children: JSX.Element;
};

export function ProtectRoute({ children }: Props) {
  const [user, _] = useRecoilState(userState);

  if (!user)
    return <Navigate to={AUTH_ENPOINT.BASE + AUTH_ENPOINT.LOGIN} replace />;

  return children;
}
