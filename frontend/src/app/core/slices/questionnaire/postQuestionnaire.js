import { createAsyncThunk } from '@reduxjs/toolkit';
import QuestionnaireService from '../../../services/questionnaire';

const postQuestionnaireSlice = createAsyncThunk(
  'core/questionnaireteacher',
  async ({
    name, surname, dateOfBirth, gender, aboutMe, workExperience, vkLink,
    telegramLink, certificatePhotos, passportPhoto, userPhoto, userWithPassportPhoto,
  }, thunkAPI) => {
    try {
      return await QuestionnaireService.postQuestionnaire({
        name,
        surname,
        dateOfBirth,
        gender,
        aboutMe,
        workExperience,
        vkLink,
        telegramLink,
        certificatePhotos,
        passportPhoto,
        userPhoto,
        userWithPassportPhoto,
      });
    } catch (error) {
      console.log(error);
    }
  },
);

export default postQuestionnaireSlice;
