/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';
import passRecoverySlice from './passRecovery';

const initialState = {
  email: {},
  errorMessage: null,
};

const resetPassSlice = createSlice({
  name: 'resetpass',
  initialState,
  extraReducers: {
    [passRecoverySlice.fulfilled]: (state, action) => {
      state.email = action.payload;
      state.errorMessage = null;
    },
    [passRecoverySlice.rejected]: (state, action) => {
      state.email = {};
      state.errorMessage = action.payload;
    },
  },
});

export default resetPassSlice.reducer;
