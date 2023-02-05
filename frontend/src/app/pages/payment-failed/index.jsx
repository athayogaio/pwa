import React from 'react';
import {
  Box, Typography, Button, Stack,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Header from '../../components/header';
import LayoutContainer from '../../components/layout-container';

const PaymentFailedPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <>
      <Header withBackBtn />
      <LayoutContainer>
        <Box sx={{
          height: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}
        >
          <ErrorOutlineOutlinedIcon
            color="danger"
            sx={{
              width: '100px', height: '100px', color: 'rgba(220, 53, 69, 1)', mb: '32px',
            }}
          />
          <Stack direction="column" alignItems="center" justifyContent="center" spacing={3}>
            <Typography fontWeight="500" fontSize="32px">
              Занятие не оплачено
            </Typography>
            <Typography fontWeight="600" fontSize="18px" color="text.secondary">
              Пожалуйста, попробуйте позже или выберите другой способ оплаты
            </Typography>
          </Stack>
          <Button
            variant="contained"
            onClick={() => {
              navigate(-1);
            }}
            sx={{ p: '4px 100px', mt: '42px' }}
          >
            попробовать снова
          </Button>
        </Box>
      </LayoutContainer>
    </>
  );
};
export default PaymentFailedPage;
