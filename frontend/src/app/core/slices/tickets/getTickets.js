import { createAsyncThunk } from '@reduxjs/toolkit';
import TicketService from '../../../services/tickets';

export const getStudentTicketsSlice = createAsyncThunk(
  'courses/tickets',
  async thunkAPI => {
    try {
      const result = await TicketService.getStudentTickets();

      return result.data;
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getTeacherTicketsSlice = createAsyncThunk(
  'courses/im/courses',
  async thunkAPI => {
    try {
      const result = await TicketService.getTeacherTickets();

      return result.data;
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  },
);
