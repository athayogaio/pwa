import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Button, Grid, Stack, Container,
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../components/header';
import getTicketsSlice from '../../core/slices/tickets/getTickets';
import MyLesson from '../../components/my_lesson';
import MyLessonSearch from '../../components/my_lesson_search';
import MyLessonsEmpty from '../../components/my_lessons_empty';

const MyLessonsPage = () => {
  const dispatch = useDispatch();
  const tickets = useSelector(state => state.tickets.tickets?.data);
  useEffect(() => {
    dispatch(getTicketsSlice());
  }, [dispatch]);

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Header title="Мои занятия" />
      {tickets?.length ? (
        <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
          <Container>
            <Stack
              direction="row"
              sx={{
                margin: '32px auto',
                padding: '0 29px',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {tickets.map(ticket => (
                <MyLesson
                  key={ticket.course.id}
                  title={ticket.course.base_course.name}
                  ticketsAmount={ticket.amount}
                  endDate={ticket.course.deadline_datetime}
                />
              ))}
              <MyLessonSearch />
            </Stack>
          </Container>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              component={Link}
              to="/create-lesson"
              variant="contained"
              sx={{
                mr: '48px',
                mb: '48px',
                p: '12px 16px',
                boxShadow: '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12)',
                borderRadius: '64px',
              }}
              size="large"
            >
              <Typography sx={{ mr: '8px', fontSize: '15px', lineHeight: '26px' }}>Создать занятие</Typography>
              <AddIcon />
            </Button>
          </Box>
        </Box>
      ) : (
        <MyLessonsEmpty />
      )}
    </Box>
  );
};

export default MyLessonsPage;
