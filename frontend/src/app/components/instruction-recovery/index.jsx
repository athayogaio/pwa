import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import instructionRecovery from '../../../assets/public/instruction_recovery.png';

const InstructionRecovery = () => (
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
        <img src={instructionRecovery} alt="pass-recovery-email" />
      </Box>
      <Typography
        variant="h4"
        sx={{
          fontSize: '24px', lineheight: '120%', textAlign: 'center', mb: '32px',
        }}
      >
        Инструкция для восстановления пароля отправлена на указанную почту
      </Typography>
      <Typography color="text.secondary" sx={{ fontSize: '18px', textAlign: 'center', mb: '4px' }}>
        Неверно внесли адрес электронной почты?
      </Typography>
      <Typography component={Link} to="/recovery-password" color="primary" sx={{ fontSize: '18px', textAlign: 'center', textDecoration: 'none' }}>
        Указать другой
      </Typography>
    </Box>
    <Box position="absolute" bottom="31px">
      <Typography color="text.secondary" sx={{ fontSize: '14px', textAlign: 'center' }}>
        Обратиться за помощью в службу поддержки
        {' '}
        <Typography component={Link} to="#" color="primary" sx={{ fontSize: '14px', textDecoration: 'none' }}>supportEmail</Typography>
      </Typography>
    </Box>
  </Box>
);

export default InstructionRecovery;
