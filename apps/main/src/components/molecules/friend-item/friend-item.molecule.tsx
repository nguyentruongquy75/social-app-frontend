import { Box, IconButton, Menu, MenuItem, Popper } from '@mui/material';
import { CommonItemAtom } from '../../atoms';

import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { MoreHoriz } from '@mui/icons-material';
import { useDisplay, usePopover } from 'apps/main/src/hooks';
import { ConfirmDialogMolecule } from '../confirm-dialog/confirm-dialog';
import { deleteFriendApi } from 'apps/main/src/api';

type Props = {
  id: number;
  fullName: string;
  avatarImage: string;
};

export function FriendItemMolecule({ id, fullName, avatarImage }: Props) {
  const {
    isDisplay: isDisplayPopover,
    close: closePopover,
    anchorEl,
    open: displayPopover,
  } = usePopover();

  const {
    isDisplay: isDisplayDeleteFriendDialog,
    open: displayDeleteFriendDialog,
    close: hideDeleteFriendDialog,
  } = useDisplay();

  const deleteFriend = async () => await deleteFriendApi(id);

  const onOk = () => {
    hideDeleteFriendDialog();
    closePopover();
    deleteFriend();
  };

  const MoreButton = (
    <>
      <IconButton onClick={displayPopover}>
        <MoreHoriz />
      </IconButton>

      <Menu
        open={isDisplayPopover}
        onClose={closePopover}
        anchorEl={anchorEl}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={displayDeleteFriendDialog}>Huỷ kết bạn</MenuItem>
      </Menu>
    </>
  );

  return (
    <>
      <Box p={2} className="friend-item-container">
        <CommonItemAtom
          image={avatarImage ?? Avatar}
          imageSize={80}
          title={fullName}
          end={MoreButton}
          imageLink={`/profiles/${id}`}
          titleLink={`/profiles/${id}`}
        />
      </Box>

      <ConfirmDialogMolecule
        open={isDisplayDeleteFriendDialog}
        onClose={hideDeleteFriendDialog}
        title={`Hủy kết bạn với ${fullName}`}
        content={`Bạn có chắc chắn muốn hủy kết bạn với ${fullName} không?`}
        onCancel={hideDeleteFriendDialog}
        onOk={onOk}
      />

      <style jsx global>
        {`
          .friend-item-container {
            border-radius: 8px;
            border: 1px solid #ddd;
          }
        `}
      </style>
    </>
  );
}
