import { createAsyncThunk } from '@reduxjs/toolkit';
import PassRecoveryService from '../../../services/pass-recovery';
import { setMessage } from '../message';

const passConfirmSlice = createAsyncThunk(
  'core/resetpass/confirm',
  async ({ pwd_reset_token: pwdResetToken, email, new_password: newPassword }, thunkAPI) => {
    try {
      const result = await PassRecoveryService.resetPassConfirm({
        pwdResetToken, email, newPassword,
      });
      thunkAPI.dispatch(setMessage('Success'));

      return result.data;
    } catch (error) {
      const message = error.response.data.errors;
      thunkAPI.dispatch(setMessage(message));

      return thunkAPI.rejectWithValue();
    }
  },
);

export default passConfirmSlice;
