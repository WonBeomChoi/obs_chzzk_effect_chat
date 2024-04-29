import React from 'react';
import App from './App';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
const channelId = rootElement?.dataset.channelId || '';
const accessToken = rootElement?.dataset.accessToken || '';
const uid = rootElement?.dataset.userId || '';

// const Compo = React.createElement(App, { accessToken, channelId, uid });

const props = { accessToken, channelId, uid };

hydrateRoot(
  rootElement as Element,
  <BrowserRouter>
    <App {...props} />
  </BrowserRouter>,
);
