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
import useSWR from 'swr';
import {
  NOTIFICATION_ENDPOINT,
  NOTIFICATION_TYPE,
} from 'apps/main/src/constants';
import { fetcher } from 'apps/main/src/api/fetcher';
import { handleTimeString } from 'apps/main/src/utils/time';
import { getReactionImage } from 'apps/main/src/utils/reactions';
import { useEffect } from 'react';
import { readNotificationApi } from 'apps/main/src/api';
import { useRecoilState } from 'recoil';
import { userState } from 'apps/main/src/stores';

type Props = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: any;
  notifications: any;
};

export function NotificationPopover({
  anchorEl,
  open,
  onClose,
  notifications,
}: Props) {
  const [user, _] = useRecoilState(userState);

  const NotificationContent = ({
    content,
    time,
  }: {
    content: string;
    time: string;
  }) => (
    <Stack>
      <Typography className="notification__content">{content}</Typography>
      <Typography className="notification__time">
        {handleTimeString(time)}
      </Typography>
    </Stack>
  );

  const getImageDecorator = (type: string, reactionType: string) => {
    return NOTIFICATION_TYPE.COMMENT === type ? (
      <IconButton
        sx={{
          backgroundColor: '#6ae689',
        }}
      >
        <ChatBubbleRounded sx={{ color: 'white', fontSize: 16 }} />
      </IconButton>
    ) : (
      getReactionImage(reactionType)
    );
  };

  const getUserAvatar = (type: string, notification: any) => {
    if (type === NOTIFICATION_TYPE.REACTION) {
      return notification.reaction.user.avatarImage ?? Avatar;
    }

    return notification.comment?.user.avatarImage ?? Avatar;
  };

  useEffect(() => {
    const readAllNotifications = async () => await readNotificationApi(user.id);

    if (open) {
      readAllNotifications();
    }
  }, [open]);

  return (
    <>
      <CommonNotificationPopoverAtom
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        title="Thông báo"
      >
        <List>
          {notifications?.items.map((item: any) => (
            <ListItem disablePadding>
              <ListItemButton>
                <CommonItemAtom
                  image={getUserAvatar(item.type, item)}
                  imageSize={56}
                  roundedImage
                  main={
                    <NotificationContent
                      content={item.title}
                      time={item.updatedAt}
                    />
                  }
                  imageDecorator={getImageDecorator(
                    item.type,
                    item.reaction?.type
                  )}
                  imageDecoratorSize={28}
                  dot={!item.isRead}
                  className={`notification__item ${
                    !item.isRead ? 'unread' : ''
                  }`}
                />
              </ListItemButton>
            </ListItem>
          ))}

          {notifications?.items.length === 0 && (
            <Typography textAlign="center">Chưa có thông báo nào</Typography>
          )}
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
