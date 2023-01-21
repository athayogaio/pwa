import axios from 'axios';
import { FAVORITES_URL } from './utils';
import authHeader from '../auth/header';

const getFavorites = () => axios
  .get(FAVORITES_URL, { headers: authHeader() });

const FavoritesService = { getFavorites };

export default FavoritesService;
