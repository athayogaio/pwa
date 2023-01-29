const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const calculateEndTime = (startTime, duration) => {
  const date = new Date();
  const startTimeInMinutes = +startTime.slice(0, 2) * 60 + +startTime.slice(3, 5);
  const durationInMinutes = +duration.slice(0, 2) * 60 + +duration.slice(3, 5);
  date.setMinutes(startTimeInMinutes + durationInMinutes);
  const endTimeHours = date.getHours();
  const endTimeMinutes = date.getMinutes();
  return `${endTimeHours}:${endTimeMinutes}`;
};

export const scheduleChipContent = (item, duration) => (
  `${weekdays[item.weekday]} ${item.start_time.slice(0, 5)}-${calculateEndTime(item.start_time, duration)}`
);
