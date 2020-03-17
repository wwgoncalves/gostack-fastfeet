import styled from 'styled-components';

import logo from '~/assets/fastfeet-logo.svg';

export const Container = styled.div`
  background-color: #fff;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  border: 1px solid #ddd;

  div {
    display: flex;

    nav {
      display: flex;
      align-items: center;

      a {
        font-size: 15px;
        font-weight: bold;
        color: #999;

        &.active {
          color: #444;
        }

        &:hover {
          color: #444;
        }

        & + a {
          margin-left: 20px;
        }
      }
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    strong {
      color: #666;
    }

    button {
      margin-top: 5px;
      background-color: #fff;
      border: 0;
      color: #de3b3b;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const Logo = styled.img.attrs({
  src: logo,
})`
  box-sizing: content-box;
  width: 100%;
  max-width: 135px;
  padding-right: 30px;
  margin-right: 30px;
  border-right: 1px solid #ddd;
`;
