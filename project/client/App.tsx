import React from 'react';

import { ChannelData } from './types/chatProps.type';

import GlobalStyle from './styles/GlobalStyle';
import { Route, Routes } from 'react-router-dom';
import Overlay from './pages/Overlay';

function App(props: ChannelData) {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/chat/:id" element={<Overlay {...props} />} />
        <Route path="/admin" element={<div>hi</div>} />
      </Routes>
    </>
  );
}

export default App;
