import axios from 'axios';
import authHeader from '../auth/header';
import { FILTER_URL, GET_LESSON_URL, TICKETS_URL } from './utils';

const filter = ({ query }) => axios
  .post(FILTER_URL, { query });

const getLesson = id => axios
  .get(`${GET_LESSON_URL + id}/`);

const getTickets = () => axios.get(TICKETS_URL, { headers: authHeader() });

const LessonsService = { filter, getLesson, getTickets };

export default LessonsService;
