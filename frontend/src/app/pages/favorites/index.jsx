import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Container, Backdrop, CircularProgress,
} from '@mui/material';
import LessonCard from '../../components/lesson-card';
import getFavoritesSlice from '../../core/slices/favorites/getFavorites';
import Header from '../../components/header';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const { favoritesLessons, errorMessage, isLoading } = useSelector(state => state.favorites);

  useEffect(() => {
    dispatch(getFavoritesSlice());
  }, [dispatch]);

  return (
    <Box width="100%" height="100%">
      <Header title="Избранное" />
      {isLoading && (
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      )}
      {errorMessage && (
        <Typography color="error.main">
          {`Error: ${errorMessage.errors.not_found[0]}`}
        </Typography>
      )}
      <Container
        sx={{
          mt: '32px', mb: '96px',
        }}
      >
        <Box
          maxWidth="984px"
        >
          {!isLoading && Array.isArray(favoritesLessons) && (
            favoritesLessons?.length > 0
              ? (
                favoritesLessons?.map(lesson => (
                  <LessonCard
                    key={lesson.id}
                    id={lesson.base_course.id}
                    title={lesson.base_course.name}
                    description={lesson.base_course.description}
                    price={lesson.price}
                    level={lesson.base_course.level}
                    favorite={lesson.favorite}
                  />
                ))) : ('Ничего не найдено')
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default FavoritesPage;
