import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import useChat from '../hooks/useChat';
import { useShow } from '../hooks/useShow';

import { EffectType } from '../types/effect.type';
import { ChannelData } from '../types/chatProps.type';

import ChatLayout from '../components/ChatLayout';
import EffectLayout from '../components/EffectLayout';
import { useConfigValues } from '../context/config';

function Overlay(props: ChannelData) {
  const {
    states: { onSetting, effectInfos },
  } = useConfigValues();

  const EFFECTS = useMemo(() => Object.values(effectInfos), [effectInfos]);

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
  }, [EFFECTS]);

  const chatList = useChat({ channelData: props, EFFECTS });
  const { showChat, showEffect } = useShow();

  return (
    <>
      {onSetting && (
        <SettingsContainer>
          <button
            onClick={() => {
              localStorage.clear();
            }}
          >
            로컬스토리지 비우기
          </button>
        </SettingsContainer>
      )}
      <Container>
        {showChat && <ChatLayout chatList={chatList} />}
        {showEffect && <EffectLayout effect={effect.effect} effectUrl={effect.effectUrl} />}
      </Container>
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

export default Overlay;
