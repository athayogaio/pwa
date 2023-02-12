import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  Box, BottomNavigation, BottomNavigationAction, Paper,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

import Menu from '../../components/menu';
import AlertNotification from '../../components/alert-notification';

const menuItems = [
  {
    title: 'Поиск',
    icon: <SearchIcon color="disabled" fontSize="medium" />,
    link: '/search-lessons',
  },
  {
    title: 'Избранное',
    icon: <FavoriteBorderIcon color="disabled" fontSize="medium" />,
    link: '/favorites',
  },
  {
    title: 'Мои занятия',
    icon: <SchoolOutlinedIcon color="disabled" fontSize="medium" />,
    link: '/my-lessons',
  },
  {
    title: 'Календарь',
    icon: <DateRangeIcon color="disabled" fontSize="medium" />,
    link: '/calendar',
  },
  {
    title: 'Профиль',
    icon: <AccountCircleOutlinedIcon color="disabled" fontSize="medium" />,
    link: '/profile',
  },
];

const menuItemStyle = {
  '&:hover, &.active': {
    '& .MuiSvgIcon-root': {
      color: 'primary.main',
    },
  },
  '& .MuiSvgIcon-root': {
    width: '24px',
    height: '24px',
  },
};

const menuItemOtherStyle = {
  '& .MuiSvgIcon-root': {
    color: 'primary.main',
  },
};

const ProfileLayout = ({ auth }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const currentUrl = useLocation();
  const [prev, setPrev] = useState('');
  const menuPath = ['search-lessons', 'favorites', 'my-lessons', 'calendar', 'profile'];

  useEffect(() => {
    menuPath.map(el => {
      if (currentUrl.pathname.includes(el)) {
        setPrev(currentUrl.pathname);
      } else if (currentUrl.pathname.includes('settings')) {
        setPrev('');
      }
      return null;
    });
  }, [currentUrl]);

  const [isAlert, setIsAlert] = useState(false);
  const { alertProps } = useSelector(state => state.alertNotification);

  useEffect(() => {
    setIsAlert(alertProps.display);
  }, [alertProps]);

  return (
    <Box sx={{ display: 'flex', maxWidth: '100vw', maxHeight: '100vh' }}>

      {matches && (
        <Box sx={{
          display: 'flex',
          width: '256px',
          maxHeight: '100vh',
        }}
        >
          <Menu auth={auth} menuItems={menuItems} prev={prev} />
        </Box>
      )}

      <Box sx={matches
        ? {
          width: 'calc(100vw - 256px)',
          height: '100vh',
          maxHeight: '100vh',
        }
        : {
          maxWidth: '100vw',
          width: '100vw',
          height: '100vh',
          maxHeight: 'calc(100vh - 64px)',
        }}
      >
        <Outlet />
      </Box>

      {!matches && (
        <Paper
          sx={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1,
          }}
          elevation={3}
        >
          <BottomNavigation>
            {menuItems.map(el => (
              <BottomNavigationAction
                key={el.title}
                sx={[{ ...menuItemStyle }, prev === el.link && { ...menuItemOtherStyle }]}
                component={NavLink}
                to={el.link}
                label=""
                icon={el.icon}
              />
            ))}
          </BottomNavigation>
        </Paper>
      )}

      {isAlert && (
      <Box sx={{
        position: { xs: 'absolute' },
        top: { xs: '72px', md: 'auto' },
        right: { xs: '20px', md: '24px' },
        left: { xs: '20px', sm: '276px', md: 'auto' },
        bottom: { xs: 'auto', md: '40px' },
        zIndex: '1',
      }}
      >
        <AlertNotification
          status={alertProps.status}
          title={alertProps.title}
          text={alertProps.text}
          setIsActive={setIsAlert}
        />
      </Box>
      )}

    </Box>
  );
};

export default ProfileLayout;
