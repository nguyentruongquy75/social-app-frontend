import { Box, InputBase, Stack } from '@mui/material';
import { createCommentApi } from 'apps/main/src/api';

import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { useLoading } from 'apps/main/src/hooks';
import { userState } from 'apps/main/src/stores';
import {
  ChangeEvent,
  forwardRef,
  KeyboardEvent,
  useEffect,
  useState,
} from 'react';
import { useRecoilState } from 'recoil';
import { LoadingAtom } from '../../atoms/loading/loading.atom';

type Props = {
  replyId?: number;
  postId: number;
};

export const CommentInputMolecule = forwardRef(
  ({ replyId, postId }: Props, ref) => {
    const [user, _] = useRecoilState(userState);
    const [message, setMessage] = useState('');
    const { isLoading, startLoading, endLoading } = useLoading();

    const createComment = async () => {
      startLoading();
      const response = await createCommentApi({
        message,
        userId: user.id,
        postId,
        replyId,
      });

      endLoading();
    };

    const onEnter = async (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.which === 13 && !e.shiftKey) {
        if (message.trim()) {
          await createComment();
          setMessage('');
        }
      }
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value);
    };

    return (
      <>
        <Stack
          direction="row"
          gap={1}
          alignItems="flex-start"
          py={1}
          sx={{ position: 'relative' }}
        >
          <Box component="img" src={Avatar} className="avatar" />
          <InputBase
            fullWidth
            placeholder="Viết bình luận"
            className="comment-input"
            ref={ref}
            autoFocus
            multiline
            onKeyUp={onEnter}
            onChange={onChange}
            value={message}
          />

          {isLoading && <LoadingAtom circular />}
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
              padding: 4px 12px;
              border-radius: 18px;
            }
          `}
        </style>
      </>
    );
  }
);
