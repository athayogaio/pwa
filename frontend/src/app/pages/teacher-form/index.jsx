import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TeacherForm from '../../components/teacher-form';

const TeacherFormPage = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: '100%', height: '64px', px: '29px', boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.1)', mb: '40px',
        }}
      >
        <Box display="flex" alignItems="center" gap="10px">
          <ArrowBackIcon
            style={{ color: '#616161' }}
            onClick={() => {
              navigate(-1);
            }}
          />
          <Typography fontSize="24px" fontWeight="500" color="text.secondary">
            Настройки
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="10px">
          <NotificationsNoneIcon style={{ color: '#9E9E9E' }} />
          <AccountCircleIcon style={{ color: '#BDBDBD' }} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" mb="116px">
        <TeacherForm />
      </Box>
    </Box>
  );
};

export default TeacherFormPage;
