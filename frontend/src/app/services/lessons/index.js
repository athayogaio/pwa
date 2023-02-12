import axios from 'axios';
import authHeader from '../auth/header';
import { FILTER_URL, LESSON_URL } from './utils';

const filter = ({ query }) => axios
  .post(FILTER_URL, { query }, { headers: authHeader() });

const getLesson = id => axios
  .get(`${LESSON_URL + id}/`, { headers: authHeader() });

const postLesson = lessonState => axios
  .post(LESSON_URL, {
    name: lessonState.name,
    description: lessonState.description,
    complexity: lessonState.complexity, // need to remove, because obj has level property
    level: lessonState.level,
    duration: lessonState.duration,
    course_type: lessonState.course_type,
    link: lessonState.link,
    link_info: lessonState.link_info,
    start_datetime: lessonState.start_datetime,
    deadline_datetime: lessonState.deadline_datetime,
    payment: lessonState.payment,
    price: lessonState.price,
    lessons: lessonState.lessons,
    is_draft: lessonState.is_draft,
  }, { headers: authHeader() });

const LessonsService = { filter, getLesson, postLesson };

export default LessonsService;
