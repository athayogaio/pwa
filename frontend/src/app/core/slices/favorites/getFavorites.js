import { createAsyncThunk } from '@reduxjs/toolkit';
import FavoritesService from '../../../services/favorites';

const getFavoritesSlice = createAsyncThunk(
  'courses/favorites',
  async thunkAPI => {
    try {
      const result = await FavoritesService.getFavorites();
      console.log(result.data);
      return result.data;
    } catch (error) {
      const message = error.response.data;
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export default getFavoritesSlice;
