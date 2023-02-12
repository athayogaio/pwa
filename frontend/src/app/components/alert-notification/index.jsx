import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Typography, Alert, AlertTitle, Stack,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { clearAlertProps } from '../../core/slices/alert-notification';

const AlertNotification = ({
  status, title, text, setIsActive,
}) => {
  const dispatch = useDispatch();

  const closeAlert = () => {
    setIsActive(false);
    dispatch(clearAlertProps());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      closeAlert();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const statusStyle = {
    '& .MuiAlert-message': {
      p: '9px 0 8px',
    },
    '& .MuiTypography-root, & .MuiIconButton-root': {
      color: '#212121',
    },
  };

  const successStyle = {
    '& .MuiPaper-root': {
      background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #2E7D32',
      opacity: '0.95',
    },
  };

  const infoStyle = {
    '& .MuiPaper-root': {
      background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #0D6EFD',
      opacity: '0.95',
    },
  };

  return (
    <Stack
      spacing={2}
      sx={[
        { width: '100%' },
        status === 'success' && { ...successStyle },
        status === 'info' && { ...infoStyle },
      ]}
    >
      {status === 'success' && (
      <Alert
        iconMapping={{
          success: <CheckCircleOutlineIcon fontSize="inherit" sx={{ color: '#2E7D32' }} />,
        }}
        onClose={() => closeAlert()}
        sx={{ ...statusStyle }}
      >
        <AlertTitle sx={{ fontSize: '16px', fontWeight: 500, mb: '0' }}>{title}</AlertTitle>
        {text && (
          <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>{text}</Typography>
        )}
      </Alert>
      )}
      {status === 'info' && (
      <Alert
        severity="info"
        onClose={() => closeAlert()}
        sx={{ ...statusStyle }}
      >
        <AlertTitle sx={{ fontSize: '16px', fontWeight: 500, mb: '0' }}>{title}</AlertTitle>
        {text && (
          <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>{text}</Typography>
        )}
      </Alert>
      )}
    </Stack>
  );
};

export default AlertNotification;
