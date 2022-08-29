import { Close } from '@mui/icons-material';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { IconButtonAtom } from '../../atoms';

import Avatar from 'apps/main/src/assets/images/large-avatar.png';
import { ProfileBioMolecule } from '../profile-bio/profile-bio.molecule';
import { ConfirmDialogMolecule } from '../confirm-dialog/confirm-dialog';
import { ChangeEvent, useState } from 'react';
import { useDisplay } from 'apps/main/src/hooks';
import { changeImageApi } from 'apps/main/src/api';
import { useRecoilState } from 'recoil';
import { userState } from 'apps/main/src/stores';

type Props = {
  open: boolean;
  onClose: () => void;
  avatarImage: string;
  coverImage: string;
  bio: string;
};

enum EditingType {
  AVATAR = 'avatar',
  COVER = 'cover',
}

export function EditProfileMolecule({
  open,
  onClose,
  avatarImage,
  coverImage,
  bio,
}: Props) {
  const [user, setUser] = useRecoilState(userState);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const {
    isDisplay: isDisplayConfirmImage,
    open: displayConfirmImage,
    close: hideConfirmImage,
  } = useDisplay();

  const [editingType, setEditingType] = useState<EditingType | null>(null);

  const confirmImageSrc =
    editingType === EditingType.AVATAR
      ? avatar && URL.createObjectURL(avatar)
      : cover && URL.createObjectURL(cover);

  const avatarChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0) ?? null;

    setEditingType(EditingType.AVATAR);
    displayConfirmImage();
    setAvatar(file);
  };

  const coverChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0) ?? null;

    setEditingType(EditingType.COVER);
    displayConfirmImage();
    setCover(file);
  };

  const saveImageHandler = async () => {
    const formData = new FormData();

    if (editingType === EditingType.AVATAR)
      avatar && formData.append('avatarImage', avatar);
    if (editingType === EditingType.COVER)
      cover && formData.append('coverImage', cover);

    hideConfirmImage();
    const updatedUser = await changeImageApi(formData);
    delete updatedUser.password;
    delete updatedUser.email;

    setUser(updatedUser);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <Stack direction="row" alignItems="center" px={1}>
          <Box flex={1}>
            <DialogTitle textAlign="center">
              Chỉnh sửa trang cá nhân
            </DialogTitle>
          </Box>
          <IconButtonAtom onClick={onClose}>
            <Close />
          </IconButtonAtom>
        </Stack>

        <Divider />

        <DialogContent>
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography className="edit-profile__title">
                Ảnh đại diện
              </Typography>
              <label htmlFor="edit-profile-avatar">
                <Typography className="edit-profile__action">
                  {avatarImage ? 'Chỉnh sửa' : 'Thêm'}
                </Typography>
              </label>
              <input
                type="file"
                hidden
                id="edit-profile-avatar"
                onChange={avatarChangeHandler}
              />
            </Stack>

            <Box className="box-container">
              <Box
                component="img"
                src={avatarImage ?? Avatar}
                className="edit-profile__avatar"
              />
            </Box>
          </Box>

          <Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography className="edit-profile__title">Ảnh bìa</Typography>
              <label htmlFor="edit-profile-cover">
                <Typography className="edit-profile__action">
                  {coverImage ? 'Chỉnh sửa' : 'Thêm'}
                </Typography>
              </label>

              <input
                type="file"
                hidden
                id="edit-profile-cover"
                onChange={coverChangeHandler}
              />
            </Stack>

            <Box className="box-container">
              <Box className="edit-profile__cover" />
            </Box>
          </Box>

          <Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography className="edit-profile__title">Tiểu sử</Typography>
            </Stack>

            <Box className="box-container">
              <ProfileBioMolecule content={bio} />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <ConfirmDialogMolecule
        content={
          <Box
            component="img"
            src={confirmImageSrc ?? ''}
            sx={{ width: '100%' }}
          />
        }
        open={isDisplayConfirmImage}
        title={`Cập nhật ảnh ${
          editingType === EditingType.AVATAR ? 'đại diện' : 'bìa'
        }`}
        onCancel={hideConfirmImage}
        onClose={hideConfirmImage}
        onOk={saveImageHandler}
        okText="Lưu"
      />

      <style jsx global>
        {`
          .edit-profile__title {
            font-size: 20px;
            font-weight: 600;
          }

          .edit-profile__action {
            color: #216fdb;
            cursor: pointer;
          }

          .edit-profile__avatar {
            width: 168px;
            height: 168px;
            border-radius: 50%;
          }

          .edit-profile__cover {
            width: 80%;
            margin: 0 auto;
            padding-top: 50%;
            background: ${coverImage ? `url(${coverImage})` : '#f0f2f5'};
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 8px;
          }

          .box-container {
            text-align: center;
            padding: 8px 0;
          }
        `}
      </style>
    </>
  );
}
