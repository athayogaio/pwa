/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const CustomDialogTitle = props => {
  const { children, onClose } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, width: '600px' }}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const DraftAlert = ({ saveFormUsDraft }) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    saveFormUsDraft();
  };

  return (
    <div>
      <Button
        fullWidth
        variant="text"
        onClick={handleClickOpen}
      >
        Сохранить черновик
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography variant="modal_title">Данные не были сохранены</Typography>
        </CustomDialogTitle>
        <DialogContent>
          <Typography variant="modal">
            Сохранить как черновик?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate(-1)}>
            Не сохранять
          </Button>
          <Button autoFocus onClick={handleClose}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DraftAlert;
