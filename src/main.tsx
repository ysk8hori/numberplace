import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ReactModal from 'react-modal';
import { registerSW } from 'virtual:pwa-register';

registerSW();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// @see https://reactcommunity.org/react-modal/examples/set_app_element/
ReactModal.setAppElement('#root');

window.onerror = (_ev, _src, _lineno, _colno, error) => {
  console.log(error);
  location.reload();
};
