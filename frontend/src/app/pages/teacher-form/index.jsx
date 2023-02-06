import React from 'react';
import { Box } from '@mui/material';
import TeacherForm from '../../components/teacher-form';
import Header from '../../components/header';
import LayoutContainer from '../../components/layout-container';

const TeacherFormPage = () => (
  <Box width="100%" height="100%">
    <Header withBackBtn />
    <LayoutContainer>
      <Box display="flex" justifyContent="center" mb="116px">
        <TeacherForm />
      </Box>
    </LayoutContainer>
  </Box>
);

export default TeacherFormPage;
