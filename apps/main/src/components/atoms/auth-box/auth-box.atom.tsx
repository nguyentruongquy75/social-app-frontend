import { Box, Card } from '@mui/material';
import React from 'react';

type Props = {
  children: JSX.Element | JSX.Element[] | string;
};

function AuthBox({ children }: Props) {
  return (
    <Card
      sx={{
        bgcolor: 'white',
        p: 2,
      }}
    >
      {children}
    </Card>
  );
}

export default AuthBox;
