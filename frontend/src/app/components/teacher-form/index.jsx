import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid, Box, Typography, TextField, FormControl, RadioGroup, FormControlLabel, Radio,
  Button, Stack,
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TodayIcon from '@mui/icons-material/Today';
import 'dayjs/locale/ru';
import UploadFiles from '../upload_files';
import postQuestionnaireSlice from '../../core/slices/questionnaire/postQuestionnaire';

const TeacherForm = () => {
  const [answers, setAnswers] = useState({
    name: '',
    surname: '',
    date_of_birth: null,
    gender: '',
    about_me: '',
    work_experience: '',
    vk_link: '',
    telegram_link: '',
    certificate_photos: '',
    passport_photo: '',
    user_photo: '',
    user_with_passport_photo: '',
  });

  const handleChangeAnswer = prop => event => {
    setAnswers({ ...answers, [prop]: event.target.value });
  };

  const dispatch = useDispatch();

  const postAnswers = answersArr => {
    const dateOfBirth = answersArr.date_of_birth;
    dispatch(postQuestionnaireSlice({
      ...answersArr,
      date_of_birth: dateOfBirth ? `${dateOfBirth.$D}-${dateOfBirth.$M + 1}-${dateOfBirth.$y}` : null,
    }));
  };

  const handleChangeDate = newValue => {
    setAnswers({ ...answers, date_of_birth: newValue });
  };

  return (
    <Box sx={{ maxWidth: '732px' }}>
      <Typography fontWeight="600" fontSize="24px" mb="34px">
        Заполните анкету
      </Typography>
      <Typography color="text.secondary" mb="24px">
        * Поля, обязательные для заполнения
      </Typography>
      <Grid container spacing="24px" mb="60px">
        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            id="first-name"
            label="Имя"
            size="small"
            onChange={handleChangeAnswer('name')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            id="surname"
            label="Фамилия"
            size="small"
            onChange={handleChangeAnswer('surname')}
          />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider adapterLocale="ru" dateAdapter={AdapterDayjs}>
            <Stack>
              <DesktopDatePicker
                label="День рождения *"
                inputFormat="DD.MM.YYYY"
                value={answers.date_of_birth}
                onChange={handleChangeDate}
                renderInput={params => <TextField {...params} />}
                components={{
                  OpenPickerIcon: TodayIcon,
                }}
              />
            </Stack>
          </LocalizationProvider>
        </Grid>
        <Grid item>
          <FormControl>
            <RadioGroup row onChange={handleChangeAnswer('gender')}>
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="мужчина"
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="женщина"
              />
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
            onChange={handleChangeAnswer('about_me')}
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
            onChange={handleChangeAnswer('work_experience')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="vk-link"
            label="Ссылка на страницу ВК"
            size="small"
            onChange={handleChangeAnswer('vk_link')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="telegram-link"
            label="Ссылка на профиль в Telegram"
            size="small"
            onChange={handleChangeAnswer('telegram_link')}
          />
        </Grid>
        <Grid item>
          <Typography fontWeight="600">Фото пользователя</Typography>
        </Grid>
        <Grid item xs={12}>
          <UploadFiles />
        </Grid>
        <Grid item>
          <Typography fontWeight="600">Фото паспорта</Typography>
        </Grid>
        <Grid item xs={12}>
          <UploadFiles />
        </Grid>
        <Grid item>
          <Typography fontWeight="600">
            Фото пользователя с паспортом
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <UploadFiles />
        </Grid>
        <Grid item>
          <Typography fontWeight="600">
            Документы, подтверждающие квалификацию и опыт работы
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <UploadFiles />
        </Grid>
      </Grid>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        gap="30px"
      >
        <Box sx={{ width: '311px' }}>
          <Button
            fullWidth
            variant="contained"
            // disabled
            size="large"
            onClick={() => postAnswers(answers)}
          >
            Отправить на проверку
          </Button>
        </Box>
        <Box display="flex" sx={{ width: '311px' }}>
          <Typography fontSize="12px" fontWeight="400" textAlign="center">
            Отправляя форму, вы соглашаетесь с
            <Typography
              component="span"
              fontSize="12px"
              fontWeight="400"
              color="primary"
            >
              {' '}
              офертой
            </Typography>
            {' '}
            и даёте согласие на
            <Typography
              component="span"
              fontSize="12px"
              fontWeight="400"
              color="primary"
            >
              {' '}
              обработку ваших персональных данных
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TeacherForm;
