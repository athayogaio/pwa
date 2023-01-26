import { createAsyncThunk } from '@reduxjs/toolkit';
import TicketService from '../../../../services/tickets';

const buyTicketSlice = createAsyncThunk(
  'courses/ticket/buy',
  async (id, amount, thunkAPI) => {
    try {
      const result = await TicketService.buyTicket(id, amount);

      return result.data;
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export default buyTicketSlice;
