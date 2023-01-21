/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import getTicketsSlice from './getTickets';

const initialState = {
  tickets: [],
  errorMessage: null,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  extraReducers: {
    [getTicketsSlice.pending]: state => {
      state.errorMessage = null;
    },
    [getTicketsSlice.fulfilled]: (state, action) => {
      state.tickets = action.payload;
      state.errorMessage = null;
    },
    [getTicketsSlice.rejected]: (state, action) => {
      state.tickets = null;
      state.errorMessage = action.payload;
    },
  },
});

export default ticketsSlice.reducer;
