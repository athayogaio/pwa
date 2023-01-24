import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import passRecoverySlice from '../../core/slices/pass-recovery/passRecovery';
import { clearMessage } from '../../core/slices/message';

const PasswordRecovery = () => {
  const dispatch = useDispatch();

  const { message } = useSelector(state => state.message);

  useEffect(() => {
    dispatch(clearMessage());
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    dispatch(passRecoverySlice({ email }));
  };

  if (message === 'Success') {
    return <Navigate to="/instruction-recovery-password" />;
  }

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
        <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
          Восстановление пароля
        </Typography>
        <Typography variant="body2" textAlign="center">
          Мы отправим вам письмо
        </Typography>
        <Typography variant="body2" textAlign="center">
          со ссылкой для восстановления пароля
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate className="form__container">
          <TextField
            sx={{ mb: 2, mt: 1 }}
            label="Электронная почта"
            margin="normal"
            fullWidth
            id="email"
            placeholder="E-mail"
            name="email"
            autoComplete="email"
            error={!!message?.invalid?.email || !!message?.permission_denied}
            helperText={message?.invalid?.email || message?.permission_denied}
            autoFocus
          />
          <Button
            type="submit"
            size="large"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 1 }}
          >
            Отправить
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default PasswordRecovery;
