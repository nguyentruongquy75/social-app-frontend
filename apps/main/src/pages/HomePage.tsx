import { Box, List, ListItem, ListItemButton } from '@mui/material';
import { CommonItemAtom, TitleAtom } from '../components/atoms';
import { BaseLayout } from '../components/templates/layout/base.layout';

import FriendIcon from 'apps/main/src/assets/images/friendIcon.png';
import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { PostCardOrganism } from '../components/organisms/post-card/post-card.organism';

type Props = {};

export function HomePage({}: Props) {
  return (
    <BaseLayout column={3} left={<Left />} right={<Right />} main={<Main />} />
  );
}

function Left() {
  const schema = [
    {
      link: 'profile',
      image: Avatar,
      title: 'Nguyễn Trường Quý',
    },
    {
      link: 'friends',
      image: FriendIcon,
      title: 'Bạn bè',
    },
  ];

  return (
    <List
      sx={{
        marginLeft: '-32px',
      }}
    >
      {schema.map((item) => (
        <ListItem key={item.link} sx={{ py: 0 }}>
          <ListItemButton>
            <CommonItemAtom
              title={item.title}
              image={item.image}
              link={item.link}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

function Right() {
  const schema = [
    {
      link: '',
      image: Avatar,
      title: 'Nguyễn Trường Quý',
    },
    {
      link: '',
      image: Avatar,
      title: 'Nguyễn Trường Quý',
    },
    {
      link: '',
      image: Avatar,
      title: 'Nguyễn Trường Quý',
    },
  ];

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
        {schema.map((item) => (
          <ListItem key={item.link} sx={{ py: 0 }}>
            <ListItemButton>
              <CommonItemAtom
                title={item.title}
                image={item.image}
                link={item.link}
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
  return (
    <Box
      py={2}
      sx={{
        width: 500,
        maxWidth: '100%',
        margin: '0 auto',
      }}
    >
      <PostCardOrganism />
    </Box>
  );
}
