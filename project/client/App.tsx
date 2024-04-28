import React, { useEffect, useState } from 'react';
import useChat from './hooks/useChat';
import ChatLayout from './components/ChatLayout';

import { ChannelData } from './types/chatProps.type';
import EffectLayout from './components/EffectLayout';
import { EffectType } from './types/effect.type';
import styled from 'styled-components';
import { ConfigContext } from './context/config';
import { EFFECTS } from './constants/constants';
import { useShow } from './hooks/useShow';
import { useConfig } from './hooks/useConfig';

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
    <ConfigContext.Provider value={configStates}>
      <Container>
        {showChat && <ChatLayout chatList={chatList} />}
        {showEffect && <EffectLayout effect={effect.effect} effectName={effect.effectName} />}
      </Container>
    </ConfigContext.Provider>
  );
}

const Container = styled.div`
  position: relative;
`;

export default App;
