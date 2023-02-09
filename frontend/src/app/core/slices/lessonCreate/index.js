/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';
import postLessonSlice from './postLesson';

const initialState = {
  lessons: [],
  errorMessage: null,
};

const postLessonInfoSlice = createSlice({
  name: 'postLesson',
  initialState,
  extraReducers: {
    [postLessonSlice.fulfilled]: (state, action) => {
      state.lessons = action.payload;
      state.errorMessage = null;
    },
    [postLessonSlice.rejected]: (state, action) => {
      state.lessons = [];
      state.errorMessage = action.payload;
    },
  },
});

export default postLessonInfoSlice.reducer;
