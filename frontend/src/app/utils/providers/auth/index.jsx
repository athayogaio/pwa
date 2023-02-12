/* eslint-disable camelcase */
import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from '../../../core/slices/message';
import loginSlice from '../../../core/slices/auth/login';
import registerSlice from '../../../core/slices/auth/register';
import registerConfirmSlice from '../../../core/slices/auth/verify-email/registerConfirm';
import logoutSlice from '../../../core/slices/auth/logout';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const { user, isLoggedIn, tokens } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const register = ({ email, password }, callback) => {
    setIsLoading(true);
    dispatch(registerSlice({ email, password }))
      .unwrap()
      .then(res => {
        if (res === 'Success') {
          callback();
        }
      })
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const registerConfirm = ({ email, confirmCode }, callback) => {
    setIsLoading(true);
    dispatch(registerConfirmSlice({ email, confirmCode }))
      .unwrap()
      .then(callback)
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const login = ({ email, password }, callback) => {
    setIsLoading(true);
    dispatch(loginSlice({ email, password }))
      .unwrap()
      .then(callback)
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = () => {
    dispatch(logoutSlice());
  };

  const value = useMemo(() => ({
    user, isLoggedIn, isLoading, login, register, logout, tokens, registerConfirm,
  }), [user, tokens]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
