/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';
import patchPersonalDataSlice from './patchPersonalData';

const initialState = {
  myPersonalData: {},
  errorMessage: null,
};

const personalDataSlice = createSlice({
  name: 'personalData',
  initialState,
  extraReducers: {
    [patchPersonalDataSlice.fulfilled]: (state, action) => {
      state.myPersonalData = action.payload;
      state.errorMessage = null;
    },
    [patchPersonalDataSlice.rejected]: (state, action) => {
      state.myPersonalData = {};
      state.errorMessage = action.payload;
    },
  },
});

export default personalDataSlice.reducer;
