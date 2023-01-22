import { createAsyncThunk } from '@reduxjs/toolkit';
import FavoritesService from '../../../services/favorites';

const addFavoritesSlice = createAsyncThunk(
  'courses/favorites/add',
  async (id, thunkAPI) => {
    try {
      const result = await FavoritesService.addFavorites(id);

      return result.data;
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export default addFavoritesSlice;
