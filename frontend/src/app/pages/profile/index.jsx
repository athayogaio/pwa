import React from 'react';
import { Navigate } from 'react-router-dom';
import ProfileCard from '../../components/profile';
import Header from '../../components/header';
import LayoutContainer from '../../components/layout-container';

const ProfilePage = ({ auth: { user } }) => {
  if (!user) {
    return (
      <Navigate to="/login" />
    );
  }

  return (
    <>
      <Header title="Профиль" />
      <LayoutContainer>
        <ProfileCard user={user} />
      </LayoutContainer>
    </>
  );
};

export default ProfilePage;
