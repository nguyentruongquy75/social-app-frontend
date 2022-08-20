import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Popover,
  Stack,
  Typography,
} from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  anchorOrigin?: any;
  transformOrigin?: any;
  title: string;
  children: JSX.Element | JSX.Element[] | string;
  start?: JSX.Element;
  end?: JSX.Element;
};

export function CommonNotificationPopoverAtom({
  open,
  onClose,
  anchorEl,
  anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
  transformOrigin = { vertical: 'top', horizontal: 'center' },
  title,
  children,
  start,
  end,
}: Props) {
  return (
    <>
      <Popover
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        PaperProps={{
          sx: {
            width: 360,
            maxWidth: '100%',
            p: 2,
            maxHeight: 500,
          },
        }}
        disableScrollLock
      >
        <Typography className="notification-popover__heading ">
          {title}
        </Typography>
        {start}
        {children}
        {end}
      </Popover>

      <style jsx global>
        {`
          .notification-popover__heading {
            font-size: 24px;
            font-weight: 700;
          }
        `}
      </style>
    </>
  );
}
