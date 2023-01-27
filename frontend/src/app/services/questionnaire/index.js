import axios from 'axios';
import { QUESTIONNAIRE_URL } from './utils';
import authHeader from '../auth/header';

const postQuestionnaire = ({
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
}) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('surname', surname);
  formData.append('date_of_birth', dateOfBirth);
  formData.append('gender', gender);
  formData.append('about_me', aboutMe);
  formData.append('work_experience', workExperience);
  formData.append('vk_link', vkLink);
  formData.append('telegram_link', telegramLink);
  certificatePhotos.forEach(photo => {
    formData.append('certificate_photos', photo);
  });
  formData.append('passport_photo', passportPhoto);
  formData.append('user_photo', userPhoto);
  formData.append('user_with_passport_photo', userWithPassportPhoto);

  return axios({
    method: 'post',
    url: QUESTIONNAIRE_URL,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data', ...authHeader() },
  });
};

const QuestionnaireService = { postQuestionnaire };

export default QuestionnaireService;
