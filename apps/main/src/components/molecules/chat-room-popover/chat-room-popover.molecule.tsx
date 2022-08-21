import {
  Box,
  Grid,
  IconButton,
  Popover,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import { CommonItemAtom, IconButtonAtom, InputAtom } from '../../atoms';

import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { Call, Close, Send, VideoCall } from '@mui/icons-material';

type Props = {
  open: boolean;
  onClose: () => void;
};

function MessageItem() {
  return (
    <>
      <Grid container className="message" spacing={1}>
        <Grid item>
          <Box component="img" src={Avatar} className="message-avatar" />
        </Grid>

        <Grid item flex={1}>
          <Box className="message-content">
            <Typography className="message-text">Hello</Typography>
          </Box>
        </Grid>

        <Grid item xs={1}>
          <Box
            component="img"
            src={Avatar}
            className="message-avatar message-avatar-seen"
          />
        </Grid>
      </Grid>

      <style jsx global>
        {`
          .message {
            align-items: flex-end;
          }

          .message-avatar {
            border-radius: 50%;
            width: 28px;
            height: 28px;
          }

          .message-content {
            background-color: #e4e6eb;
            padding: 8px 12px;
            border-radius: 18px;
            display: inline-block;
          }

          .message-text {
            font-size: 15px;
          }

          .message-avatar-seen {
            width: 14px;
            height: 14px;
          }
        `}
      </style>
    </>
  );
}

export function ChatRoomPopoverMolecule({ open, onClose }: Props) {
  return (
    <>
      {open && (
        <Box className="chatroom-container">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            p={0.5}
            className="chatroom-top"
          >
            <CommonItemAtom
              image={Avatar}
              roundedImage
              imageSize={32}
              title="Bụt hiện lên và nói"
              subtitle="Đang hoạt động"
              imageDecorator={<Box className="dot-active dot-user-active" />}
              imageDecoratorSize={14}
            />

            <Stack direction="row" alignItems="center" gap={0.5}>
              <IconButton className="chat-action-button">
                <Call className="chat-action-icon" color="primary" />
              </IconButton>

              <IconButton className="chat-action-button">
                <VideoCall className="chat-action-icon" color="primary" />
              </IconButton>

              <IconButton className="chat-action-button" onClick={onClose}>
                <Close className="chat-action-icon" color="primary" />
              </IconButton>
            </Stack>
          </Stack>

          <Stack gap={1} className="message-list">
            <MessageItem />
            <MessageItem />
            <MessageItem />
            <MessageItem />
            <MessageItem />
            <MessageItem />
            <MessageItem />
            <MessageItem />
          </Stack>

          <Stack direction="row" p={0.5} className="chat-bottom">
            <InputAtom placeholder="Aa" />
            <IconButton>
              <Send color="primary" />
            </IconButton>
          </Stack>
        </Box>
      )}

      <style jsx global>
        {`
          .chatroom-container {
            position: relative;
            width: 338px;
            background-color: white;
            border-radius: 8px;
            padding: 60px 0 50px;
          }

          .chatroom-top {
            align-items: center;
            justify-content: space-between;
            paddinh: 4px;

            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            border-bottom: 1px solid #e4e6eb;
          }

          .chat-action-button {
            padding: 4px;
          }

          .chat-action-icon {
            font-size: 20px;
          }

          .dot-user-active {
            width: 14px;
            height: 14px;
            background-color: #31a24c;
          }

          .message-list {
            height: 320px;
            padding: 4px;
            overflow-y: scroll;
          }

          .chat-bottom {
            padding: 4px;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
          }
        `}
      </style>
    </>
  );
}
