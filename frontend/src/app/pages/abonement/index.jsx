import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Typography, Stack, Badge, Card,
} from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import getLessonSlice from '../../core/slices/lesson/getLesson';
import Header from '../../components/header';

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
      <Header title="Назад" withBackBtn />
      <Box
        display="flex"
        margin="0 auto"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        maxWidth="479px"
      >
        {errorMessage && (
        <Typography color="error.main">
          Error:
          {errorMessage}
        </Typography>
        )}
        {lesson && console.log(lesson.data.base_course.level)}
        {lesson && (
          <>
            <Typography fontSize="24px" fontWeight="500">
              "
              {lesson.data.base_course.name}
              "
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" mb="40px">
              <Stack direction="row" alignItems="center" justifyContent="center" alignItems="center">
                <DateRangeOutlinedIcon color="primary" />
                <Typography color="text.secondary" fontSize="20px" fontWeight="400">
                  13.05-13.08
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="center">
                <Typography fontSize="20px" fontWeight="400">
                  доступно занятий:
                </Typography>
                <Typography color="success" fontSize="20px" fontWeight="400">
                  {lesson.data.tickets_amount}
                </Typography>
              </Stack>
            </Stack>
            <Card sx={{
              p: '27px 50px',
              borderRadius: '8px',
              boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.1)',
              width: '479px',
              height: '130px',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

            }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                <Typography fontSize="24px" fontWeight="500">
                  1 посещениe
                </Typography>
                <Typography color="primary" fontSize="32px" fontWeight="700">
                  {lesson.data.price}
                  {' '}
                  ₽
                </Typography>
              </Stack>
            </Card>
            <Card sx={{
              p: '27px 50px',
              borderRadius: '8px',
              boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.1)',
              width: '479px',
              height: '130px',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

            }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                <Typography fontSize="24px" fontWeight="500">
                  4 посещения
                </Typography>
                <Stack direction="column" alignItems="center" justifyContent="center">
                  <Typography color="text.secondary" fontSize="24px" fontWeight="400" sx={{ textDecoration: 'line-through' }}>
                    {lesson.data.price * 4}
                    {' '}
                    ₽
                  </Typography>
                  <Typography color="primary" fontSize="32px" fontWeight="700">
                    {((lesson.data.price * 4) * 9) / 10}
                    {' '}
                    ₽
                  </Typography>
                </Stack>
              </Stack>
            </Card>
            <Card sx={{
              p: '27px 50px',
              borderRadius: '8px',
              boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.1)',
              width: '479px',
              height: '130px',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

            }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                <Typography fontSize="24px" fontWeight="500">
                  8 посещений
                </Typography>
                <Stack direction="column" alignItems="center" justifyContent="center">
                  <Typography color="text.secondary" fontSize="24px" fontWeight="400" sx={{ textDecoration: 'line-through' }}>
                    {lesson.data.price * 8}
                    {' '}
                    ₽
                  </Typography>
                  <Typography color="primary" fontSize="32px" fontWeight="700">
                    {((lesson.data.price * 8) * 85) / 100}
                    {' '}
                    ₽
                  </Typography>
                </Stack>
              </Stack>
            </Card>
            <Card sx={{
              p: '27px 50px',
              borderRadius: '8px',
              boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.1)',
              width: '479px',
              height: '130px',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

            }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                <Typography fontSize="32px" fontWeight="500" sx={{ textDecoration: 'underline' }}>
                  12
                </Typography>
                <Stack direction="column" alignItems="center" justifyContent="center">
                  <Typography color="text.secondary" fontSize="24px" fontWeight="400" sx={{ textDecoration: 'line-through' }}>
                    {lesson.data.price * 12}
                    {' '}
                    ₽
                  </Typography>
                  <Typography color="primary" fontSize="32px" fontWeight="700">
                    {((lesson.data.price * 12) * 8) / 10}
                    {' '}
                    ₽
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          </>
        )}

        <Stack direction="row" justifyContent="flex-end" width="100%">
          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{
              fontSize: '16px', fontWeight: '500', width: '227px', mb: '20px', mt: '24px',
            }}
          >
            Оплатить
          </Button>
        </Stack>
      </Box>
    </>

  );
};
export default AbonementPage;
