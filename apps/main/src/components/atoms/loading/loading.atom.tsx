import { Box, CircularProgress } from '@mui/material';

type Props = {
  circular?: boolean;
  children?: JSX.Element | JSX.Element[] | string;
};

export function LoadingAtom({ circular, children }: Props) {
  return (
    <Box className="loading">
      {circular && <CircularProgress />}
      {children}
    </Box>
  );
}
