import { createAsyncThunk } from '@reduxjs/toolkit';
import LessonsService from '../../../services/lessons';

const getTicketsSlice = createAsyncThunk(
  'courses/tickets',
  async thunkAPI => {
    try {
      const result = await LessonsService.getTickets();

      return result.data;
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export default getTicketsSlice;
