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
}) => axios
  .post(QUESTIONNAIRE_URL, {
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
  }, { headers: authHeader() })
  .then(res => {
    console.log(res);
  });

const QuestionnaireService = { postQuestionnaire };

export default QuestionnaireService;
