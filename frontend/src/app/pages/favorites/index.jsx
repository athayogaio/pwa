import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Backdrop, CircularProgress,
} from '@mui/material';
import LessonCard from '../../components/lesson-card';
import getFavoritesSlice from '../../core/slices/favorites/getFavorites';
import Header from '../../components/header';
import LayoutContainer from '../../components/layout-container';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const { favoritesLessons, errorMessage, isLoading } = useSelector(state => state.favorites);

  useEffect(() => {
    dispatch(getFavoritesSlice());
  }, [dispatch]);

  return (
    <>
      <Header title="Избранное" />
      <LayoutContainer>
        {isLoading && (
        <Backdrop
          sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: theme => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress />
        </Backdrop>
        )}
        {errorMessage && (
          <Typography color="error.main">
            {`Error: ${errorMessage.errors.not_found[0]}`}
          </Typography>
        )}
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
      </LayoutContainer>
    </>
  );
};

export default FavoritesPage;
