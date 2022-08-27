import { useParams } from 'react-router-dom';
import LoginForm from '../components/organisms/login-form/login-form.organism';
import RegisterForm from '../components/organisms/register-form/register-form.orgaism';
import { AuthLayout } from '../components/templates';

type Props = {};

const AUTH_SCREEN = {
  SIGNIN: 'signin',
  REGISTER: 'register',
};

export function AuthPage({}: Props) {
  const { type } = useParams();

  let screen: undefined | JSX.Element = undefined;

  if (type === AUTH_SCREEN.SIGNIN) screen = <LoginForm />;
  if (type === AUTH_SCREEN.REGISTER) screen = <RegisterForm />;

  return <AuthLayout>{screen}</AuthLayout>;
}
