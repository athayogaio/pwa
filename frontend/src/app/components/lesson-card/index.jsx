/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Grid } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import addFavoritesSlice from '../../core/slices/favorites/addFavorites';
import removeFavoritesSlice from '../../core/slices/favorites/removeFavorites';

const LessonCard = ({
  title, description, price, level, id, favorite, isParticipant, comments, rate, votes,

}) => {
  const navigate = useNavigate();
  const levels = {
    STARTING: 'Начинающий',
    CONTINUER: 'Средний',
    ADVANCED: 'Продвинутый',
  };

  const dispatch = useDispatch();
  const setFavorite = e => {
    e.stopPropagation();
    if (favorite) {
      dispatch(removeFavoritesSlice(id));
    } else {
      dispatch(addFavoritesSlice(id));
    }
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

            <Stack direction="row" spacing={2}>
              {isParticipant && <Chip color="success" size="small" label="Вы участник" />}
              {favorite
                ? <FavoriteIcon onClick={setFavorite} fontSize="medium" sx={{ color: '#E91E63', '&:hover': { cursor: 'pointer' } }} />
                : <FavoriteBorderOutlinedIcon onClick={setFavorite} fontSize="medium" sx={{ color: '#9E9E9E', '&:hover': { cursor: 'pointer' } }} />}
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
            <Chip size="small" label="Пн 14:30-15:30" />
            <Chip size="small" label="Вт 14:30-15:30" />
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
