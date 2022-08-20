import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material';
import {
  CommonItemAtom,
  CommonNotificationPopoverAtom,
  InputAtom,
} from '../../atoms';

import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { useDisplay } from 'apps/main/src/hooks';
import { ChatRoomPopoverMolecule } from '../chat-room-popover/chat-room-popover.molecule';

type Props = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: any;
};

export function ChatPopoverMolecule({ anchorEl, open, onClose }: Props) {
  const {
    isDisplay: isDisplayChatRoomPopover,
    open: displayChatRoomPopover,
    close: hideChatRoomPopover,
  } = useDisplay();

  const ChatContent = () => (
    <Stack>
      <Typography className="chat__user">Nguyen Truong Quy</Typography>
      <Stack direction="row" gap={1}>
        <Typography className="chat__content">Ngày mai</Typography>
        <Typography className="chat__time">2 ngày trước</Typography>
      </Stack>
    </Stack>
  );
  return (
    <>
      <CommonNotificationPopoverAtom
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        title="Chat"
        start={
          <Box py={1}>
            <InputAtom placeholder="Tìm kiếm trên Chat" />
          </Box>
        }
      >
        <List>
          <ListItem disablePadding onClick={displayChatRoomPopover}>
            <ListItemButton>
              <CommonItemAtom
                image={Avatar}
                imageSize={56}
                roundedImage
                title="A"
                main={<ChatContent />}
                imageDecorator={<Box className="dot-active" />}
                imageDecoratorSize={18}
                dot
                className="chat__item unread"
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <CommonItemAtom
                image={Avatar}
                imageSize={56}
                roundedImage
                title="A"
                main={<ChatContent />}
                imageDecorator={<Box className="dot-active" />}
                imageDecoratorSize={18}
                dot
                className="chat__item unread"
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <CommonItemAtom
                image={Avatar}
                imageSize={56}
                roundedImage
                title="A"
                main={<ChatContent />}
                imageDecorator={<Box className="dot-active" />}
                imageDecoratorSize={18}
                dot
                className="chat__item unread"
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <CommonItemAtom
                image={Avatar}
                imageSize={56}
                roundedImage
                title="A"
                main={<ChatContent />}
                imageDecorator={<Box className="dot-active" />}
                imageDecoratorSize={18}
                dot
                className="chat__item unread"
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <CommonItemAtom
                image={Avatar}
                imageSize={56}
                roundedImage
                title="A"
                main={<ChatContent />}
                imageDecorator={<Box className="dot-active" />}
                imageDecoratorSize={18}
                dot
                className="chat__item unread"
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <CommonItemAtom
                image={Avatar}
                imageSize={56}
                roundedImage
                title="A"
                main={<ChatContent />}
                imageDecorator={<Box className="dot-active" />}
                imageDecoratorSize={18}
                dot
                className="chat__item unread"
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <CommonItemAtom
                image={Avatar}
                imageSize={56}
                roundedImage
                title="A"
                main={<ChatContent />}
                imageDecorator={<Box className="dot-active" />}
                imageDecoratorSize={18}
                dot
                className="chat__item unread"
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <CommonItemAtom
                image={Avatar}
                imageSize={56}
                roundedImage
                title="A"
                main={<ChatContent />}
                imageDecorator={<Box className="dot-active" />}
                imageDecoratorSize={18}
                dot
                className="chat__item unread"
              />
            </ListItemButton>
          </ListItem>
        </List>
      </CommonNotificationPopoverAtom>

      <Stack direction="row-reverse" className="list-chatroom">
        <ChatRoomPopoverMolecule
          open={isDisplayChatRoomPopover}
          onClose={hideChatRoomPopover}
        />

        {/* <ChatRoomPopoverMolecule
          open={isDisplayChatRoomPopover}
          onClose={hideChatRoomPopover}
        /> */}
      </Stack>

      <style jsx global>
        {`
          .chat__user {
            font-weight: 500;
          }

          .chat__content,
          .chat__time {
            font-size: 13px;
          }

          .chat__item {
            flex: 1;
          }

          .chat__item.unread .chat__content {
            color: #1876f2;
            font-weight: 600;
          }

          .dot-active {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background-color: #31a24c;
          }

          .list-chatroom {
            position: fixed;
            bottom: 0;
            right: 80px;
            z-index: 1000;
          }
        `}
      </style>
    </>
  );
}
