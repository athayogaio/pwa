import React, { useState } from 'react';
import {
  Box, Typography, Grid, Menu, MenuItem,
} from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Divider from '@mui/material/Divider';

const InfoDisplay = ({
  isIndividual, recipient, acc, inn, bic, status, fillInfo,
}) => {
  const individualCard = ['Получатель', 'Счет', 'ИНН', 'БИК'];
  const individualCardObj = [recipient, acc, inn, bic];

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = Boolean(anchorEl);
  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenu = menuItem => {
    if (menuItem === 'edit') {
      fillInfo(false, {
        recipient, acc, inn, bic,
      }, isIndividual);
    }
    if (menuItem === 'delete') {
      console.log('удаление');
    }
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.08)', borderRadius: '8px', p: '8px 24px 24px',
      }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column-reverse', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        mb: '16px',
        py: '7px',
      }}
      >
        <Typography color="primary" sx={{ fontSize: '16px', fontWeight: 500 }}>
          {isIndividual ? 'Физическое лицо' : 'Юридическое лицо'}
        </Typography>
        <Box sx={{
          width: { xs: '100%', md: '183px' },
          display: 'flex',
          justifyContent: { xs: 'space-between', md: 'flex-end' },
          alignItems: 'center',
          mb: { xs: '16px', md: 0 },
        }}
        >
          {status === 'accept' ? (
            <>
              <Typography
                color="success.light"
                sx={{
                  fontSize: '14px',
                  background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #2E7D32',
                  borderRadius: '16px',
                  p: '3px 10px',
                  mr: '24px',
                }}
              >
                Подтверждено
              </Typography>
              <MoreHorizOutlinedIcon
                fontSize="medium"
                id="basic-button"
                aria-controls={openMenu ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? 'true' : undefined}
                onClick={handleMenuClick}
                sx={{ color: '#9E9E9E', cursor: 'pointer' }}
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                sx={{
                  top: '12px',
                  '& .MuiPaper-root': {
                    boxShadow: '0px 4px 10px rgba(33, 33, 33, 0.25)',
                  },
                }}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem
                  sx={{ fontSize: '16px', minWidth: '220px', cursor: 'pointer' }}
                  onClick={() => handleClickMenu('edit')}
                >
                  <EditOutlinedIcon sx={{ mr: '14px' }} />
                  <Typography sx={{ fontSize: '16px' }}>Редактировать</Typography>
                </MenuItem>
                <Divider />
                <MenuItem
                  sx={{ fontSize: '16px', minWidth: '220px', cursor: 'pointer' }}
                  onClick={() => handleClickMenu('delete')}
                >
                  <DeleteOutlinedIcon color="error" sx={{ mr: '14px' }} />
                  <Typography color="error.main" sx={{ fontSize: '16px' }}>
                    Удалить
                  </Typography>
                </MenuItem>
              </Menu>
            </>
          )
            : (
              <Typography
                color="warning.main"
                sx={{
                  fontSize: '14px',
                  background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #ED6C02',
                  borderRadius: '16px',
                  p: '3px 10px',
                }}
              >
                На проверке
              </Typography>
            )}
        </Box>
      </Box>
      <Grid container justifyContent="space-between" rowSpacing={{ xs: 2, md: 3 }}>
        {individualCard.map((el, i) => (
          <Grid item xs={12} md={6} key={el}>
            <Typography color="text.disabled" sx={{ fontSize: '14px' }}>
              {el}
            </Typography>
            <Typography color="text.secondary" sx={{ textTransform: 'uppercase', fontSize: '16px' }}>
              {individualCardObj[i]}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InfoDisplay;
