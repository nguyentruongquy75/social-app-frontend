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

import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { ProfileBioMolecule } from '../profile-bio/profile-bio.molecule';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function EditProfileMolecule({ open, onClose }: Props) {
  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <Stack direction="row" alignItems="center" px={1}>
          <Box flex={1}>
            <DialogTitle textAlign="center">Tao Bai viet</DialogTitle>
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
              <Typography className="edit-profile__action">Thêm</Typography>
            </Stack>

            <Box className="box-container">
              <Box
                component="img"
                src={Avatar}
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
              <Typography className="edit-profile__action">Thêm</Typography>
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
              <Typography className="edit-profile__action">Thêm</Typography>
            </Stack>

            <Box className="box-container">
              <ProfileBioMolecule />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

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
            padding-top: 37.5%;
            background: #f0f2f5;
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
