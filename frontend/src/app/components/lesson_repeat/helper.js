const dateRange = {
  Понедельник: 0,
  Вторник: 1,
  Среда: 2,
  Четверг: 3,
  Пятница: 4,
  Суббота: 5,
  Восресенье: 6,
};

const getDay = num => {
  let day;
  for (const el in dateRange) {
    if (dateRange[el] === num) {
      day = el;
    }
  }
  return day;
};

export { dateRange, getDay };
