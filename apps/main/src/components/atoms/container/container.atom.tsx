import { Container } from '@mui/material';
import React from 'react';

type Props = {
  children?: JSX.Element | JSX.Element[] | string;
  sx?: any;
  disablePadding?: boolean;
};

export function ContainerAtom({ children, sx, disablePadding }: Props) {
  return (
    <Container sx={sx} maxWidth={false} disableGutters={disablePadding}>
      {children}
    </Container>
  );
}
