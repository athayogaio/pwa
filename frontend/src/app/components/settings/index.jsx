import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Paper, Typography, Stack,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Header from '../header';

const Settings = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line react/no-unstable-nested-components
  const Wpapper = ({ children, link = '#', text = '' }) => (
    <Paper
      onClick={() => {
        navigate(link);
      }}
      sx={{
        p: '17px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.08)',
        borderRadius: '8px',
      }}
    >
      <Stack direction="row" spacing={2}>
        {children}

        <Typography>{text}</Typography>
      </Stack>
      <KeyboardArrowRightIcon sx={{ color: '#616161' }} />
    </Paper>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Header title="Настройки" withBackBtn />
      <Stack
        direction="column"
        spacing={2}
        sx={{
          margin: '32px auto',
          width: '80%',
          maxWidth: '944px',
        }}
      >
        <Wpapper link text="Личные данные">
          <PersonOutlineOutlinedIcon sx={{ color: '#9E9E9E' }} />
        </Wpapper>

        <Wpapper link text="Платежи и карты">
          <CreditCardIcon sx={{ color: '#9E9E9E' }} />
        </Wpapper>

        <Wpapper link="/teacher-form" text="Стать преподавателем">
          <SchoolOutlinedIcon sx={{ color: '#9E9E9E' }} />
        </Wpapper>

        <Wpapper link text="Помощь">
          <HelpOutlineOutlinedIcon sx={{ color: '#9E9E9E' }} />
        </Wpapper>

      </Stack>
    </Box>
  );
};

export default Settings;
