/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {
  Grid,
  Typography,
  TextField,
  MenuItem,
  Select,
  Radio,
  Button,
  InputLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Box,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const OnceLesson = ({
  date, time, setLessonData, lessonData,
}) => {
  const setDate = newValue => {
    setLessonData({
      ...lessonData,
      date: newValue.$d,
    });
  };

  const setTime = newValue => {
    setLessonData({
      ...lessonData,
      time: newValue.$d,
    });
  };

  return (
    <Grid item container sx={{ justifyContent: 'start', columnGap: '4%' }}>
      <DatePicker
        label="Дата"
        value={date}
        id="lesson_date"
        minDate={dayjs(Date())}
        onChange={newValue => setDate(newValue)}
        renderInput={params => <TextField {...params} sx={{ width: '35%' }} required />}
      />
      <TimePicker
        label="Время"
        value={time}
        id="lesson_time"
        onChange={newValue => setTime(newValue)}
        renderInput={params => <TextField {...params} sx={{ width: '35%' }} required />}
      />
    </Grid>
  );
};

const RegularLessons = ({ lessonData, setLessonData }) => {
  const [startLessonDate, setStartLessonDate] = useState(null);
  const [finishLessonDate, setFinishLessonDate] = useState(null);
  const [regularLessonDay, setRegularLessonDay] = useState('');
  const [lessonTime, setLessonTime] = useState(null);

  const lessonsInfo = () => {
    const time = dayjs(lessonTime).minute() > 9 ? `${dayjs(lessonTime).hour()}:${dayjs(lessonTime).minute()}` : `${dayjs(lessonTime).hour()}:0${dayjs(lessonTime).minute()}`;
    const copyRegularLessons = [...lessonData.regularLessons];
    copyRegularLessons.push({ day: regularLessonDay, time });
    setLessonData({
      ...lessonData,
      regularLessons: copyRegularLessons,
    });
    setRegularLessonDay('');
    setLessonTime(null);
  };

  const deleteLesson = lesson => {
    setLessonData(lessonData.regularLessons.filter(p => p !== lesson));
  };

  return (
    <>
      <Grid item container sx={{ justifyContent: 'start', columnGap: '4%' }}>
        <Typography variant="modal" sx={{ fontSize: '18px', color: '#212121', paddingBottom: '20px' }}>
          Определите продолжительность серии занятий (не более 2-х месяцев)
        </Typography>

        <DatePicker
          label="Начало"
          value={startLessonDate}
          minDate={dayjs(Date())}
          onChange={newValue => setStartLessonDate(newValue)}
          renderInput={params => <TextField {...params} sx={{ width: '35%' }} required />}
        />
        <DatePicker
          label="Окончание"
          value={finishLessonDate}
          disabled={startLessonDate === null}
          minDate={startLessonDate}
          maxDate={dayjs(startLessonDate).add(2, 'month')}
          onChange={newValue => setFinishLessonDate(newValue)}
          renderInput={params => <TextField {...params} sx={{ width: '35%' }} required />}
        />

        <Typography
          variant="modal"
          sx={{
            fontSize: '18px', color: '#212121', paddingTop: '30px', paddingBottom: '20px',
          }}
        >
          Задайте регулярное расписание занятий на неделю
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
        }}
      >
        <FormControl sx={{ width: '30%' }}>
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
          value={lessonTime}
          id="regular_lesson_time"
          sx={{ width: '30%' }}
          onChange={newValue => setLessonTime(newValue)}
          renderInput={params => <TextField {...params} />}
        />

        <Button
          variant="text"
          disabled={regularLessonDay.length || lessonTime === null}
          onClick={lessonsInfo}
        >
          Добавить занятие
        </Button>
        {lessonData.regularLessons.map(lesson => (
          <Box
            key={Math.random()}
            sx={{
              width: '100%', display: 'flex', columnGap: '10%', paddingTop: '5%', paddingLeft: '15%',
            }}
          >
            <Box sx={{
              width: '40%', display: 'flex', columnGap: '10%', borderBottom: '1px solid #E5E5E5', justifyContent: 'space-between', paddingBottom: '1%',
            }}
            >
              <Box sx={{ width: '10%', display: 'flex', justifyContent: 'space-around' }}>
                <DateRangeOutlinedIcon sx={{ color: '#0D6EFD', marginRight: '5px' }} />
                <Typography variant="modal" sx={{ fontSize: '16px' }}>{lesson.day}</Typography>
                <AccessTimeIcon sx={{ color: '#0D6EFD', marginLeft: '25px', marginRight: '5px' }} />
                <Typography variant="modal" sx={{ fontSize: '16px' }}>{lesson.time}</Typography>
              </Box>
              <CloseOutlinedIcon
                sx={{ color: '#616161', cursor: 'pointer' }}
                onClick={() => { deleteLesson(lesson); }}
              />
            </Box>
          </Box>
        ))}
      </Grid>
    </>
  );
};

const RepeatLessons = ({ update, lessonData, setLessonData }) => (
  <>
    <Grid item sx={{ height: '6%' }}>
      <FormControl fullWidth sx={{ paddingLeft: '2%' }}>
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
            label={<Typography variant="modal" sx={{ fontSize: '16px', color: '#212121' }}>Разовое</Typography>}
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
          date={lessonData.date}
          time={lessonData.time}
          lessonData={lessonData}
          setLessonData={setLessonData}
        />
      )
      : (
        <RegularLessons
          regularLessons={lessonData.regularLessons}
          lessonData={lessonData}
          setLessonData={setLessonData}
        />
      )}
  </>
);

export default RepeatLessons;
