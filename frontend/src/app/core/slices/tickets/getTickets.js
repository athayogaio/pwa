import { createAsyncThunk } from '@reduxjs/toolkit';
import TicketService from '../../../services/tickets';

const getTicketsSlice = createAsyncThunk(
  'courses/tickets',
  async thunkAPI => {
    try {
      const result = await TicketService.getTickets();

      return result.data;
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export default getTicketsSlice;
