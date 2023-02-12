/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';
import registerConfirmSlice from './registerConfirm';

const initialState = {
  userInfo: {},
  isLoading: false,
  errorMessage: null,
};

const verifyEmailSlice = createSlice({
  name: 'verifyEmail',
  initialState,
  extraReducers: {
    [registerConfirmSlice.pending]: state => {
      state.isLoading = true;
      state.errorMessage = null;
    },
    [registerConfirmSlice.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.isLoading = false;
      state.errorMessage = null;
    },
    [registerConfirmSlice.rejected]: (state, action) => {
      state.userInfo = null;
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

export const { clearErrorMessage } = verifyEmailSlice.actions;
export default verifyEmailSlice.reducer;
