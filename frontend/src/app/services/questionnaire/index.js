import axios from 'axios';
import { QUESTIONNAIRE_URL } from './utils';
import authHeader from '../auth/header';

const postQuestionnaire = ({ name, surname, dateOfBirth, gender }) => axios
  .post(QUESTIONNAIRE_URL, { name, surname, dateOfBirth, gender }, { headers: authHeader() })
  .then(res => {
    console.log(res);
  });

const QuestionnaireService = { postQuestionnaire };

export default QuestionnaireService;
