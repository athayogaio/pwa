import { configureStore } from '@reduxjs/toolkit';
import auth from '../slices/auth';
import message from '../slices/message';
import lessons from '../slices/lessons';
import tickets from '../slices/tickets';
import lesson from '../slices/lesson';
import questionnaire from '../slices/questionnaire';
import favorites from '../slices/favorites';

const store = configureStore({
  reducer: {
    auth,
    message,
    lessons,
    tickets,
    lesson,
    questionnaire,
    favorites,
  },
});

export default store;
