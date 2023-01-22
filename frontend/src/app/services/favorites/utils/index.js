import getUrl from '../../api';

export const FAVORITES_URL = getUrl('/courses/favorites/');

export const FAVORITE_ADD_URL = getUrl('/courses/favorite/add');

export const FAVORITE_REMOVE_URL = getUrl('/courses/favorite/remove');
