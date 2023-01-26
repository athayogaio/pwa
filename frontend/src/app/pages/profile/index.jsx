import { Container, Box } from '@mui/material';
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
    <Box width="100%">
      <Header title="Профиль" />
      <Profile user={user} />
    </Box>
  );
};

export default ProfilePage;
