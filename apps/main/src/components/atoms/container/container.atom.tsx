import { Container } from '@mui/material';
import React from 'react';

type Props = {
  children?: JSX.Element | JSX.Element[] | string;
  sx?: any;
};

export function ContainerAtom({ children, sx }: Props) {
  return (
    <Container sx={sx} maxWidth={false}>
      {children}
    </Container>
  );
}
