import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import PinInput from '../pin-input/index';
import FooterSupport from '../footer-support';
import { AuthContext } from '../../utils/providers/auth';
import instructionConfirm from '../../../assets/public/instruction_confirm.png';
import { clearErrorMessage } from '../../core/slices/auth';

const SignUpConfirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = React.useState(['', '', '', '', '', '']);
  const [isTimeEnd, setIsTimeEnd] = useState(false);
  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');
  const context = useContext(AuthContext);

  const handleClick = () => {
    const email = localStorage.userEmail;
    const password = localStorage.userPass;
    context.register({ email, password });
    dispatch(clearErrorMessage());
    setIsTimeEnd(false);
  };

  const handleConfirm = () => {
    const confirmCode = values.join('');
    const email = localStorage.userEmail;
    context.registerConfirm({ email, confirmCode }, () => navigate('/my-lessons'));
    setValues(['', '', '', '', '', '']);
  };

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          height: '100%',
          maxWidth: '500px',
          minHeight: pointForAdaptiveToSM ? '800px' : '650px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={instructionConfirm}
          alt="pass-recovery-email"
          style={{
            width: pointForAdaptiveToSM ? '186px' : '278px',
          }}
        />
        <Typography
          sx={{
            textAlign: 'center',
            fontWeight: pointForAdaptiveToSM ? '600' : '500',
            fontSize: pointForAdaptiveToSM ? '16px' : '42px',
            width: pointForAdaptiveToSM ? '186px' : '500px',
            margin: '20px auto 20px',
          }}
        >
          Подтвердите электронную почту
        </Typography>
        {isTimeEnd ? (
          <>
            <Typography sx={{ fontSize: pointForAdaptiveToSM ? '14px' : '18px', textAlign: 'center', mb: '8px' }} color="error">
              Время ожидания ввода кода истекло
            </Typography>
            <Typography sx={{
              fontSize: pointForAdaptiveToSM ? '14px' : '18px',
              textAlign: 'center',
              margin: '0 auto 20px',
              maxWidth: '340px',
            }}
            >
              Вы можете запросить повторную отправку проверочного кода
              <br />
              на указанную электронную почту
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
        ) : (
          <>
            <Typography sx={{
              fontSize: pointForAdaptiveToSM ? '14px' : '18px', textAlign: 'center', margin: '0 auto 20px', maxWidth: '390px',
            }}
            >
              Код для подтверждения регистрации отправлен на указанную электронную почту,
              введите его в поле подтверждения
            </Typography>
            <PinInput
              values={values}
              onChange={(value, index, values) => setValues(values)}
              onComplete={handleConfirm}
              setIsTimeEnd={setIsTimeEnd}
            />
          </>
        )}
        <Typography color="text.secondary" variant="body1" sx={{ textAlign: 'center', maxWidth: '350px', margin: '0 auto' }}>
          Неверно внесли адрес электронной почты? Вернуться к
          {' '}
          <Typography component={Link} to="/register" color="primary" variant="body1" sx={{ textDecoration: 'none' }}>
            Регистрации
          </Typography>
        </Typography>
      </div>
      <FooterSupport />
    </div>
  );
};
export default SignUpConfirm;
