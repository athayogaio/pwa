/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Button, Grid, Stack, Container, Backdrop, CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../components/header';
import getTicketsSlice from '../../core/slices/tickets/getTickets';
import MyLesson from '../../components/my_lesson';
import MyLessonSearch from '../../components/my_lesson_search';
import MyLessonsEmpty from '../../components/my_lessons_empty';

const MyLessonsPage = () => {
  const { isLoading, errorMessage } = useSelector(state => state.tickets);

  const dispatch = useDispatch();
  const tickets = useSelector(state => state.tickets.tickets?.data);

  useEffect(() => {
    dispatch(getTicketsSlice());
  }, [dispatch]);

  return (
    <Box width="100%" height="100%">
      <Header title="Мои занятия" />
      <Container sx={{
        overflow: 'auto', height: 'calc(100% - 0px)',
                outline: '1px solid green',
                maxWidth: '100%',
                maxHeight: 'calc(100% - 0px)',
      }}
      >
        {isLoading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        )}
        {errorMessage && (
        <Typography color="error.main">
          {`Error: ${errorMessage.errors.not_found[0]}`}
        </Typography>
        )}

        {!isLoading && (
        <>
          {tickets?.length ? (
            <>
              <Container sx={{
                overflow: 'auto', height: 'calc(100% - 180px)',
                outline: '1px solid red',
              }}
              >
                <Stack
                  direction="row"
                  sx={{
                    margin: '32px auto',
                    padding: '0 29px',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  phphpfftzasdfghjkl;mmnbvcxzqwertyuiop
                  {/* {tickets.map(ticket => (
                    <MyLesson
                      key={ticket.course.id}
                      id={ticket.course.id}
                      title={ticket.course.base_course.name}
                      ticketsAmount={ticket.amount}
                      endDate={ticket.course.deadline_datetime}
                      isOneTime={ticket.course.schedule.length === 0}
                    />
                  ))} */}
                  <MyLessonSearch />
                </Stack>
              </Container>

              {/* <Button
                component={Link}
                to="/create-lesson"
                variant="contained"
                sx={{
                  position: 'fixed',
                  bottom: '48px',
                  right: '48px',
                  p: '12px 16px',
                  boxShadow: '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12)',
                  borderRadius: '64px',
                }}
                size="large"
              >
                <Typography sx={{ mr: '8px', fontSize: '15px', lineHeight: '26px' }}>Создать занятие</Typography>
                <AddIcon />
              </Button> */}
            </>
          ) : (
            <MyLessonsEmpty />
          )}
        </>
        )}
      </Container>
    </Box>
  );
};

export default MyLessonsPage;
