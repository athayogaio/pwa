import { createAsyncThunk } from '@reduxjs/toolkit';
import PassRecoveryService from '../../../services/pass-recovery';
import { setMessage } from '../message';

const passRecoverySlice = createAsyncThunk(
  'core/resetpass',
  async ({ email }, thunkAPI) => {
    try {
      const result = await PassRecoveryService.resetPass({ email });
      thunkAPI.dispatch(setMessage(result.data));

      return result.data;
    } catch (error) {
      const message = error.response.data.errors;
      thunkAPI.dispatch(setMessage(message));

      return thunkAPI.rejectWithValue();
    }
  },
);

export default passRecoverySlice;
