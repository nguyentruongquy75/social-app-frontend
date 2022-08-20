import { Box, InputBase, Stack } from '@mui/material';

import Avatar from 'apps/main/src/assets/images/default-avatar.png';

export function CommentInputMolecule() {
  return (
    <>
      <Stack direction="row" gap={1} alignItems="center" py={1}>
        <Box component="img" src={Avatar} className="avatar" />
        <InputBase
          fullWidth
          placeholder="Viết bình luận"
          className="comment-input"
        />
      </Stack>

      <style jsx global>
        {`
          .avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
          }

          .comment-input {
            background-color: #f0f2f5;
            padding: 2px 12px;
            border-radius: 18px;
          }
        `}
      </style>
    </>
  );
}
