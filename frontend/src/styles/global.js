import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    min-width: 920px;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  .Toastify__toast {
    font: 15px 'Roboto', sans-serif;
    border-radius: 4px;
 }
  .Toastify__toast--error {
    background-color: #ff0033;
    font-weight: bold;
    color: #fff;
 }
 .Toastify__toast--success {
    background-color: #11bb11;
    font-weight: bold;
    color: #fff;
 }
`;
