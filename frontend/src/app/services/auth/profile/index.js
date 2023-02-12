import axios from 'axios';
import authHeader from '../header';
import PROFILE_URL from './utils';

const getProfileData = () => axios
  .get(PROFILE_URL, { headers: authHeader() });

const ProfileService = { getProfileData };

export default ProfileService;
