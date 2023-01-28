import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import LessonDescription from '../../components/lesson-description';
import getLessonSlice from '../../core/slices/lesson/getLesson';
import Header from '../../components/header';

const LessonDetailsPage = () => {
  const levels = {
    STARTING: 'Начинающий',
    CONTINUER: 'Средний',
    ADVANCED: 'Продвинутый',
  };

  const { id } = useParams();

  const dispatch = useDispatch();
  const { lesson, errorMessage } = useSelector(state => state.lesson);

  // console.log(lesson);

  useEffect(() => {
    dispatch(getLessonSlice(id));
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Header withBackBtn />
      <Box
        display="flex"
        margin="0 auto"
        justifyContent="center"
        flexDirection="column"
        maxWidth="982px"
        width="90%"
      >
        {errorMessage && (
        <Typography color="error.main">
          Error:
          {errorMessage}
        </Typography>
        )}
        {lesson && (
        <LessonDescription
          id={lesson.data.id}
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
          payment={lesson.data.payment}
          level={levels[lesson.data.base_course.level[0]]}
        />
        )}
      </Box>
    </Box>
  );
};

export default LessonDetailsPage;
