import React, { useEffect, useState } from "react";
import useChat from "./hooks/useChat";
import ChatLayout from "./Components/ChatLayout";

import { ChannelData } from "./types/chatProps.type";
import EffectLayout from "./Components/EffectLayout";
import { EffectType } from "./types/effect.type";
import styled from "styled-components";
import { ConfigContext } from "./context/config";

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
  { keyword: "차태경", url: "이지툰", runningTime: 2000 },
  { keyword: "사출", url: "사출", runningTime: 3000 },
];

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
