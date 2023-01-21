import axios from 'axios';
import getUrl from '../api';
import authHeader from '../auth/header';

export const TICKETS_URL = getUrl('/courses/tickets/');

const getTickets = () => axios.get(TICKETS_URL, { headers: authHeader() });

const TicketService = { getTickets };

export default TicketService;
