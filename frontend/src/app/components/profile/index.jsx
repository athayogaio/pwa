import React, { useState } from 'react';
import {
  Avatar, Button,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import background from '../../../assets/public/profile_background.jpg';
import avatar from '../../../assets/public/profile_avatar.jpg';

import './index.scoped.scss';

const ProfileCard = () => {
  const [openText, setOpenText] = useState(true);

  return (
    <Card sx={{
      maxWidth: '984px',
    }}
    >
      <CardMedia
        component="img"
        height="168"
        image={background}
        alt="user's background"
      />
      <CardContent sx={{ height: '100%' }}>
        <Avatar
          src={avatar}
          sx={{
            width: 128, height: 128, marginTop: '-80px', marginLeft: '30px', marginBottom: '12px',
          }}
        />
        <Typography variant="iter_h1" sx={{ paddingBottom: '3px', display: 'block' }}>Иван Иванов</Typography>
        <Typography
          variant="iter_h2"
          sx={{ paddingBottom: '20px', color: '#6C757D', display: 'block' }}
        >
          @ivan
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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis id
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Конец
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
  );
};

export default ProfileCard;
