/* eslint-disable react/prop-types */
import React from 'react';
import {

  Box, Typography, Button, Tabs, Tab,
} from '@mui/material';
import { Link } from 'react-router-dom';
import profileCalendar from '../../../assets/public/profile_calendar.png';
import StudentEpmty from './student';
import TeacherEmpty from './teacher';

const TabPanel = props => {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{ height: '100%' }}
    >
      {value === index && (
        <Box sx={{
          height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

const a11yProps = index => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const MyLessonsEmpty = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{
      width: '100%', height: '100%', display: 'flex', justifyContent: 'center',
    }}
    >
      <Box sx={{ width: '100%', height: '100%', maxWidth: '984px' }}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange} centered>
          <Tab label="Преподаватель" {...a11yProps(0)} />
          <Tab label="Ученик" {...a11yProps(1)} />
        </Tabs>

        <TabPanel
          value={value}
          index={0}
        >
          <TeacherEmpty />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <StudentEpmty />
        </TabPanel>
      </Box>
    </Box>

  // <Grid
  //   item
  //   display="flex"
  //   flexDirection="column"
  //   alignItems="center"
  //   justifyContent="center"
  //   sx={{
  //     height: 'calc(100vh - 50px - 10vh)', maxHeight: '500px', justifyContent: 'space-between',
  //   }}
  // >

  //   <Box
  //     sx={{
  //       background: `center / contain no-repeat url(${profileCalendar})`, width: '100%', height: 'calc(100vh - 150px)', minHeight: '100px',
  //     }}
  //     mt="5vh"
  //     mb="7vh"
  //   />

  //   <Box>
  //     <Typography textAlign="center" fontSize="18px" color="text.secondary" mb="24px">
  //       Список занятий пока пуст
  //       {' '}
  //       <br />
  //       Запишитесь на свое первое занятие
  //     </Typography>
  //     <Button
  //       component={Link}
  //       to="/search-lessons"
  //       sx={{
  //         minWidth: 382, borderRadius: '6px', fontSize: '16px', lineHeight: '26px',
  //       }}
  //       variant="contained"
  //       size="large"
  //     >
  //       Найти занятие
  //     </Button>
  //   </Box>

  // </Grid>
  );
};

export default MyLessonsEmpty;
