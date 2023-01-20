import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams } from 'react-router-dom';
import LessonDescription from '../../components/lesson-description';
import getLessonSlice from '../../core/slices/lesson/getLesson';

const LessonDetailsPage = () => {
  const levels = {
    STARTING: 'Начинающий',
    MEDIUM: 'Средний',
    ADVANCED: 'Продвинутый',
  };

  const { id } = useParams();

  const dispatch = useDispatch();
  const { lesson, errorMessage } = useSelector(state => state.lesson);

  useEffect(() => {
    dispatch(getLessonSlice(id));
  }, []);

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: '100%', minHeight: '64px', px: '29px', boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.1)', mb: '32px',
        }}
      >
        <Typography component={Link} to="/search-lessons" fontSize="24px" fontWeight="500" color="text.secondary" sx={{ textDecoration: 'none' }}>
          <ArrowBackIcon sx={{ mr: '14px', verticalAlign: '-2px' }} fontSize="medium" color="action" />
          Назад
        </Typography>
        <SettingsIcon color="disabled" />
      </Box>
      <Box
        display="flex"
        margin="0 auto"
        justifyContent="center"
        flexDirection="column"
      >
        {errorMessage && (
        <Typography color="error.main">
          Error:
          {errorMessage}
        </Typography>
        )}
        {lesson && console.log(lesson.data.base_course.level)}
        {lesson && (
        <LessonDescription
          title={lesson.data.name}
          description={lesson.data.description}
          price={lesson.data.price}
          level={(lesson.data.base_course.level).split().map(lvl => levels[lvl])} // убрать split
        />
        )}
      </Box>
    </>
  );
};

export default LessonDetailsPage;
