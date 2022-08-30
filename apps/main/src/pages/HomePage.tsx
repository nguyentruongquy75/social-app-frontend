import {
  Box,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material';
import PubSub from 'pubsub-js';

import { CommonItemAtom, TitleAtom } from '../components/atoms';
import { BaseLayout } from '../components/templates/layout/base.layout';

import FriendIcon from 'apps/main/src/assets/images/friendIcon.png';
import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { PostCardOrganism } from '../components/organisms/post-card/post-card.organism';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks';
import { PostCreateOrganism } from '../components/organisms';
import useSWR from 'swr';
import { EVENTS, USER_ENDPOINT } from '../constants';
import { fetcher } from '../api/fetcher';
import { useRecoilState } from 'recoil';
import { userState } from '../stores';
import { ProtectRoute } from '../app/ProtectRoute';

type Props = {};

export function HomePage({}: Props) {
  return (
    <ProtectRoute>
      <BaseLayout
        column={3}
        left={<Left />}
        right={<Right />}
        main={<Main />}
      />
    </ProtectRoute>
  );
}

function Left() {
  const [user, _] = useRecoilState(userState);
  const navigate = useNavigate();
  const schema = [
    {
      link: 'profile',
      image: user.avatarImage ?? Avatar,
      title: user.fullName,
      roundImage: true,
    },
    {
      link: 'friends',
      image: FriendIcon,
      title: 'Bạn bè',
    },
  ];

  const redirectTo = (link: string) => navigate(link);

  return (
    <List>
      {schema.map((item) => (
        <ListItem
          onClick={() => redirectTo(item.link)}
          key={item.link}
          sx={{ py: 0 }}
        >
          <ListItemButton>
            <CommonItemAtom
              title={item.title}
              image={item.image}
              roundedImage={item.roundImage}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

function Right() {
  const [user, _] = useRecoilState(userState);
  const { data: contacts } = useSWR(
    USER_ENDPOINT.BASE + USER_ENDPOINT.CONTACTS,
    (url) => fetcher(url)
  );

  const addRoom = (participants: number[]) => {
    PubSub.publish(EVENTS.ADD_ROOM, participants);
  };

  return (
    <Box pt={2}>
      <TitleAtom
        sx={{
          marginLeft: '32px',
        }}
      >
        Người liên hệ
      </TitleAtom>
      <List>
        {contacts?.items.map((item: any) => (
          <ListItem key={item.link} sx={{ py: 0 }}>
            <ListItemButton onClick={() => addRoom([user.id, item.id])}>
              <CommonItemAtom
                title={item.fullName}
                image={item.avatarImage ?? Avatar}
                imageDecorator={
                  <Box className="dot-active" style={{ width: 7, height: 7 }} />
                }
                imageDecoratorSize={7}
                roundedImage
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

function Main() {
  const { data: newsfeed } = useSWR(
    USER_ENDPOINT.BASE + USER_ENDPOINT.NEWSFEED,
    (url) => fetcher(url)
  );

  return (
    <Box
      py={2}
      sx={{
        width: 500,
        maxWidth: '100%',
        margin: '0 auto',
      }}
    >
      <PostCreateOrganism />
      <Stack
        gap={1}
        mt={1}
        px={{
          xs: 1,
          sm: 0,
        }}
      >
        {newsfeed?.items.map((post: any) => (
          <PostCardOrganism {...post} />
        ))}

        {newsfeed?.items.length === 0 && (
          <Typography textAlign="center" color="gray">
            Chưa có bài viết nào
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
