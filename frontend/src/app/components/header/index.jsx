import React from 'react';
import { Link } from 'react-router-dom';
import {
  Typography, Grid, Stack, Badge,
} from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const Header = ({ title }) => (
  <Grid
    item
    display="flex"
    flexDirection="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{
      width: '100%', height: '64px', px: '29px', boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.1)',
    }}
  >
    <Typography fontSize="20px" fontWeight="500" color="text.secondary">
      {title}
    </Typography>
    <Stack alignItems="center" direction="row" spacing={2}>
      <Badge color="error" variant="dot">
        <NotificationsNoneIcon fontSize="medium" color="disabled" />
      </Badge>
      <Link to="/settings">
        <SettingsOutlinedIcon color="disabled" sx={{ transform: 'translateY(3px)' }} />
      </Link>
    </Stack>
  </Grid>
);

export default Header;
