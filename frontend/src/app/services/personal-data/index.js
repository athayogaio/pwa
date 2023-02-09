import axios from 'axios';
import { PERSONAL_DATA_URL } from './utils';
import authHeader from '../auth/header';

const patchPersonalData = ({
  firstName, lastName, about, avatar, background, birthday, gender, hideBirthday,
}) => {
  const formData = new FormData();
  formData.append('first_name', firstName);
  formData.append('last_name', lastName);
  formData.append('about', about);
  formData.append('avatar', avatar);
  formData.append('background', background);
  formData.append('birthday', birthday);
  formData.append('gender', gender);
  formData.append('hide_birthday', hideBirthday);

  return axios({
    method: 'patch',
    url: PERSONAL_DATA_URL,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data', ...authHeader() },
  });
};

const PersonalDataService = { patchPersonalData };

export default PersonalDataService;
