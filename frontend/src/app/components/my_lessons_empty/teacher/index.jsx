import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import profileCalendarTeacher from '../../../../assets/public/profile_calendar_teacher.png';

const TeacherEmpty = () => (
  <Box>
    <Box sx={{
      mb: '80px', textAlign: 'center',
    }}
    >
      <img src={profileCalendarTeacher} alt="teacher" style={{ maxWidth: '100%', height: 'auto' }} />
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

export default TeacherEmpty;
