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
      style={{ width: '100%', maxHeight: '560px' }}
    >
      {value === index && (
        <Box>
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
      <Box sx={{ height: '100%', width: '100%', maxWidth: '414px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <TabPanel value={value} index={0}>
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
