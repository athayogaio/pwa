import React from 'react';
import { Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const TeacherForm = () => (
  <Box sx={{ width: '100%' }}>
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        width: '100%', height: '64px', px: '29px', boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.1)',
      }}
    >
      <Typography fontSize="24px" fontWeight="500" color="text.secondary">
        Настройки
      </Typography>
      <AccountCircleIcon color="disabled" />
      <NotificationsNoneIcon color="disabled" />
    </Box>
  </Box>
);

export default TeacherForm;
