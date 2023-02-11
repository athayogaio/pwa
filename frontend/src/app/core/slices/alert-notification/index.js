import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alertProps: {
    display: false,
    status: '',
    title: '',
    text: '',
  },
};

const alertNotificationSlice = createSlice({
  name: 'alertNotification',
  initialState,
  reducers: {
    setAlertProps: (state, action) => ({ alertProps: { ...action.payload } }),
    clearAlertProps: () => ({ alertProps: { display: false } }),
  },
});

export const { setAlertProps, clearAlertProps } = alertNotificationSlice.actions;
export default alertNotificationSlice.reducer;
