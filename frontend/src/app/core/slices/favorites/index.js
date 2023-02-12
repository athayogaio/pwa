/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';
import getFavoritesSlice from './getFavorites';
import addFavoriteSlice from './addFavorites';
import removeFavoritesSlice from './removeFavorites';

const initialState = {
  favoritesLessons: [],
  errorMessage: null,
  isLoading: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  extraReducers: {
    [getFavoritesSlice.pending]: (state, action) => {
      state.favoritesLessons = initialState.favoritesLessons;
      state.isLoading = true;
      state.errorMessage = null;
    },
    [getFavoritesSlice.fulfilled]: (state, action) => {
      state.favoritesLessons = action.payload.data;
      state.isLoading = false;
      state.errorMessage = null;
    },
    [getFavoritesSlice.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    [addFavoriteSlice.fulfilled]: (state, action) => {
      state.favoritesLessons = [action.payload.data, ...state.favoritesLessons];
      state.isLoading = false;
      state.errorMessage = null;
    },
    [addFavoriteSlice.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    [removeFavoritesSlice.fulfilled]: (state, action) => {
      state.favoritesLessons = state.favoritesLessons
        .filter(el => el.id !== action.payload.data.id);
      state.isLoading = false;
      state.errorMessage = null;
    },
    [removeFavoritesSlice.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
  },
});

export default favoritesSlice.reducer;
