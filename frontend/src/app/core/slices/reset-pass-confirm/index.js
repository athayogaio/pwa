/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';
import passConfirmSlice from './resetPass';

const initialState = {
  infoUser: {},
  errorMessage: null,
};

const resetPassConfirmSlice = createSlice({
  name: 'resetpassconfirm',
  initialState,
  extraReducers: {
    [passConfirmSlice.fulfilled]: (state, action) => {
      state.infoUser = action.payload;
      state.errorMessage = null;
    },
    [passConfirmSlice.rejected]: (state, action) => {
      state.infoUser = {};
      state.errorMessage = action.payload;
    },
  },
});

export default resetPassConfirmSlice.reducer;
