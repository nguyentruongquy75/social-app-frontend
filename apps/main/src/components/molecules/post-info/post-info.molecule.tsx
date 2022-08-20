import { Box, Stack, Tooltip, Typography } from '@mui/material';

import LikeIcon from 'apps/main/src/assets/images/like.png';
import HahaIcon from 'apps/main/src/assets/images/haha.png';
import { TooltipCountAtom } from '../../atoms';
import { useDisplay } from 'apps/main/src/hooks';
import { ReactionDialog } from '../reaction-dialog/reaction-dialog.molecule';

export function PostInfo() {
  const { close, open, isDisplay } = useDisplay();

  return (
    <>
      <Box className="post-info-container">
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center">
            <Tooltip title={<TooltipCountAtom title="Thích" />}>
              <Box
                component="img"
                src={LikeIcon}
                className="reaction-icon"
                onClick={open}
              />
            </Tooltip>
            <Box component="img" src={HahaIcon} className="reaction-icon" />
            <Typography className="post-info-text">11</Typography>
          </Stack>
          <Box>
            <Typography className="post-info-text">74 bình luận</Typography>
          </Box>
        </Stack>
      </Box>

      <ReactionDialog open={isDisplay} onClose={close} />

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
