/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { Box, useMediaQuery } from '@mui/material';
import React, { useMemo } from 'react';
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
  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');
  const completed = useMemo(
    () => props.values.every(val => val),
    [props.values],
  );

  if (completed && props.onComplete) {
    if (props.validate) {
      if (
        props.values.every(val => new RegExp(validateToPattern(props.validate)).test(val))
      ) {
        props.onComplete(props.values);
      }
    } else {
      props.onComplete(props.values);
    }
  }

  return (
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
  );
};

export default PinInput;
