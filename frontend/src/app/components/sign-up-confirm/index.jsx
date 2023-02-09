import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { PinInput } from 'react-input-pin-code';
import FooterSupport from '../footer-support';
import { AuthContext } from '../../utils/providers/auth';
import instructionConfirm from '../../../assets/public/instruction_confirm.png';

const SignUpConfirm = () => {
  const [values, setValues] = React.useState(['', '', '', '', '', '']);
  const [seconds, setSeconds] = useState(60);
  const [isSend, setIsSend] = useState(false);
  const [isTimeEnd, setIsTimeEnd] = useState(false);
  const context = useContext(AuthContext);
  const handleClick = () => {
    const email = localStorage.userEmail;
    const password = localStorage.userPass;
    context.register({ email, password });
  };

  const handleTokenPass = () => {
    const token = values.join('');
    const email = localStorage.userEmail;
    console.log(token);
    context.registerConfirm({ email, register_confirm_code: token });
    setIsSend(true);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      if (isSend) return;
      if (seconds > 0) setSeconds(seconds - 1);
      if (seconds === 0) setIsTimeEnd(true);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

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
        {isTimeEnd && (
          <>
            <Typography sx={{ fontSize: '18px', textAlign: 'center', mb: '8px' }} color="error">
              Время ожидания ввода кода истекло
            </Typography>
            <Typography sx={{ fontSize: '18px', textAlign: 'center', mb: '24px' }}>
              Вы можете запросить повторную отправку проверочного кодана указанную электронную почту
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ paddingLeft: '126px', paddingRight: '126px', mb: '40px' }}
              onClick={handleClick}
            >
              Отправить код
            </Button>
          </>
        )}
        {!isTimeEnd && (
        <>
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
            onComplete={handleTokenPass}
          />
          <Typography
            color="text.secondary"
            variant="body1"
            sx={{
              textAlign: 'center', mb: '40px', mt: '24px',
            }}
          >
            Получить код повторно можно через
            {' '}
            {seconds}
            {' '}
            сек.
          </Typography>
        </>
        )}
        <Typography color="text.secondary" variant="body1" sx={{ textAlign: 'center', maxWidth: '350px', mb: '24px' }}>
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
