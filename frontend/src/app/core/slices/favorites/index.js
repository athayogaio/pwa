/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';
import getFavoritesSlice from './getFavorites';

const initialState = {
  favoritesLessons: [],
  errorMessage: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  extraReducers: {
    [getFavoritesSlice.fulfilled]: (state, action) => {
      state.favoritesLessons = action.payload;
      state.errorMessage = null;
    },
    [getFavoritesSlice.rejected]: (state, action) => {
      state.favoritesLessons = [];
      state.errorMessage = action.payload;
    },
  },
});

export default favoritesSlice.reducer;
