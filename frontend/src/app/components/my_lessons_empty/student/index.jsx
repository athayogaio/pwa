import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import profileCalendar from '../../../../assets/public/profile_calendar.png';

const StudentEpmty = () => (
  <Box sx={{
    mx: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center',
  }}
  >
    <Box
      sx={{
        mb: '20%',
        backgroundImage: `url(${profileCalendar})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        width: '100%',
        height: '364px',
        minHeight: '228px',
        maxHeight: '30vh',
      }}
      alt="student"
    />
    <Typography color="text.secondary" sx={{ textAlign: 'center', fontSize: '18px', lineHeight: '25px' }}>
      Список занятий пока пуст
    </Typography>
    <Typography
      color="text.secondary"
      sx={{
        textAlign: 'center', fontSize: '18px', lineHeight: '25px', mb: '24px',
      }}
    >
      Запишитесь на свое первое занятие
    </Typography>
    <Button
      fullWidth
      component={Link}
      to="/search-lessons"
      sx={{
        borderRadius: '6px', fontSize: '16px', lineHeight: '26px', textAlign: 'center',
      }}
      variant="contained"
      size="large"
    >
      Найти занятие
    </Button>
  </Box>
);

export default StudentEpmty;
