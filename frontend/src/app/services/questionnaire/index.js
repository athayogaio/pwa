import axios from 'axios';
import { QUESTIONNAIRE_URL } from './utils';

const postQuestionnaire = firstName => axios
  .post(QUESTIONNAIRE_URL, { firstName });

const QuestionnaireService = { postQuestionnaire };

export default QuestionnaireService;
