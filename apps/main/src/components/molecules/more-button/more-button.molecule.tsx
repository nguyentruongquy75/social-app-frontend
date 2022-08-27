import { MoreHoriz } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { usePopover } from 'apps/main/src/hooks';

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
  isDisplayEdit?: boolean;
  isDisplayDelete?: boolean;
};

export function MoreButtonMolecule({
  onDelete,
  onEdit,
  isDisplayDelete = true,
  isDisplayEdit = true,
}: Props) {
  const {
    isDisplay: isDisplayPopover,
    open: openPopover,
    close: closePopover,
    anchorEl,
  } = usePopover();

  const editHandler = () => {
    closePopover();
    onEdit && onEdit();
  };

  const deleteHandler = () => {
    closePopover();
    onDelete && onDelete();
  };

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
        {isDisplayEdit && <MenuItem onClick={editHandler}>Chỉnh sửa</MenuItem>}

        {isDisplayDelete && <MenuItem onClick={deleteHandler}>Xoá</MenuItem>}
      </Menu>
    </>
  );
}
