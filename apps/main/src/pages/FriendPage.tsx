import { Group, PersonAdd } from '@mui/icons-material';
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSWR from 'swr';
import { fetcher } from '../api/fetcher';
import { IconButtonAtom } from '../components/atoms/icon-button/icon-button.atom';
import { FriendItemMolecule } from '../components/molecules';
import {
  FriendInvitationMolecule,
  FriendInvitationType,
} from '../components/molecules/friend-invitation/friend-invitation.molecule';
import { BaseLayout } from '../components/templates/layout/base.layout';
import {
  HEADER_HEIGHT,
  INVITATION_ENDPOINT,
  USER_ENDPOINT,
} from '../constants';
import { userState } from '../stores';

export const FRIEND_PAGE_TYPE = {
  FRIEND: 'friend',
  INVITATION: 'invitation',
};

type Props = {
  type: string;
};

export function FriendPage({ type }: Props) {
  return (
    <BaseLayout
      column={2}
      left={<Left type={type} />}
      leftBackground="white"
      main={<Main type={type} />}
    />
  );
}

function Left({ type }: { type: string }) {
  const navigate = useNavigate();

  const navigateToFriendPage = () => navigate('/friends');
  const navigateToInvitationsPage = () => navigate('/friends/invitations');

  return (
    <>
      <Paper elevation={1}>
        <Box className="friend-page__nav">
          <List>
            <ListItem
              className={`friend-page__nav-item ${
                type === FRIEND_PAGE_TYPE.FRIEND ? 'active' : ''
              }`}
              onClick={navigateToFriendPage}
            >
              <ListItemButton>
                <Stack direction="row" gap={1} alignItems="center">
                  <IconButtonAtom className="friend-page__nav-item-icon">
                    <Group />
                  </IconButtonAtom>
                  <Typography className="friend-page__nav-item-text">
                    Bạn bè
                  </Typography>
                </Stack>
              </ListItemButton>
            </ListItem>

            <ListItem
              className={`friend-page__nav-item ${
                type === FRIEND_PAGE_TYPE.INVITATION ? 'active' : ''
              }`}
              onClick={navigateToInvitationsPage}
            >
              <ListItemButton>
                <Stack direction="row" gap={1} alignItems="center">
                  <IconButtonAtom className="friend-page__nav-item-icon">
                    <PersonAdd />
                  </IconButtonAtom>
                  <Typography className="friend-page__nav-item-text">
                    Lời mời kết bạn
                  </Typography>
                </Stack>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Paper>

      <style jsx global>
        {`
          .friend-page__nav {
            background-color: white;
            height: calc(100vh - ${HEADER_HEIGHT}px);
          }
          .friend-page__nav-item {
            padding: 0 8px;
          }

          .friend-page__nav-item.active {
            background: #0000000a;
          }

          .friend-page__nav-item.active .friend-page__nav-item-icon {
            background: #1877f2;
            color: white;
          }

          .friend-page__nav-item-text {
            font-size: 17px;
            font-weight: 600;
          }
        `}
      </style>
    </>
  );
}

function Main({ type }: { type: string }) {
  const [user, _] = useRecoilState(userState);

  const { data: invitations } = useSWR(
    type === FRIEND_PAGE_TYPE.INVITATION
      ? INVITATION_ENDPOINT.BASE + `?user=${user.id}`
      : null,
    (url) => fetcher(url),
    {
      refreshInterval: 0,
    }
  );

  const { data: friends } = useSWR(
    type === FRIEND_PAGE_TYPE.FRIEND
      ? USER_ENDPOINT.BASE + USER_ENDPOINT.FRIENDS
      : null,
    (url) => fetcher(url),
    {
      refreshInterval: 0,
    }
  );

  return (
    <>
      <Box p="20px">
        <Typography className="friend-page__title">
          {type === FRIEND_PAGE_TYPE.FRIEND ? 'Bạn bè' : 'Lời mời kết bạn'}
        </Typography>

        <Grid container spacing={1}>
          {invitations?.items.map((item: any) => (
            <Grid item xs={3}>
              <FriendInvitationMolecule
                type={FriendInvitationType.VERTICAL}
                sender={item.sender}
                id={item.id}
              />
            </Grid>
          ))}

          {friends?.items.map((item: any) => (
            <Grid item xs={6}>
              <FriendItemMolecule {...item} />
            </Grid>
          ))}
        </Grid>
        {invitations?.items.length === 0 && (
          <Typography color="text.secondary" textAlign="center" py={1}>
            Không có lời mời nào
          </Typography>
        )}
      </Box>

      <style jsx global>{`
        .friend-page__title {
          font-size: 20px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
