import axios from 'axios';
import { RESET_PASS_URL, RESET_PASS_CONFIRM_URL } from './utils';

const resetPass = ({ email }) => axios
  .post(RESET_PASS_URL, { email });

const resetPassConfirm = ({ pwdResetToken, email, newPassword }) => axios
  .post(RESET_PASS_CONFIRM_URL, {
    pwd_reset_token: pwdResetToken,
    email,
    new_password: newPassword,
  });

const PassRecoveryService = { resetPass, resetPassConfirm };

export default PassRecoveryService;
