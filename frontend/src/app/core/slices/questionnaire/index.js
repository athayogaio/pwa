/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';
import postQuestionnaireSlice from './postQuestionnaire';

const initialState = {
  questionnaire: [],
  errorMessage: null,
};

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  extraReducers: {
    [postQuestionnaireSlice.fulfilled]: (state, action) => {
      state.questionnaire = action.payload;
      state.errorMessage = null;
    },
    [postQuestionnaireSlice.rejected]: (state, action) => {
      state.questionnaire = [];
      state.errorMessage = action.payload;
    },
  },
});

export default questionnaireSlice.reducer;
