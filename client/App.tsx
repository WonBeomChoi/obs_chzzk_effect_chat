import React, { useEffect, useState } from "react";
import useChat from "./hooks/useChat";
import ChatLayout from "./Components/ChatLayout";

import { ChannelData } from "./types/chatProps.type";
import EffectLayout from "./Components/EffectLayout";
import { EffectType } from "./types/effect.type";
import styled from "styled-components";
import { ConfigContext } from "./context/config";
import { CONFIG, EFFECTS } from "./constants/constants";

function App(props: ChannelData) {
  const [showChat, setShowChat] = useState<boolean>(false);
  const [showEffect, setShowEffect] = useState<boolean>(false);
  const [effect, setEffect] = useState<EffectType>({
    effect: true,
    effectName: "",
  });
  useEffect(() => {
    EFFECTS.forEach(({ keyword, url, runningTime }) => {
      window.addEventListener(keyword, () => {
        if (effect) {
          setEffect({ effect: false, effectName: url });
          setTimeout(() => {
            setEffect({ effect: true, effectName: "" });
          }, runningTime);
        }
      });
    });
  }, []);

  useEffect(() => {
    const handleShowState: (e: KeyboardEvent) => any = (e) => {
      if (e.ctrlKey && e.key === "q") {
        setShowChat((prev) => !prev);
      }
      if (e.ctrlKey && e.key === "e") {
        setShowEffect((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleShowState);
    return () => {
      document.removeEventListener("keydown", handleShowState);
    };
  }, []);

  const chatList = useChat({ channelData: props });

  return (
    <ConfigContext.Provider value={CONFIG}>
      <Container>
        {showChat && <ChatLayout chatList={chatList} />}
        {showEffect && (
          <EffectLayout effect={effect.effect} effectName={effect.effectName} />
        )}
      </Container>
    </ConfigContext.Provider>
  );
}

const Container = styled.div`
  position: relative;
`;

export default App;
