import { CommonNotificationPopoverAtom } from '../../atoms';
import { CommonItemAtom } from '../../atoms';

import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { ChatBubbleRounded } from '@mui/icons-material';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material';

type Props = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: any;
};

export function NotificationPopover({ anchorEl, open, onClose }: Props) {
  const NotificationContent = () => (
    <Stack>
      <Typography className="notification__content">
        A đã nhắc đến bạn trong một bình luận.
      </Typography>
      <Typography className="notification__time">2 ngày trước</Typography>
    </Stack>
  );
  return (
    <>
      <CommonNotificationPopoverAtom
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        title="Thông báo"
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <CommonItemAtom
                image={Avatar}
                imageSize={56}
                roundedImage
                title="A"
                main={<NotificationContent />}
                imageDecorator={
                  <IconButton
                    sx={{
                      backgroundColor: '#6ae689',
                    }}
                  >
                    <ChatBubbleRounded sx={{ color: 'white', fontSize: 16 }} />
                  </IconButton>
                }
                imageDecoratorSize={28}
                dot
                className="notification__item"
              />
            </ListItemButton>
          </ListItem>
        </List>
      </CommonNotificationPopoverAtom>

      <style jsx global>
        {`
          .notification__content {
            font-size: 15px;
          }

          .notification__time {
            font-size: 13px;
          }

          .notification__item.unread .notification__time {
            color: #1876f2;
          }
        `}
      </style>
    </>
  );
}
