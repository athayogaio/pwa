import { Box, Container } from '@mui/material';
import React from 'react';
import ScheduleLessonCard from '../../components/schedule-lesson-card';
import Header from '../../components/header';

const CalendarPage = () => (
  <Box width="100%" height="100%">
    <Header title="Календарь" />
    <Container>
      <ScheduleLessonCard />
    </Container>
  </Box>
);

export default CalendarPage;
