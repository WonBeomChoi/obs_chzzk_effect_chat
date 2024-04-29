import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import useChat from '../hooks/useChat';
import { useShow } from '../hooks/useShow';
import { useConfig } from '../hooks/useConfig';
import useSaveOnSetting from '../hooks/useSaveOnSetting';

import { EffectType } from '../types/effect.type';
import { ChannelData } from '../types/chatProps.type';
import { DEFAULT_CONFIG, EFFECTS } from '../constants/constants';
import { ConfigContext } from '../context/config';

import ChatLayout from '../components/ChatLayout';
import EffectLayout from '../components/EffectLayout';

function Overlay(props: ChannelData) {
  const [effect, setEffect] = useState<EffectType>({
    effect: true,
    effectUrl: '',
  });
  useEffect(() => {
    EFFECTS.forEach(({ eventName, url, runningTime }) => {
      window.addEventListener(eventName, () => {
        if (effect) {
          setEffect({ effect: false, effectUrl: url });
          setTimeout(() => {
            setEffect({ effect: true, effectUrl: '' });
          }, runningTime);
        }
      });
    });
  }, []);

  const chatList = useChat({ channelData: props });
  const { showChat, showEffect } = useShow();
  const configStates = useConfig();

  const {
    states: { onSetting },
    setStates,
  } = configStates;

  useSaveOnSetting(setStates.onSetting);

  return (
    <ConfigContext.Provider value={configStates}>
      {onSetting && (
        <SettingsContainer>
          <button
            onClick={() => {
              setStates.chat(DEFAULT_CONFIG.chat);
              setStates.effect(DEFAULT_CONFIG.effect);
            }}
          >
            설정 초기화
          </button>
        </SettingsContainer>
      )}
      <Container>
        {showChat && <ChatLayout chatList={chatList} />}
        {showEffect && <EffectLayout effect={effect.effect} effectUrl={effect.effectUrl} />}
      </Container>
    </ConfigContext.Provider>
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

export default Overlay;
