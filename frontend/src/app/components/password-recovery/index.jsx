import React, {
  createContext, useEffect, useState, useMemo,
} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import passRecoverySlice from '../../core/slices/pass-recovery/passRecovery';
import { clearMessage } from '../../core/slices/message';

export const UserEmailContext = createContext('');

const PasswordRecovery = () => {
  const dispatch = useDispatch();

  const { message } = useSelector(state => state.message);

  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    dispatch(clearMessage());
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    setUserEmail(email);
    dispatch(passRecoverySlice({ email }));
  };

  const value = useMemo(() => userEmail, [userEmail]);

  if (message === 'Success') {
    return (
      <UserEmailContext.Provider value={value}>
        <Navigate to="/instruction-recovery-password" />
      </UserEmailContext.Provider>
    );
  }

  return (
    <Container sx={{
      height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <Box
        sx={{
          maxWidth: '455px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '40px', mb: '32px', textAlign: 'center' }}>
          Восстановление пароля
        </Typography>
        <Typography sx={{ fontSize: '18px', textAlign: 'center', m: '0 46px 20px' }}>
          Ссылка для восстановления пароля будет отправлена на электронную почту
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            width: '100%', display: 'flex', flexDirection: 'column', gap: '32px', px: '27px', py: '32px', border: '1px solid #E0E0E0', borderRadius: '16px',
          }}
        >
          <TextField
            label="Электронная почта"
            fullWidth
            id="email"
            placeholder="Электронная почта"
            name="email"
            autoComplete="email"
            error={!!message?.invalid?.email || !!message?.permission_denied}
            helperText={message?.invalid?.email || message?.permission_denied}
            autoFocus
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button
              type="submit"
              size="large"
              fullWidth
              variant="contained"
              sx={{ mb: '16px' }}
            >
              Отправить
            </Button>
            <Button
              component={Link}
              to="/login"
              color="primary"
              sx={{
                fontWeight: '500', fontSize: '13px', textDecoration: 'none', textTransform: 'uppercase', lineHeight: '22px',
              }}
            >
              Назад
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
export default PasswordRecovery;
