import { createAsyncThunk } from '@reduxjs/toolkit';
import PersonalDataService from '../../../services/personal-data';
import { setMessage } from '../message';

const patchPersonalDataSlice = createAsyncThunk(
  'core/im/update',
  async ({
    first_name: firstName,
    last_name: lastName,
    about,
    avatar,
    background,
    birthday,
    gender,
    hide_birthday: hideBirthday,
  }, thunkAPI) => {
    try {
      const result = await PersonalDataService.patchPersonalData({
        firstName,
        lastName,
        about,
        avatar,
        background,
        birthday,
        gender,
        hideBirthday,
      });
      thunkAPI.dispatch(setMessage(result.data));

      return result.data;
    } catch (error) {
      const message = error.response.data.errors;
      thunkAPI.dispatch(setMessage(message));

      return thunkAPI.rejectWithValue();
    }
  },
);

export default patchPersonalDataSlice;
