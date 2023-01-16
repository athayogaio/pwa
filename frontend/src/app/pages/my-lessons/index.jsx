import React from 'react';
import {
  Box, Typography, Button, Grid,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import profileCalendar from '../../../assets/public/profile_calendar.png';

const MyLessonsPage = () => (
  <Grid
    container
    flexDirection="column"
    sx={{ height: '100%' }}
  >
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
      <Typography fontSize="24px" fontWeight="500" color="text.secondary">
        Мои занятия
      </Typography>
      <SettingsIcon color="disabled" />
    </Grid>
    <Grid
      item
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        flex: '1 0 auto',
      }}
    >
      <Box mb="80px">
        <img src={profileCalendar} alt="yoga-calendar" />
      </Box>
      <Typography textAlign="center" fontSize="18px" color="text.secondary">
        Список занятий пока пуст
      </Typography>
      <Typography textAlign="center" fontSize="18px" color="text.secondary" mb="24px">
        Запишитесь на свое первое занятие
      </Typography>
      <Button
        component={Link}
        to="/search-lessons"
        sx={{
          minWidth: 382, borderRadius: '6px', fontSize: '16px', lineHeight: '26px',
        }}
        variant="contained"
        size="large"
      >
        Найти занятие
      </Button>
    </Grid>
    <Box display="flex" justifyContent="flex-end" m="48px">
      <Button
        component={Link}
        to="/create-lesson"
        sx={{
          width: 'max-content',
          p: '12px 16px',
          fontSize: '15px',
          lineHeight: '26px',
          boxShadow: '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12)',
          borderRadius: '64px',
          color: '#000',
        }}
        size="large"
      >
        <Typography sx={{ mr: '8px' }}>Создать занятие</Typography>
        <AddIcon />
      </Button>
    </Box>
  </Grid>
);

export default MyLessonsPage;
