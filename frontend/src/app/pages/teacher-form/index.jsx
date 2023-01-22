import React from 'react';
import { Box } from '@mui/material';
import TeacherForm from '../../components/teacher-form';
import Header from '../../components/header';

const TeacherFormPage = () => {
  return (
    <Box>
     <Header title="Стать преподавателем" withBackBtn />
      <Box display="flex" justifyContent="center" mb="116px">
        <TeacherForm />
      </Box>
    </Box>
  );
};

export default TeacherFormPage;
