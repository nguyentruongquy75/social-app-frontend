import { Badge, Box, Grid, Paper, Stack } from '@mui/material';
import { Search, Chat, Notifications } from '@mui/icons-material';
import LogoS from 'apps/main/src/assets/images/logoS.png';
import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { IconButtonAtom } from '../../atoms/icon-button/icon-button.atom';
import { SearchButtonMolecule } from '../../molecules/search-button/search-button.molecule';
import { ContainerAtom, CommonNotificationPopoverAtom } from '../../atoms';
import { usePopover } from 'apps/main/src/hooks';
import { ChatPopoverMolecule, NotificationPopover } from '../../molecules';
import useSWR from 'swr';
import { CHAT_ENDPOINT, NOTIFICATION_ENDPOINT } from 'apps/main/src/constants';
import { fetcher } from 'apps/main/src/api/fetcher';

import red from '@mui/material/colors/red';
import { useRecoilState } from 'recoil';
import { userState } from 'apps/main/src/stores';

type Props = {};

export function Header({}: Props) {
  const [user] = useRecoilState(userState);

  const {
    isDisplay: isDisplayNotificationPopover,
    open: displayNotificationPopover,
    close: hideNotificationPopoover,
    anchorEl: notificationAnchor,
  } = usePopover();

  const {
    isDisplay: isDisplayChatPopover,
    open: displayChatPopover,
    close: hideChatPopoover,
    anchorEl: chatAnchor,
  } = usePopover();

  const { data: notifications } = useSWR(NOTIFICATION_ENDPOINT.GET, (url) =>
    fetcher(url)
  );

  const { data: chatrooms } = useSWR(CHAT_ENDPOINT.BASE, (url) => fetcher(url));

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'white',
          p: '8px 0',
        }}
        className="header"
        component={Paper}
        elevation={1}
      >
        <ContainerAtom>
          <Grid container justifyContent="space-between">
            <Grid item xs={6}>
              <Stack direction="row" gap={1}>
                <IconButtonAtom sx={{ p: 0 }} to="/">
                  <Box component="img" src={LogoS} />
                </IconButtonAtom>

                <SearchButtonMolecule />
              </Stack>
            </Grid>

            <Grid item>
              <Stack direction="row" gap={1}>
                <Badge badgeContent={chatrooms?.unreadCount} color="primary">
                  <IconButtonAtom
                    tooltip="Tin nh???n"
                    onClick={displayChatPopover}
                  >
                    <Chat />
                  </IconButtonAtom>
                </Badge>

                <Badge
                  badgeContent={notifications?.unreadNotificationCount}
                  color="primary"
                >
                  <IconButtonAtom
                    tooltip="Th??ng b??o"
                    onClick={displayNotificationPopover}
                  >
                    <Notifications />
                  </IconButtonAtom>
                </Badge>

                <IconButtonAtom sx={{ p: 0 }} tooltip="T??i kho???n" to="/profile">
                  <Box
                    component="img"
                    src={user?.avatarImage ?? Avatar}
                    sx={{ borderRadius: '50%', width: 40, height: 40 }}
                  />
                </IconButtonAtom>
              </Stack>
            </Grid>
          </Grid>
        </ContainerAtom>
      </Box>

      <NotificationPopover
        open={isDisplayNotificationPopover}
        anchorEl={notificationAnchor}
        onClose={hideNotificationPopoover}
        notifications={notifications}
      />

      <ChatPopoverMolecule
        open={isDisplayChatPopover}
        anchorEl={chatAnchor}
        onClose={hideChatPopoover}
        chatrooms={chatrooms}
      />

      <style jsx global>
        {`
          .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
          }
        `}
      </style>
    </>
  );
}
