import { Box, Stack } from '@mui/material';
import { CommentInputMolecule } from '../comment-input/comment-input.molecule';
import { CommentItemMolecule } from '../comment-item/comment-item.molecule';

export function PostCommentMolecule() {
  return (
    <>
      <Box className="post-comment-container">
        <CommentInputMolecule />
        <Stack gap={0.5}>
          <CommentItemMolecule />
          <CommentItemMolecule />
          <CommentItemMolecule />
        </Stack>
      </Box>

      <style jsx global>
        {`
          .post-comment-container {
            padding: 8px 16px;
          }
        `}
      </style>
    </>
  );
}
