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
  const [amount, setAmount] = useState(6);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { lesson, errorMessage } = useSelector(state => state.lesson);
  console.log(lesson)
  const { price } = lesson?.data || 0;
  const preparedDate = date => date.split('T')[0].split('-').reverse().slice(0, 2).join('.');

  const getDiscontPrice = pr => {
    if (pr > 11) return Math.round(((price * pr) * 8) / 10);
    if ((pr > 7) && (pr < 12)) return Math.round(((price * pr) * 85) / 100);
    if ((pr > 3) && (pr < 8)) return Math.round(((price * pr) * 9) / 10);
  };

  const handlePay = () => {
    dispatch(buyTicketSlice(id, +amount));
  };

  const array = [{ num: 1, str: ' посещениe', id: 'id0' }, { num: 4, str: ' посещения', id: 'id1' }, { num: 8, str: ' посещений', id: 'id2' }, { num: 0, id: 'id3' }];

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
              &quot;
              {lesson.data.base_course.name}
              &quot;
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
                  {'доступно занятий: '}
                </Typography>
                <Typography color="success" fontSize="20px" fontWeight="400">
                  {` ${lesson.data.tickets_amount}`}
                </Typography>
              </Stack>
            </Stack>

            {array.map(el => (
              <Card
                key={el.id}
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
                  {el.num ? (
                    <Typography fontSize="24px" fontWeight="500">
                      {`${el.num} ${el.str}`}
                    </Typography>
                  )
                    : (
                      <Input
                        value={amount}
                        autoFocus
                        onChange={e => setAmount(e.target.value)}
                        sx={{
                          fontSize: '32px',
                          fontWeight: '500',
                          maxWidth: '37px',
                        }}
                      />
                    )}

                  {amount > 3 ? (
                    <Stack direction="column" alignItems="center" justifyContent="center">
                      <Typography color="text.secondary" fontSize="24px" fontWeight="400" sx={{ textDecoration: 'line-through' }}>
                        {!el.num ? `${lesson.data.price * amount} ₽` : `${lesson.data.price * el.num} ₽`}
                      </Typography>
                      <Typography color="primary" fontSize="32px" fontWeight="700">
                        {!el.num ? `${getDiscontPrice(amount)} ₽` : `${(lesson.data.price * el.num) * 0.85} ₽`}
                      </Typography>
                    </Stack>
                  ) : (
                    <Typography color="primary" fontSize="32px" fontWeight="700">
                      {`${lesson.data.price} ₽`}
                    </Typography>
                  )}

                </Stack>
              </Card>
            ))}

          </>
        )}

        <Stack direction="row" justifyContent="flex-end" width="100%">
          <Button
            onClick={handlePay}
            variant="contained"
            disabled={!amount}
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
