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
  content: string;
  onCancel: () => void;
  onOk: () => void;
  open: boolean;
  onClose: () => void;
};

export function ConfirmDialogMolecule({
  title,
  content,
  open,
  onClose,
  onCancel,
  onOk,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle textAlign="center">{title} </DialogTitle>
      <DialogContent dividers>
        <Typography>{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Hủy</Button>
        <Button onClick={onOk}>Xác nhận</Button>
      </DialogActions>
    </Dialog>
  );
}
