import styled, { css } from 'styled-components/native';

export default styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#7d40e7',
})`
  align-self: center;

  ${(props) =>
    props.absolutePositioning
      ? css`
          position: absolute;
          bottom: 270px;
          z-index: 999;
        `
      : ''}
`;
