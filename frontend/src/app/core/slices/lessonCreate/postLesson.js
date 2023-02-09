import { createAsyncThunk } from '@reduxjs/toolkit';
import LessonsService from '../../../services/lessons';
import { setMessage } from '../message';

const postLessonSlice = createAsyncThunk(
  'core/courses',
  async ({
    name,
    description,
    complexity,
    level,
    duration,
    course_type,
    link,
    link_info,
    start_datetime,
    deadline_datetime,
    payment,
    price,
    lessons,
    is_draft,
  }, thunkAPI) => {
    try {
      const result = await LessonsService.postLesson({
        name,
        description,
        complexity,
        level,
        duration,
        course_type,
        link,
        link_info,
        start_datetime,
        deadline_datetime,
        payment,
        price,
        lessons,
        is_draft,
      });
      return result.data;
    } catch (error) {
      const message = error.response.data.errors;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  },
);

export default postLessonSlice;
