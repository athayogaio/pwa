import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Button, Grid, Stack, Container,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Header from '../../components/header';

const PaymentSuccessPage = () => {
  const { id } = useParams();
  return (
    <Grid
      container
      flexDirection="column"
    >
      <Header title="title" withBackBtn />

      <Container>
        <Stack direction="column" alignItems="center" justifyContent="center" spacing={4} sx={{ height: '85vh' }}>
          <CheckCircleOutlineOutlinedIcon color="success" sx={{ width: '100px', height: '100px' }} />
          <Stack direction="column" alignItems="center" justifyContent="center" spacing={3}>
            <Typography fontWeight="500" fontSize="32px">
              Занятие успешно оплачено
            </Typography>
            <Typography fontWeight="600" fontSize="18px" color="text.secondary">
              Занятие добавлено в календарь
            </Typography>
          </Stack>
          <Button
            variant="outlined"
            component={Link}
            to={`/lesson-details/${id}`}
            sx={{ p: '4px 100px' }}
          >
            перейти к занятию
          </Button>
        </Stack>
      </Container>
    </Grid>
  );
};
export default PaymentSuccessPage;
