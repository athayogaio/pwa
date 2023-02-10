import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

import ListItemIcon from '@mui/material/ListItemIcon';
import menuLogo from '../../../assets/public/menu_logo.svg';

const Menu = ({ auth, menuItems, prev }) => {
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

  const menuItemOtherStyle = {
    backgroundColor: 'primary.main',
    borderRadius: '5px',
    '& .MuiSvgIcon-root, & .MuiTypography-root': {
      color: 'common.white',
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
        {menuItems.map(({ link, title, icon }) => (
          <MenuItem
            component={NavLink}
            to={link}
            sx={[{ ...menuItemStyle }, prev === link && { ...menuItemOtherStyle }]}
            key={title}
          >
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={(
                <Typography
                  variant="body2"
                >
                  {title}
                </Typography>
                )}
            />
          </MenuItem>
        ))}
      </MenuList>
    </Box>
  );
};

export default Menu;
