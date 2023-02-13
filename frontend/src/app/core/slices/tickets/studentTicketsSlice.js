/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getStudentTicketsSlice } from './getTickets';

const initialState = {
  studentTickets: [],
  errorMessage: null,
  isLoading: true,
};

const studentTicketsSlice = createSlice({
  name: 'studentTickets',
  initialState,
  extraReducers: {
    [getStudentTicketsSlice.pending]: state => {
      state.studentTickets = null;
      state.isLoading = true;
      state.errorMessage = null;
    },
    [getStudentTicketsSlice.fulfilled]: (state, action) => {
      state.studentTickets = action.payload;
      state.errorMessage = null;
      state.isLoading = false;
    },
    [getStudentTicketsSlice.rejected]: (state, action) => {
      state.studentTickets = null;
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
  },
});

export default studentTicketsSlice.reducer;
