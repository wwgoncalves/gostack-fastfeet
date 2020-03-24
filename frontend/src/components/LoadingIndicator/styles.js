import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  position: relative;

  svg {
    position: absolute;
    top: calc(25vh - ${props => props.size}px / 2);
    left: calc(50% - ${props => props.size}px / 2);
    animation-name: spin;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
