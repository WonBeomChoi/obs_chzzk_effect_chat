import React from 'react';

import { ChannelData } from './types/chatProps.type';

import GlobalStyle from './styles/GlobalStyle';
import { Route, Routes } from 'react-router-dom';
import Overlay from './pages/Overlay';
import Admin from './pages/Admin';
import { ConfigContext } from './context/config';
import { useConfig } from './hooks/useConfig';
import useSaveOnSetting from './hooks/useSaveOnSetting';

function App(props: any) {
  const configStates = useConfig();

  const {
    setStates: { onSetting: setOnSetting },
  } = configStates;

  useSaveOnSetting(setOnSetting);

  return (
    <ConfigContext.Provider value={configStates}>
      <GlobalStyle />
      <Routes>
        <Route path="/chat/:id" element={<Overlay {...props} />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </ConfigContext.Provider>
  );
}

export default App;
