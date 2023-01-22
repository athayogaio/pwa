import axios from 'axios';
import { FAVORITES_URL, FAVORITE_ADD_URL, FAVORITE_REMOVE_URL } from './utils';
import authHeader from '../auth/header';

const getFavorites = () => axios
  .get(FAVORITES_URL, { headers: authHeader() });

const addFavorites = id => axios
  .post(FAVORITE_ADD_URL, { course_id: id }, { headers: authHeader() });

const removeFavorites = id => axios
  .post(FAVORITE_REMOVE_URL, { course_id: id }, { headers: authHeader() });

const FavoritesService = { getFavorites, addFavorites, removeFavorites };

export default FavoritesService;
