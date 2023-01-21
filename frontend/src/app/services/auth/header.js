import storage from '../api/storage';
import { USER_STORAGE_KEY } from '../user/utils';

const authHeader = () => {
  const user = storage.get(USER_STORAGE_KEY);

  if (user && user.tokens.access) {
    return { Authorization: `Bearer ${user.tokens.access}` };
  }

  return {};
};

export default authHeader;
