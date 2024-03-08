import React from 'react';
import App from './App';
import { hydrateRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
const channelId = rootElement?.dataset.channelId || "";
const accessToken = rootElement?.dataset.accessToken || "";
hydrateRoot(rootElement as Element, React.createElement(App, {accessToken, channelId}));
