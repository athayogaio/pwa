import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Typography, Stack, Box, Backdrop, CircularProgress,
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
  const { lesson, errorMessage, isLoading } = useSelector(state => state.lesson);
  const { price } = lesson?.data || 0;
  const [amount, setAmount] = useState(0);

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
            {array.map(el => (<Price key={el.id} el={el} price={price} setAmount={setAmount} amount={amount} />
            ))}
          </Box>
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
      </LayoutContainer>
    </>
  );
};
export default AbonementPage;
