import React from 'react';
import {Box} from '@mui/material';
import Header from '../../components/header';
import LayoutContainer from '../../components/layout-container';
import PersonDataTeacher from '../../components/personal-data/teacher';
import PersonDataStudent from '../../components/personal-data/student';

const PersonalDataPage = () => {
  const userDataLocal = (JSON.parse(localStorage.getItem('user'))).user;

  return (
    <>
      <Header withBackBtn />
      <LayoutContainer>
        <Box display="flex" justifyContent="center">
          {userDataLocal.public_teacher_profiles.length !== 0
            ? <PersonDataTeacher />
            : <PersonDataStudent />}
        </Box>
      </LayoutContainer>
    </>
  );
};

export default PersonalDataPage;
