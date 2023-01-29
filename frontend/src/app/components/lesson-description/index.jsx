/* eslint-disable no-mixed-operators */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box, Button, Typography, Avatar, Chip, Divider, Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import avatar from '../../../assets/public/profile_avatar.jpg';

const LessonDescription = ({
  title, description, price, level, favorite, comments,
  rate, votes, isVideo, isRegular, startDate, duration, id, payment,
}) => (
  <>
    <Box display="flex" alignItems="start" mb="23px">
      {isVideo && <Chip color="primary" variant="outlined" size="small" label="Видео" />}
      {isRegular && !isVideo && <Chip color="success" variant="outlined" size="small" label="Регулярное" />}
      {!isRegular && !isVideo && <Chip color="success" variant="outlined" size="small" label="Разовое занятие" />}
    </Box>

    <Box display="flex" alignItems="center" justifyContent="space-between" mb="20px">
      <Typography variant="h4" fontSize="24px">
        {title}
      </Typography>
      <Stack spacing={2} direction="row">
        {favorite ? <FavoriteIcon fontSize="medium" color="primary" /> : <FavoriteBorderOutlinedIcon fontSize="medium" color="disabled" />}
        <ShareOutlinedIcon color="disabled" />
        <MoreHorizOutlinedIcon color="disabled" />
      </Stack>
    </Box>
    <Typography display="flex" alignItems="center" fontSize="16px" color="text.secondary" mb="32px">
      {level}
    </Typography>

    <Box maxHeight="176px" display="flex" flexDirection="column" mb="32px">
      <Typography fontSize="16px" noWrap={false}>
        {description}
        {' '}
        {description.length > 600 && (

        <Typography component={Link} fontSize="16px" color="primary" sx={{ textDecoration: 'none' }}>
          Показать еще
        </Typography>
        )}
      </Typography>

    </Box>
    <Divider flexItem />
    <Box display="flex" flexDirection="column" gap="12px" mb="32px" mt="32px">
      <Typography fontSize="16px" fontWeight="500">
        Дата занятия
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <AccessTimeIcon color="primary" />
        <Typography fontSize="18px" fontWeight="600">12.03.23</Typography>
      </Stack>
    </Box>
    <Box display="flex" flexDirection="column" gap="15px" mb="32px">
      <Typography fontSize="16px" fontWeight="500">
        Расписание занятия
      </Typography>
      <Box display="flex" flexDirection="row" gap="8px">
        <Typography
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="13px"
          sx={{ width: '111px', background: '#EEEEEE', borderRadius: '16px' }}
        >
          Пн 14:30-15:30
        </Typography>
        <Typography
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="13px"
          sx={{ width: '111px', background: '#EEEEEE', borderRadius: '16px' }}
        >
          Пн 15:30-16:30
        </Typography>
        <Typography
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="13px"
          sx={{ width: '111px', background: '#EEEEEE', borderRadius: '16px' }}
        >
          Пн 17:30-18:30
        </Typography>
      </Box>
      <Typography
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="13px"
        sx={{ width: '111px', background: '#EEEEEE', borderRadius: '16px' }}
      >
        Ср 14:30-15:30
      </Typography>
    </Box>
    <Divider flexItem />
    <Box display="flex" alignItems="center" flexWrap="wrap" gap="3px" mb="32px" mt="32px">
      <Typography fontWeight="600" fontSize="24px" mr="16px">
        ₽
        {' '}
        {price}
      </Typography>
      <StarOutlineIcon sx={{ color: '#FF9800' }} />
      <Typography variant="h4" fontSize="16px" fontWeight="600">{rate}</Typography>
      <Typography variant="h4" fontSize="16px" color="#BDBDBD" mr="16px">
        (
        {votes}
        {' '}
        оценок
        )
      </Typography>
      <ModeCommentOutlinedIcon sx={{ color: '#616161' }} />
      <Typography fontSize="16px" fontWeight="600">{comments}</Typography>
    </Box>
    <Box display="flex" alignItems="center" flexWrap="wrap" gap="6px" mb="56px">
      <Avatar
        src={avatar}
        sx={{ width: 32, height: 32 }}
      />
      <Typography
        fontSize="16px"
      >
        Иван Иванов
      </Typography>
    </Box>
    <Box display="flex" justifyContent="flex-end">
      <Button
        component={Link}
        to={`/abonement/${id}`}
        variant="contained"
        sx={{
          fontSize: '16px', fontWeight: '500', width: '227px', mb: '20px',
        }}
      >
        Записаться
      </Button>
    </Box>
  </>
);

export default LessonDescription;
