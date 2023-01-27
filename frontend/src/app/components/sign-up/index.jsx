import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
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
import { clearMessage, setMessage } from '../../core/slices/message';

const SignUp = () => {
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const context = useContext(AuthContext);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, []);

  const handleFocus = el => {
    dispatch(setMessage({
      ...message,
      authentication_failed: '',
      invalid: {
        ...(message.invalid || {}),
        [el]: '',
      },
    }));
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    context.register({ email: data.get('email'), password: data.get('password') });
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="form__container">
          <TextField
            sx={{ mb: 2 }}
            margin="normal"
            fullWidth
            id="email"
            label="Электронная почта"
            placeholder="E-mail"
            name="email"
            autoComplete="email"
            error={!!message?.invalid?.email}
            helperText={message?.invalid?.email}
            onFocus={() => handleFocus('email')}
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
            onFocus={() => handleFocus('password')}
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
