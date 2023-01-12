import React from 'react';
import {
  Box, Paper, Typography, Stack, Badge,
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import avatarIcon from '../../../assets/public/avatarIcon.svg';

const Settings = () => (

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
      <Stack direction="row" alignItems="center" spacing={2} color="text.secondary">
        <ArrowBackIcon fontSize="medium" />
        <Typography fontSize="24px" fontWeight="500">
          Назад
        </Typography>
      </Stack>
      <Stack alignItems="center" direction="row" spacing={2}>
        <Badge color="error" variant="dot">
          <NotificationsNoneIcon fontSize="medium" color="disabled" />
        </Badge>
        <img src={avatarIcon} alt="profile icon" />
      </Stack>
    </Box>
    <Stack
      direction="column"
      spacing={2}
      sx={{
        margin: '32px auto',
        width: '100%',
        maxWidth: '800px',
      }}
    >
      <Paper
        sx={{
          p: '17px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" spacing={2}>
          <PersonOutlineOutlinedIcon color="action" />
          <Typography>Личные данные</Typography>
        </Stack>
        <KeyboardArrowRightIcon color="action" />
      </Paper>
      <Paper
        sx={{
          p: '17px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" spacing={2}>
          <CreditCardIcon color="action" />
          <Typography>Платежи и карты</Typography>
        </Stack>
        <KeyboardArrowRightIcon color="action" />
      </Paper>
      <Paper
        sx={{
          p: '17px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" spacing={2}>
          <SchoolOutlinedIcon color="action" />
          <Typography>Стать преподавателем</Typography>
        </Stack>
        <KeyboardArrowRightIcon color="action" />
      </Paper>
      <Paper
        sx={{
          p: '17px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" spacing={2}>
          <HelpOutlineOutlinedIcon color="action" />
          <Typography>Помощь</Typography>
        </Stack>
        <KeyboardArrowRightIcon color="action" />
      </Paper>
    </Stack>
  </Box>
);

export default Settings;
