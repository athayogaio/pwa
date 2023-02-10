import React from 'react';
import { Box } from '@mui/material';
import BillingInfo from '../../components/billing-info';
import Header from '../../components/header';
import LayoutContainer from '../../components/layout-container';

const BillingInfoPage = () => (
  <Box sx={{ height: '100%' }}>
    <Header withBackBtn />
    <LayoutContainer>
      <Box display="flex" justifyContent="center" alignContent="space-between">
        <BillingInfo />
      </Box>
    </LayoutContainer>
  </Box>
);

export default BillingInfoPage;
