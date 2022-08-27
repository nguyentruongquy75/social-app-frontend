import { Box, Stack, Tooltip, Typography } from '@mui/material';

import { TooltipCountAtom } from '../../atoms';
import { useDisplay } from 'apps/main/src/hooks';
import { ReactionDialog } from '../reaction-dialog/reaction-dialog.molecule';
import { getMostPopularReaction } from 'apps/main/src/utils/reactions';

type Props = {
  comments: any[];
  reactions: any[];
  postId: number;
};

export function PostInfo({ comments, reactions, postId }: Props) {
  const { close, open, isDisplay } = useDisplay();

  const mostReaction = getMostPopularReaction(reactions);

  return (
    <>
      <Box className="post-info-container">
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center">
            {mostReaction.map((reaction) => (
              <Tooltip
                key={reaction.label}
                title={
                  <TooltipCountAtom
                    title={reaction.label}
                    url={`post/${postId}/reactions/${reaction.type}`}
                  />
                }
              >
                <Box
                  component="img"
                  src={reaction.icon}
                  className="reaction-icon"
                  onClick={open}
                />
              </Tooltip>
            ))}

            <Tooltip
              title={<TooltipCountAtom url={`post/${postId}/reactions`} />}
            >
              <Typography className="post-info-text">
                {reactions.length > 0 && reactions.length}
              </Typography>
            </Tooltip>
          </Stack>
          <Box>
            <Tooltip
              title={<TooltipCountAtom url={`post/${postId}/comments`} />}
            >
              <Typography className="post-info-text">
                {comments.length > 0 && `${comments.length} bình luận`}
              </Typography>
            </Tooltip>
          </Box>
        </Stack>
      </Box>

      <ReactionDialog open={isDisplay} onClose={close} postId={postId} />

      <style jsx global>
        {`
          .post-info-container {
            padding: 10px 16px;
          }

          .reaction-icon {
            width: 18px;
            cursor: pointer;
          }

          .post-info-text {
            font-size: 15px;
            margin-left: 8px;
            color: #65676b;

            display: inline-block;
          }

          .post-info-text:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
}
