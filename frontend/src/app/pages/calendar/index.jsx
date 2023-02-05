import React from 'react';
import ScheduleLessonCard from '../../components/schedule-lesson-card';
import Header from '../../components/header';
import LayoutContainer from '../../components/layout-container';

const CalendarPage = () => (
  <>
    <Header title="Календарь" />
    <LayoutContainer>
      <ScheduleLessonCard />
      <ScheduleLessonCard />
      <ScheduleLessonCard />
      <ScheduleLessonCard />
      <ScheduleLessonCard />
      <ScheduleLessonCard />
      <ScheduleLessonCard />
      <ScheduleLessonCard />
      <ScheduleLessonCard />
      <ScheduleLessonCard />
    </LayoutContainer>
  </>
);

export default CalendarPage;
