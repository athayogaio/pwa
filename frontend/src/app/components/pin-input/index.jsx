/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import React, { useMemo, useEffect, useState } from 'react';
import PinInputField from './pinInputField';

export const validateToPattern = validate => {
  if (Array.isArray(validate)) {
    const regex = new RegExp(validate.join('|')).toString();
    return regex.slice(1, regex.length - 1);
  } if (typeof validate === 'string') {
    const regex = new RegExp(validate.split('').join('|')).toString();
    return regex.slice(1, regex.length - 1);
  } if (validate instanceof RegExp) {
    const regex = validate.toString();
    return regex.slice(1, regex.length - 1);
  }
  return undefined;
};

const PinInput = props => {
  const { errorMessage } = useSelector(state => state.verifyEmail);
  const [seconds, setSeconds] = useState(60);
  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');
  const completed = useMemo(
    () => props.values.every(val => val),
    [props.values],
  );
  const [isSend, setIsSend] = useState(false);

  if (completed && props.onComplete) {
    if (!isSend) {
      props.onComplete(props.values);
      setIsSend(true);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) setSeconds(seconds - 1);
      if (seconds === 0) props.setIsTimeEnd(true);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ paddingLeft: pointForAdaptiveToSM ? '16px' : '24px' }}
      >
        {props.values.map((value, i) => (
          <PinInputField
            key={props.id ? `${props.id}-${i}` : i}
            index={i}
            value={value}
            completed={completed}
            {...props}
          />
        ))}
      </Box>
      {errorMessage && (
      <Typography sx={{ fontSize: pointForAdaptiveToSM ? '14px' : '18px', textAlign: 'center', mb: '8px' }} color="error">
        Код не совпадает с отправленным.
      </Typography>
      )}
      <Typography
        color="text.secondary"
        variant="body1"
        sx={{
          textAlign: 'center', mb: '35px', mt: '20px',
        }}
      >
        Получить код повторно можно через
        {' '}
        {seconds}
        {' '}
        сек.
      </Typography>
    </>
  );
};

export default PinInput;
