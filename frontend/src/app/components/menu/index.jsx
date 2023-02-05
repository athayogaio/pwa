import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

import ListItemIcon from '@mui/material/ListItemIcon';
import menuLogo from '../../../assets/public/menu_logo.svg';

const Menu = ({ auth, menuItems }) => {
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
    <Box sx={{ width: '100%', height: '100vh', backgroundColor: 'grey.A100' }}>
      <MenuList
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          px: 2,
          pt: 2.5,
          gap: '8px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <img src={menuLogo} alt="atha yoga logo" style={{ width: '103px', height: '26px' }} />
        </div>
        {menuItems.map(el => (
          <MenuItem
            component={NavLink}
            to={el.link}
            sx={{ ...menuItemStyle }}
            key={el.title}
          >
            <ListItemIcon>
              {el.icon}
            </ListItemIcon>
            <ListItemText
              primary={(
                <Typography
                  variant="body2"
                >
                  {el.title}
                </Typography>
                )}
            />
          </MenuItem>
        ))}
      </MenuList>

      <Typography
        component={Link}
        variant="body2"
        color="text.secondary"
        to="/"
        sx={{
          textDecoration: 'none', position: 'absolute', bottom: '50px', left: '20px',
        }}
      >
        О проекте
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        onClick={auth.logout}
        sx={{
          position: 'absolute', bottom: '20px', left: '20px', cursor: 'pointer',
        }}
      >
        Выход
      </Typography>
    </Box>
  );
};

export default Menu;
