import React from 'react';
import {
  Badge, Box, Divider, Grid, Stack, Typography,
} from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Link } from 'react-router-dom';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import Header from '../header';

const Abonement = ({ title, price }) => (

  <Box width="800px" m="16px" sx={{ border: '1px solid #E0E0E0', borderRadius: '8px' }}>
    <Grid container alignItems="center" justifyContent="center" />
  </Box>
);

export default Abonement;
