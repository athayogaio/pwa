/* eslint-disable max-len */
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
import { getStudentTicketsSlice, getTeacherTicketsSlice } from '../../core/slices/tickets/getTickets';
import MyLesson from '../../components/my_lesson';
import MyLessonSearch from '../../components/my_lesson_search';
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
      style={{ width: '100%' }}
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
  const { isLoading: isStudentLoading, errorMessage: errorStudentMessage } = useSelector(state => state.studentTickets);
  const { isLoading: isTeacherLoading, errorMessage: errorTeacherMessage } = useSelector(state => state.teacherTickets);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const studentTickets = useSelector(state => state.studentTickets.studentTickets?.data);
  const teacherTickets = useSelector(state => state.teacherTickets.teacherTickets?.data);

  useEffect(() => {
    dispatch(getStudentTicketsSlice());
    dispatch(getTeacherTicketsSlice());
  }, [dispatch]);

  return (
    <>
      <Header title="Мои занятия" />
      <LayoutContainer>
        <Box sx={{
          height: 'calc(100% - 64px);', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '2%',
        }}
        >
          <Box sx={{
            display: 'flex', justifyContent: 'center', ml: '34px',
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
              {errorTeacherMessage && (
              <Typography color="error.main">
                {`Error: ${errorTeacherMessage.errors.not_found[0]}`}
              </Typography>
              )}
              {isTeacherLoading && (
              <Backdrop
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: theme => theme.zIndex.drawer + 1 }}
                open={isTeacherLoading}
              >
                <CircularProgress />
              </Backdrop>
              )}
              {!isTeacherLoading && (
                <>
                  {teacherTickets?.length ? (
                    <>
                      <Stack
                        direction="row"
                        sx={{
                          pl: { xs: '0', md: '24px' },
                          maxWidth: '1035px',
                          width: '100%',
                          maxHeight: '100%',
                          mt: '24px',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexWrap: 'wrap',
                        // outline: '1px solid blue',
                        }}
                      >
                        {teacherTickets.map(ticket => (
                          <MyTeacherLesson
                            key={ticket.id}
                            id={ticket.id}
                            title={ticket.base_course.name}
                            endDate={ticket.deadline_datetime}
                            status={ticket.status}
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
                    <Box sx={{ maxWidth: '440px', margin: '11vh auto 0 auto' }}>
                      <TeacherEmpty />
                    </Box>
                  )}

                </>
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {errorStudentMessage && (
              <Typography color="error.main">
                {`Error: ${errorStudentMessage.errors.not_found[0]}`}
              </Typography>
              )}
              {isStudentLoading && (
              <Backdrop
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: theme => theme.zIndex.drawer + 1 }}
                open={isStudentLoading}
              >
                <CircularProgress />
              </Backdrop>
              )}
              {!isStudentLoading && (
              <>
                {studentTickets?.length ? (
                  <>
                    <Stack
                      direction="row"
                      sx={{
                        pl: { xs: '0', md: '24px' },
                        maxWidth: '1035px',
                        maxHeight: '100%',
                        mt: '24px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                      // outline: '1px solid blue',
                      }}
                    >
                      {studentTickets.map(ticket => (
                        <MyLesson
                          key={ticket.course.id}
                          id={ticket.course.id}
                          title={ticket.course.base_course.name}
                          ticketsAmount={ticket.amount}
                          endDate={ticket.course.deadline_datetime}
                          isOneTime={ticket.course.schedule.length === 0}
                          nearestLesson={ticket.course.start_datetime}
                          duration={ticket.course.duration}
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
                  <Box sx={{ maxWidth: '440px', margin: '11vh auto 0 auto' }}>
                    <StudentEpmty />
                  </Box>
                )}

              </>
              )}
            </TabPanel>
          </Box>
        </Box>
        {/* {(isTeacherLoading || isStudentLoading) && (
        <Backdrop
          sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: theme => theme.zIndex.drawer + 1 }}
          open={isTeacherLoading || isStudentLoading}
        >
          <CircularProgress />
        </Backdrop>
        )} */}
        {/* {errorMessage && (
        <Typography color="error.main">
          {`Error: ${errorMessage.errors.not_found[0]}`}
        </Typography>
        )} */}
      </LayoutContainer>
    </>
  );
};

export default MyLessonsPage;
