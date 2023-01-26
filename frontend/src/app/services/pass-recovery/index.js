import axios from 'axios';
import { RESET_PASS_URL } from './utils';

const resetPass = ({ email }) => axios
  .post(RESET_PASS_URL, { email });

const PassRecoveryService = { resetPass };

export default PassRecoveryService;
