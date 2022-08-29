import { Box, Grid, Input, Stack, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { ContainerAtom, ButtonAtom } from '../components/atoms';
import { BaseLayout } from '../components/templates/layout/base.layout';

import Avatar from 'apps/main/src/assets/images/large-avatar.png';
import { PostCreateOrganism } from '../components/organisms/post-create/post-create.organism';
import { PostCardOrganism } from '../components/organisms';
import { ProfileBioMolecule } from '../components/molecules';
import { useDisplay } from '../hooks';
import { EditProfileMolecule } from '../components/molecules/edit-profile-dialog/edit-profile-dialog.molecule';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { USER_ENDPOINT } from '../constants';
import { fetcher } from '../api/fetcher';
import { useRecoilState } from 'recoil';
import { userState } from '../stores';

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

  const { id } = useParams();

  const [localUser, _] = useRecoilState(userState);

  const { data: user } = useSWR(
    USER_ENDPOINT.BASE + USER_ENDPOINT.SEARCH + `/${id ? id : localUser.id}`,
    (url) => fetcher(url)
  );

  const { data: posts } = useSWR(
    USER_ENDPOINT.BASE + USER_ENDPOINT.POST,
    (url) => fetcher(url)
  );

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
              <Box
                component="img"
                src={user?.avatarImage ?? Avatar}
                className="avatar-image"
              />
              <Typography className="user-name">{user?.fullName}</Typography>
              {user?.id === localUser.id && (
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
              )}
            </Stack>
          </Box>
        </Box>

        <Box p={{ xs: 2, sm: '16px 0' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <Box className="profile__left">
                <Typography className="profile__title">Giới thiệu</Typography>
                <ProfileBioMolecule content={user?.bio} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={7}>
              {user?.id === localUser.id && <PostCreateOrganism />}

              <Stack className="post-list">
                {posts?.items.map((post: any) => (
                  <PostCardOrganism {...post} key={post.id} />
                ))}

                {posts?.items.length === 0 && (
                  <Typography textAlign="center" py={1} color="text.secondary">
                    Chưa có bài viết nào
                  </Typography>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </ContainerAtom>

      <EditProfileMolecule
        open={isDisplayEditProfile}
        onClose={hideEditProfile}
        avatarImage={user?.avatarImage}
        coverImage={user?.coverImage}
        bio={user?.bio}
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
            background: ${user?.coverImage
              ? `url(${user?.coverImage})`
              : '#f0f2f5'};
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
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
