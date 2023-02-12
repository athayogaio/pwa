/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteIconComponent from '../favorite-icon';
import { scheduleChipContent } from '../../utils/scheduleServices';

const LessonCard = ({
  title, description, price, level, id, favorite,
  comments, rate, votes, duration, schedule,
}) => {
  const navigate = useNavigate();

  const levels = {
    STARTING: 'Начинающий',
    CONTINUER: 'Средний',
    ADVANCED: 'Продвинутый',
  };

  return (
    <Box
      onClick={() => navigate(`/lesson-details/${id}`)}
      sx={{
        mb: '2%', borderRadius: '8px', boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.1)', width: '100%', cursor: 'pointer',
      }}
    >
      <Grid container alignItems="flex-start" justifyContent="center" height="100%">
        <Grid item xs container direction="column" sx={{ p: '24px' }}>
          <Grid item xs container justifyContent="space-between" sx={{ mb: '8px' }}>
            <Typography variant="h6">
              {title}
            </Typography>
            <FavoriteIconComponent favorite={favorite} id={id} />
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
              {rate}
            </Typography>
            <Typography variant="body1" color="text.disabled" sx={{ mr: '17px' }}>
              (
              {votes}
              {' '}
              оценок)
            </Typography>
            <ModeCommentOutlinedIcon
              color="text.secondary"
              sx={{
                width: '14px', height: '14px', transform: 'translateY(4px)', mr: '4px',
              }}
            />
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              {comments}
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
            {schedule && schedule.map(item => (
              <Chip key={crypto.randomUUID()} size="small" sx={{ fontSize: '13px' }} label={scheduleChipContent(item, duration)} />
            )) }
          </Grid>
          <Grid item xs container gap="6px" alignItems="center">
            <Avatar alt="name" src="avatar" sx={{ width: 32, height: 32 }} />
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
