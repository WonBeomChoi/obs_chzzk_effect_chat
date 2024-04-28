import React, { useEffect, useState } from 'react';
import useChat from './hooks/useChat';
import ChatLayout from './components/ChatLayout';

import { ChannelData } from './types/chatProps.type';
import EffectLayout from './components/EffectLayout';
import { EffectType } from './types/effect.type';
import styled from 'styled-components';
import { ConfigContext } from './context/config';
import { DEFAULT_CONFIG, EFFECTS } from './constants/constants';
import { useShow } from './hooks/useShow';
import { useConfig } from './hooks/useConfig';
import GlobalStyle from './styles/GlobalStyle';

function App(props: ChannelData) {
  const [effect, setEffect] = useState<EffectType>({
    effect: true,
    effectName: '',
  });
  useEffect(() => {
    EFFECTS.forEach(({ keyword, url, runningTime }) => {
      window.addEventListener(keyword, () => {
        if (effect) {
          setEffect({ effect: false, effectName: url });
          setTimeout(() => {
            setEffect({ effect: true, effectName: '' });
          }, runningTime);
        }
      });
    });
  }, []);

  const { showChat, showEffect } = useShow();
  const chatList = useChat({ channelData: props });

  const configStates = useConfig();

  return (
    <>
      <GlobalStyle />
      <ConfigContext.Provider value={configStates}>
        {configStates.onSetting.state && (
          <SettingsContainer>
            <button
              onClick={() => {
                configStates.chat.setState(DEFAULT_CONFIG.chat);
                configStates.effect.setState(DEFAULT_CONFIG.effect);
              }}
            >
              설정 초기화
            </button>
          </SettingsContainer>
        )}
        <Container>
          {showChat && <ChatLayout chatList={chatList} />}
          {showEffect && <EffectLayout effect={effect.effect} effectName={effect.effectName} />}
        </Container>
      </ConfigContext.Provider>
    </>
  );
}

const Container = styled.div`
  position: relative;
`;

const SettingsContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  border: 1px solid red;
  box-sizing: border-box;
`;

export default App;
