import axios from 'axios';
import authHeader from '../auth/header';
import getUrl from '../api';

const PROFILE_URL = getUrl('/core/profile/');

const getProfileData = id => axios
  .get(`${PROFILE_URL}${id}/`, { headers: authHeader() });

const ProfileService = { getProfileData };

export default ProfileService;
