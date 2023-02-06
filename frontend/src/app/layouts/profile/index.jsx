import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
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

const menuItems = [
  {
    title: 'Поиск',
    icon: <SearchIcon />,
    link: '/search-lessons',
  },
  {
    title: 'Избранное',
    icon: <FavoriteBorderIcon />,
    link: '/favorites',
  },
  {
    title: 'Мои занятия',
    icon: <SchoolOutlinedIcon />,
    link: '/my-lessons',
  },
  {
    title: 'Календарь',
    icon: <DateRangeIcon />,
    link: '/calendar',
  },
  {
    title: 'Профиль',
    icon: <AccountCircleOutlinedIcon />,
    link: '/profile',
  },
];

const menuItemStyle = {
  '&:hover, &.active': {
    '& .MuiSvgIcon-root': {
      color: 'primary.main',
    },
  },
  svg: {
    width: '24px',
    height: '24px',
  },
};

const ProfileLayout = ({ auth }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box sx={{ display: 'flex', maxWidth: '100vw', maxHeight: '100vh' }}>

      {matches && (
        <Box sx={{
          display: 'flex',
          width: '256px',
          maxHeight: '100vh',
        }}
        >
          <Menu auth={auth} menuItems={menuItems} />
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
            position: 'fixed', bottom: 0, left: 0, right: 0,
          }}
          elevation={3}
        >
          <BottomNavigation>
            {menuItems.map(el => (
              <BottomNavigationAction
                key={el.title}
                sx={{ ...menuItemStyle }}
                component={NavLink}
                to={el.link}
                label=""
                icon={el.icon}
              />
            ))}
          </BottomNavigation>
        </Paper>
      )}

    </Box>
  );
};

export default ProfileLayout;
