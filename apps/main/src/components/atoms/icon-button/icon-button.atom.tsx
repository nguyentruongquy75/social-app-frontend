import { IconButton, Tooltip } from '@mui/material';
import React from 'react';

type Props = {
  children: JSX.Element | string;
  tooltip?: string;
  sx?: any;
  onClick?: any;
  className?: string;
};

export const IconButtonAtom = React.forwardRef(
  ({ children, tooltip, sx = {}, onClick, className }: Props, ref: any) => {
    return (
      <Tooltip title={tooltip ? tooltip : ''}>
        <IconButton
          sx={{
            ...sx,
            backgroundColor: '#E4E6EB',
            color: '#050505',
          }}
          className={className}
          onClick={onClick}
          ref={ref}
        >
          {children}
        </IconButton>
      </Tooltip>
    );
  }
);
