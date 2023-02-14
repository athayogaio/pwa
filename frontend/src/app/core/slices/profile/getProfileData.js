import { createAsyncThunk } from '@reduxjs/toolkit';
import ProfileService from '../../../services/profile';

const getProfileDataSlice = createAsyncThunk(
  'core/profile',
  async thunkAPI => {
    try {
      const result = await ProfileService.getProfileData();

      return result.data;
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export default getProfileDataSlice;
