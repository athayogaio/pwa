import React from 'react';
import { Typography } from '@mui/material';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import SearchIcon from '@mui/icons-material/Search';
import ListItemText from '@mui/material/ListItemText';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import menuLogo from '../../../assets/public/menu_logo.svg';

const Menu = ({ auth }) => {
  const menuItemStyle = {
    minHeight: '36px',
    '& .MuiTypography-root': {
      color: 'text.secondary',
    },
    '&:hover, &.active': {
      backgroundColor: 'primary.main',
      borderRadius: '5px',
      '& .MuiSvgIcon-root, & .MuiTypography-root': {
        color: 'common.white',
      },
    },
  };
  return (
    <Box sx={{ width: '100%' }}>
      <MenuList
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          p: 2,
          backgroundColor: '#F5F5F5',
          gap: '6px',
        }}
      >
        <button onClick={auth.logout}>Logout</button>
        <div style={{ textAlign: 'center', marginBottom: '18px' }}>
          <img src={menuLogo} alt="atha yoga logo" style={{ width: '103px', height: '26px' }} />
        </div>
        <MenuItem
          component={NavLink}
          to="search-lessons"
          sx={{ ...menuItemStyle }}
        >
          <ListItemIcon>
            <SearchIcon color="disabled" fontSize="medium" />
          </ListItemIcon>
          <ListItemText
            primary={(
              <Typography
                variant="body2"
              >
                Поиск
              </Typography>
              )}
          />
        </MenuItem>
        <MenuItem component={NavLink} to="/favorites" sx={{ ...menuItemStyle }}>
          <ListItemIcon>
            <FavoriteBorderIcon color="disabled" fontSize="medium" />
          </ListItemIcon>
          <ListItemText
            primary={(
              <Typography
                variant="body2"
              >
                Избранное
              </Typography>
              )}
          />
        </MenuItem>
        <MenuItem component={NavLink} to="/my-lessons" sx={{ ...menuItemStyle }}>
          <ListItemIcon>
            <SchoolOutlinedIcon color="disabled" fontSize="medium" />
          </ListItemIcon>
          <ListItemText
            primary={(
              <Typography
                variant="body2"
              >
                Мои занятия
              </Typography>
                )}
          />
        </MenuItem>
        <MenuItem component={NavLink} to="/calendar" sx={{ ...menuItemStyle }}>
          <ListItemIcon>
            <CalendarMonthOutlinedIcon color="disabled" fontSize="medium" />
          </ListItemIcon>
          <ListItemText
            primary={(
              <Typography
                variant="body2"
              >
                Календарь
              </Typography>
                )}
          />
        </MenuItem>
        <MenuItem component={NavLink} to="/profile" sx={{ ...menuItemStyle }}>
          <ListItemIcon>
            <AccountCircleOutlinedIcon color="disabled" fontSize="medium" />
          </ListItemIcon>
          <ListItemText
            primary={(
              <Typography
                variant="body2"
              >
                Профиль
              </Typography>
                )}
          />
        </MenuItem>
        <MenuItem component={NavLink} to="/teacher-form" sx={{ ...menuItemStyle }}>
          <ListItemIcon>
            <AccountCircleOutlinedIcon color="disabled" fontSize="medium" />
          </ListItemIcon>
          <ListItemText
            primary={(
              <Typography
                variant="body2"
              >
                Стать преподавателем
              </Typography>
                )}
          />
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default Menu;
