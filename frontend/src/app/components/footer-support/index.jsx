import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const FooterSupport = () => (
  <Typography color="text.secondary" sx={{ fontSize: '14px', textAlign: 'center', padding: '24px 0' }}>
    Обратиться за помощью в службу поддержки
    {' '}
    <Typography component={Link} to="#" color="primary" sx={{ fontSize: '14px', textDecoration: 'none' }}>supportEmail</Typography>
  </Typography>
);

export default FooterSupport;
