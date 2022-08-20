import { Box, Button, Dialog, Stack, Tab, Tabs } from '@mui/material';
import { useTab } from 'apps/main/src/hooks';
import { CommonItemAtom, IconButtonAtom } from '../../atoms';

import Haha from 'apps/main/src/assets/images/haha.png';
import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { ButtonAtom } from '../../atoms/button/buttom.atom';
import { Close } from '@mui/icons-material';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ReactionDialog({ open, onClose }: Props) {
  const { tabIndex, onChange } = useTab();

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            p: '12px 16px',
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Tabs value={tabIndex} onChange={onChange}>
            <Tab label="Thích" className="tab" />
            <Tab label="Haha" className="tab" />
            <Tab label="Wow" className="tab" />
          </Tabs>

          <IconButtonAtom>
            <Close sx={{ fontSize: 20 }} />
          </IconButtonAtom>
        </Stack>

        <Stack className="reaction-list">
          <CommonItemAtom
            title="Nguyễn Trường Quý"
            image={Avatar}
            imageDecorator={Haha}
            imageSize={40}
            roundedImage
            end={<ButtonAtom>Thêm bạn bè</ButtonAtom>}
          />

          <CommonItemAtom
            title="Nguyễn Trường Quý"
            image={Avatar}
            imageDecorator={Haha}
            imageSize={40}
            roundedImage
            end={<ButtonAtom>Thêm bạn bè</ButtonAtom>}
          />
        </Stack>
      </Dialog>

      <style jsx global>
        {`
          .reaction-dialog {
            padding: 16px;
          }

          .tab {
            font-size: 15px;
            font-weight: 600;
            text-transform: none !important;
          }

          .reaction-list {
            padding-top: 8px;
            gap: 4px;
          }
        `}
      </style>
    </>
  );
}
