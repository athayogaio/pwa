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
      }}
    >
      <Stack direction="row" spacing={2}>
        {children}

        <Typography>{text}</Typography>
      </Stack>
      <KeyboardArrowRightIcon color="action" />
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
          width: '100%',
          maxWidth: '800px',
        }}
      >
        <Wpapper link text="Личные данные">
          <PersonOutlineOutlinedIcon color="action" />
        </Wpapper>

        <Wpapper link text="Платежи и карты">
          <CreditCardIcon color="action" />
        </Wpapper>

        <Wpapper link="/teacher-form" text="Стать преподавателем">
          <SchoolOutlinedIcon color="action" />
        </Wpapper>

        <Wpapper link text="Помощь">
          <HelpOutlineOutlinedIcon color="action" />
        </Wpapper>

      </Stack>
    </Box>
  );
};

export default Settings;
