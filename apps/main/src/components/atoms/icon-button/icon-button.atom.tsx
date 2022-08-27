import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: JSX.Element | string;
  tooltip?: string;
  sx?: any;
  onClick?: any;
  className?: string;
  to?: string;
};

export const IconButtonAtom = React.forwardRef(
  ({ children, tooltip, sx = {}, onClick, className, to }: Props, ref: any) => {
    const navigate = useNavigate();

    const onClickHandler = (e: any) => {
      to && navigate(to);
      onClick && onClick(e);
    };

    return (
      <Tooltip title={tooltip ? tooltip : ''}>
        <IconButton
          sx={{
            ...sx,
            backgroundColor: '#E4E6EB',
            color: '#050505',
          }}
          className={className}
          onClick={onClickHandler}
          ref={ref}
        >
          {children}
        </IconButton>
      </Tooltip>
    );
  }
);
