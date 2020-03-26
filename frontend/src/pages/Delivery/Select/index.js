/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import { useField } from '@rocketseat/unform';

export default function Select({ name, recordName, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const record = useField(recordName);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(option => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <>
      <AsyncSelect
        cacheOptions
        defaultValue={
          defaultValue
            ? {
                value: defaultValue,
                label: record ? record.defaultValue.name : '',
              }
            : ''
        }
        ref={selectRef}
        className="react-select-container"
        classNamePrefix="react-select"
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  recordName: PropTypes.string.isRequired,
};
