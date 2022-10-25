import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import ReactModal from 'react-modal';
import { registerSW } from 'virtual:pwa-register';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { ThemeProvider } from 'styled-components';
import semanticToken from './theme/semanticToken';

Sentry.init({
  dsn: 'https://d37eba4a04cc41b1b0762539d7d23409@o1222276.ingest.sentry.io/6366032',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

registerSW();

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={semanticToken}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

// @see https://reactcommunity.org/react-modal/examples/set_app_element/
ReactModal.setAppElement('#root');

window.onerror = (_ev, _src, _lineno, _colno, error) => {
  console.log(error);
  location.reload();
};
