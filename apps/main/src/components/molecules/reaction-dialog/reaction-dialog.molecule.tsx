import {
  Box,
  Button,
  Dialog,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useTab } from 'apps/main/src/hooks';
import { CommonItemAtom, IconButtonAtom } from '../../atoms';

import Haha from 'apps/main/src/assets/images/haha.png';
import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { ButtonAtom } from '../../atoms/button/buttom.atom';
import { Close } from '@mui/icons-material';
import useSWR from 'swr';
import { fetcher } from 'apps/main/src/api/fetcher';
import {
  getReactionImage,
  groupReactions,
} from 'apps/main/src/utils/reactions';

type Props = {
  open: boolean;
  onClose: () => void;
  postId: number;
};

export function ReactionDialog({ open, onClose, postId }: Props) {
  const { tabIndex, onChange } = useTab();
  const { data } = useSWR(
    open ? `post/${postId}/reactions` : null,
    (url) => fetcher(url),
    {
      refreshInterval: 0,
      dedupingInterval: 4000,
    }
  );

  const TabLabel = ({
    image,
    title,
  }: {
    image: string;
    title: string | number;
  }) => (
    <Stack direction="row" gap={0.5} alignItems="center">
      {image && (
        <Box component="img" src={image} sx={{ width: 20, height: 20 }} />
      )}

      <Typography>{title}</Typography>
    </Stack>
  );

  const groupedReactions = groupReactions(data?.items);

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
            {groupedReactions.map((reaction) => (
              <Tab
                label={
                  <TabLabel
                    image={reaction.icon}
                    title={reaction.icon ? reaction.count : reaction.label}
                  />
                }
                className="tab"
              />
            ))}
          </Tabs>

          <IconButtonAtom onClick={onClose}>
            <Close sx={{ fontSize: 20 }} />
          </IconButtonAtom>
        </Stack>

        <Stack className="reaction-list">
          {groupedReactions[tabIndex]?.items.map((reaction) => (
            <CommonItemAtom
              key={reaction.id}
              title={reaction.user.fullName}
              image={reaction.user.avatarImage ?? Avatar}
              imageDecorator={getReactionImage(reaction.type)}
              imageSize={40}
              roundedImage
              // end={<ButtonAtom>Thêm bạn bè</ButtonAtom>}
            />
          ))}
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
