import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ButtonAtom, CommonItemAtom, IconButtonAtom } from '../../atoms';

import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { Close, Photo } from '@mui/icons-material';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function PostCreateDialogMolecule({ open, onClose }: Props) {
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

        <DialogContent dividers>
          <CommonItemAtom
            image={Avatar}
            roundedImage
            imageSize={40}
            title="Nguyễn Truong uy"
          />

          <Box>
            <TextField
              variant="standard"
              multiline
              rows={4}
              fullWidth
              InputProps={{
                disableUnderline: true,
                style: {
                  fontSize: 24,
                },
              }}
              placeholder="Bạn đang nghĩ gì thế?"
            />
          </Box>

          <Box className="post-images">
            <Box className="post-image-container">
              <Box
                component="img"
                src={
                  'https://images.unsplash.com/photo-1660906865138-c638361f1a7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
                }
                className="post-image"
              />

              <IconButtonAtom className="post-image__delete">
                <Close />
              </IconButtonAtom>
            </Box>
            <Box className="post-image-container">
              <Box
                component="img"
                src={
                  'https://images.unsplash.com/photo-1660906865138-c638361f1a7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
                }
                className="post-image"
              />

              <IconButtonAtom className="post-image__delete">
                <Close />
              </IconButtonAtom>
            </Box>
          </Box>
        </DialogContent>

        <Box className="post-addition">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography className="post-addition__title">
              Thêm vào bài viết của bạn
            </Typography>
            <IconButton>
              <Photo color="success" />
            </IconButton>
          </Stack>
        </Box>

        <Divider />

        <Box className="post-create">
          <ButtonAtom fullWidth className="post-create__button">
            Đăng
          </ButtonAtom>
        </Box>
      </Dialog>

      <style jsx global>
        {`
          .post-input {
            border: none;
          }

          .post-addition {
            padding: 8px 24px;
          }

          .post-addition__title {
            font-weight: 600;
          }

          .post-create {
            padding: 16px 24px;
          }

          .post-create__button {
            background: #1b74e4;
            color: white !important;
          }

          .post-create__button:hover {
            background: #1b74e4;
            filter: brightness(0.95);
          }

          .post-images {
            padding: 8px;
            border: 1px solid #e4e6eb;
            border-radius: 8px;
          }

          .post-image-container {
            position: relative;
          }

          .post-image {
            width: 100%;
            border-radius: 8px;
          }

          .post-image__delete {
            position: absolute;
            top: 4px;
            right: 4px;
          }
        `}
      </style>
    </>
  );
}
