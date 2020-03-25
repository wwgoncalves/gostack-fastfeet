import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';

import { Container } from './styles';

const SearchInput = forwardRef(({ placeholder, onChange, onKeyDown }, ref) => {
  return (
    <Container>
      <span>
        <MdSearch size={24} color="#999" />
      </span>
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </Container>
  );
});

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
};

SearchInput.defaultProps = {
  onKeyDown: null,
};

export default SearchInput;
