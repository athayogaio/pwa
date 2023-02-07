import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import profileCalendarTeacher from '../../../../assets/public/profile_calendar_teacher.png';

const TeacherEmpty = () => (
  <Box sx={{
    mx: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center',
  }}
  >
    <Box
      sx={{
        mb: '20%',
        backgroundImage: `url(${profileCalendarTeacher})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        width: '100%',
        minHeight: '234px',
        height: '364px',
        maxHeight: '30vh',
      }}
      alt="teacher"
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
      Создайте свое первое занятие
    </Typography>
    <Button
      fullWidth
      component={Link}
      to="/create-lesson"
      sx={{
        borderRadius: '6px', fontSize: '16px', lineHeight: '26px', textAlign: 'center',
      }}
      variant="contained"
      size="large"
    >
      Создать занятие
    </Button>
  </Box>
);

export default TeacherEmpty;
