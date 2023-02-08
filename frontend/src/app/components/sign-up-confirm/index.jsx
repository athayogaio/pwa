import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { PinInput } from 'react-input-pin-code';
import FooterSupport from '../footer-support';
import instructionConfirm from '../../../assets/public/instruction_confirm.png';

const SignUpConfirm = () => {
  const [values, setValues] = React.useState(['', '', '', '', '', '']);
  return (
    <Box
      sx={{
        width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', px: '42px',
      }}
    >
      <Box sx={{
        maxWidth: '552px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      }}
      >
        <Box sx={{ mb: '24px' }}>
          <img src={instructionConfirm} alt="pass-recovery-email" />
        </Box>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center', fontWeight: '500',
          }}
        >
          Подтвердите
        </Typography>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center', fontWeight: '500', mb: '24px',
          }}
        >
          электронную почту
        </Typography>
        <Typography sx={{ fontSize: '18px', textAlign: 'center', mb: '24px' }}>
          Код для подтверждения регистрации отправлен на указанную электронную почту,
          Введите его в поле подтверждения
        </Typography>
        <PinInput
          values={values}
          autoFocus
          placeholder=""
          showState={false}
          validBorderColor="rgb(13,110,253)"
          containerStyle={{ paddingLeft: '20px' }}
          inputStyle={{
            height: '56px', width: '44px', fontSize: '32px', fontWeight: '500px', marginRight: '24px', borderRadius: '4px',
          }}
          onChange={(value, index, values) => setValues(values)}
          onComplete={() => console.log(values)}
        />
        <Typography
          color="text.secondary"
          variant="body1"
          sx={{
            textAlign: 'center', mb: '40px', mt: '24px',
          }}
        >
          Получить код повторно можно через 56 сек.
        </Typography>
        <Typography color="text.secondary" variant="body1" sx={{ textAlign: 'center', maxWidth: '380px', mb: '24px' }}>
          Неверно внесли адрес электронной почты? Вернуться к
          {' '}
          <Typography component={Link} to="/register" color="primary" variant="body1" sx={{ textDecoration: 'none' }}>
            Регистрации
          </Typography>
        </Typography>
      </Box>
      <Box position="absolute" bottom="24px">
        <FooterSupport />
      </Box>
    </Box>
  );
};
export default SignUpConfirm;
