import React, { useContext, useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../utils/providers/auth';
import { clearMessage } from '../../core/slices/message';

const SignUp = () => {
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });
  const [captchaKey, setCaptchaKey] = useState('');
  const { errorCode } = useSelector(state => state.auth);

  const ATHA_YOGA_RECAPTCHA_SITE_KEY = '6LfG0WYkAAAAABW_coUyWSIcf_TcJ1IcwrfhLyxJ';

  const onChange = value => setCaptchaKey(value);

  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, []);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPass', password);
    context.register({ email, password }, () => navigate('/register-confirm'));
  };

  return (
    <Container
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      component="main"
    >
      <div
        style={{
          height: '100%',
          minHeight: '360px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" fontWeight="500" sx={{ mb: 3 }}>
          Регистрация
        </Typography>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            p: '10px 30px',
            borderRadius: '16px',
            width: '449px',
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              sx={{ mb: 2 }}
              margin="normal"
              fullWidth
              id="email"
              label="Электронная почта"
              placeholder="E-mail"
              name="email"
              autoComplete="email"
              error={!!message?.invalid?.email || !!message?.invalid?.[0]}
              helperText={message?.invalid?.email || message?.invalid?.[0]}
              autoFocus
            />
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              label="Пароль"
              name="password"
              placeholder="Пароль"
              id="password"
              autoComplete="current-password"
              type={values.showPassword ? 'text' : 'password'}
              error={!!message?.invalid?.password || !!message?.authentication_failed}
              helperText={message?.invalid?.password}
              InputProps={{
                endAdornment:
                (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              size="large"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Зарегистрироваться
            </Button>
            <Typography variant="body2" align="center" sx={{ mb: 2 }}>
              Уже есть аккаунт?
              {' '}
              <Typography
                component={Link}
                to="/login"
                variant="body2"
                sx={{ textDecoration: 'none' }}
              >
                Войти
              </Typography>
            </Typography>
          </Box>
        </Paper>

        {errorCode === 429
        && (
        <ReCAPTCHA
          sitekey={ATHA_YOGA_RECAPTCHA_SITE_KEY}
          onChange={onChange}
          type="image"
          style={{ margin: '27px auto 0 0' }}
        />
        )}
      </div>

      <Typography
        variant="caption"
        sx={{
          mt: '32px',
          mb: '32px',
          textAlign: 'center',
          maxWidth: '670px',
        }}
      >
        {'Нажимая на кнопку «Зарегистрироваться», вы принимаете условия '}
        <Typography
          component={Link}
          variant="caption"
          to="#" // @todo
          sx={{ textDecoration: 'none' }}
        >
          Пользовательского соглашения
        </Typography>
        {' и '}
        <Typography
          component={Link}
          variant="caption"
          to="#" // @todo
          sx={{ textDecoration: 'none' }}
        >
          Политики конфиденциальности
        </Typography>
      </Typography>
    </Container>
  );
};
export default SignUp;
