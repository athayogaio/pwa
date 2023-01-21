import React from 'react';
import {Navigate, Outlet, Route, Routes,} from 'react-router-dom';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {createTheme} from '@mui/material/styles';
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
import CreateLessonPage from './pages/create_lesson';
import SearchLessonsPage from './pages/search-lessons';
import CalendarPage from './pages/calendar';
import SettingsPage from './pages/settings';
import MyLessonsPage from './pages/my-lessons';
import LessonDetailsPage from './pages/lesson-details';
import TeacherFormPage from './pages/teacher-form';
import FavoritesPage from './pages/favorites';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './theme/style.scss';

const theme = createTheme({
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
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.25rem',
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
    modal: {
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '120%',
      fontStyle: 'normal',
      color: '#616161',
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
          <Route path="recovery-password" element={<PasswordRecoveryPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route element={auth.isLoggedIn ? <Outlet /> : <Navigate replace to="/" />}>
            <Route path="search-lessons" element={<SearchLessonsPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="profile" element={<ProfilePage auth={auth} />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="create-lesson" element={<CreateLessonPage />} />
            <Route path="my-lessons" element={<MyLessonsPage />} />
            <Route path="lesson-details/:id" element={<LessonDetailsPage />} />
            <Route path="teacher-form" element={<TeacherFormPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
          </Route>
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
