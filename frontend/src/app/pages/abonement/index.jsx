import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Typography, Avatar, Chip, Divider, Stack, Badge,
} from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Abonement from '../../components/abonement';
import getLessonSlice from '../../core/slices/lesson/getLesson';

const AbonementPage = () => {
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
        maxWidth="982px"
      >
        {errorMessage && (
        <Typography color="error.main">
          Error:
          {errorMessage}
        </Typography>
        )}
        {lesson && console.log(lesson.data.base_course.level)}
        {lesson && (
        <Abonement
          id={lesson.data.id}
          title={lesson.data.base_course.name}
          price={lesson.data.price}
          startDate={lesson.data.lessons.start_datetime}
          duration={lesson.data.base_course.duration}
        />
        )}

        <Box display="flex" justifyContent="flex-end">
          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{
              fontSize: '16px', fontWeight: '500', width: '227px', mb: '20px', mt: '56px',
            }}
          >
            Оплатить
          </Button>
        </Box>
      </Box>
    </>

  );
};

export default AbonementPage;
