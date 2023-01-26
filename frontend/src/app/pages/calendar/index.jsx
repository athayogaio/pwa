import { Box, Container } from '@mui/material';
import React from 'react';
import ScheduleLessonCard from '../../components/schedule-lesson-card';
import Header from '../../components/header';

const CalendarPage = () => (
  <Box sx={{ width: '100%' }}>
    <Header title="Календарь" />
    <Container>
      <ScheduleLessonCard />
    </Container>
  </Box>
);

export default CalendarPage;
