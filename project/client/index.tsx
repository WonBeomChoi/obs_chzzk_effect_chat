import React from 'react';
import App from './App';
import { hydrateRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
const channelId = rootElement?.dataset.channelId || '';
const accessToken = rootElement?.dataset.accessToken || '';
const uid = rootElement?.dataset.userId || '';
hydrateRoot(rootElement as Element, React.createElement(App, { accessToken, channelId, uid }));
