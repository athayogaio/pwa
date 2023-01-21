import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Container,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LessonCard from '../../components/lesson-card';
import getFavoritesSlice from '../../core/slices/favorites/getFavorites';
import Header from '../../components/header';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const { favoritesLessons, errorMessage } = useSelector(state => state.lessons);

  useEffect(() => {
    dispatch(getFavoritesSlice());
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Header title="Избранное" />
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
