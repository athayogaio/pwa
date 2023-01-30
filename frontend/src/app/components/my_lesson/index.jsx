import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card, Divider, Grid, Menu, MenuItem, Typography,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ticket from '../../../assets/public/ticket.svg';

const MyLesson = ({ title, ticketsAmount, endDate }) => {
  const prepareEndDate = date => `${date.split('T')[0].split('-').reverse().join('.')} ${date.split('T')[1].slice(0, 5)}`;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div style={{
      padding: '20px 24px 20px 30px',
      borderRadius: '16px',
      width: '480px',
      marginRight: '24px',
      marginBottom: '24px',
      background: `center / contain no-repeat url(${ticket})`,
      filter: 'drop-shadow(0px 8px 16px rgba(46, 60, 80, .08))',
    }}
    >
      <MoreHorizOutlinedIcon
        color="disabled"
        sx={{ position: 'absolute', top: '10px', right: '20px' }}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} sx={{ fontSize: '16px', minWidth: '220px' }}>
          <DeleteOutlinedIcon sx={{ marginRight: '19px' }} />
          {'   '}
          Удалить

        </MenuItem>
      </Menu>
      <Stack
        direction="row"
        spacing={2}
      >
        <Grid container direction="column" gap="16px" width="207%">
          <div>
            <Typography
              variant="h6"
              paragraph
              sx={{
                fontSize: '18px',
                maxWidth: '271px',
                height: '43px',
                mb: '0',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {title}
            </Typography>
          </div>
          <Grid container direction="column">
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '13px', mb: '7px' }}>
              Ближайшее занятие:
            </Typography>
            <Grid container>
              <DateRangeOutlinedIcon
                color="primary"
                size="small"
                sx={{ transform: 'translateY(-2px)', mr: '6px' }}
              />
              <Typography variant="body1" sx={{ mr: '13px' }}>
                Пн, 26 дек
              </Typography>
              <AccessTimeIcon
                color="primary"
                sx={{ transform: 'translateY(-2px)', mr: '6px' }}
              />
              <Typography variant="body1">
                14:00 - 15:30
              </Typography>
            </Grid>
          </Grid>
          <Grid container gap="6px" alignItems="center">
            <Avatar alt="name" src="avatar" sx={{ width: 32, height: 32 }} />
            <Typography variant="body1">
              Виктор Васильев
            </Typography>
          </Grid>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed', position: 'relative' }} />
        <Grid container direction="column" gap="12px" alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="body1" sx={{ fontWeight: '500', textAlign: 'center' }}>
              Осталось посещений:
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4" color="primary">
              {ticketsAmount}
            </Typography>
          </Grid>
          <Grid container direction="column" spacing={1} alignItems="center">
            <Typography variant="body2">
              Дата окончания:
            </Typography>
            <Typography color="primary" variant="body2" sx={{ fontWeight: '500' }}>
              {prepareEndDate(endDate)}
            </Typography>

          </Grid>
        </Grid>
      </Stack>
    </div>
  );
};

export default MyLesson;
