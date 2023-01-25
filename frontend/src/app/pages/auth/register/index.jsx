import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../../utils/hooks/useAuth';
import SignUp from '../../../components/sign-up';

const RegisterPage = () => {
  const auth = useAuth();

  if (auth.isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <SignUp />
  );
};

export default RegisterPage;
