/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';
import filterSlice from './filter';

const initialState = {
  lessons: [],
  isSearching: false,
  errorMessage: null,
};

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  extraReducers: {
    [filterSlice.pending]: state => {
      state.lessons = null;
      state.isSearching = true;
      state.errorMessage = null;
    },
    [filterSlice.fulfilled]: (state, action) => {
      state.lessons = action.payload;
      state.isSearching = false;
      state.errorMessage = null;
    },
    [filterSlice.rejected]: (state, action) => {
      state.lessons = null;
      state.isSearching = false;
      state.errorMessage = action.payload;
    },
  },
});

export default lessonsSlice.reducer;
