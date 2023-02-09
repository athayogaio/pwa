import React from 'react';
import {
  Button, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Typography,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';

const DeleteAccount = ({ handleClickOpen }) => {
  const handleClose = () => {
    handleClickOpen(false);
  };

  return (
    <Dialog
      open
      onClose={handleClose}
      sx={{ '& .MuiPaper-root': { maxWidth: '616px', width: '100%', p: '8px' } }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: '18px', fontWeight: '500' }}>
          Вы действительно хотите удалить аккаунт?
        </Typography>
        <CloseIcon fontSize="small" sx={{ m: '5px', cursor: 'pointer' }} onClick={handleClose} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ display: 'flex', fontSize: '14px', alignItems: 'center' }}>
          <InfoOutlinedIcon sx={{ mr: '8px' }} />
          Отменить это действие будет невозможно.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>Отмена</Button>
        <Button onClick={() => console.log('delete')} color="error">Удалить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccount;
