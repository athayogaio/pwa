/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import buyTicketSlice from './buyTicket';

const initialState = {
  tickets: [],
  errorMessage: null,
};

const buyTicketsSlice = createSlice({
  name: 'buyTickets',
  initialState,
  extraReducers: {
    [buyTicketSlice.fulfilled]: (state, action) => {
      state.favoritesLessons = [action.payload, ...state.buyTickets];
      state.errorMessage = null;
    },
    [buyTicketSlice.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export default buyTicketsSlice.reducer;
