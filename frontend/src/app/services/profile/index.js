import axios from 'axios';
import authHeader from '../auth/header';
import getUrl from '../api';

const storage = localStorage.user || {};
const PROFILE_URL = getUrl(`/core/profile/${storage.user?.id}/`);

const getProfileData = () => axios
  .get(PROFILE_URL, { headers: authHeader() });

const ProfileService = { getProfileData };

export default ProfileService;
