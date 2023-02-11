import axios from 'axios';
import LESSONS_URL from './utils';
import authHeader from '../auth/header';

const getLessons = () => axios
  .post(LESSONS_URL, {}, { headers: authHeader() });

export default getLessons;
