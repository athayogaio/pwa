import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Button, Grid, Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../components/header';
import profileCalendar from '../../../assets/public/profile_calendar.png';
import getTicketsSlice from '../../core/slices/tickets/getTickets';
import MyLesson from '../../components/my_lesson';
import MyLessonSearch from '../../components/my_lesson_search';

const MyLessonsPage = () => {
  const dispatch = useDispatch();
  const tickets = useSelector(state => state.tickets.tickets?.data);
  useEffect(() => {
    dispatch(getTicketsSlice());
  }, [dispatch]);

  return (
    <Grid
      container
      flexDirection="column"
    >
      <Header title="Мои занятия" />
      {tickets?.length ? (
        <Stack
          direction="row"
          sx={{
            margin: '32px auto',
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
            />
          ))}
        </Stack>
      ) : (
        <Grid
          item
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: 'calc(100vh - 50px - 10vh)', maxHeight: '500px', justifyContent: 'space-between',
          }}
        >

          <Box
            sx={{
              background: `center / contain no-repeat url(${profileCalendar})`, width: '100%', height: 'calc(100vh - 150px)', minHeight: '100px',
            }}
            mt="5vh"
            mb="7vh"
          />

          <Box>
            <Typography textAlign="center" fontSize="18px" color="text.secondary" mb="24px">
              Список занятий пока пуст
              {' '}
              <br />
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
          </Box>

        </Grid>
      )}

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
};

export default MyLessonsPage;
