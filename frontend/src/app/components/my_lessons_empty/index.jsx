/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box, Tabs, Tab,
} from '@mui/material';
import StudentEpmty from './student';
import TeacherEmpty from './teacher';

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

const labelProps = index => ({
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
      width: '100%', height: '85%', display: 'flex', justifyContent: 'center',
    }}
    >
      <Box sx={{ width: '100%', maxWidth: '984px' }}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange} centered>
          <Tab label="Преподаватель" {...labelProps(0)} />
          <Tab label="Ученик" {...labelProps(1)} />
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
  );
};

export default MyLessonsEmpty;
