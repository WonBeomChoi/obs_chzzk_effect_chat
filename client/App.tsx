import React, { useEffect, useState } from "react";
import useChat from "./hooks/useChat";
import ChatLayout from "./Components/ChatLayout";

import { ChannelData } from "./types/chatProps.type";
import EffectLayout from "./Components/EffectLayout";
import { EffectType } from "./types/effect.type";
import styled from "styled-components";

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
    <Container>
      <ChatLayout chatList={chatList} />
      <EffectLayout effect={effect.effect} effectName={effect.effectName} />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: calc(100vh - 16px);
`;

export default App;
