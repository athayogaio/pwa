import axios from 'axios';
import authHeader from '../auth/header';
import getUrl from '../api';

const profileData = JSON.parse(localStorage.user);
const { id } = profileData.user;
const PROFILE_URL = getUrl(`/core/profile/${id}/`);

const getProfileData = () => axios
  .get(PROFILE_URL, { headers: authHeader() });

const ProfileService = { getProfileData };

export default ProfileService;
