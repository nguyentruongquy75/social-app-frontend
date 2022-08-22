import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { registerApi } from 'apps/main/src/api';
import {
  FIELD_IS_REQUIRED,
  INVALID_FIELD,
  MIN_LENGTH_FIELD,
  MIN_LENGTH_PASSWORD,
  USER_STATUS,
} from 'apps/main/src/constants';
import { userState } from 'apps/main/src/stores';
import {
  getFormMessage,
  getMinLengthMessage,
} from 'apps/main/src/utils/message';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { object, string, z } from 'zod';
import AuthBox from '../../atoms/auth-box/auth-box.atom';

const RegisterFormSchema = object({
  lastName: string().nonempty(getFormMessage(FIELD_IS_REQUIRED, 'Tên')),
  firstName: string().nonempty(getFormMessage(FIELD_IS_REQUIRED, 'Họ')),
  email: string()
    .nonempty(getFormMessage(FIELD_IS_REQUIRED, 'Email'))
    .email(getFormMessage(INVALID_FIELD, 'Email')),
  password: string().min(
    MIN_LENGTH_PASSWORD,
    getMinLengthMessage(MIN_LENGTH_FIELD, 'Mật khẩu', MIN_LENGTH_PASSWORD)
  ),
  status: string(),
});

type Props = {};

function RegisterForm({}: Props) {
  const [_, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({ resolver: zodResolver(RegisterFormSchema) });

  const onSubmit = async (values: any) => {
    const user = await registerApi({
      fullName: values.lastName + ' ' + values.firstName,
      email: values.email,
      password: values.password,
      status: values.status,
    });

    if (user) {
      const saveUser = { ...user.user };
      delete saveUser.password;
      delete saveUser.email;
      navigate('/');
      setUser(saveUser);
      localStorage.setItem('token', user.jwt_token);
    }
  };

  const isError = (field: string) => !!errors[field];

  const getErrorMessage = (field: string): string =>
    errors[field] ? (errors[field]?.message as string) : '';

  return (
    <AuthBox>
      <Box>
        <Typography variant="h4">Đăng ký</Typography>
        <Typography variant="subtitle1" color="gray">
          Nhanh chóng và dễ dàng
        </Typography>
        <Divider sx={{ m: '14px 0' }} />

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Tên"
                fullWidth
                {...register('lastName')}
                error={isError('lastName')}
                helperText={getErrorMessage('lastName')}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Họ"
                fullWidth
                {...register('firstName')}
                error={isError('firstName')}
                helperText={getErrorMessage('firstName')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                fullWidth
                {...register('email')}
                error={isError('email')}
                helperText={getErrorMessage('email')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="password"
                label="Mật khẩu"
                fullWidth
                {...register('password')}
                error={isError('password')}
                helperText={getErrorMessage('password')}
              />
            </Grid>

            <Grid item xs={12}>
              <Select defaultValue="Single" {...register('status')}>
                {USER_STATUS.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {' '}
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" color="gray" fontSize={12}>
                Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính
                sách quyền riêng tư và Chính sách cookie của chúng tôi. Bạn có
                thể nhận được thông báo của chúng tôi qua SMS và hủy nhận bất kỳ
                lúc nào.
              </Typography>
            </Grid>

            <Grid item xs={12} textAlign="center">
              <Button
                variant="contained"
                type="submit"
                sx={{
                  bgcolor: '#42b72a',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  minWidth: '50%',
                }}
                size="large"
              >
                Đăng ký
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </AuthBox>
  );
}

export default RegisterForm;
