import React from 'react';
import {
  Box, Typography, Button, Stack,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Header from '../../components/header';
import LayoutContainer from '../../components/layout-container';

const PaymentSuccessPage = () => {
  const { id } = useParams();

  return (
    <>
      <Header withBackBtn />

      <LayoutContainer>
        <Box sx={{
          height: '85%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}
        >
          <CheckCircleOutlineOutlinedIcon color="success" sx={{ width: '100px', height: '100px', mb: '32px' }} />
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
            sx={{ p: '4px 100px', mt: '42px' }}
          >
            перейти к занятию
          </Button>
        </Box>
      </LayoutContainer>
    </>
  );
};
export default PaymentSuccessPage;
