import axios from 'axios';
import getUrl from '../api';
import authHeader from '../auth/header';

export const TICKETS_URL = getUrl('/courses/tickets/');
export const BUY_TICKETS_URL = getUrl('/courses/ticket/buy/');

const getTickets = () => axios.get(TICKETS_URL, { headers: authHeader() });

const buyTicket = (id, amount) => axios
  .post(BUY_TICKETS_URL, { course_id: id, amount }, { headers: authHeader() });

const TicketService = { getTickets, buyTicket };

export default TicketService;
