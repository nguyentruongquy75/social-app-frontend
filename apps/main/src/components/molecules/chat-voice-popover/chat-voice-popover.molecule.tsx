import { Call, CallEnd } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';

import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { IconButtonAtom } from '../../atoms';

export function ChatVoiceMolecule() {
  return (
    <>
      <Box>
        <Box>
          <Box component="img" src={Avatar} />
          <Typography>Admin</Typography>
          <Typography>Đã gọi cho bạn</Typography>
        </Box>
        <Box></Box>

        <Box>
          <Stack>
            <IconButton>
              <CallEnd />
            </IconButton>

            <IconButton>
              <Call />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
