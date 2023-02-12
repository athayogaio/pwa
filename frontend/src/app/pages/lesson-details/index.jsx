import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Backdrop, CircularProgress, Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import LessonDescription from '../../components/lesson-description';
import getLessonSlice from '../../core/slices/lesson/getLesson';
import Header from '../../components/header';
import LayoutContainer from '../../components/layout-container';

const LessonDetailsPage = () => {
  const levels = {
    STARTING: 'Начинающий',
    CONTINUER: 'Средний',
    ADVANCED: 'Продвинутый',
  };

  const { id } = useParams();

  const dispatch = useDispatch();
  const { lesson, errorMessage, isLoading } = useSelector(state => state.lesson);

  useEffect(() => {
    dispatch(getLessonSlice(id));
  }, []);

  return (
    <>
      <Header withBackBtn />
      <LayoutContainer>
        {errorMessage && (
        <Typography color="error.main">
          {`Error: ${errorMessage.errors.not_found[0]}`}
        </Typography>
        )}
        {isLoading && (
        <Backdrop
          sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: theme => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress />
        </Backdrop>
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
          isRegular={lesson.data.schedule.length > 0}
          startDate={lesson.data.start_datetime}
          duration={lesson.data.duration}
          isPaid={lesson.data.payment === 'PAYMENT'}
          level={levels[lesson.data.base_course.level[0]]}
          schedule={lesson.data.schedule}
          endDate={lesson.data.deadline_datetime}
        />
        )}
      </LayoutContainer>
    </>
  );
};

export default LessonDetailsPage;
