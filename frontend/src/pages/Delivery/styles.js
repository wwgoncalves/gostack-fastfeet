import styled from 'styled-components';

import Select from './Select';

export const Container = styled.div`
  align-self: stretch;
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  div:not([class^='react-select']) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 34px 0;

    h1 {
      font-size: 24px;
      color: #444;
    }

    div:not([class^='react-select']) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0;

      button {
        & + button {
          margin-left: 15px;
        }
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 4px;
  padding: 40px 30px;

  form {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    div:not([class^='react-select']) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    div > label {
      flex: 1;

      & + label {
        margin-left: 30px;
      }
    }

    label {
      display: flex;
      flex-direction: column;
      font-weight: bold;
      color: #444;

      input {
        align-self: stretch;
        border: 1px solid #ddd;
        border-radius: 4px;
        height: 45px;
        padding: 0 15px;
        margin: 10px 0 15px;
        font-size: 16px;
        color: #444;

        &::placeholder {
          color: #999;
        }
      }

      span {
        color: #ff1188;
        align-self: flex-end;
        margin-top: 8px;
        padding-right: 2px;
        font-weight: bold;
        position: absolute;
      }
    }
  }
`;

export const StyledSelect = styled(Select)`
  display: block !important;
  height: 45px;
  margin: 10px 0 15px !important;
  font-size: 16px;
  color: #444;

  position: relative;

  .react-select__control {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding-left: 7px;
    height: 100%;

    align-items: center;
    background-color: #fff;
    cursor: default;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    min-height: 38px;
    position: relative;
    box-sizing: border-box;
    transition: all 150ms ease 0s;
    outline: 0px !important;

    &:hover {
      border-color: #999;
    }
    &:focus-within {
      border-color: #7d40e7;
      box-shadow: 0 0 2px #7d40e7;
    }

    .react-select__value-container {
      padding: 0;
      height: 45px;

      align-items: center;
      display: flex;
      position: relative;
      flex: 1 1 0%;
      padding: 2px 8px;
      overflow: hidden;
      transition: none;

      .react-select__placeholder {
        font-weight: normal;
        font-size: 16px;
        color: #999;

        margin: 0;
        padding-bottom: 2px;
        position: absolute;
        top: 50;
        transform: translateY(-50%);
        box-sizing: border-box;
      }

      .react-select__single-value {
        font-weight: normal;
        font-size: 16px;
        color: #444;
        padding-bottom: 2px;
        margin-top: 0;
      }

      div {
        margin: 2px 0;

        .react-select__input {
          position: absolute;
        }
      }
    }

    .react-select__indicators {
      -webkit-box-align: center;
      align-items: center;
      align-self: stretch;
      display: flex;
      flex-shrink: 0;
      box-sizing: border-box;

      .react-select__loading-indicator {
        span {
          position: static;
          color: #7d40e7;
          background-color: currentColor;
          border-radius: 1em;
          display: inline-block;
          height: 1em;
          vertical-align: top;
          width: 1em;
        }
      }

      .react-select__indicator-separator {
        align-self: stretch;
        background-color: #ddd;
        margin-bottom: 8px;
        margin-top: 8px;
        padding: 0;
        width: 1px;
        box-sizing: border-box;
        position: static;
      }

      .react-select__dropdown-indicator {
        &:hover {
          color: #999;
        }
      }
    }
  }

  .react-select__menu {
    top: 100%;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,
      rgba(0, 0, 0, 0.1) 0px 4px 11px;
    margin-bottom: 8px;
    margin-top: 8px;
    position: absolute;
    width: 100%;
    z-index: 1;
    box-sizing: border-box;
    border-radius: 4px;

    .react-select__menu-list {
      max-height: 300px;
      overflow-y: auto;
      padding-bottom: 4px;
      padding-top: 4px;
      position: relative;
      box-sizing: border-box;

      .react-select__menu-notice {
        font-weight: normal;
        font-size: 16px;
        color: #999;
      }

      .react-select__option {
        font-weight: normal;
        font-size: 16px;
        color: #444;
      }

      .react-select__option--is-selected {
        color: #fff;
      }
    }
  }
`;
