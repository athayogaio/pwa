import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { AuthContext } from '../../utils/providers/auth';
import { clearMessage, setMessage } from '../../core/slices/message';
import menuLogo from '../../../assets/public/menu_logo.svg';

const LogIn = () => {
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const context = useContext(AuthContext);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();
  const prompt = useRef(null);

  useEffect(() => {
    dispatch(clearMessage());
  }, []);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', addButton);
    return () => window.removeEventListener('beforeinstallprompt', addButton);
  }, []);

  const addButton = e => {
    prompt.current = e;
  };

  const handleInstall = () => {
    if (!prompt.current) {
      return;
    }
    prompt.current.prompt();
    prompt.current.userChoice.then(() => {
      prompt.current = null;
    });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

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

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    context.login({ email: data.get('email'), password: data.get('password') });
  };

  return (
    <Container sx={{ height: '100%' }} component="main" maxWidth="xs">
      {/* <div style={{
        display: 'flex', flexDirection: 'column', gap: '5px', position: 'absolute', right: '30px', top: '30px',
      }}
      >
        <img src={menuLogo} alt="athayoga logo" />
        <Button onClick={handleInstall}>Add to home screen</Button>
      </div> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Typography component="h1" variant="h4" fontWeight="500" sx={{ mb: 3 }}>
          Войти в аккаунт
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
            error={!!message?.invalid?.email || !!message?.authentication_failed}
            helperText={message?.invalid?.email}
            onFocus={() => handleFocus('email')}
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
          <div style={{ textAlign: 'right' }}>
            <Typography component={Link} variant="body2" to="/recovery-password" sx={{ textDecoration: 'none' }}>
              Забыли пароль?
            </Typography>
          </div>
          {message?.authentication_failed && (
            <Typography sx={{ mt: 2 }} color="error.main">{message?.authentication_failed}</Typography>
          )}
          <Button
            type="submit"
            size="large"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
          <Grid container spacing={1} alignItems="center" justifyContent="center">
            <Grid item>
              <Typography variant="body2">
                Ещё нет аккаунта?
              </Typography>
            </Grid>
            <Grid item>
              <Typography component={Link} variant="body2" to="/register" sx={{ textDecoration: 'none' }}>
                Зарегистрироваться
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default LogIn;
