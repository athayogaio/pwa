/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import getTicketsSlice from './getTickets';

const initialState = {
  tickets: [],
  errorMessage: null,
  isLoading: true,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  extraReducers: {
    [getTicketsSlice.pending]: state => {
      state.tickets = null;
      state.isLoading = true;
      state.errorMessage = null;
    },
    [getTicketsSlice.fulfilled]: (state, action) => {
      state.tickets = action.payload;
      state.errorMessage = null;
      state.isLoading = false;
    },
    [getTicketsSlice.rejected]: (state, action) => {
      state.tickets = null;
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
  },
});

export default ticketsSlice.reducer;
