import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  MIN_LENGTH_PASSWORD,
  FIELD_IS_REQUIRED,
  INVALID_FIELD,
  MIN_LENGTH_FIELD,
} from 'apps/main/src/constants';
import { useForm } from 'react-hook-form';
import { Box, Button, Divider, TextField } from '@mui/material';
import {
  getFormMessage,
  getMinLengthMessage,
} from 'apps/main/src/utils/message';
import AuthBox from '../../atoms/auth-box/auth-box.atom';
import { loginApi } from 'apps/main/src/api';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState } from 'apps/main/src/stores';

type Props = {};

const LoginFormSchema = object({
  email: string()
    .nonempty(getFormMessage(FIELD_IS_REQUIRED, 'Email'))
    .email(getFormMessage(INVALID_FIELD, 'Email')),
  password: string()
    .nonempty(getFormMessage(FIELD_IS_REQUIRED, 'Mật khẩu'))
    .min(
      6,
      getMinLengthMessage(MIN_LENGTH_FIELD, 'Mật khẩu', MIN_LENGTH_PASSWORD)
    ),
});

function LoginForm({}: Props) {
  const [_, setUser] = useRecoilState(userState);
  const resetUserState = useResetRecoilState(userState);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({ resolver: zodResolver(LoginFormSchema) });

  const onSubmit = async (values: any) => {
    const user = await loginApi({
      email: values.email,
      password: values.password,
    });

    if (user) {
      const saveUser = { ...user.user };
      delete saveUser.password;
      delete saveUser.email;
      localStorage.setItem('token', user.jwt_token);
      setUser(saveUser);
      navigate('/');
    }
  };

  const navigateToSignUp = () => navigate('/auth/register');

  useEffect(() => {
    resetUserState();
  }, []);

  return (
    <AuthBox>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="Email"
          required
          fullWidth
          sx={{ mb: 1 }}
          error={!!errors['email']}
          helperText={
            errors['email'] ? (errors['email'].message as string) : ''
          }
          {...register('email')}
        />
        <TextField
          label="Mật khẩu"
          required
          fullWidth
          sx={{ mb: 1 }}
          error={!!errors['password']}
          helperText={
            errors['password'] ? (errors['password'].message as string) : ''
          }
          {...register('password')}
        />
        <Button
          variant="contained"
          sx={{
            fontWeight: 'bold',
            textTransform: 'none',
          }}
          fullWidth
          type="submit"
          size="large"
        >
          Đăng nhập
        </Button>

        <Divider sx={{ m: '20px 0' }} />

        <Box textAlign="center">
          <Button
            variant="contained"
            sx={{
              bgcolor: '#42b72a',
              fontWeight: 'bold',
              textTransform: 'none',
            }}
            size="large"
            onClick={navigateToSignUp}
          >
            Tạo tài khoản mới
          </Button>
        </Box>
      </Box>
    </AuthBox>
  );
}

export default LoginForm;
