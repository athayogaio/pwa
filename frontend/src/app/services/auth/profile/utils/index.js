import getUrl from '../../../api';

const pofileData = JSON.parse(localStorage.user);
const { id } = pofileData.user;
const PROFILE_URL = getUrl(`/core/profile/${id}`);

export default PROFILE_URL;
