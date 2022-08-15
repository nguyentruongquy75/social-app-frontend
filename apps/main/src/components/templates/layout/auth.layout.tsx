import { Container, Grid, Box, Typography } from '@mui/material';
import Logo from 'apps/main/src/assets/images/logo.png';

type Props = {
  children?: JSX.Element | JSX.Element[] | string;
};

export function AuthLayout({ children }: Props) {
  return (
    <Container>
      <Box>
        <Grid
          container
          sx={{
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            height: {
              xs: '100%',
              sm: '100vh',
            },
          }}
          alignItems="center"
          justifyContent="space-between"
          spacing={4}
        >
          <Grid
            item
            xs={0}
            sm={6}
            sx={{
              textAlign: {
                xs: 'center',
                sm: 'left',
              },
            }}
          >
            <Box
              component="img"
              src={Logo}
              sx={{
                maxWidth: 120,
              }}
            />
            <Typography variant="h5">
              IShare giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
              của bạn
            </Typography>
          </Grid>

          <Grid item xs={0} sm={4}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
