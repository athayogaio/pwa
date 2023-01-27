import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Typography, Stack, Card, Input,
} from '@mui/material';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import getLessonSlice from '../../core/slices/lesson/getLesson';
import Header from '../../components/header';
import buyTicketSlice from '../../core/slices/tickets/buyTicket/buyTicket.js';

const AbonementPage = () => {
  // const max_ticket_amount = 1;
  const [amount, setAmount] = useState(12);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { lesson, errorMessage } = useSelector(state => state.lesson);
  const preparedDate = date => date.split('T')[0].split('-').reverse().slice(0, 2).join('.');
  const calculatePrice = (price, amount) => {
    if (amount > 11) return Math.ceil(((price * amount) * 8) / 10);
    if ((amount > 7) && (amount < 12)) return Math.ceil(((price * amount) * 85) / 100);
    if ((amount > 3) && (amount < 8)) return Math.ceil(((price * amount) * 9) / 10);
  };
  const handlePay = () => {
    console.log(id, amount);
    dispatch(buyTicketSlice(id, amount));
  };

  // console.log(lesson);

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
        {lesson && (
          <>
            <Typography fontSize="24px" fontWeight="500">
              "
              {lesson.data.base_course.name}
              "
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" mb="40px">
              <Stack direction="row" alignItems="center" justifyContent="center">
                <DateRangeOutlinedIcon color="primary" />
                <Typography color="text.secondary" fontSize="20px" fontWeight="400">
                  {preparedDate(lesson.data.start_datetime)}
                  -
                  {preparedDate(lesson.data.deadline_datetime)}
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
            <Card
              sx={{
                p: '27px 50px',
                borderRadius: '8px',
                boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.1)',
                width: '479px',
                height: '130px',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',

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
            <Card
              sx={{
                p: '27px 50px',
                borderRadius: '8px',
                boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.1)',
                width: '479px',
                height: '130px',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',

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
            <Card
              sx={{
                p: '27px 50px',
                borderRadius: '8px',
                boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.1)',
                width: '479px',
                height: '130px',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',

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
            <Card
              sx={{
                p: '27px 50px',
                borderRadius: '8px',
                boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.1)',
                width: '479px',
                height: '130px',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',

              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                <Input
                  defaultValue="12"
                  autoFocus
                  onChange={e => setAmount(e.target.value)}
                  sx={{
                    fontSize: '32px',
                    fontWeight: '500',
                    maxWidth: '37px',
                  }}
                />
                {amount < 4 && (
                  <Typography color="primary" fontSize="32px" fontWeight="700">
                    {lesson.data.price}
                    {' '}
                    ₽
                  </Typography>
                )}
                {amount > 3 && (
                  <Stack direction="column" alignItems="center" justifyContent="center">
                    <Typography color="text.secondary" fontSize="24px" fontWeight="400" sx={{ textDecoration: 'line-through' }}>
                      {lesson.data.price * amount}
                      {' '}
                      ₽
                    </Typography>
                    <Typography color="primary" fontSize="32px" fontWeight="700">
                      {calculatePrice(lesson.data.price, amount)}
                      {' '}
                      ₽
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Card>
          </>
        )}

        <Stack direction="row" justifyContent="flex-end" width="100%">
          <Button
            onClick={amount && (() => handlePay())}
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
