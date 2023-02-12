import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import addFavoritesSlice from '../../core/slices/favorites/addFavorites';
import removeFavoritesSlice from '../../core/slices/favorites/removeFavorites';

const FavoriteIconComponent = ({ favorite, id }) => {
  const [isFavorite, setIsFavorite] = useState(favorite);

  const dispatch = useDispatch();

  const setFavorite = e => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavoritesSlice(id));
    } else {
      dispatch(addFavoritesSlice(id));
    }
    setIsFavorite(!isFavorite);
  };
  return (
    <div>
      {isFavorite
        ? (
          <FavoriteIcon
            onClick={setFavorite}
            fontSize="medium"
            sx={{ color: '#E91E63', cursor: 'pointer' }}
          />
        )
        : (
          <FavoriteBorderOutlinedIcon
            onClick={setFavorite}
            fontSize="medium"
            color="disabled"
            sx={{ cursor: 'pointer' }}
          />
        )}
    </div>
  );
};

export default FavoriteIconComponent;
