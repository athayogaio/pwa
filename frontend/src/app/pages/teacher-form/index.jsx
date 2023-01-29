import React from 'react';
import { Box, Container } from '@mui/material';
import TeacherForm from '../../components/teacher-form';
import Header from '../../components/header';

const TeacherFormPage = () => (
  <Box>
    <Header withBackBtn />
    <Container>
      <Box display="flex" justifyContent="center" mb="116px">
        <TeacherForm />
      </Box>
    </Container>
  </Box>
);

export default TeacherFormPage;
