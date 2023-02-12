import React from 'react';
import { Box } from '@mui/material';
import Support from '../../components/support';
import Header from '../../components/header';
import LayoutContainer from '../../components/layout-container';

const SupportPage = () => (
  <Box sx={{ height: '100%' }}>
    <Header withBackBtn />
    <LayoutContainer>
      <Box display="flex" justifyContent="center" alignContent="space-between">
        <Support />
      </Box>
    </LayoutContainer>
  </Box>
);

export default SupportPage;
