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
import { useDisplay } from 'apps/main/src/hooks';
import { ChatRoomPopoverMolecule } from '../chat-room-popover/chat-room-popover.molecule';
import useSWR from 'swr';
import { CHAT_ENDPOINT, EVENTS } from 'apps/main/src/constants';
import { fetcher } from 'apps/main/src/api/fetcher';
import { ChangeEvent, useEffect, useState } from 'react';
import { KeyboardBackspace } from '@mui/icons-material';
import { getChatRoomApi, getUserSearchApi } from 'apps/main/src/api';
import { useRecoilState } from 'recoil';
import { userState } from 'apps/main/src/stores';
import { handleTimeString } from 'apps/main/src/utils/time';

type Props = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: any;
  chatrooms: any;
};

export function ChatPopoverMolecule({
  anchorEl,
  open,
  onClose,
  chatrooms,
}: Props) {
  const [user, _] = useRecoilState(userState);

  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [displayedChatrooms, setDisplayedChatrooms] = useState<number[]>([]);

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

  const addRoom = (id: number) => {
    if (displayedChatrooms.includes(id)) return;

    if (displayedChatrooms.length >= 2) {
      setDisplayedChatrooms([...displayedChatrooms, id].slice(1));
      return;
    }

    setDisplayedChatrooms([...displayedChatrooms, id]);
    return;
  };

  const removeRoom = (id: number) => {
    setDisplayedChatrooms(displayedChatrooms.filter((room) => room !== id));
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

    return () => {
      PubSub.unsubscribe(EVENTS.ADD_ROOM);
    };
  }, []);

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
        {displayedChatrooms.map((room) => (
          <ChatRoomPopoverMolecule
            key={room}
            roomId={room}
            removeRoom={removeRoom}
          />
        ))}
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
