import { createAsyncThunk } from '@reduxjs/toolkit';
import QuestionnaireService from '../../../services/questionnaire';

const postQuestionnaireSlice = createAsyncThunk(
  'core/questionnaireteacher',
  async ({ surname, dateOfBirth, gender }, thunkAPI) => {
    try {
      return await QuestionnaireService.postQuestionnaire({ surname, dateOfBirth, gender });
    } catch (error) {
      console.log(error);
    }
  },
);

export default postQuestionnaireSlice;
