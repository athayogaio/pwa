import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Menu from '../../components/menu';

const ProfileLayout = ({ auth }) => (
  <Box sx={{ display: 'flex', height: '100%' }}>
    <Box sx={{ display: 'flex', maxWidth: '256px', flex: '1 0 256px' }}>
      <Menu auth={auth} />
    </Box>

    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minWidth: '0',
      width: '100%',
      height: 'auto',
      overflow: 'auto',
    }}
    >
      <Outlet />
    </Box>
  </Box>
);

export default ProfileLayout;
