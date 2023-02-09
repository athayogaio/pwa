/* eslint-disable camelcase */
import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../../../services/auth';
import { setMessage } from '../../message';

const registerConfirmSlice = createAsyncThunk(
  'auth/register/confirm',
  async ({ email, register_confirm_code: token }, thunkAPI) => {
    try {
      const result = await AuthService.registerConfirm({ email, token });
      thunkAPI.dispatch(setMessage('Success'));

      return result.data;
    } catch (error) {
      const message = error.response.data.errors;
      thunkAPI.dispatch(setMessage(message));

      return thunkAPI.rejectWithValue();
    }
  },
);

export default registerConfirmSlice;
