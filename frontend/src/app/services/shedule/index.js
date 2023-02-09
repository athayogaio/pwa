import axios from 'axios';
import { CALENDAR_URL, CALENDAR_URL2, CALENDAR_URL3, CALENDAR_URL4 } from './utils';
import authHeader from '../auth/header';

const getShedule = () => axios
  .get(CALENDAR_URL, { headers: authHeader() });

  const getShedule2 = () => axios
  .get(CALENDAR_URL2, { headers: authHeader() });
  const getShedule3 = () => axios
  .get(CALENDAR_URL3, { headers: authHeader() });
  const getShedule4 = () => axios
  .get(CALENDAR_URL4, { headers: authHeader() });

export default getShedule;
export {getShedule2, getShedule3, getShedule4}
