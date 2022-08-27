import { useEffect, useRef, useState } from 'react';
import { ChatBubbleOutline, ThumbUpOffAltOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Grid } from '@mui/material';
import { useLongPress, usePopover } from 'apps/main/src/hooks';
import { ReactionPopoverMolecule } from '../reaction-popover/reaction-popover.molecule';
import { useRecoilState } from 'recoil';
import { userState } from 'apps/main/src/stores';
import { getReactionByType } from 'apps/main/src/utils/reactions';
import {
  createReactionApi,
  deleteReactionAPi,
  updateReactionApi,
} from 'apps/main/src/api';

type Props = {
  postId: number;
  reactions: any[];
  displayPostComment: () => void;
};

export function PostActions({ postId, reactions, displayPostComment }: Props) {
  const [user, _] = useRecoilState(userState);
  const reactButtonRef = useRef<HTMLButtonElement | null>(null);
  const { anchorEl, open, close, isDisplay } = usePopover();
  const longPress = useLongPress(
    open.bind(null, null, reactButtonRef.current),
    1000
  );

  const [userReaction, setUserReaction] = useState<null | {
    label: string;
    icon: string;
    type: string;
  }>(null);

  const existedReaction = reactions.find(
    (reaction) => reaction.userId === user.id
  );

  const createReaction = async (type: string) => {
    setUserReaction(getReactionByType(type));
    const response = await createReactionApi({
      type,
      userId: user.id,
      postId,
    });
  };

  const updateReaction = async (id: number, newType: string) => {
    setUserReaction(getReactionByType(newType));
    const response = await updateReactionApi({
      reactionId: id,
      type: newType,
    });
  };

  const createOrUpdateReaction = async (type: string) => {
    if (existedReaction) updateReaction(existedReaction.id, type);
    else createReaction(type);
  };

  const deleteReaction = async (id: number) => {
    const response = await deleteReactionAPi(id);
    setUserReaction(null);
  };

  const toggleReactionButton = () => {
    if (existedReaction) {
      deleteReaction(existedReaction.id);
      return;
    }

    createReaction('Like');
    return;
  };

  useEffect(() => {
    if (existedReaction)
      setUserReaction(getReactionByType(existedReaction.type));
    else setUserReaction(null);
  }, [existedReaction]);

  return (
    <>
      <Box px={2}>
        <Divider />
        <Grid container>
          <Grid item xs={6}>
            <Button
              variant="text"
              fullWidth
              className={`post-action__button ${
                userReaction ? userReaction.type : ''
              }`}
              ref={reactButtonRef}
              {...longPress}
              onClick={toggleReactionButton}
            >
              {(!userReaction || userReaction.type === 'Like') && (
                <ThumbUpOffAltOutlined className="post-action__icon" />
              )}
              {userReaction && userReaction.type !== 'Like' && (
                <Box
                  component="img"
                  src={userReaction.icon}
                  sx={{ width: 18, height: 18 }}
                  className="post-action__icon"
                />
              )}
              {userReaction ? userReaction.label : 'Thích'}
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              fullWidth
              className="post-action__button"
              onClick={displayPostComment}
            >
              <ChatBubbleOutline className="post-action__icon" />
              Bình luận
            </Button>
          </Grid>
        </Grid>
        <Divider />
      </Box>

      <ReactionPopoverMolecule
        isDisplay={isDisplay}
        anchorEl={anchorEl}
        close={close}
        onSetReaction={createOrUpdateReaction}
      />

      <style jsx global>
        {`
          button.post-action__button {
            text-transform: none;
            color: #65676b;
            font-size: 15px;
          }

          .post-action__icon {
            margin-right: 8px;
          }

          .post-action__button.Like {
            font-weight: 600;
            color: #1877f2;
          }

          .post-action__button.Love {
            font-weight: 600;
            color: #f33e58;
          }

          .post-action__button.Haha,
          .post-action__button.Wow,
          .post-action__button.Sad {
            font-weight: 600;
            color: #f7b125;
          }

          .post-action__button.Angry {
            font-weight: 600;
            color: #e9710f;
          }
        `}
      </style>
    </>
  );
}
