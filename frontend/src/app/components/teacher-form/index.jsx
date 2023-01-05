import React from 'react';
import {
  Grid, Box, Typography, TextField, InputAdornment,
  FormControl, RadioGroup, FormControlLabel, Radio,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TodayIcon from '@mui/icons-material/Today';
import UploadDocument from '../upload-document';

const TeacherForm = () => (
  <Box sx={{ maxWidth: '732px' }}>
    <Typography fontWeight="600" fontSize="24px" mb="34px">
      Заполните анкету
    </Typography>
    <Typography color="text.secondary" mb="24px">
      * Поля, обязательные для заполнения
    </Typography>
    <Grid container xs={12} spacing="24px">
      <Grid item xs={6}>
        <TextField
          fullWidth
          required
          id="first-name"
          label="Имя"
          size="small"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          required
          id="last-name"
          label="Фамилия"
          size="small"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          id="birthday"
          label="Дата рождения"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <TodayIcon style={{ color: '#616161' }} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item>
        <FormControl>
          <RadioGroup row>
            <FormControlLabel value="male" control={<Radio />} label="мужчина" />
            <FormControlLabel value="female" control={<Radio />} label="женщина" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          multiline
          label="О себе"
          id="about-me"
          rows={8}
          helperText="Не более 3000 символов"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          multiline
          label="Опыт работы"
          id="work-experience"
          rows={6}
          helperText="Не более 1000 символов"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          id="vk-link"
          label="Ссылка на страницу ВК"
          size="small"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          id="telegram-link"
          label="Ссылка на профиль в Telegram"
          size="small"
        />
      </Grid>
      <Grid item>
        <Typography fontWeight="600">
          Фото пользователя
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <UploadDocument />
      </Grid>
      <Grid item>
        <Typography fontWeight="600">
          Фото паспорта
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <UploadDocument />
      </Grid>
      <Grid item>
        <Typography fontWeight="600">
          Фото пользователя с паспортом
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <UploadDocument />
      </Grid>
      <Grid item>
        <Typography fontWeight="600">
          Документы, подтверждающие квалификацию и опыт работы
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <UploadDocument />
      </Grid>
    </Grid>
  </Box>
);

export default TeacherForm;
