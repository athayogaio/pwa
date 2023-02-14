import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import emptyDesc from '../../../assets/public/emptyDescription.svg';

const EmptyDescription = () => (
  <Box sx={{
    mx: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center',
  }}
  >
    <Box
      sx={{
        mb: '18px',
        backgroundImage: `url(${emptyDesc})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        width: '233px',
        height: '177px',
      }}
      alt="empty description"
    />
    <Typography variant="iter_h1" sx={{ paddingBottom: '18px', display: 'block' }}>
      Расскажите о себе
    </Typography>
    <Typography
      color="text.secondary"
      sx={{
        textAlign: 'center', fontSize: '14px', lineHeight: '20px', mb: '22px',
      }}
    >
      Перейдите в настройки профиля, чтобы добавить больше информации о вас.
    </Typography>
    <Button
      fullWidth
      component={Link}
      to="/settings"
      sx={{
        borderRadius: '6px', fontSize: '14px', textAlign: 'center',
      }}
      variant="outlined"
      size="large"
    >
      Перейти в настройки
    </Button>
  </Box>
);

export default EmptyDescription;
