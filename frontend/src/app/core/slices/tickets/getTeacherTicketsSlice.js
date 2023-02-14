import { createSlice } from '@reduxjs/toolkit';
import { getTeacherTicketsSlice } from './getTickets';

const initialState = {
  teacherTickets: [],
  errorMessage: null,
  isLoading: true,
};

const teacherTicketsSlice = createSlice({
  name: 'teacherTickets',
  initialState,
  extraReducers: {
    [getTeacherTicketsSlice.pending]: state => {
      state.teacherTickets = null;
      state.isLoading = true;
      state.errorMessage = null;
    },
    [getTeacherTicketsSlice.fulfilled]: (state, action) => {
      state.teacherTickets = action.payload;
      state.errorMessage = null;
      state.isLoading = false;
    },
    [getTeacherTicketsSlice.rejected]: (state, action) => {
      state.teacherTickets = null;
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
  },
});

export default teacherTicketsSlice.reducer;
