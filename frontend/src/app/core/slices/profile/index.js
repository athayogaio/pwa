/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';
import getProfileDataSlice from './getProfileData';

const initialState = {
  data: [],
  errorMessage: null,
};

const userProfileDataSlice = createSlice({
  name: 'userProfile',
  initialState,
  extraReducers: {
    [getProfileDataSlice.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.errorMessage = null;
    },
    [getProfileDataSlice.rejected]: (state, action) => {
      state.data = null;
      state.errorMessage = action.payload;
    },
  },
});

export default userProfileDataSlice.reducer;
