import { Typography } from '@mui/material';

type Props = {
  children: JSX.Element | JSX.Element[] | string;
  sx?: any;
};

export function TitleAtom({ children, sx = {} }: Props) {
  return (
    <Typography
      sx={{
        color: '#65676B',
        fontWeight: 500,
        fontSize: 17,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}
