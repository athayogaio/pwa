import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import FooterSupport from '../footer-support';
import instructionConfirm from '../../../assets/public/instruction_confirm.png';

const SignUpConfirm = () => (
  <Box
    sx={{
      width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', px: '42px',
    }}
  >
    <Box sx={{
      maxWidth: '552px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <Box sx={{ mb: '48px' }}>
        <img src={instructionConfirm} alt="pass-recovery-email" />
      </Box>
      <Typography
        variant="h4"
        sx={{
          fontSize: '24px', lineheight: '120%', textAlign: 'center', mb: '37px',
        }}
      >
        Подтвердите электронную почту
      </Typography>
      <Typography color="text.secondary" sx={{ fontSize: '18px', textAlign: 'center', mb: '16px' }}>
        Ссылка на подтверждение регистрации отправлена на указанный электронный адрес.
        Следуйте инструкциям в письме.
      </Typography>
      <Typography color="text.secondary" sx={{ fontSize: '18px', textAlign: 'center' }}>
        Для изменения данных вы можете вернуться к
        {' '}
        <Typography component={Link} to="/register" color="primary" sx={{ fontSize: '18px', textDecoration: 'none' }}>
          Регистрации
        </Typography>
      </Typography>
    </Box>
    <Box position="absolute" bottom="31px">
      <FooterSupport />
    </Box>
  </Box>
);
export default SignUpConfirm;
