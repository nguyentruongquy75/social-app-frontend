import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputBase,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ButtonAtom, CommonItemAtom, IconButtonAtom } from '../../atoms';

import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { AddToPhotos, Close, Photo } from '@mui/icons-material';
import { userState } from 'apps/main/src/stores';
import { useRecoilState } from 'recoil';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import axios from 'axios';
import {
  BASE_API,
  POST_DIALOG_TYPE,
  POST_ENDPOINT,
} from 'apps/main/src/constants';
import { createPostApi } from 'apps/main/src/api';
import { LoadingAtom } from '../../atoms/loading/loading.atom';

type Props = {
  open: boolean;
  onClose: () => void;
  type?: string;
};

export function PostCreateDialogMolecule({
  open,
  onClose,
  type = POST_DIALOG_TYPE.CREATE,
}: Props) {
  const [user, _] = useRecoilState(userState);
  const [isDisplayImageBackground, setIsDisplayImageBackground] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [postContent, setPosContent] = useState('');

  const isValidValues = postContent.length > 0 || images.length > 0;

  const contentChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setPosContent(e.target.value);

  const displayImageBackground = () => setIsDisplayImageBackground(true);

  const hideImageBackground = () => setIsDisplayImageBackground(false);

  const imageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ?? [];
    setImages((images) => [...images, ...Array.from(files)]);
  };

  const deleteFile = (file: File) =>
    setImages((images) => images.filter((image) => image !== file));

  const createPost = async () => {
    setIsLoading(true);
    const form = new FormData();
    form.append('title', postContent);
    form.append('userId', user.id);
    images.forEach((image) => form.append('images', image));

    const response = await createPostApi(form);

    setIsLoading(false);
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            position: 'relative',
          },
        }}
      >
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
            image={user.avatarImage ?? Avatar}
            roundedImage
            imageSize={40}
            title={user.fullName}
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
              onChange={contentChangeHandler}
              placeholder="Bạn đang nghĩ gì thế?"
            />
          </Box>

          {(isDisplayImageBackground || images.length > 0) && (
            <Box className="post-images">
              {isDisplayImageBackground && (
                <Box className="post-image-container">
                  <label htmlFor="post-create-images">
                    <Box className="post-image-background">
                      <AddToPhotos />
                      <Typography fontSize={17} fontWeight={600}>
                        Thêm ảnh
                      </Typography>
                    </Box>
                  </label>
                  <input
                    type="file"
                    onChange={imageChangeHandler}
                    hidden
                    multiple
                    id="post-create-images"
                  />
                  <IconButtonAtom
                    className="post-image__delete"
                    onClick={hideImageBackground}
                  >
                    <Close />
                  </IconButtonAtom>
                </Box>
              )}

              {images.map((image) => (
                <Box
                  className="post-image-container"
                  key={image.lastModified + image.name}
                >
                  <Box
                    component="img"
                    src={URL.createObjectURL(image)}
                    className="post-image"
                  />

                  <IconButtonAtom
                    className="post-image__delete"
                    onClick={() => deleteFile(image)}
                  >
                    <Close />
                  </IconButtonAtom>
                </Box>
              ))}
            </Box>
          )}
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
            <IconButton onClick={displayImageBackground}>
              <Photo color="success" />
            </IconButton>
          </Stack>
        </Box>

        <Divider />

        <Box className="post-create">
          <ButtonAtom
            fullWidth
            className="post-create__button"
            disabled={!isValidValues}
            onClick={createPost}
          >
            Đăng
          </ButtonAtom>
        </Box>

        {isLoading && <LoadingAtom circular />}
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
            color: white !important;
            background-color: #1b74e4 !important;
          }

          .post-create__button:hover {
            background: #1b74e4;
            filter: brightness(0.95);
          }

          .post-create__button:disabled {
            background-color: #e4e6eb !important;
          }

          .post-images {
            padding: 8px;
            border: 1px solid #e4e6eb;
            border-radius: 8px;
          }

          .post-image-background {
            height: 200px;
            background: #f7f8fa;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
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

          .loading {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.4);
          }
        `}
      </style>
    </>
  );
}
