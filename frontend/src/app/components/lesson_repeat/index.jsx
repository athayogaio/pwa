import React, {useState} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import useMediaQuery from '@mui/material/useMediaQuery';
import {dateRange, getDay} from './helper';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const OnceLesson = ({
  date, time, setLessonData, lessonData, errorTime, errorDate, pointForAdaptiveToSM
}) => {
  const setDate = newValue => {
    setLessonData({
      ...lessonData,
      dateForOnceLesson: newValue,
    });
  };

  const setTime = newValue => {
    setLessonData({
      ...lessonData,
      timeForOnceLesson: newValue,
    });
  };

  return (
    <Grid item container sx={{ justifyContent: 'start', columnGap: pointForAdaptiveToSM ? '2%' : '4%' }}>
      <DatePicker
        label="Дата"
        value={date}
        id="lesson_date"
        minDate={dayjs(Date())}
        onChange={newValue => setDate(newValue)}
        renderInput={params => <TextField 
          {...params}
          sx={{ width: pointForAdaptiveToSM ? '49%' : '35%' }}
          required
          error={ !!errorDate }
          helperText={errorDate}
        />}
      />
      <TimePicker
        label="Время"
        value={time}
        id="lesson_time"
        onChange={newValue => setTime(newValue)}
        renderInput={params => <TextField
          {...params}
          sx={{ width: pointForAdaptiveToSM ? '49%' : '35%' }}
          required
          error={ !!errorTime }
          helperText={errorTime}
        />}
      />
    </Grid>
  );
};

const RegularLessons = ({
  start_datetime, deadline_datetime, lessonData, setLessonData, errorStartDate, errorFinishDate, errorLessons, pointForAdaptiveToSM
}) => {
  const [regularLessonDay, setRegularLessonDay] = useState('');
  const [redularLessonTime, setRegularLessonTime] = useState(null);

  const setStartDate = newValue => {
    setLessonData({
      ...lessonData,
      startDateForRegularLesson: newValue,
    });
  };

  const setFinishDate = newValue => {
    setLessonData({
      ...lessonData,
      finishDateForRegularLesson: newValue,
    });
  };

  const getLessonInfo = () => {
    const time = dayjs(redularLessonTime).minute() > 9 ? `${dayjs(redularLessonTime).hour()}:${dayjs(redularLessonTime).minute()}` : `${dayjs(redularLessonTime).hour()}:0${dayjs(redularLessonTime).minute()}`;
    const copyRegularLessons = [...lessonData.lessons];
    copyRegularLessons.push({ weekday: dateRange[regularLessonDay], start_time: time });
    setLessonData({
      ...lessonData,
      lessons: copyRegularLessons,
    });
    setRegularLessonDay('');
    setRegularLessonTime(null);
  };

  const deleteLesson = lesson => {
    setLessonData(lessonData.lessons.filter(p => p !== lesson));
  };

  return (
    <>
      <Grid item container sx={{ justifyContent: 'start', columnGap: '4%' }}>
        <Typography variant="modal" sx={{ fontSize: pointForAdaptiveToSM ? '16px' : '18px', color: '#212121', paddingBottom: '20px' }}>
          Определите продолжительность серии занятий (не более 2-х месяцев)
        </Typography>

        <DatePicker
          label="Начало"
          value={start_datetime}
          minDate={dayjs(Date())}
          onChange={newValue => setStartDate(newValue)}
          renderInput={params => <TextField {...params} sx={{ width: pointForAdaptiveToSM ? '48%' : '35%' }} required error={ !!errorStartDate } helperText={errorStartDate}/>}
        />
        <DatePicker
          label="Окончание"
          value={deadline_datetime}
          disabled={start_datetime === null}
          minDate={start_datetime}
          maxDate={dayjs(start_datetime).add(2, 'month')}
          onChange={newValue => setFinishDate(newValue)}
          renderInput={params => <TextField {...params} sx={{ width: pointForAdaptiveToSM ? '48%' : '35%' }} required error={ !!errorFinishDate } helperText={errorFinishDate}/>}
        />
        <Typography
          variant="modal"
          sx={{
            fontSize: pointForAdaptiveToSM ? '16px' : '18px', color: '#212121', paddingTop: '30px', paddingBottom: '20px', width: pointForAdaptiveToSM ? '90%' : '',
          }}
        >
          Задайте регулярное расписание серии занятий на неделю
        </Typography>
      </Grid>

      <Grid
        item
        container
        sx={{
          border: '1px solid #E5E5E5',
          padding: '10px',
          minHeight: '150px',
          alignContent: 'flex-start',
          justifyContent: 'space-around',
          borderRadius: '10px',
          flexDirection: pointForAdaptiveToSM ? 'column' : 'row',
        }}
      >
        <FormControl sx={{ width: pointForAdaptiveToSM ? '100%' : '30%', paddingBottom: pointForAdaptiveToSM ? '3%' : '' }} error={!!errorLessons}>
          <InputLabel id="demo-simple-select-label">День недели</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={regularLessonDay}
            name="dayForRegularLesson"
            label="День недели"
            onChange={e => setRegularLessonDay(e.target.value)}
          >
            <MenuItem value="Понедельник">Понедельник</MenuItem>
            <MenuItem value="Вторник">Вторник</MenuItem>
            <MenuItem value="Среда">Среда</MenuItem>
            <MenuItem value="Четверг">Четверг</MenuItem>
            <MenuItem value="Пятница">Пятница</MenuItem>
            <MenuItem value="Суббота">Суббота</MenuItem>
            <MenuItem value="Воскресенье">Воскресенье</MenuItem>
          </Select>
        </FormControl>

        <TimePicker
          label="Время"
          value={redularLessonTime}
          id="regular_lesson_time"
          sx={{ width: pointForAdaptiveToSM ? '100%' : '30%' }}
          onChange={newValue => setRegularLessonTime(newValue)}
          renderInput={params => <TextField sx={{marginBottom: pointForAdaptiveToSM ? '5%' : ''}} {...params} error={!!errorLessons} helperText={errorLessons}/>}
        />

        <Button
          variant="text"
          disabled={!regularLessonDay.length || !redularLessonTime}
          onClick={getLessonInfo}
          fullWidth={pointForAdaptiveToSM}
        >
          Добавить занятие
        </Button>
        {lessonData?.lessons?.map(lesson => (
          <Box
            key={Math.random()}
            sx={{
              width: '100%', display: 'flex', columnGap: '10%', paddingBottom: pointForAdaptiveToSM ? '5%' : '', paddingTop: '5%', paddingLeft: pointForAdaptiveToSM ? '' : '15%',
            }}
          >
            <Box sx={{
              width: pointForAdaptiveToSM ? '100%' : '40%', display: 'flex', columnGap: '10%', borderBottom: '1px solid #E5E5E5', justifyContent: 'space-between', paddingBottom: '1%',
            }}
            >
              <Box sx={{
                width: pointForAdaptiveToSM ? '100%' : '10%', display: 'flex', justifyContent: pointForAdaptiveToSM ? 'flex-start' : 'space-around',
                columnGap: pointForAdaptiveToSM ? '2%' : ''
              }}>
                <DateRangeOutlinedIcon sx={{ color: '#0D6EFD', marginRight: '5px' }} />
                <Typography variant="modal" sx={{ fontSize: '16px', display: 'inline-block', minWidth: '100px' }}>{getDay(lesson.weekday)}</Typography>
                <AccessTimeIcon sx={{ color: '#0D6EFD', marginLeft: '25px', marginRight: '5px' }} />
                <Typography variant="modal" sx={{ fontSize: '16px' }}>{lesson.start_time}</Typography>
              </Box>
              <CloseOutlinedIcon
                sx={{ color: '#616161', cursor: 'pointer' }}
                onClick={() => deleteLesson(lesson)}
              />
            </Box>
          </Box>
        ))}
      </Grid>
    </>
  );
};

const RepeatLessons = ({ update, lessonData, setLessonData, errorDateForOnceLesson, errorTimeForOnceLesson, errorMessage, errorStartForRegularLesson, errorFinishForRegularLesson, errorLessons }) => {
  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');
  
  return (
  <>
    <Grid item sx={{ height: pointForAdaptiveToSM ? '4%' : '6%', flexDirection: pointForAdaptiveToSM ? 'column' : 'row'}}>
      <FormControl sx={{ width: '100%', paddingLeft: '2%' }}>
        <RadioGroup
          row
          aria-labelledby="lesson-repeat-label"
          name="lesson-repeat-radio-buttons-group"
          defaultValue="once"
          sx={{ columnGap: '5%' }}
        >
          <FormControlLabel
            onChange={update}
            value="once"
            name="repeat"
            control={<Radio />}
            label={<Typography variant="modal" sx={{ fontSize: '16px', color: '#212121', minWidth: '90px' }}>Разовое</Typography>}
          />
          <FormControlLabel
            onChange={update}
            name="repeat"
            value="regular"
            control={<Radio />}
            label={<Typography variant="modal" sx={{ fontSize: '16px', color: '#212121' }}>Регулярное</Typography>}
          />
        </RadioGroup>
      </FormControl>
    </Grid>
    {lessonData.repeat === 'once'
      ? (
        <OnceLesson
          date={lessonData.dateForOnceLesson}
          time={lessonData.timeForOnceLesson}
          lessonData={lessonData}
          setLessonData={setLessonData}
          errorTime={errorTimeForOnceLesson}
          errorDate={errorDateForOnceLesson}
          error={errorMessage}
          pointForAdaptiveToSM={pointForAdaptiveToSM}
        />
      )
      : (
        <RegularLessons
          start_datetime={lessonData.startDateForRegularLesson}
          deadline_datetime={lessonData.finishDateForRegularLesson}
          lessonData={lessonData}
          setLessonData={setLessonData}
          error={errorMessage}
          errorStartDate={errorStartForRegularLesson}
          errorFinishDate={errorFinishForRegularLesson}
          errorLessons={errorLessons}
          pointForAdaptiveToSM={pointForAdaptiveToSM}
        />
      )}
  </>
);
      };

export default RepeatLessons;
