import axios from 'axios';
import getUrl from '../api';
import authHeader from '../auth/header';

export const STUDENT_TICKETS_URL = getUrl('/courses/tickets/');
export const STUDENT_TICKETS_ARCHIEVE_URL = courseId => getUrl(`/courses/${courseId}/archiving/`);
export const TEACHER_TICKETS_URL = getUrl('/courses/im/courses/');
export const BUY_TICKETS_URL = getUrl('/courses/ticket/buy/');

const getStudentTickets = () => axios.get(STUDENT_TICKETS_URL, { headers: authHeader() });

const getTeacherTickets = () => axios.get(TEACHER_TICKETS_URL, { headers: authHeader() });

const buyTicket = (id, amount) => axios
  .post(BUY_TICKETS_URL, { course_id: id, amount }, { headers: authHeader() });

const TicketService = { getStudentTickets, getTeacherTickets, buyTicket };

export default TicketService;
