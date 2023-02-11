import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import { Navigate, useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Header from '../header';
import LayoutContainer from '../layout-container';
import PaymentMethod from '../lesson_payment/index';
import RepeatLessons from '../lesson_repeat/index';
import LessonsService from '../../services/lessons';
import AlertDialog from '../lesson_alert';
import { setAlertProps } from '../../core/slices/alert-notification';

const LessonCreate = () => {
  const [lessonLevels, setLessonLevels] = useState([]);
  const [lessonData, setLessonData] = useState({
    name: '',
    description: '',
    course_type: 'ONLINE',
    link: '',
    link_info: '',
    level: [],
    complexity: 'EASY',
    duration: '',
    duration_number: '',
    repeat: 'once',
    start_datetime: '',
    deadline_datetime: '',
    dateForOnceLesson: null,
    timeForOnceLesson: null,
    startDateForRegularLesson: null,
    finishDateForRegularLesson: null,
    lessons: [],
    payment: 'PAYMENT',
    donation: true,
    price: '',
    is_draft: false,
  });
  const [isFormSend, setIsFormSend] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const location = useLocation();
  const dispatch = useDispatch();

  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');

  const getValidationFormErrorMessages = () => {
    const nameValid = lessonData.name.length === 0;
    let name = nameValid ? 'Это поле не может быть пустым.' : '';
    if (lessonData.name.length > 40) {
      name = 'Название занятия не должно превышать 40 символов';
    }

    const descriptionValid = lessonData.description.length === 0;
    let description = descriptionValid ? 'Это поле не может быть пустым.' : '';
    if (lessonData.description.length > 150) {
      description = 'Описание занятия не должно превышать 150 символов';
    }

    const paymentValid = lessonData.payment === 'PAYMENT' && !lessonData.price;
    const payment = paymentValid ? 'Это поле не может быть пустым.' : '';

    const linkValid = lessonData.link.length === 0;
    let link = linkValid ? 'Это поле не может быть пустым.' : '';
    if (!lessonData.link.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)) {
      link = 'Ссылка дожна быть в формате URL';
    }

    const linkInfoValid = lessonData.link_info.length === 0;
    const link_info = linkInfoValid ? 'Это поле не может быть пустым.' : '';

    const durationValid = lessonData.duration_number.length === 0;
    const duration = durationValid ? 'Это поле не может быть пустым.' : '';

    const levelValid = lessonData.level.length === 0;
    const level = levelValid ? 'Это поле не может быть пустым.' : '';

    const onceLessonTimeValid = lessonData.timeForOnceLesson === null && lessonData.repeat === 'once';
    const onceLessonTime = onceLessonTimeValid ? 'Это поле не может быть пустым.' : '';

    const onceLessonDateValid = lessonData.dateForOnceLesson === null && lessonData.repeat === 'once';
    let onceLessonDate = onceLessonDateValid ? 'Это поле не может быть пустым.' : '';
    if (lessonData.dateForOnceLesson < Date.now()) {
      onceLessonDate = 'Дата должна быть не ранее сегодняшней';
    }

    const regularLessonsFinishDateValid = lessonData.finishDateForRegularLesson === null && lessonData.repeat !== 'once';
    const regularLessonsFinishDate = regularLessonsFinishDateValid ? 'Это поле не может быть пустым.' : '';

    const regularLessonsValid = lessonData.lessons.length === 0 && lessonData.repeat !== 'once';
    const regularLessons = regularLessonsValid ? 'Обязательно наличие одного цикла занятий.' : '';

    setValidationErrors({
      ...validationErrors,
      name,
      description,
      payment,
      link,
      link_info,
      duration,
      level,
      onceLessonTime,
      onceLessonDate,
      regularLessonsFinishDate,
      regularLessons,
    });
  };

  const getStartDate = () => {
    const date = lessonData.dateForOnceLesson;
    const time = lessonData.timeForOnceLesson;
    const hour = dayjs(time).get('hour');
    const minute = dayjs(time).get('minute');
    const startDateValue = dayjs(date).set('hour', hour).set('minute', minute);
    return startDateValue.format();
  };

  const getFinishDate = () => {
    const start_datetime = getStartDate();
    const duration = lessonData.duration.split(':');
    const minute = Number(duration[0] * 60) + Number(duration[1]);
    const deadline_datetime = dayjs(start_datetime).add(minute, 'minute');
    return deadline_datetime.format();
  };

  const getCorrectDateTime = () => {
    if (lessonData.dateForOnceLesson !== null) {
      setLessonData(lessonData.start_datetime = getStartDate());
      setLessonData(lessonData.deadline_datetime = getFinishDate());
    } else {
      setLessonData(lessonData.start_datetime = lessonData?.startDateForRegularLesson?.format());
      setLessonData(
        lessonData.deadline_datetime = lessonData?.finishDateForRegularLesson?.format()
      );
    }
  };

  const getDuration = duration => {
    const today = new Date();
    today.setHours(0, duration, 0, 0);
    const now = today.toLocaleTimeString('ru-RU');
    return now;
  };

  const getCorrectOtherData = () => {
    setLessonData(lessonData.level = lessonData.level.map(el => {
      if (el === 'Начинающий') el = 'STARTING';
      if (el === 'Средний') el = 'CONTINUER';
      if (el === 'Продвинутый') el = 'ADVANCED';
      return el;
    }));
    lessonData.payment === 'FREE' ? setLessonData(lessonData.price = 0) : '';
    setLessonData(lessonData.duration = getDuration(lessonData.duration_number));
  };

  const update = e => {
    setLessonData({
      ...lessonData,
      [e.target.name]: e.target.value,
    });
  };

  const saveFormUsDraft = () => {
    getCorrectDateTime();
    getCorrectOtherData();
    getValidationFormErrorMessages();
    setLessonData({
      ...lessonData,
      is_draft: true,
    });
  };

  const saveForm = () => {
    getCorrectDateTime();
    getCorrectOtherData();
    getValidationFormErrorMessages();
    setLessonData({
      ...lessonData,
      is_draft: false,
    });
  };

  const postLessonData = () => {
    LessonsService.postLesson(lessonData)
      .then(setIsFormSend(true));
    dispatch(setAlertProps({
      display: true,
      status: 'success',
      title: 'Занятие создано',
      text: 'Информация отправлена на проверку, занятие в ближайшее время появится в поиске',
    }));
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
      <Header title="Создать занятие" withBackBtn />
      <LayoutContainer>
        <form onSubmit={e => {
          e.preventDefault();
          postLessonData();
        }}
        >
          <Container sx={{ display: 'flex', justifyContent: 'center', padding: pointForAdaptiveToSM ? 0 : '16px 0' }}>
            <Grid
              container
              direction="column"
              rowSpacing={pointForAdaptiveToSM ? 2 : 3}
              sx={{ width: pointForAdaptiveToSM ? '100%' : '70%' }}
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
                  error={!!validationErrors?.name}
                  helperText={validationErrors?.name}
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
                  required
                  rows={pointForAdaptiveToSM ? 8 : 4}
                  error={!!validationErrors?.description}
                  helperText={validationErrors?.description}
                />
              </Grid>

              <Grid item sx={{ height: '6%' }}>
                <FormControl fullWidth sx={{ paddingLeft: '2%' }}>
                  <RadioGroup
                    row
                    aria-labelledby="row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue="ONLINE"
                    sx={{ columnGap: '5%' }}
                  >
                    <FormControlLabel
                      onChange={update}
                      value="ONLINE"
                      name="course_type"
                      control={<Radio />}
                      label={<Typography variant="modal" sx={{ fontSize: '16px', color: '#212121', minWidth: '90px' }}>Онлайн</Typography>}
                    />
                    <FormControlLabel
                      onChange={update}
                      name="course_type"
                      value="VIDEO"
                      control={<Radio />}
                      label={<Typography variant="modal" sx={{ fontSize: '16px', color: '#212121' }}>Видео</Typography>}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item container sx={{ justifyContent: 'space-between', flexDirection: pointForAdaptiveToSM ? 'column' : 'row', rowGap: pointForAdaptiveToSM ? 2 : 0 }}>
                <TextField
                  id="lesson_link"
                  label="Ссылка на занятие"
                  name="link"
                  value={lessonData.link}
                  onChange={update}
                  sx={{ width: pointForAdaptiveToSM ? '100%' : '48%' }}
                  required
                  error={!!validationErrors?.link}
                  helperText={validationErrors?.link}
                />

                <TextField
                  id="lesson_link"
                  label="Данные для доступа"
                  name="conferenceId"
                  value={lessonData.conferenceId}
                  onChange={update}
                  fullWidth={pointForAdaptiveToSM}
                  placeholder="Идентификатор конференции"
                  sx={{ width: pointForAdaptiveToSM ? '100%' : '48%' }}
                  error={!!validationErrors?.link_info}
                  helperText={validationErrors?.link_info}
                />
              </Grid>

              <Grid item>
                <FormControl fullWidth error={!!validationErrors?.level}>
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
                  <FormHelperText>{validationErrors?.level}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item>
                <TextField
                  id="lesson_duration"
                  label="Длительность занятия, мин"
                  name="duration_number"
                  type="number"
                  onChange={update}
                  required
                  value={lessonData.duration_number}
                  sx={{ width: pointForAdaptiveToSM ? '100%' : '49%' }}
                  error={!!validationErrors?.duration}
                  helperText={validationErrors?.duration}
                />
              </Grid>

              <Grid item>
                <Divider variant="middle" sx={{ paddingTop: pointForAdaptiveToSM ? '15px' : '20px' }} />
              </Grid>

              <RepeatLessons
                update={update}
                lessonData={lessonData}
                setLessonData={setLessonData}
                errorDateForOnceLesson={validationErrors.onceLessonDate}
                errorTimeForOnceLesson={validationErrors.onceLessonTime}
                errorStartForRegularLesson={validationErrors.regularLessonsFinishDate}
                errorFinishForRegularLesson={validationErrors.regularLessonsFinishDate}
                errorLessons={validationErrors.regularLessons}
              />

              <Grid item>
                <Divider variant="middle" sx={{ paddingTop: '20px' }} />
              </Grid>

              <PaymentMethod
                update={update}
                changeDonation={changeDonation}
                payment={lessonData.payment}
                price={lessonData.price}
                error={validationErrors.payment}
                pointForAdaptiveToSM={pointForAdaptiveToSM}
              />
              {pointForAdaptiveToSM
                ? (
                  <Grid
                    item
                    container
                    sx={{
                      flexDirection: 'column', width: '100%', marginTop: '7%', marginBottom: '3%',
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      onClick={saveForm}
                    >
                      Опубликовать
                    </Button>

                    <Button
                      fullWidth
                      variant="text"
                      onClick={saveFormUsDraft}
                    >
                      Сохранить черновик
                    </Button>

                  </Grid>
                )
                : (
                  <Grid item container sx={{ justifyContent: 'end', columnGap: '5%' }}>
                    <Button
                      size="large"
                      variant="text"
                      onClick={saveFormUsDraft}
                    >
                      Сохранить черновик
                    </Button>

                    <Button
                      size="large"
                      variant="contained"
                      type="submit"
                      onClick={saveForm}
                    >
                      Опубликовать
                    </Button>
                  </Grid>
                )}
            </Grid>
          </Container>
        </form>
      </LayoutContainer>
      {isFormSend ? <Navigate to="/my-lessons" /> : ''}
      {location.pathname !== '/create-lesson' ? <AlertDialog /> : ''}
    </LocalizationProvider>
  );
};

export default LessonCreate;
