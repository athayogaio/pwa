/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Button, Grid, Stack, Container, Backdrop, CircularProgress, Tabs, Tab,
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../components/header';
import LayoutContainer from '../../components/layout-container';
import getTicketsSlice from '../../core/slices/tickets/getTickets';
import MyLesson from '../../components/my_lesson';
import MyLessonSearch from '../../components/my_lesson_search';
import MyLessonsEmpty from '../../components/my_lessons_empty';
import MyTeacherLesson from '../../components/my-teacher-lesson';
import TeacherEmpty from '../../components/my_lessons_empty/teacher';
import StudentEpmty from '../../components/my_lessons_empty/student';

const TabPanel = props => {
  const {
    children, value, index,
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      style={{ width: '100%', maxHeight: '560px' }}
    >
      {value === index && (
        <Box display="flex" justifyContent="center">
          {children}
        </Box>
      )}
    </div>
  );
};

const labelProps = index => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const MyLessonsPage = () => {
  const { isLoading, errorMessage } = useSelector(state => state.tickets);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const tickets = useSelector(state => state.tickets.tickets?.data);

  useEffect(() => {
    dispatch(getTicketsSlice());
  }, [dispatch]);

  return (
    <>
      <Header title="Мои занятия" />
      <LayoutContainer>
        <Box sx={{
          height: 'calc(100% - 64px - 251px);', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '2%',
        }}
        >
          <Box sx={{
            display: 'flex', justifyContent: 'center', ml: '34px', mb: '11vh',
          }}
          >
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Преподаватель" {...labelProps(0)} sx={{ width: '156px' }} />
              <Tab label="Ученик" {...labelProps(1)} sx={{ width: '156px' }} />
            </Tabs>
          </Box>
          <Box sx={{
            height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap',
          }}
          >
            <TabPanel value={value} index={0}>
              {!isLoading && (
                <>
                  {tickets?.length ? (
                    <>
                      <Stack
                        direction="row"
                        sx={{
                          pl: { xs: '0', md: '24px' },
                          maxWidth: '1035px',
                          width: '100%',
                          maxHeight: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexWrap: 'wrap',
                        // outline: '1px solid blue',
                        }}
                      >
                        {tickets.map(ticket => (
                          <MyTeacherLesson
                            key={ticket.course.id}
                            id={ticket.course.id}
                            title={ticket.course.base_course.name}
                            endDate={ticket.course.deadline_datetime}
                            status={ticket.course.status}
                          />
                        ))}
                      </Stack>
                      <Button
                        component={Link}
                        to="/create-lesson"
                        variant="contained"
                        sx={{
                          position: 'fixed',
                          bottom: '58px',
                          right: '48px',
                          p: '12px 16px',
                          boxShadow: '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12)',
                          borderRadius: '64px',
                        }}
                        size="large"
                      >
                        <Typography sx={{ mr: '8px', fontSize: '15px', lineHeight: '26px' }}>Создать занятие</Typography>
                        <AddIcon />
                      </Button>
                    </>
                  ) : (
                    <Box sx={{ maxWidth: '440px', margin: '0 auto' }}>
                      <TeacherEmpty />
                    </Box>
                  )}

                </>
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {!isLoading && (
              <>
                {tickets?.length ? (
                  <>
                    <Stack
                      direction="row"
                      sx={{
                        pl: { xs: '0', md: '24px' },
                        maxWidth: '1035px',
                        maxHeight: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                      // outline: '1px solid blue',
                      }}
                    >
                      {tickets.map(ticket => (
                        <MyLesson
                          key={ticket.course.id}
                          id={ticket.course.id}
                          title={ticket.course.base_course.name}
                          ticketsAmount={ticket.amount}
                          endDate={ticket.course.deadline_datetime}
                          isOneTime={ticket.course.schedule.length === 0}
                        />
                      ))}
                      <MyLessonSearch />
                    </Stack>

                    <Button
                      component={Link}
                      to="/create-lesson"
                      variant="contained"
                      sx={{
                        position: 'fixed',
                        bottom: '58px',
                        right: '48px',
                        p: '12px 16px',
                        boxShadow: '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12)',
                        borderRadius: '64px',
                      }}
                      size="large"
                    >
                      <Typography sx={{ mr: '8px', fontSize: '15px', lineHeight: '26px' }}>Создать занятие</Typography>
                      <AddIcon />
                    </Button>
                  </>
                ) : (
                  <Box sx={{ maxWidth: '440px', margin: '0 auto' }}>
                    <StudentEpmty />
                  </Box>
                )}

              </>
              )}
            </TabPanel>
          </Box>
        </Box>
        {isLoading && (
        <Backdrop
          sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: theme => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress />
        </Backdrop>
        )}
        {errorMessage && (
        <Typography color="error.main">
          {`Error: ${errorMessage.errors.not_found[0]}`}
        </Typography>
        )}
      </LayoutContainer>
    </>
  );
};

export default MyLessonsPage;
