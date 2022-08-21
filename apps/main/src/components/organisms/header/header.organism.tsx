import { Box, Grid, Paper, Stack } from '@mui/material';
import { Search, Chat, Notifications } from '@mui/icons-material';
import LogoS from 'apps/main/src/assets/images/logoS.png';
import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { IconButtonAtom } from '../../atoms/icon-button/icon-button.atom';
import { SearchButtonMolecule } from '../../molecules/search-button/search-button.molecule';
import { ContainerAtom, CommonNotificationPopoverAtom } from '../../atoms';
import { usePopover } from 'apps/main/src/hooks';
import { ChatPopoverMolecule, NotificationPopover } from '../../molecules';

type Props = {};

export function Header({}: Props) {
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
                <IconButtonAtom sx={{ p: 0 }}>
                  <Box component="img" src={LogoS} />
                </IconButtonAtom>

                <SearchButtonMolecule />
              </Stack>
            </Grid>

            <Grid item>
              <Stack direction="row" gap={1}>
                <IconButtonAtom tooltip="Tin nhắn" onClick={displayChatPopover}>
                  <Chat />
                </IconButtonAtom>

                <IconButtonAtom
                  tooltip="Thông báo"
                  onClick={displayNotificationPopover}
                >
                  <Notifications />
                </IconButtonAtom>

                <IconButtonAtom sx={{ p: 0 }} tooltip="Tài khoản">
                  <Box
                    component="img"
                    src={Avatar}
                    sx={{ borderRadius: '50%' }}
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
      />

      <ChatPopoverMolecule
        open={isDisplayChatPopover}
        anchorEl={chatAnchor}
        onClose={hideChatPopoover}
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
