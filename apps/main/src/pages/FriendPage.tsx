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
import { IconButtonAtom } from '../components/atoms/icon-button/icon-button.atom';
import {
  FriendInvitationMolecule,
  FriendInvitationType,
} from '../components/molecules/friend-invitation/friend-invitation.molecule';
import { BaseLayout } from '../components/templates/layout/base.layout';
import { HEADER_HEIGHT } from '../constants';

export function FriendPage() {
  return (
    <BaseLayout
      column={2}
      left={<Left />}
      leftBackground="white"
      main={<Main />}
    />
  );
}

function Left() {
  return (
    <>
      <Paper elevation={1}>
        <Box className="friend-page__nav">
          <List>
            <ListItem className="friend-page__nav-item">
              <ListItemButton>
                <Stack direction="row" gap={1} alignItems="center">
                  <IconButtonAtom>
                    <Group />
                  </IconButtonAtom>
                  <Typography className="friend-page__nav-item-text">
                    Bạn bè
                  </Typography>
                </Stack>
              </ListItemButton>
            </ListItem>

            <ListItem className="friend-page__nav-item">
              <ListItemButton>
                <Stack direction="row" gap={1} alignItems="center">
                  <IconButtonAtom>
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

          .friend-page__nav-item-text {
            font-size: 17px;
            font-weight: 600;
          }
        `}
      </style>
    </>
  );
}

function Main() {
  return (
    <>
      <Box p="20px">
        <Typography className="friend-page__title">Lời mời kết bạn</Typography>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <FriendInvitationMolecule type={FriendInvitationType.HORIZONTAL} />
          </Grid>

          <Grid item xs={6}>
            <FriendInvitationMolecule type={FriendInvitationType.HORIZONTAL} />
          </Grid>
        </Grid>
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
