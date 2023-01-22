/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'dayjs/locale/ru';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Header from '../../components/header';
import PaymentMethod from '../lesson_payment/index';
import RepeatLessons from '../lesson_repeat/index';

const LessonCreate = () => {
  const [lessonLevels, setLessonLevels] = useState([]);
  const [lessonData, setLessonData] = useState({
    name: '',
    description: '',
    type: 'online',
    link: '',
    conferenceId: '',
    level: [],
    duration: '',
    repeat: 'once',
    date: null,
    time: null,
    regularLessons: [],
    payment: 'paid',
    donation: true,
    cost: '',
  });

  const update = e => {
    setLessonData({
      ...lessonData,
      [e.target.name]: e.target.value,
    });
  };

  const changeDonation = e => {
    const value = !(e.target.value === 'on');
    setLessonData({
      ...lessonData,
      [e.target.name]: value,
    });
  };

  const changeLessonLevel = event => {
    const {
      target: { value },
    } = event;
    setLessonLevels(
      typeof value === 'string' ? value.split(',') : value,
      update(event),
    );
  };

  const levels = ['Начинающий', 'Средний', 'Продвинутый'];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <Header title="Создание занятия" withBackBtn />
      <form onSubmit={e => {
        e.preventDefault();
      }}
      >
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid
            container
            direction="column"
            rowSpacing={3}
            sx={{ width: '70%', padding: '16px' }}
          >

            <Grid item>
              <Typography variant="modal">Обязательные поля *</Typography>
            </Grid>

            <Grid item>
              <TextField
                id="lesson_name"
                label="Название занятия"
                name="name"
                onChange={update}
                value={lessonData.name}
                required
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                id="lesson_description"
                label="Описание"
                name="description"
                placeholder="Первые N символов будут показаны в карточке занятия при поиске"
                onChange={update}
                value={lessonData.description}
                multiline
                fullWidth
                rows={4}
              />
            </Grid>

            <Grid item sx={{ height: '6%' }}>
              <FormControl fullWidth sx={{ paddingLeft: '2%' }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue="online"
                  sx={{ columnGap: '5%' }}

                >
                  <FormControlLabel
                    onChange={update}
                    value="online"
                    name="type"
                    control={<Radio />}
                    label={<Typography variant="modal" sx={{ fontSize: '16px', color: '#212121' }}>Онлайн</Typography>}
                  />
                  <FormControlLabel
                    onChange={update}
                    name="type"
                    value="video"
                    control={<Radio />}
                    label={<Typography variant="modal" sx={{ fontSize: '16px', color: '#212121' }}>Видео</Typography>}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item container sx={{ justifyContent: 'space-between' }}>
              <TextField
                id="lesson_link"
                label="Ссылка на занятие"
                name="link"
                value={lessonData.link}
                onChange={update}
                sx={{ width: '48%' }}
                required
              />

              <TextField
                id="lesson_link"
                label="Данные для доступа"
                name="conferenceId"
                value={lessonData.conferenceId}
                onChange={update}
                placeholder="Идентификатор конференции"
                sx={{ width: '48%' }}
              />
            </Grid>

            <Grid item>
              <FormControl fullWidth>
                <InputLabel id="lesson-level-label">Уровень подготовки</InputLabel>
                <Select
                  labelId="lesson-level-label"
                  id="lesson-level-checkbox"
                  multiple
                  required
                  fullWidth
                  name="level"
                  value={lessonLevels}
                  onChange={changeLessonLevel}
                  input={<OutlinedInput label="Уровень подготовки" />}
                  renderValue={selected => selected.join(', ')}
                >
                  {levels.map(level => (
                    <MenuItem key={level} value={level}>
                      <Checkbox checked={lessonLevels.indexOf(level) > -1} />
                      <ListItemText primary={level} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <TextField
                id="lesson_duration"
                label="Длительность занятия, мин"
                name="duration"
                type="number"
                onChange={update}
                required
                value={lessonData.duration}
                sx={{ width: '49%' }}
              />
            </Grid>

            <Grid item>
              <Divider variant="middle" sx={{ paddingTop: '20px' }} />
            </Grid>

            <RepeatLessons
              update={update}
              lessonData={lessonData}
              setLessonData={setLessonData}
            />

            <Grid item>
              <Divider variant="middle" sx={{ paddingTop: '20px' }} />
            </Grid>

            <PaymentMethod
              update={update}
              changeDonation={changeDonation}
              payment={lessonData.payment}
              cost={lessonData.cost}
            />
            <Grid item container sx={{ justifyContent: 'end', columnGap: '5%' }}>
              <Button
                size="large"
                variant="text"
              >
                Сохранить черновик
              </Button>

              <Button
                size="large"
                variant="contained"
                type="submit"
              >
                Опубликовать
              </Button>
            </Grid>

          </Grid>
        </Container>
      </form>
    </LocalizationProvider>
  );
};

export default LessonCreate;
