import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import profileCalendar from '../../../../assets/public/profile_calendar.png';

const StudentEpmty = () => (
  <Box sx={{
    maxWidth: '382px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
  }}
  >
    <Box sx={{
      maxWidth: '287px', maxHeight: '364px', mb: '80px', textAlign: 'center',
    }}
    >
      <img src={profileCalendar} alt="student" style={{ width: '287px', height: '364px' }} />
    </Box>
    <Typography sx={{ textAlign: 'center', fontSize: '18px', lineHeight: '25px' }}>
      Список занятий пока пуст
    </Typography>
    <Typography sx={{
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
        borderRadius: '6px', fontSize: '16px', lineHeight: '26px',
      }}
      variant="contained"
      size="large"
    >
      Найти занятие
    </Button>
  </Box>
);

export default StudentEpmty;
