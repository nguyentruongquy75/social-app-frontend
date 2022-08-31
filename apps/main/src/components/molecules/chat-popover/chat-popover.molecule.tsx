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
import PubSub from 'pubsub-js';

import {
  CommonItemAtom,
  CommonNotificationPopoverAtom,
  IconButtonAtom,
  InputAtom,
} from '../../atoms';

import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { useDisplay, useSocket } from 'apps/main/src/hooks';
import { ChatRoomPopoverMolecule } from '../chat-room-popover/chat-room-popover.molecule';
import useSWR from 'swr';
import { CHAT_ENDPOINT, EVENTS } from 'apps/main/src/constants';
import { fetcher } from 'apps/main/src/api/fetcher';
import { ChangeEvent, useEffect, useState } from 'react';
import { KeyboardBackspace } from '@mui/icons-material';
import {
  getChatRoomApi,
  getUserSearchApi,
  readRoomsApi,
} from 'apps/main/src/api';
import { useRecoilState } from 'recoil';
import { userState } from 'apps/main/src/stores';
import { handleTimeString } from 'apps/main/src/utils/time';
import { ChatVoiceMolecule } from '../chat-voice-popover/chat-voice-popover.molecule';

type Props = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: any;
  chatrooms: any;
};

export enum RoomTypes {
  VOICE_CHAT = 'voice_chat',
  VIDEO_CALL = 'video_call',
  MESSAGE = 'message',
}

type DisplayedRoomType = {
  id: number;
  type: RoomTypes;
  userId?: number;
};

export function ChatPopoverMolecule({
  anchorEl,
  open,
  onClose,
  chatrooms,
}: Props) {
  const [user, _] = useRecoilState(userState);
  const socket = useSocket();

  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [displayedChatrooms, setDisplayedChatrooms] = useState<
    DisplayedRoomType[]
  >([]);

  const ChatContent = ({
    name,
    content,
    time,
  }: {
    name: string;
    content: string;
    time: string;
  }) => (
    <Stack>
      <Typography className="chat__user">{name}</Typography>
      <Stack direction="row" gap={1}>
        <Typography className="chat__content">{content}</Typography>
        <Typography className="chat__time">{time}</Typography>
      </Stack>
    </Stack>
  );

  const startSearch = () => setIsSearching(true);
  const cancelSearch = () => {
    setSearchText('');
    setIsSearching(false);
  };

  const searchInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const addRoom = (id: number, type = RoomTypes.MESSAGE, userId = null) => {
    const existedRoom = displayedChatrooms.find(
      (room) => room.id === id && room.type === type
    );

    if (existedRoom) return;

    const room: any = {
      id,
      type,
    };
    if (userId) room.userId = userId;

    if (displayedChatrooms.length >= 2) {
      setDisplayedChatrooms([...displayedChatrooms, room].slice(1));
      return;
    }

    setDisplayedChatrooms([...displayedChatrooms, room]);
    return;
  };

  const removeRoom = (id: number, type = RoomTypes.MESSAGE) => {
    setDisplayedChatrooms(
      displayedChatrooms.filter((room) => room.id !== id && room.type !== type)
    );
  };

  const getChatRoom = async (participants: number[] | null, id?: number) => {
    const room = await getChatRoomApi(participants, id);

    addRoom(room.id);
    onClose();
  };

  useEffect(() => {
    const getSearchResult = async () => {
      const searchResult = await getUserSearchApi(searchText);

      setSearchResult(searchResult);
    };

    let timeId: NodeJS.Timeout;

    if (searchText) {
      timeId = setTimeout(getSearchResult, 400);
    }

    return () => {
      clearTimeout(timeId);
    };
  }, [searchText]);

  useEffect(() => {
    PubSub.subscribe(EVENTS.ADD_ROOM, (message, participants) => {
      getChatRoom(participants);
    });

    PubSub.subscribe(EVENTS.REMOVE_ROOM, (message, data) => {
      removeRoom(data.id, data.type);
    });

    PubSub.subscribe(EVENTS.RTC_CALL_ADD_ROOM, (message, data) => {
      addRoom(data.id, data.type, data.userId);
    });

    socket.on(user.id + EVENTS.VOICE_CHAT, ({ data }) =>
      addRoom(data.roomId, RoomTypes.VOICE_CHAT, data.userId)
    );

    socket.on(user.id + EVENTS.VIDEO_CALL, ({ data }) =>
      addRoom(data.roomId, RoomTypes.VIDEO_CALL, data.userId)
    );

    return () => {
      PubSub.unsubscribe(EVENTS.ADD_ROOM);
      PubSub.unsubscribe(EVENTS.RTC_CALL_ADD_ROOM);

      socket.off(user.id + EVENTS.VIDEO_CALL);
      socket.off(user.id + EVENTS.VOICE_CHAT);
    };
  }, []);

  // read rooms
  useEffect(() => {
    const readChatRooms = async () => {
      await readRoomsApi();
    };

    readChatRooms();
  }, []);

  // display room popup
  useEffect(() => {
    if (chatrooms) {
      const unreadRoom = chatrooms.items.filter(
        (room: any) => !room.isRead && room.lastMessage.userId !== user.id
      );

      unreadRoom.forEach((room: any) => addRoom(room.id));

      console.log(unreadRoom);
    }
  }, [chatrooms]);

  return (
    <>
      <CommonNotificationPopoverAtom
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        title="Chat"
        start={
          <Box py={1}>
            <Stack direction="row" gap={0.5}>
              {isSearching && (
                <IconButton onClick={cancelSearch}>
                  <KeyboardBackspace />
                </IconButton>
              )}

              <InputAtom
                placeholder="Tìm kiếm trên Chat"
                onClick={startSearch}
                onChange={searchInputChangeHandler}
                value={searchText}
              />
            </Stack>
          </Box>
        }
      >
        <List>
          {!isSearching &&
            chatrooms?.items.map((room: any) => {
              const isUnread =
                room.lastMessage.userId !== user.id &&
                room.lastMessage.seen.length === 1;

              return (
                <ListItem
                  disablePadding
                  onClick={() => getChatRoom(null, room.id)}
                >
                  <ListItemButton>
                    <CommonItemAtom
                      image={room.image ?? Avatar}
                      imageSize={56}
                      roundedImage
                      main={
                        <ChatContent
                          name={room.name}
                          content={
                            (user.id === room.lastMessage.userId
                              ? 'Bạn: '
                              : '') + room.lastMessage?.content
                          }
                          time={handleTimeString(room.lastMessage?.createdAt)}
                        />
                      }
                      imageDecorator={
                        room.active && <Box className="dot-active" />
                      }
                      imageDecoratorSize={18}
                      dot={isUnread}
                      className={`chat__item ${isUnread ? 'unread' : ''}`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}

          {!isSearching && chatrooms?.items.length === 0 && (
            <Typography textAlign="center">
              Bạn chưa có cuộc trò chuyện nào
            </Typography>
          )}

          {isSearching &&
            searchResult?.friends.items.map((item: any) => (
              <ListItem
                disablePadding
                onClick={() => getChatRoom([user.id, item.id])}
              >
                <ListItemButton>
                  <CommonItemAtom
                    image={item.avatarImage ?? Avatar}
                    imageSize={36}
                    roundedImage
                    title={item.fullName}
                  />
                </ListItemButton>
              </ListItem>
            ))}

          {isSearching &&
            searchResult?.users.items.map((item: any) => (
              <ListItem
                disablePadding
                onClick={() => getChatRoom([user.id, item.id])}
              >
                <ListItemButton>
                  <CommonItemAtom
                    image={item.avatarImage ?? Avatar}
                    imageSize={36}
                    roundedImage
                    title={item.fullName}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </CommonNotificationPopoverAtom>

      <Stack direction="row-reverse" className="list-chatroom">
        {displayedChatrooms.map((room) => {
          if (room.type === RoomTypes.MESSAGE)
            return (
              <ChatRoomPopoverMolecule
                key={room.id}
                roomId={room.id}
                removeRoom={removeRoom}
              />
            );
          return (
            <ChatVoiceMolecule
              type={room.type}
              key={room.id}
              roomId={room.id}
              userCall={room.userId}
            />
          );
        })}
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
            gap: 8px;
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
          }
        `}
      </style>
    </>
  );
}
