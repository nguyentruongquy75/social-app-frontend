import { useEffect, useRef } from 'react';
import { ChatBubbleOutline, ThumbUpOffAltOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Grid } from '@mui/material';
import { useLongPress, usePopover } from 'apps/main/src/hooks';
import { ReactionPopoverMolecule } from '../reaction-popover/reaction-popover.molecule';

export function PostActions() {
  const reactButtonRef = useRef<HTMLButtonElement | null>(null);
  const { anchorEl, open, close, isDisplay } = usePopover();
  const longPress = useLongPress(
    open.bind(null, null, reactButtonRef.current),
    400
  );

  return (
    <>
      <Box px={2}>
        <Divider />
        <Grid container>
          <Grid item xs={6}>
            <Button
              variant="text"
              fullWidth
              className="post-action__button"
              ref={reactButtonRef}
              {...longPress}
            >
              <ThumbUpOffAltOutlined className="post-action__icon" />
              Thích
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button fullWidth className="post-action__button">
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
        `}
      </style>
    </>
  );
}
