import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useModalStore } from '../../../store/modal.store';


const GlobalModal = () => {
  const { open, content, closeModal } = useModalStore();

  return (
    <Dialog open={open} onClose={closeModal} maxWidth="sm" fullWidth>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
};

export default GlobalModal;