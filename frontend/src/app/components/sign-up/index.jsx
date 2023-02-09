import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
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
  const [IP, setIP] = useState('');
  const [click, setClick] = useState(0);
  const [captchaKey, setCaptchaKey] = useState('');

  const ATHA_YOGA_RECAPTCHA_SITE_KEY = '6Lfzkl8kAAAAAJDkbH2DIw6vMwU8KSMVA3Mv60CP';
  const ATHA_YOGA_RECAPTCHA_SECRET_KEY = '6Lfzkl8kAAAAAJm5ltqgqAy2MO2VhdqYHgLQWEHu';

  const disabledButton = () => {
    if (click >= 5 && !captchaKey) return true;
    return false;
  };

  const onChange = value => setCaptchaKey(value);

  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const getIP = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    console.log(res.data);
    setIP(res.data.IPv4);
  };

  useEffect(() => {
    dispatch(clearMessage());
    getIP();
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
    <Container sx={{ height: '100%' }} component="main" maxWidth="xs">
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography component="h1" variant="h4" fontWeight="500" sx={{ mb: 3 }}>
          Регистрация
        </Typography>
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
            onClick={() => setClick(click + 1)}
            disabled={disabledButton()}
          >
            Зарегистрироваться
          </Button>
          <Grid container spacing={1} alignItems="center" justifyContent="center">
            <Grid item>
              <Typography variant="body2">
                Уже есть аккаунт?
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                component={Link}
                to="/login"
                variant="body2"
                sx={{ textDecoration: 'none' }}
              >
                Войти
              </Typography>
            </Grid>
            {click >= 5
              ? (
                <ReCAPTCHA
                  sitekey={ATHA_YOGA_RECAPTCHA_SITE_KEY}
                  onChange={onChange}
                  type="image"
                />
              )
              : ''}
          </Grid>
        </Box>
        <div style={{
          position: 'absolute',
          bottom: '32px',
          textAlign: 'center',
          maxWidth: '668px',
          lineHeight: 0.1,
        }}
        >
          <Typography variant="caption">
            {'Нажимая на кнопку «Зарегистрироваться», вы принимаете условия '}
            <Typography
              component={Link}
              variant="caption"
              to="#"
              sx={{ textDecoration: 'none' }}
            >
              Пользовательского соглашения
            </Typography>
            {' и '}
            <Typography
              component={Link}
              variant="caption"
              to="#"
              sx={{ textDecoration: 'none' }}
            >
              Политики конфиденциальности
            </Typography>
          </Typography>
        </div>
      </Box>
    </Container>
  );
};
export default SignUp;
