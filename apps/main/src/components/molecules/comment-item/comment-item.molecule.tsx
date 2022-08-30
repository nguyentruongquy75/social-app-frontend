import {
  Box,
  Grid,
  InputBase,
  List,
  ListItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  createReactionApi,
  deleteCommentApi,
  deleteReactionAPi,
  updateReactionApi,
} from 'apps/main/src/api';
import { updateCommentApi } from 'apps/main/src/api/comment/update';

import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { useLongPress, usePopover } from 'apps/main/src/hooks';
import { userState } from 'apps/main/src/stores';
import {
  getMostPopularReaction,
  getReactionByType,
  groupReactions,
} from 'apps/main/src/utils/reactions';
import { handleTimeString } from 'apps/main/src/utils/time';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ButtonAtom, IconButtonAtom, TooltipCountAtom } from '../../atoms';
import { LoadingAtom } from '../../atoms/loading/loading.atom';
import { CommentInputMolecule } from '../comment-input/comment-input.molecule';
import { MoreButtonMolecule } from '../more-button/more-button.molecule';
import { ReactionPopoverMolecule } from '../reaction-popover/reaction-popover.molecule';

type Props = {
  createdAt: string;
  id: number;
  message: string;
  postId: number;
  tags: any[];
  updatedAt: string;
  user: any;
  replies: any[];
  reactions: any[];
  replyId: number | null;
  openReplyParent?: () => void;
};

export function CommentItemMolecule({
  message,
  user,
  replies,
  reactions,
  id,
  replyId,
  openReplyParent,
  postId,
  createdAt,
}: Props) {
  const [userStore, _] = useRecoilState(userState);
  const reactButtonRef = useRef<HTMLElement | null>(null);
  const { anchorEl, open, close, isDisplay } = usePopover();
  const longPress = useLongPress(
    open.bind(null, null, reactButtonRef.current),
    1000
  );

  const [isLoading, setIsLoading] = useState(false);

  const [isReply, setIsReply] = useState(false);

  const [userReaction, setUserReaction] = useState<null | {
    label: string;
    icon: string;
    type: string;
  }>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(message);

  const existedReaction = reactions.find(
    (reaction) => reaction.userId === userStore.id
  );

  const displayReplyInput = () => {
    setIsReply(true);
    replyId && openReplyParent && openReplyParent();
  };

  const mostReactions = getMostPopularReaction(reactions);

  const groupedReaction = groupReactions(reactions);

  const reactionTooltip =
    mostReactions.length === 1 ? (
      <TooltipCountAtom
        title={mostReactions[0].label}
        url={`comment/${id}/reactions/${mostReactions[0].type}`}
      />
    ) : (
      <Box className="tooltip">
        <List>
          {groupedReaction.slice(1).map((item) => (
            <ListItem disablePadding>
              <Box
                component="img"
                src={item.icon}
                sx={{ width: 18, height: 18 }}
                mr={0.25}
              />
              <Typography>{item.count}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    );

  const createReaction = async (type: string) => {
    setUserReaction(getReactionByType(type));
    const response = await createReactionApi({
      type,
      userId: userStore.id,
      commentId: id,
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

  const editComment = () => setIsEditing(true);
  const cancelEditComment = () => setIsEditing(false);

  const editingTextChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setEditingText(e.target.value);

  const updateComment = async () => {
    setIsLoading(true);
    cancelEditComment();
    const response = await updateCommentApi(id, {
      message: editingText,
    });
    setIsLoading(false);
  };

  const deleteComment = async () => {
    setIsLoading(true);
    const response = await deleteCommentApi(id);
  };

  useEffect(() => {
    if (existedReaction)
      setUserReaction(getReactionByType(existedReaction.type));
    else setUserReaction(null);
  }, [existedReaction]);

  return (
    <>
      <Stack
        direction="row"
        alignItems="flex-start"
        gap={1}
        sx={{ position: 'relative' }}
      >
        <Box
          component="img"
          src={user.avatarImage ?? Avatar}
          className="comment__avatar"
        />
        <Box>
          <Box className="comment__right">
            <Typography className="comment__user">{user.fullName}</Typography>
            {!isEditing && (
              <Typography className="comment__content">
                {message}
                {/* <Typography className="comment__seemore">Xem thêm</Typography> */}
              </Typography>
            )}

            {isEditing && (
              <InputBase
                multiline
                rows={3}
                sx={{ display: 'block' }}
                value={editingText}
                onChange={editingTextChangeHandler}
                autoFocus
              />
            )}

            {isEditing && (
              <Stack direction="row" gap={1}>
                <ButtonAtom
                  className="edit-comment__actions"
                  onClick={cancelEditComment}
                >
                  Huỷ
                </ButtonAtom>
                <ButtonAtom
                  className="edit-comment__actions save"
                  disabled={
                    editingText.trim() === message || !editingText.trim()
                  }
                  onClick={updateComment}
                >
                  Lưu
                </ButtonAtom>
              </Stack>
            )}

            {mostReactions.length > 0 && (
              <Tooltip title={reactionTooltip}>
                <Stack
                  direction="row"
                  className="comment__reactions"
                  gap={0.25}
                >
                  {mostReactions.map((reaction) => (
                    <Box
                      key={reaction.type}
                      component="img"
                      src={reaction.icon}
                      className="comment__reaction-image"
                    />
                  ))}
                  <Typography fontSize={13}>
                    {reactions.length > 1 && reactions.length}
                  </Typography>
                </Stack>
              </Tooltip>
            )}
          </Box>
          <Box>
            <Stack direction="row" gap={2} pl={1}>
              <Typography
                className={`comment__action ${
                  userReaction ? userReaction.type : ''
                }`}
                onClick={toggleReactionButton}
                ref={reactButtonRef}
                {...longPress}
              >
                {userReaction ? userReaction.label : 'Thích'}
              </Typography>
              <Typography
                className="comment__action"
                onClick={displayReplyInput}
              >
                Phản hồi
              </Typography>
              <Typography className="comment__time">
                {handleTimeString(createdAt)}
              </Typography>
            </Stack>
          </Box>
        </Box>

        <Box>
          {user.id === userStore.id && (
            <MoreButtonMolecule onEdit={editComment} onDelete={deleteComment} />
          )}
        </Box>

        {isLoading && <LoadingAtom circular />}
      </Stack>

      {(replies.length > 0 || isReply) && (
        <List className="reply__list">
          {replies.map((reply) => (
            <ListItem key={reply.id} disablePadding>
              <CommentItemMolecule
                {...reply}
                openReplyParent={displayReplyInput}
              />
            </ListItem>
          ))}
          {!replyId && isReply && (
            <CommentInputMolecule postId={postId} replyId={id} />
          )}
        </List>
      )}

      <ReactionPopoverMolecule
        isDisplay={isDisplay}
        anchorEl={anchorEl}
        close={close}
        onSetReaction={createOrUpdateReaction}
      />

      <style jsx global>
        {`
          .comment__avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
          }

          .comment__right {
            position: relative;
            background-color: #f0f2f5;
            padding: 8px 12px;
            border-radius: 18px;
          }

          .comment__user {
            font-size: 13px;
            font-weight: 500;
            word-break: break-all;
            display: inline-block;
          }

          .comment__user:hover {
            cursor: pointer;
            text-decoration: underline;
          }

          .comment__content {
            font-size: 15px;
            word-break: break-word;
          }

          .comment__seemore {
            font-size: 15px;
            font-weight: 500;
            display: inline-block;
            cursor: pointer;
          }

          .comment__action {
            font-size: 13px;
            font-weight: 600;
          }

          .comment__action:hover {
            text-decoration: underline;
            cursor: pointer;
          }

          .comment__action.Like {
            font-weight: 600;
            color: #1877f2;
          }

          .comment__action.Love {
            font-weight: 600;
            color: #f33e58;
          }

          .comment__action.Haha,
          .comment__action.Wow,
          .comment__action.Sad {
            font-weight: 600;
            color: #f7b125;
          }

          .comment__action.Angry {
            font-weight: 600;
            color: #e9710f;
          }

          .comment__time {
            font-size: 13px;
          }

          .comment__reactions {
            position: absolute;
            right: -4px;
            bottom: 0;
            padding: 1px 4px;
            border-radius: 25px;
            background: white;
            border: 1px solid #ddd;
            cursor: pointer;
          }

          .comment__reaction-image {
            width: 18px;
            height: 18px;
          }

          .reply__list {
            padding-left: 40px;
          }

          .edit-comment__actions {
            font-size: 13px;
          }

          .edit-comment__actions.save {
            background: #1b74e4;
            color: white !important;
          }

          .edit-comment__actions.save:disabled {
            background: #0000001f;
          }

          .edit-comment__actions.save:hover {
            background: #1b74e4;
          }
        `}
      </style>
    </>
  );
}
