import { configureStore } from '@reduxjs/toolkit';
import auth from '../slices/auth';
import message from '../slices/message';
import lessons from '../slices/lessons';
import studentTickets from '../slices/tickets/studentTicketsSlice';
import teacherTickets from '../slices/tickets/getTeacherTicketsSlice';
import lesson from '../slices/lesson';
import questionnaire from '../slices/questionnaire';
import favorites from '../slices/favorites';
import resetpass from '../slices/pass-recovery';
import resetpassconfirm from '../slices/reset-pass-confirm';
import personalData from '../slices/personal-data';
import alertNotification from '../slices/alert-notification';

const store = configureStore({
  reducer: {
    auth,
    message,
    lessons,
    studentTickets,
    teacherTickets,
    lesson,
    questionnaire,
    favorites,
    resetpass,
    resetpassconfirm,
    personalData,
    alertNotification,
  },
});

export default store;
