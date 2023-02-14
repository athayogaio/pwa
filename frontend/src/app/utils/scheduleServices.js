export const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
export const weekdaysForGetDay = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
export const month = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const calculateEndTime = (startTime, duration) => {
  const anyDate = new Date(2000, 0, 1, 0, 0, 0, 0);
  const startTimeInMinutes = +startTime.slice(0, 2) * 60 + +startTime.slice(3, 5);
  const durationInMinutes = +duration.slice(0, 2) * 60 + +duration.slice(3, 5);
  anyDate.setMinutes(startTimeInMinutes + durationInMinutes);
  const endTimeHours = anyDate.getHours();
  const endTimeMinutes = anyDate.getMinutes();
  return `${endTimeHours}:${endTimeMinutes}`;
};

export const oneTimeLessonChipContent = (startDate, duration) => {
  const startDatePrepared = new Date(Date.parse(startDate));
  const hoursStart = startDate.slice(-9, -7);
  const minutesStart = startDate.slice(-6, -4);
  const weekDay = weekdays[startDatePrepared.getDay()];
  const durationInMinutes = +duration.slice(0, 2) * 60 + +duration.slice(3, 5);
  startDatePrepared.setMinutes(startDatePrepared.getMinutes() + durationInMinutes);
  const hoursEnd = startDatePrepared.getHours();
  const minutesEnd = startDatePrepared.getMinutes();
  return `${weekDay} ${hoursStart}:${minutesStart}-${hoursEnd}:${minutesEnd}`;
};

export const scheduleChipContent = (item, duration) => (
  `${weekdays[item.weekday]} ${item.start_time.slice(0, 5)}-${calculateEndTime(item.start_time, duration)}`
);

export const courseDuration = (startDate, endDate) => {
  const startTime = `${startDate.slice(8, 10)}.${startDate.slice(5, 7)}.${startDate.slice(2, 4)}`;
  const endTime = `${endDate.slice(8, 10)}.${endDate.slice(5, 7)}.${endDate.slice(2, 4)}`;
  return `${startTime} - ${endTime}`;
};

export const formatNearestLesson = (nearestLesson, duration) => {
  const preparedDate = new Date(Date.parse(nearestLesson));
  const weekDay = weekdaysForGetDay[preparedDate.getDay()];
  const monthDay = preparedDate.getDate();
  const monthRu = month[preparedDate.getMonth()];
  const hoursStart = preparedDate.getHours();
  const minutesStart = preparedDate.getMinutes();
  const hoursEnd = preparedDate
    .getHours(preparedDate.setHours(preparedDate.getHours() + +duration.slice(0, 2)));
  let minutesEnd = preparedDate
    .getMinutes(preparedDate.setMinutes(preparedDate.getMinutes() + +duration.slice(3, 5)));
  if (minutesEnd < 10) { minutesEnd = `0${minutesEnd}`; }
  return {
    weekDay, monthDay, monthRu, hoursStart, minutesStart, hoursEnd, minutesEnd,
  };
};
