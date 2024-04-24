import React, { useEffect, useState } from "react";
import useChat from "./hooks/useChat";
import ChatLayout from "./Components/ChatLayout";

import { ChannelData } from "./types/chatProps.type";
import EffectLayout from "./Components/EffectLayout";
import { EffectType } from "./types/effect.type";
import styled from "styled-components";
import { ConfigContext } from "./Components/context/config";

const CONFIG = {
  chat: {
    DEFAULT_X: 0,
    DEFAULT_Y: 0,
    DEFAULT_WIDTH: 300,
    DEFAULT_HEIGHT: 500,
    MIN_WIDTH: 100,
    MIN_HEIGHT: 100,
  },
  effect: {
    DEFAULT_X: 500,
    DEFAULT_Y: 500,
    DEFAULT_WIDTH: 300,
    DEFAULT_HEIGHT: 300,
    MIN_WIDTH: 100,
    MIN_HEIGHT: 100,
  },
};

const EFFECTS = [
  { eventName: "차태경", effectName: "이지툰", runningTime: 2000 },
  { eventName: "사출", effectName: "사출", runningTime: 3000 },
];

function App(props: ChannelData) {
  const [effect, setEffect] = useState<EffectType>({
    effect: true,
    effectName: "",
  });
  useEffect(() => {
    EFFECTS.forEach(({ eventName, effectName, runningTime }) => {
      window.addEventListener(eventName, () => {
        if (effect) {
          setEffect({ effect: false, effectName: effectName });
          setTimeout(() => {
            setEffect({ effect: true, effectName: "" });
          }, runningTime);
        }
      });
    });
  }, []);
  const chatList = useChat({ channelData: props });

  return (
    <ConfigContext.Provider value={CONFIG}>
      <Container>
        <ChatLayout chatList={chatList} />
        <EffectLayout effect={effect.effect} effectName={effect.effectName} />
      </Container>
    </ConfigContext.Provider>
  );
}

const Container = styled.div`
  position: relative;
  height: calc(100vh - 16px);
  box-shadow: inset 0px 0px 1px black;
`;

export default App;
