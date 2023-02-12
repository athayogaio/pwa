import axios from 'axios';
import storage from '../api/storage';
import { LOGIN_URL, REGISTER_URL, REGISTER_CONFIRM_URL } from './utils';
import { USER_STORAGE_KEY } from '../user/utils';

const register = ({ email, password }) => axios
  .post(REGISTER_URL, { email, password, password_confirmation: password })
  .then(response => {
    if (response.data === 'Success') {
      return 'Success';
    }

    if (response.data.data.tokens.access) {
      storage.set(USER_STORAGE_KEY, response.data.data);
    }

    return response.data;
  });

const registerConfirm = ({ email, confirmCode }) => axios
  .post(REGISTER_CONFIRM_URL, { email, register_confirm_code: confirmCode });

const login = ({ email, password }) => axios
  .post(LOGIN_URL, { email, password })
  .then(response => {
    if (response.data.data.tokens.access) {
      storage.set(USER_STORAGE_KEY, response.data.data);
    }

    return response.data;
  });

const logout = () => {
  storage.remove(USER_STORAGE_KEY);
};

const AuthService = {
  register, registerConfirm, login, logout,
};

export default AuthService;
