import {
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { CommonItemAtom } from '../../atoms';

import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { MoreHoriz } from '@mui/icons-material';
import { useLoading, usePopover } from 'apps/main/src/hooks';
import {
  MoreButtonMolecule,
  PostActions,
  PostCommentMolecule,
  PostImagesMolecule,
  PostInfo,
} from '../../molecules';
import { CommentItemMolecule } from '../../molecules/comment-item/comment-item.molecule';
import { useState } from 'react';
import { handleTimeString } from 'apps/main/src/utils/time';
import { deletePostApi } from 'apps/main/src/api/post/delete';
import { useRecoilState } from 'recoil';
import { userState } from 'apps/main/src/stores';
import { LoadingAtom } from '../../atoms/loading/loading.atom';

type Props = {
  comments: any[];
  reactions: any[];
  id: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  title: string;
  user: any;
};

export function PostCardOrganism({
  user,
  title,
  images,
  reactions,
  comments,
  id,
  createdAt,
}: Props) {
  const [userStore, _] = useRecoilState(userState);
  const [isDisplayPostComments, setIsDisplayPostComments] = useState(false);
  const { isLoading, startLoading, endLoading } = useLoading();

  const displayPostComment = () => setIsDisplayPostComments(true);

  const deletePost = async () => {
    startLoading();
    await deletePostApi(id);
  };

  return (
    <>
      <Card sx={{ position: 'relative' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            pt: 1,
            px: 2,
          }}
        >
          <CommonItemAtom
            roundedImage
            imageSize={40}
            image={user.avatarImage ?? Avatar}
            title={user.fullName}
            subtitle={handleTimeString(createdAt)}
          />

          {userStore.id === user.id && (
            <MoreButtonMolecule onDelete={deletePost} isDisplayEdit={false} />
          )}
        </Stack>

        <PostContent content={title} />

        <PostImagesMolecule images={images} />

        <PostInfo comments={comments} reactions={reactions} postId={id} />

        <PostActions
          postId={id}
          reactions={reactions}
          displayPostComment={displayPostComment}
        />

        {isDisplayPostComments && <PostCommentMolecule postId={id} />}

        {isLoading && <LoadingAtom circular />}
      </Card>
    </>
  );
}

type PostContentProps = { content: string };

function PostContent({ content }: PostContentProps) {
  return (
    <CardContent>
      <Typography sx={{ whiteSpace: 'pre-line' }}>{content}</Typography>
    </CardContent>
  );
}
