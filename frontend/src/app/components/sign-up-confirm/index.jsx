import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Container } from '@mui/system';
import PinInput from '../pin-input/index';
import FooterSupport from '../footer-support';
import { AuthContext } from '../../utils/providers/auth';
import instructionConfirm from '../../../assets/public/instruction_confirm.png';

const SignUpConfirm = () => {
  const [values, setValues] = React.useState(['', '', '', '', '', '']);
  const [seconds, setSeconds] = useState(60);
  const [isSend, setIsSend] = useState(false);
  const [isTimeEnd, setIsTimeEnd] = useState(false);
  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');
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
    <Container
      sx={{
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      component="main"
    >
      <div
        style={{
          height: '100%',
          minHeight: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{
          mb: '20px',

        }}
        >
          <img
            src={instructionConfirm}
            alt="pass-recovery-email"
            style={{
              width: pointForAdaptiveToSM ? '186px' : '278px',
              height: pointForAdaptiveToSM ? '153px' : '229px',
            }}
          />
        </Box>
        <Typography
          sx={{
            textAlign: 'center',
            fontWeight: pointForAdaptiveToSM ? '600' : '500',
            fontSize: pointForAdaptiveToSM ? '16px' : '42px',
          }}
        >
          Подтвердите
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            fontWeight: pointForAdaptiveToSM ? '600' : '500',
            fontSize: pointForAdaptiveToSM ? '16px' : '42px',
            mb: '20px',
          }}
        >
          электронную почту
        </Typography>
        {isTimeEnd && (
          <>
            <Typography sx={{ fontSize: pointForAdaptiveToSM ? '14px' : '18px', textAlign: 'center', mb: '8px' }} color="error">
              Время ожидания ввода кода истекло
            </Typography>
            <Typography sx={{
              fontSize: pointForAdaptiveToSM ? '14px' : '18px', textAlign: 'center', mb: '20px', maxWidth: '340px',
            }}
            >
              Вы можете запросить повторную отправку проверочного кодана указанную электронную почту
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ paddingLeft: '126px', paddingRight: '126px', mb: '35px' }}
              onClick={handleClick}
            >
              Отправить код
            </Button>
          </>
        )}
        {!isTimeEnd && (
          <>
            <Typography sx={{
              fontSize: pointForAdaptiveToSM ? '14px' : '18px', textAlign: 'center', mb: '20px', maxWidth: '390px',
            }}
            >
              Код для подтверждения регистрации отправлен на указанную электронную почту,
              Введите его в поле подтверждения
            </Typography>
            <PinInput
              values={values}
              onChange={(value, index, values) => setValues(values)}
              onComplete={handleTokenPass}
            />
            <Typography
              color="text.secondary"
              variant="body1"
              sx={{
                textAlign: 'center', mb: '35px', mt: '20px',
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
        <Typography color="text.secondary" variant="body1" sx={{ textAlign: 'center', maxWidth: '350px', mb: '20px' }}>
          Неверно внесли адрес электронной почты? Вернуться к
          {' '}
          <Typography component={Link} to="/register" color="primary" variant="body1" sx={{ textDecoration: 'none' }}>
            Регистрации
          </Typography>
        </Typography>
      </div>
      <FooterSupport />
    </Container>
  );
};
export default SignUpConfirm;
