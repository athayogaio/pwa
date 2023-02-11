import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Grid, TextField, MenuItem, Button,
} from '@mui/material';
import { setAlertProps } from '../../core/slices/alert-notification';

const Support = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currencies = [
    {
      value: 'payment',
      label: 'Оплата',
    },
    {
      value: 'lesson',
      label: 'Занятие',
    },
    {
      value: 'other',
      label: 'Другое',
    },
  ];

  const [supportRequest, setSupportRequest] = useState({
    category: '',
    theme: '',
    content: '',
  });

  const changeSupportRequest = nameRequest => e => {
    setSupportRequest({ ...supportRequest, [nameRequest]: e.target.value });
  };

  const changeIsSend = () => {
    dispatch(setAlertProps({
      display: true,
      status: 'success',
      title: 'Заявка отправлена',
      text: 'Ответ поступит Вам на электронную почту в ближайшее время.',
    }));
    navigate('/settings');
  };

  return (
    <Box sx={{ maxWidth: '732px', width: '100%', pt: '12px' }}>
      <Grid container gap="24px" mb="56px">
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>
            Обращение в техподдержку
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="category"
            select
            label="Категория"
            value={supportRequest.category}
            onChange={changeSupportRequest('category')}
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="theme"
            label="Тема"
            onChange={changeSupportRequest('theme')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={8}
            id="content"
            label="Содержание"
            onChange={changeSupportRequest('content')}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: '32px' }}>
        <Button
          fullWidth
          variant="contained"
          size="medium"
          sx={{ maxWidth: { xs: '100%', sm: '228px' }, fontSize: '16px' }}
          onClick={changeIsSend}
        >
          Отправить
        </Button>
      </Box>
    </Box>
  );
};

export default Support;
