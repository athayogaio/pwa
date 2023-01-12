import axios from 'axios';
import { QUESTIONNAIRE_URL } from './utils';

const postQuestionnaire = ({ surname, dateOfBirth, gender }) => axios
  .post(QUESTIONNAIRE_URL, { surname, dateOfBirth, gender })
  .then(res => {
    console.log(res);
  });

const QuestionnaireService = { postQuestionnaire };

export default QuestionnaireService;
