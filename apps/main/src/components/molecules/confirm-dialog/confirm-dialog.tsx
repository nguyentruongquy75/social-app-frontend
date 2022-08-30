import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

type Props = {
  title: string;
  content: string | JSX.Element;
  onCancel: () => void;
  onOk: () => void;
  open: boolean;
  onClose: () => void;
  cancelText?: string;
  okText?: string;
};

export function ConfirmDialogMolecule({
  title,
  content,
  open,
  onClose,
  onCancel,
  onOk,
  cancelText = 'Hủy',
  okText = 'Xác nhận',
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle textAlign="center">{title} </DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{cancelText}</Button>
        <Button onClick={onOk}>{okText}</Button>
      </DialogActions>
    </Dialog>
  );
}
