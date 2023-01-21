import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Container,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LessonCard from '../../components/lesson-card';
import getFavoritesSlice from '../../core/slices/favorites/getFavorites';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const { favoritesLessons, errorMessage } = useSelector(state => state.favorites);
  console.log(favoritesLessons);

  useEffect(() => {
    dispatch(getFavoritesSlice());
  }, [dispatch]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: '100%', height: '64px', px: '29px', boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.1)', mb: '32px',
        }}
      >
        <Typography fontSize="24px" fontWeight="500" color="text.secondary">
          Избранное
        </Typography>
        <SettingsIcon color="disabled" />
      </Box>
      {errorMessage && (
        <Typography color="error.main">
          Error:
          {errorMessage}
        </Typography>
      )}
      <Container>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          width: '800px',
          gap: '24px',
          margin: '0 auto',
        }}
        >
          {favoritesLessons && favoritesLessons.data?.map(lesson => (
            <LessonCard
              key={lesson.id}
              id={lesson.id}
              title={lesson.name}
              description={lesson.description}
              price={lesson.price}
              level={lesson.level}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FavoritesPage;
