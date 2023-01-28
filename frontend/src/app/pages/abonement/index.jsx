import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Typography, Stack, Card, Input,
} from '@mui/material';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import getLessonSlice from '../../core/slices/lesson/getLesson';
import Header from '../../components/header';
import buyTicketSlice from '../../core/slices/tickets/buyTicket/buyTicket';

const AbonementPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { lesson, errorMessage } = useSelector(state => state.lesson);
  const { price } = lesson?.data || 0;
  const [amount, setAmount] = useState(6);
  const array = [{ num: 1, str: ' посещениe', id: 'id0' },
    { num: 4, str: ' посещения', id: 'id1' },
    { num: 8, str: ' посещений', id: 'id2' },
    { num: 0, id: 'id3' }];
  const preparedDate = date => date.split('T')[0].split('-').reverse().slice(0, 2).join('.');

  const handlePay = () => {
    dispatch(buyTicketSlice({ id, amount }))
      .then(response => {
        window.open(response.payload.data);
        navigate(-1); // ?
      })
      .catch(console.log());
  };

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
        {price > 0 && (
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

                  {el.num > 3 || amount > 3 ? ( // скидка - двойное поле
                    <Stack direction="column" alignItems="center" justifyContent="center">
                      <Typography color="text.secondary" fontSize="24px" fontWeight="400" sx={{ textDecoration: 'line-through' }}>
                        {`${el.num * lesson.data.price || amount * lesson.data.price} ₽`}
                      </Typography>
                      <Typography color="primary" fontSize="32px" fontWeight="700">
                        {`${el.num * lesson.data.price * 0.85 || amount * lesson.data.price * 0.85} ₽`}
                      </Typography>
                    </Stack>
                  ) : ( // без скидок
                    <Typography color="primary" fontSize="32px" fontWeight="700">
                      {`${el.num * lesson.data.price || amount * lesson.data.price} ₽`}
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
            disabled={price <= 0}
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
