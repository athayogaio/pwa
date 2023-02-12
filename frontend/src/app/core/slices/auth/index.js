/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';
import { user } from '../../../services/user/utils';
import registerSlice from './register';
import loginSlice from './login';
import logoutSlice from './logout';
import registerConfirmSlice from './registerConfirm';

const initialState = user
  ? {
    isLoggedIn: true,
    user,
    errorCode: null,
    isLoading: false,
    errorMessage: null,
  }
  : {
    isLoggedIn: false,
    user: null,
    errorCode: null,
    isLoading: false,
    errorMessage: null,
  };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [registerSlice.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      // state.user = action.payload.data.user;
      // state.tokens = action.payload.data.tokens;
    },
    [registerSlice.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.errorCode = action.payload;
    },

    [loginSlice.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.data.user;
      state.tokens = action.payload.data.tokens;
    },
    [loginSlice.rejected]: state => {
      state.isLoggedIn = false;
      state.user = null;
    },

    [logoutSlice.fulfilled]: state => {
      state.isLoggedIn = false;
      state.user = null;
    },

    [registerConfirmSlice.pending]: state => {
      state.isLoading = true;
      state.errorMessage = null;
    },
    [registerConfirmSlice.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.data.user;
      state.tokens = action.payload.data.tokens;
      state.isLoading = false;
      state.errorMessage = null;
    },
    [registerConfirmSlice.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
  },
  reducers: {
    clearErrorMessage: state => {
      state.errorMessage = null;
    },
  },
});

export const { clearErrorMessage } = authSlice.actions;

export default authSlice.reducer;
