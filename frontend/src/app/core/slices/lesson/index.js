/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';
import getLessonSlice from './getLesson';

const initialState = {
  lesson: null,
  errorMessage: null,
  isLoading: false,
};

const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  extraReducers: {
    [getLessonSlice.pending]: (state, action) => {
      state.lesson = null;
      state.errorMessage = null;
      state.isLoading = true;
    },
    [getLessonSlice.fulfilled]: (state, action) => {
      state.lesson = action.payload;
      state.errorMessage = null;
      state.isLoading = false;
    },
    [getLessonSlice.rejected]: (state, action) => {
      state.lesson = null;
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
  },
});

export default lessonSlice.reducer;
