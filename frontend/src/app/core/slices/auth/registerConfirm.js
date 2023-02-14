/* eslint-disable camelcase */
import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../../services/auth';
import { setMessage } from '../message';

const registerConfirmSlice = createAsyncThunk(
  'auth/register/confirm',
  async ({ email, confirmCode }, thunkAPI) => {
    try {
      return await AuthService.registerConfirm({ email, confirmCode });
    } catch (error) {
      const message = error.response.data.errors;
      thunkAPI.dispatch(setMessage(message));

      return thunkAPI.rejectWithValue(error.response.data.errors.authentication_failed[0]);
    }
  },
);

export default registerConfirmSlice;
