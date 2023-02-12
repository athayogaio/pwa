/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import {
  Avatar, Button,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import background from '../../../assets/public/profile_background.jpg';
import defaultAvatar from '../../../assets/public/menu-avatar.png';
import defaultBackground from '../../../assets/public/defaultBackground.png';

import './index.scoped.scss';
import ProfileService from '../../services/auth/profile';

const ProfileCard = () => {
  const [openText, setOpenText] = useState(true);
  const [profileData, setProfileData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    ProfileService.getProfileData()
      .then(response => response.data.data)
      .then(data => setProfileData({ ...profileData, ...data }))
      .catch(error => setErrorMessage(error));
  }, []);

  const {
    about, avatar, first_name, last_name, username,
  } = profileData;

  return (
    { errorMessage }
      && (
      <Card sx={{
        maxWidth: '984px',
      }}
      >
        <CardMedia
          component="img"
          height="168"
          image={defaultBackground && background}
          alt="user's background"
        />
        <CardContent sx={{ height: '100%' }}>
          <Avatar
            src={defaultAvatar && avatar}
            sx={{
              width: 128, height: 128, marginTop: '-80px', marginLeft: '30px', marginBottom: '12px',
            }}
          />
          <Typography variant="iter_h1" sx={{ paddingBottom: '3px', display: 'block' }}>
            {'Имя' && first_name}
            {' '}
            {'Фамилия' && last_name}
          </Typography>
          <Typography
            variant="iter_h2"
            sx={{ paddingBottom: '20px', color: '#6C757D', display: 'block' }}
          >
            @
            {'username' && username}
          </Typography>
          <Typography
            variant="iter_h2"
            paragraph
            my="16px"
            sx={[openText && {
              display: '-webkit-box',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }]}
          >
            {about}
          </Typography>
          {openText && (
          <Button
            variant="text"
            size="small"
            sx={{ textTransform: 'none', left: 'calc(100% - 90px)', position: 'relative' }}
            onClick={() => setOpenText(!openText)}
          >
            Показать ещё
          </Button>
          )}
        </CardContent>
      </Card>
      )
  );
};

export default ProfileCard;
