import { Box, Stack } from '@mui/material';
import { fetcher } from 'apps/main/src/api/fetcher';
import useSWR from 'swr';
import { CommentInputMolecule } from '../comment-input/comment-input.molecule';
import { CommentItemMolecule } from '../comment-item/comment-item.molecule';

type Props = {
  postId: number;
};

export function PostCommentMolecule({ postId }: Props) {
  const { data } = useSWR(`post/${postId}/comments`, (url) => fetcher(url));

  return (
    <>
      <Box className="post-comment-container">
        <CommentInputMolecule postId={postId} />
        <Stack gap={0.5}>
          {data?.items.map((comment: any) => (
            <CommentItemMolecule key={comment.id} {...comment} />
          ))}
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
