import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../../services/auth';
import { setMessage } from '../message';

const registerSlice = createAsyncThunk(
  'auth/register',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.register({ email, password });

      // if (data.tokens.access) {
      //   thunkAPI.dispatch(setMessage('User successfully registered!'));
      // }

      return data;
    } catch (error) {
      const message = error.response.data.errors;
      thunkAPI.dispatch(setMessage(message));

      return thunkAPI.rejectWithValue(error.response.data.status_code);
    }
  },
);

export default registerSlice;
