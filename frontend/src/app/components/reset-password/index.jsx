import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Button, TextField,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import passConfirmSlice from '../../core/slices/reset-pass-confirm/resetPass';
// import loginSlice from '../../core/slices/auth/login';
import { clearMessage } from '../../core/slices/message';
import { UserEmailContext } from '../password-recovery';
import { AuthContext } from '../../utils/providers/auth';

const ResetPassword = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const { token } = useParams();

  const { userEmail } = useContext(UserEmailContext);

  const dispatch = useDispatch();

  const { message } = useSelector(state => state.message);

  const [infoUser, setInfoUser] = useState({
    pwd_reset_token: token,
    email: 'hoenmoki@gmail.com',
    new_password: userEmail,
  });

  useEffect(() => {
    dispatch(clearMessage());
  }, []);

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
    setInfoUser({ ...infoUser, new_password: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(passConfirmSlice(infoUser))
      .then(() => {
        context.login({ email: infoUser.email, password: infoUser.new_password }, navigate('/profile'));
      });
  };

  return (
    <Container
      sx={{
        height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '437px',
          width: '100%',
        }}
      >
        <Typography sx={{ mb: '32px', textAlign: 'center', fontSize: '40px' }}>
          Изменить пароль
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
            fullWidth
            label="Новый пароль"
            name="new_password"
            placeholder="Новый пароль"
            id="new_password"
            autoComplete="new_password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            error={!!message?.invalid?.new_password[0]}
            helperText={message?.invalid?.new_password[0]}
            onChange={handleChange('password')}
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
          >
            Изменить
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default ResetPassword;
