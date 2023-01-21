import { createAsyncThunk } from '@reduxjs/toolkit';
import QuestionnaireService from '../../../services/questionnaire';

const postQuestionnaireSlice = createAsyncThunk(
  'core/questionnaireteacher',
  async ({
    name,
    surname,
    date_of_birth: dateOfBirth,
    gender,
    about_me: aboutMe,
    work_experience: workExperience,
    vk_link: vkLink,
    telegram_link: telegramLink,
    certificate_photos: certificatePhotos,
    passport_photo: passportPhoto,
    user_photo: userPhoto,
    user_with_passport_photo: userWithPassportPhoto,
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
