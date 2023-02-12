import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Backdrop, CircularProgress,
} from '@mui/material';
import LessonCard from '../../components/lesson-card';
import getFavoritesSlice from '../../core/slices/favorites/getFavorites';
import Header from '../../components/header';
import LayoutContainer from '../../components/layout-container';
import StudentEpmty from '../../components/my_lessons_empty/student';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const { favoritesLessons, errorMessage, isLoading } = useSelector(state => state.favorites);

  useEffect(() => {
    dispatch(getFavoritesSlice());
  }, []);

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
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ maxWidth: '984px', width: '100%' }}>
            {!isLoading && Array.isArray(favoritesLessons) && (
              favoritesLessons?.length > 0
                ? (
                  favoritesLessons?.map(lesson => (
                    <LessonCard
                      key={lesson.id}
                      id={lesson.id}
                      title={lesson.base_course.name}
                      description={lesson.base_course.description}
                      price={lesson.price}
                      level={lesson.base_course.level}
                      favorite={lesson.favorite}
                      isParticipant={lesson.participant}
                      comments={lesson.comments_count}
                      rate={lesson.rate}
                      votes={lesson.votes_count}
                      schedule={lesson.schedule}
                      duration={lesson.duration}
                    />
                  ))) : (
                    <Box sx={{
                      width: '100%',
                      height: { xs: 'calc(100vh - 162px)', md: 'calc(100vh - 125px)' },
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    >
                      <StudentEpmty />
                    </Box>
                )
            )}
          </Box>
        </Box>
      </LayoutContainer>
    </>
  );
};

export default FavoritesPage;
