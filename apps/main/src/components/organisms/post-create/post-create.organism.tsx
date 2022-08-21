import { Box } from '@mui/material';
import { CommonItemAtom, InputAtom } from '../../atoms';

import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { PostCreateDialogMolecule } from '../../molecules';
import { useDisplay } from 'apps/main/src/hooks';

export function PostCreateOrganism() {
  const { open, close, isDisplay } = useDisplay();

  return (
    <>
      <Box className="post-create-container">
        <CommonItemAtom
          image={Avatar}
          imageSize={40}
          roundedImage
          main={
            <InputAtom
              placeholder="Bạn đang nghĩ gì thế"
              sx={{ fontSize: 17 }}
              onClick={open}
            />
          }
        />
      </Box>

      <PostCreateDialogMolecule open={isDisplay} onClose={close} />

      <style jsx global>
        {`
          .post-create-container {
            padding: 8px 16px;
            background: white;
            border-radius: 8px;
          }
        `}
      </style>
    </>
  );
}
