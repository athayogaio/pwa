import { createAsyncThunk } from '@reduxjs/toolkit';
import QuestionnaireService from '../../../services/questionnaire';

const postQuestionnaireSlice = createAsyncThunk(
  'core/questionnaireteacher',
  async({
    'name',
    'surname',
    'date_of_birth',
    'gender',
    'about_me',
    'work_experience',
    'vk_link',
    'telegram_link'
  }

);

export default postQuestionnaireSlice;
