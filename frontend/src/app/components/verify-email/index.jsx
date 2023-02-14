import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { clearMessage } from '../../core/slices/message';
import { AuthContext } from '../../utils/providers/auth';
import registerConfirmSlice from '../../core/slices/auth';

const VerifyEmail = () => {
  const { token } = useParams();
  const email = localStorage.getItem('userEmail');
  const password = localStorage.getItem('userPass');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const { message } = useSelector(state => state.message);

  useEffect(() => {
    dispatch(clearMessage());
    dispatch(registerConfirmSlice({ email, confirmCode: token }));
  }, []);

  if (message === 'Success') {
    localStorage.clear();
    context.login({ email, password }, () => navigate('/profile'));
    dispatch(clearMessage());
  }

  return (
    <Typography> Loader </Typography>
  );
};

export default VerifyEmail;
