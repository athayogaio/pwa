import { configureStore } from '@reduxjs/toolkit';
import auth from '../slices/auth';
import message from '../slices/message';
import lessons from '../slices/lessons';
import lesson from '../slices/lesson';
import questionnaire from '../slices/questionnaire';

const store = configureStore({
  reducer: {
    auth,
    message,
    lessons,
    lesson,
    questionnaire,
  },
});

export default store;
