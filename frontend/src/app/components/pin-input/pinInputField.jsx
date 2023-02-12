/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
import { OutlinedInput, useMediaQuery } from '@mui/material';
import React, { useEffect, useMemo, useRef } from 'react';

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

const normalizeNewValue = (currentValue, eventValue) => {
  if (!currentValue) {
    return eventValue.split('');
  }

  if (eventValue.length > 2) {
    return eventValue.split('');
  }

  if (eventValue === '') {
    return [];
  }

  if (currentValue[0] === eventValue[0]) {
    return [eventValue[1]];
  }

  return [eventValue[0]];
};

const PinInputField = ({
  index,
  value,
  values,
  type,
  validate,
  format,
  autoComplete,
  disabled,
  inputMode,
  id,
  name,
  required,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
}) => {
  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');
  const inputRef = useRef();

  const handleInputChange = e => {
    const currentValue = values[index];
    const eventValue = e.target.value;
    const newValues = [...values];
    const rawValue = normalizeNewValue(
      currentValue,
      eventValue,
    ).slice(0, newValues.length - index);
    const regex = type === 'number' ? /(^$)|(\d+)/ : /.*/;
    const shouldFireChange = rawValue.every(val => regex.test(val));

    if (!onChange) {
      return;
    }

    // apply formatter to transform
    const newValue = format ? rawValue.map(val => format(val)) : rawValue;

    if (newValue.length) {
      newValue.forEach((val, idx) => { newValues[index + idx] = val; });
    } else {
      newValues[index] = '';
    }

    if (!shouldFireChange) {
      return;
    }

    onChange(newValue, index, newValues);

    // auto-tab to the specified pin input
    let inputEl = inputRef.current;
    for (let i = 0; i < newValue.length; i++) {
      inputEl = inputEl.nextElementSibling;
    }
    if (newValue && index < 5) {
      inputEl.firstChild.focus();
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Backspace' && values[index] === '' && index > 0) {
      const prevInput = inputRef.current.previousElementSibling.firstChild;

      if (prevInput instanceof HTMLInputElement) {
        prevInput.focus();
      }
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };
  const handleInputFocus = e => {
    e.target.placeholder = '';
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleInputBlur = e => {
    e.target.placeholder = '';
    if (onBlur) {
      onBlur(e);
    }
  };

  const pattern = useMemo(() => validateToPattern(validate), [validate]);

  // auto-focus on mount
  useEffect(() => {
    if (index === 0) {
      inputRef.current.firstChild.focus();
    }
  }, [index]);

  return (
    <OutlinedInput
      sx={{
        height: pointForAdaptiveToSM ? '50px' : '56px',
        width: pointForAdaptiveToSM ? '39px' : '44px',
        fontSize: '32px',
        fontWeight: '500px',
        marginRight: pointForAdaptiveToSM ? '16px' : '24px',
        borderRadius: '4px',
      }}
      type="number"
      ref={inputRef}
      aria-required={required}
      autoComplete={autoComplete}
      disabled={disabled}
      name={name}
      id={id && `${id}-${index}`}
      inputMode={inputMode || (type === 'number' ? 'numeric' : 'text')}
      required={required}
      pattern={pattern}
      value={value}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      data-index={index}
      // completed={completed}
      // showState={showState}
    />
  );
};

export default PinInputField;
