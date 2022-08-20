import { MoreHoriz } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { usePopover } from 'apps/main/src/hooks';

export function MoreButtonMolecule() {
  const {
    isDisplay: isDisplayPopover,
    open: openPopover,
    close: closePopover,
    anchorEl,
  } = usePopover();
  return (
    <>
      <IconButton onClick={openPopover}>
        <MoreHoriz />
      </IconButton>

      <Menu
        open={isDisplayPopover}
        onClose={closePopover}
        anchorEl={anchorEl}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>Chỉnh sửa bài viết</MenuItem>

        <MenuItem>Xoá bài viết</MenuItem>
      </Menu>
    </>
  );
}
