import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Stack, Badge,
} from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams } from 'react-router-dom';
import LessonDescription from '../../components/lesson-description';
import getLessonSlice from '../../core/slices/lesson/getLesson';

const LessonDetailsPage = () => {
  const levels = {
    STARTING: 'Начинающий',
    CONTINUER: 'Средний',
    ADVANCED: 'Продвинутый',
  };

  const { id } = useParams();

  const dispatch = useDispatch();
  const { lesson, errorMessage } = useSelector(state => state.lesson);

  console.log(lesson);

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
        <Typography component={Link} to="/search-lessons" fontSize="20px" fontWeight="500" color="text.secondary" sx={{ textDecoration: 'none' }}>
          <ArrowBackIcon sx={{ mr: '14px', verticalAlign: '-2px' }} fontSize="medium" color="action" />
          Назад
        </Typography>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Badge color="error" variant="dot">
            <NotificationsNoneIcon fontSize="medium" color="disabled" />
          </Badge>
          <Link to="/settings">
            <SettingsOutlinedIcon color="disabled" sx={{ transform: 'translateY(3px)' }} />
          </Link>
        </Stack>
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
          title={lesson.data.base_course.name}
          description={lesson.data.base_course.description}
          price={lesson.data.price}
          favorite={lesson.data.favorite}
          comments={lesson.data.comments_count}
          rate={lesson.data.rate}
          votes={lesson.data.votes_count}
          isVideo={lesson.data.base_course.course_type === 'VIDEO'}
          isRegular={lesson.data.lessons.length > 1}
          startDate={lesson.data.lessons.start_datetime}
          duration={lesson.data.base_course.duration}
          level={(lesson.data.base_course.level).split().map(lvl => levels[lvl])} // убрать split
        />
        )}
      </Box>
    </>
  );
};

export default LessonDetailsPage;
