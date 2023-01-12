/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

const LessonCard = ({
  title, description, price, level,
}) => {
  const levels = {
    STARTING: 'Начинающий',
    MEDIUM: 'Средний',
    ADVANCED: 'Продвинутый',
  };

  return (

    <Box
      width="100%"
      sx={{ borderRadius: '8px', boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.1)' }}
    >
      <Grid container alignItems="flex-start" justifyContent="center" height="100%">
        <Grid item xs container direction="column" sx={{ p: '24px' }}>
          <Grid item xs container justifyContent="space-between" sx={{ mb: '8px' }}>
            <Typography variant="h6">
              {title}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Chip color="success" size="small" label="Вы участник" />
              <FavoriteIcon fontSize="medium" sx={{ color: '#E91E63' }} />
            </Stack>
          </Grid>
          <Grid item sx={{ flex: '1 0 auto' }}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: '24px' }}
            >
              {levels[level]}
            </Typography>
          </Grid>
          <Grid item xs container sx={{ mb: '24px' }}>
            <Typography variant="h6" sx={{ mr: '17px' }}>
              ₽
              {' '}
              {price}
            </Typography>
            <StarBorderIcon sx={{
              color: '#FF9800', width: '16px', height: '16px', transform: 'translateY(2px)', mr: '4px',
            }}
            />
            <Typography variant="body1" sx={{ fontWeight: '500', mr: '3px' }}>
              4.8
            </Typography>
            <Typography variant="body1" color="text.disabled" sx={{ mr: '17px' }}>
              (505 оценок)
            </Typography>
            <ModeCommentOutlinedIcon
              color="text.secondary"
              sx={{
                width: '14px', height: '14px', transform: 'translateY(4px)', mr: '4px',
              }}
            />
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              505
            </Typography>
          </Grid>
          <Grid item sx={{ flex: '1 0 auto' }}>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ mb: '27px' }}
            >
              {description}
            </Typography>
          </Grid>
          <Grid item xs container gap="8px" sx={{ mb: '28px' }}>
            <Chip size="small" label="Пн 14:30-15:30" />
            <Chip size="small" label="Вт 14:30-15:30" />
          </Grid>
          <Grid item xs container gap="6px" alignItems="center">
            <Avatar alt="name" src="avatar" />
            <Typography variant="body1">
              Виктор Васильев
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default LessonCard;
