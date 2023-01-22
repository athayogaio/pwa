import { createAsyncThunk } from '@reduxjs/toolkit';
import FavoritesService from '../../../services/favorites';

const removeFavoritesSlice = createAsyncThunk(
  'courses/favorites/remove',
  async (id, thunkAPI) => {
    try {
      const result = await FavoritesService.removeFavorites(id);

      return result.data;
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export default removeFavoritesSlice;
