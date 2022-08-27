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
import useSWR from 'swr';
import { fetcher } from 'apps/main/src/api/fetcher';
import { handleTimeString } from 'apps/main/src/utils/time';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { sendMessageApi } from 'apps/main/src/api';
import { useRecoilState } from 'recoil';
import { userState } from 'apps/main/src/stores';
import { seenMessageApi } from 'apps/main/src/api/chat/seen';
import { useDisplay, useIntersectionObserver } from 'apps/main/src/hooks';

type Props = {
  roomId: number;
  removeRoom: (id: number) => void;
};

type MessageProps = {
  content: string;
  createdAt: string;
  id: number;
  reaction: any[];
  seen: any[];
  seenUserId: number;
  updatedAt: string;
  userId: number;
  isDisplaySeen: boolean;
};

const DEFAULT_PAGE = 2;
const DEFAULT_SIZE = 10;

let page = DEFAULT_PAGE;

let size = 0;

let lastScroll: number = 0;

function MessageItem({ content, userId, isDisplaySeen = false }: MessageProps) {
  const [user, _] = useRecoilState(userState);
  const isAuthor = user.id === userId;

  return (
    <>
      <Grid
        container
        className={`message ${isAuthor ? 'author' : ''}`}
        spacing={1}
      >
        {!isAuthor && (
          <>
            <Grid item>
              <Box component="img" src={Avatar} className="message-avatar" />
            </Grid>

            <Grid item flex={1}>
              <Box className="message-content">
                <Typography className="message-text">{content}</Typography>
              </Box>
            </Grid>
          </>
        )}

        {isAuthor && (
          <Grid item flex={1} textAlign="right">
            <Box className="message-content">
              <Typography className="message-text">{content}</Typography>
            </Box>
          </Grid>
        )}

        <Grid item xs={1}>
          {isDisplaySeen && (
            <Box
              component="img"
              src={Avatar}
              className="message-avatar message-avatar-seen"
            />
          )}
        </Grid>
      </Grid>

      <style jsx global>
        {`
          .message {
            align-items: flex-end;
          }

          .message.author .message-content {
            background-color: #0084ff;
            color: white;
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
            max-width: 200px;
            text-align: left;
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

export function ChatRoomPopoverMolecule({ roomId, removeRoom }: Props) {
  const { isDisplay, open, close } = useDisplay(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const messageListRef = useRef<HTMLDivElement | null>(null);

  const entry = useIntersectionObserver(loadMoreRef, {});

  let isLoadMore = !!entry?.isIntersecting;

  const { data: room } = useSWR(
    isDisplay ? `chat/${roomId}/messages?size=10` : null,
    (url) => fetcher(url)
  );

  const { data: loadMore } = useSWR(
    `chat/${roomId}/messages?page=${page}&size=${size}`,
    (url) => fetcher(url)
  );

  const [user, _] = useRecoilState(userState);

  const [messageContent, setMessageContent] = useState('');

  const roomActive = room?.room.active;

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const lastSeenId = room?.items
    .slice()
    .reverse()
    .find((message: any) => {
      return message.seen.some((seenUser: any) => seenUser.id !== user.id);
    })?.id;

  const getActiveText = (active: string, lastActive: string) => {
    if (active) return 'Đang hoạt động';

    if (!lastActive) return '';

    const duration = handleTimeString(lastActive);

    return `Hoạt động ${duration} trước`;
  };

  const clearMessageContent = () => setMessageContent('');

  const messageContentChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setMessageContent(e.target.value);

  const sendMessage = async () => {
    clearMessageContent();
    await sendMessageApi({
      content: messageContent,
      chatRoomId: roomId,
      userId: user.id,
    });
  };

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.which === 13 && !e.shiftKey) {
      messageContent.trim() && sendMessage();
    }
  };

  const clickSendHandler = () => {
    if (messageContent.trim()) sendMessage();
  };

  const closeChatRoom = () => {
    close();
    removeRoom(roomId);
  };

  useEffect(() => {
    const seenMessages = async () => await seenMessageApi(roomId);

    if (isDisplay) seenMessages();
  }, [room]);

  useEffect(() => {
    if (isDisplay) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isDisplay, bottomRef.current, room?.items.length]);

  useEffect(() => {
    const node = messageListRef.current;
    const newScrollHeight = node?.scrollHeight ?? 0;

    if (newScrollHeight - lastScroll > 0 && node)
      node.scrollTop = newScrollHeight - lastScroll;

    lastScroll = newScrollHeight;
  }, [loadMore?.items.length]);

  useEffect(() => {
    if (size > 0 && loadMore?.items.length !== loadMore?.totalPages) return;

    if (isLoadMore) {
      size += DEFAULT_SIZE;
    }
  }, [isLoadMore]);

  return (
    <>
      {isDisplay && (
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
              title={room?.room.name}
              subtitle={getActiveText(room?.room.active, room?.room.lastActive)}
              imageDecorator={
                roomActive && <Box className="dot-active dot-user-active" />
              }
              imageDecoratorSize={14}
            />

            <Stack direction="row" alignItems="center" gap={0.5}>
              <IconButton className="chat-action-button">
                <Call className="chat-action-icon" color="primary" />
              </IconButton>

              <IconButton className="chat-action-button">
                <VideoCall className="chat-action-icon" color="primary" />
              </IconButton>

              <IconButton
                className="chat-action-button"
                onClick={closeChatRoom}
              >
                <Close className="chat-action-icon" color="primary" />
              </IconButton>
            </Stack>
          </Stack>

          <Stack gap={1} className="message-list" ref={messageListRef}>
            {room && <div id="load-more" ref={loadMoreRef}></div>}

            {size >= DEFAULT_SIZE &&
              loadMore?.items.map((message: any) => (
                <MessageItem
                  {...message}
                  isDisplaySeen={lastSeenId === message.id}
                  key={message.id}
                />
              ))}

            {room?.items.map((message: any) => (
              <MessageItem
                {...message}
                isDisplaySeen={lastSeenId === message.id}
                key={message.id}
              />
            ))}

            <div ref={bottomRef}></div>
          </Stack>

          <Stack direction="row" p={0.5} className="chat-bottom">
            <InputAtom
              placeholder="Aa"
              onChange={messageContentChangeHandler}
              onKeyUp={onKeyUp}
              value={messageContent}
            />
            <IconButton onClick={clickSendHandler}>
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
            width: 14px !important;
            height: 14px !important;
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
