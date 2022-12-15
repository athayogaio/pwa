import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import WelcomePage from './pages/welcome';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import ProfilePage from './pages/profile';
import ErrorPage from './pages/error';
import PasswordRecoveryPage from './pages/password-recovery';
import AuthProvider from './utils/providers/auth';
import BaseLayout from './layouts';
import ProfileLayout from './layouts/profile';
import useAuth from './utils/hooks/useAuth';
import Calendar from './components/calendar';
import Searching from './components/searching';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './theme/style.scss';

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 500,
      desktop: 1200,
    },
  },
  palette: {
    primary: {
      main: '#0D6EFD',
    },
    text: {
      primary: '#212121',
      secondary: '#616161',
    },
  },
  typography: {
    h4: {
      fontWeight: 500,
    },
    h1: {
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.25rem',
      lineHeight: 1.2,
    },
    roboto_h3: {
      fontFamily: 'Roboto',
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: 1.2,
    },
    iter_h1: {
      fontFamily: 'Inter',
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: 1.2,
    },
    iter_h2: {
      fontFamily: 'Inter',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: 1.2,
    },
  },
});

const App = () => {
  const auth = useAuth();
  const Layout = auth.isLoggedIn ? ProfileLayout : BaseLayout;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout auth={auth} />}>
          <Route index element={!auth.isLoggedIn ? <WelcomePage /> : <Navigate replace to="profile" />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profile" element={<ProfilePage auth={auth} />} />
          <Route path="recovery-password" element={<PasswordRecoveryPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="searching" element={<Searching />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

const Root = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default Root;
