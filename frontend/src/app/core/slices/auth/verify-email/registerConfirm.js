/* eslint-disable camelcase */
import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../../../services/auth';
import { setMessage } from '../../message';

const registerConfirmSlice = createAsyncThunk(
  'auth/register/confirm',
  async ({ email, confirmCode }, thunkAPI) => {
    try {
      const result = await AuthService.registerConfirm({ email, confirmCode });
      thunkAPI.dispatch(setMessage('Success'));

      return result.data;
    } catch (error) {
      const message = error.response.data.errors;
      thunkAPI.dispatch(setMessage(message));

      return thunkAPI.rejectWithValue(error.response.data.errors.authentication_failed[0]);
    }
  },
);

export default registerConfirmSlice;
