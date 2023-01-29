import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import profileCalendar from '../../../../assets/public/profile_calendar.png';

const StudentEpmty = () => (
  <Box>
    <Box sx={{
      mb: '80px', textAlign: 'center',
    }}
    >
      <img src={profileCalendar} alt="student" style={{ maxWidth: '100%', height: 'auto', maxHeight: '100%' }} />
    </Box>
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
