import { Box } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Profile from '../../components/profile';
import Header from '../../components/header';

const ProfilePage = ({ auth: { user } }) => {
  if (!user) {
    return (
      <Navigate to="/login" />
    );
  }

  return (
    <Box width="100%" height="100%">
      <Header title="Профиль" />
      <Box height="100%" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', overflow: 'auto' }}>
        <Profile user={user} />
      </Box>
    </Box>
  );
};

export default ProfilePage;
