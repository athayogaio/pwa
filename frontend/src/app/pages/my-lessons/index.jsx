import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Button, Grid,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import profileCalendar from '../../../assets/public/profile_calendar.png';
import getTicketsSlice from '../../core/slices/tickets/getTickets';
import { tickets } from './mockData';

const MyLessonsPage = () => {
  const dispatch = useDispatch();
  // const tickets = useSelector(state => state.tickets);

  useEffect(() => {
    dispatch(getTicketsSlice());
  }, [dispatch]);

  return (
    <Grid
      container
      flexDirection="column"
    >
      <Header title="Мои занятия" />
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

    </Grid>
  );
};

export default MyLessonsPage;
