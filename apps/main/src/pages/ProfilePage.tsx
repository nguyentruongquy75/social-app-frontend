import { Box, Grid, Input, Stack, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { ContainerAtom, ButtonAtom } from '../components/atoms';
import { BaseLayout } from '../components/templates/layout/base.layout';

import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { PostCreateOrganism } from '../components/organisms/post-create/post-create.organism';
import { PostCardOrganism } from '../components/organisms';
import { ProfileBioMolecule } from '../components/molecules';
import { useDisplay } from '../hooks';
import { EditProfileMolecule } from '../components/molecules/edit-profile-dialog/edit-profile-dialog.molecule';

export function ProfilePage() {
  return (
    <>
      <BaseLayout column={1} main={<Main />} />
    </>
  );
}

function Main() {
  const {
    isDisplay: isDisplayEditProfile,
    open: displayEditProfile,
    close: hideEditProfile,
  } = useDisplay();

  return (
    <>
      <ContainerAtom
        disablePadding
        sx={{
          maxWidth: {
            sm: 'md',
          },
        }}
      >
        <Box className="profile-top">
          <Box className="cover-image" />
          <Box p={2}>
            <Stack direction={{ sm: 'row' }} alignItems="center" gap={2}>
              <Box component="img" src={Avatar} className="avatar-image" />
              <Typography className="user-name">Nguyen Truong Quy</Typography>
              <ButtonAtom
                sx={{
                  ml: {
                    xs: 0,
                    sm: 'auto',
                  },
                }}
                onClick={displayEditProfile}
              >
                <Edit />
                <Typography>Chỉnh sửa trang cá nhân</Typography>
              </ButtonAtom>
            </Stack>
          </Box>
        </Box>

        <Box p={{ xs: 2, sm: '16px 0' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <Box className="profile__left">
                <Typography className="profile__title">Giới thiệu</Typography>
                <ProfileBioMolecule />
              </Box>
            </Grid>
            <Grid item xs={12} sm={7}>
              <PostCreateOrganism />

              <Stack className="post-list">{/* <PostCardOrganism /> */}</Stack>
            </Grid>
          </Grid>
        </Box>
      </ContainerAtom>

      <EditProfileMolecule
        open={isDisplayEditProfile}
        onClose={hideEditProfile}
      />

      <style jsx global>
        {`
          .profile-top {
            background: white;
          }

          .user-name {
            font-size: 32px;
            font-weight: 700;
          }

          .cover-image {
            padding-top: 37.5%;
            background: #f0f2f5;
          }

          .avatar-image {
            width: 169px;
            height: 168px;
            border-radius: 50%;
          }

          .profile__title {
            font-size: 20px;
            font-weight: 600;
          }

          .profile__left {
            padding: 16px;
            background: white;
            border-radius: 8px;
          }

          .post-list {
            margin-top: 16px;
          }
        `}
      </style>
    </>
  );
}
