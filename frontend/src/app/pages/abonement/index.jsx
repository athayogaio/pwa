import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as dayjs from 'dayjs';
import {
  Button, Typography, Stack, Box, Backdrop, CircularProgress, useMediaQuery,
} from '@mui/material';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import getLessonSlice from '../../core/slices/lesson/getLesson';
import Header from '../../components/header';
import LayoutContainer from '../../components/layout-container';
import Price from '../../components/price';
import buyTicketSlice from '../../core/slices/tickets/buyTicket/buyTicket';

const AbonementPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');
  const { lesson, errorMessage, isLoading } = useSelector(state => state.lesson);
  const { price } = lesson?.data || 0;
  const [amount, setAmount] = useState(12);
  // console.log(lesson.data.deadline_datetime);

  const array = [{ num: 1, str: ' посещениe', id: 'id0' },
    { num: 4, str: ' посещения', id: 'id1' },
    { num: 8, str: ' посещений', id: 'id2' },
    { num: 0, id: 'id3' }];

  const handlePay = () => {
    dispatch(buyTicketSlice({ id, amount }))
      .then(response => {
        window.open(response.payload.data);
        navigate(-1); // ?
      })
      .catch(console.log);
  };

  useEffect(() => {
    dispatch(getLessonSlice(id));
  }, []);

  return (
    <>
      <Header withBackBtn />
      <LayoutContainer>
        {errorMessage && (
        <Typography color="error.main">
          Error:
          {errorMessage}
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
        {price > 0 && (
          <Box sx={{ margin: '0 auto' }} display="flex" alignItems="center" flexDirection="column">
            <Typography fontSize={pointForAdaptiveToSM ? '18px' : '24px'} fontWeight="500">
              &quot;
              {lesson.data.base_course.name}
              &quot;
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" mb={pointForAdaptiveToSM ? '24px' : '40px'}>
              <Stack direction="row" alignItems="center" justifyContent="center">
                <DateRangeOutlinedIcon color="primary" />
                <Typography color="text.secondary" fontSize={pointForAdaptiveToSM ? '14px' : '20px'} fontWeight="400">
                  {dayjs(lesson.data.start_datetime)?.format('DD:MM')}
                  -
                  {dayjs(lesson.data.deadline_datetime)?.format('DD:MM')}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="center">
                <Typography fontSize={pointForAdaptiveToSM ? '14px' : '20px'} fontWeight="400">
                  доступно занятий:
                </Typography>
                {' '}
                <Typography color="success" fontSize="20px" fontWeight="400">
                  {lesson.data.tickets_amount === null ? 0 : lesson.data.tickets_amount}
                </Typography>
              </Stack>
            </Stack>
            {array.map(el => (
              <Price
                key={el.id}
                el={el}
                price={price}
                setAmount={setAmount}
                amount={amount}
              />
            ))}
          </Box>
        )}

        {lesson && (
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          width={pointForAdaptiveToSM ? '343px' : '479px'}
          sx={{ margin: '0 auto' }}
        >
          <Typography
            fontSize={pointForAdaptiveToSM ? '14px' : '18px'}
            fontWeight="500"
            color="text.secondary"
            mt={pointForAdaptiveToSM ? '16px' : '24px'}
          >
            Вы приобретаете
            {' '}
            <Typography fontSize={pointForAdaptiveToSM ? '14px' : '18px'} fontWeight="500" color="primary" sx={{ display: 'inline-block' }}>
              {amount}
            </Typography>
            {' '}
            {amount === 1 && 'посещение'}
            {amount > 1 && amount < 5 && 'посещения'}
            {amount > 5 && 'посещений'}
            {' '}
            до
            {' '}
            <Typography fontSize={pointForAdaptiveToSM ? '14px' : '18px'} fontWeight="500" color="text.primary" sx={{ display: 'inline-block' }}>
              {dayjs(lesson.data.deadline_datetime)?.format('DD:MM:YYYY')}
            </Typography>
            {' '}
            на оставшиеся
            {' '}
            <Typography fontSize={pointForAdaptiveToSM ? '14px' : '18px'} fontWeight="500" color="primary" sx={{ display: 'inline-block' }}>
              18
            </Typography>
            {' '}
            занятий
          </Typography>
          <Button
            onClick={handlePay}
            variant="contained"
            disabled={price <= 0}
            sx={{
              fontSize: '16px',
              fontWeight: '500',
              width: pointForAdaptiveToSM ? '343px' : '227px',
              mb: '20px',
              mt: pointForAdaptiveToSM ? '32px' : '56px',
              ml: pointForAdaptiveToSM ? '0' : '252px',
            }}
          >
            Оплатить
          </Button>
        </Stack>
        )}
      </LayoutContainer>
    </>
  );
};
export default AbonementPage;
