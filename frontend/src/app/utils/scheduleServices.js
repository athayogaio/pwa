export const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
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
