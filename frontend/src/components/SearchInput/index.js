import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';

import { Container } from './styles';

export default function SearchInput({ placeholder }) {
  return (
    <Container>
      <span>
        <MdSearch size={24} color="#999" />
      </span>
      <input type="text" placeholder={placeholder} />
    </Container>
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
};
