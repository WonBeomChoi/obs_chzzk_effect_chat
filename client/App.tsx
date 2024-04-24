import React, { useEffect, useMemo, useState } from "react";
import useChat from "./hooks/useChat";
import ChatLayout from "./Components/ChatLayout";

import { ChannelData } from "./types/chatProps.type";
import EffectLayout from "./Components/EffectLayout";
import { EffectType } from "./types/effect.type";
import styled from "styled-components";
import { Config, ConfigContext } from "./context/config";
import { CONFIG, EFFECTS } from "./constants/constants";
import { useShow } from "./hooks/useShow";

function App(props: ChannelData) {
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

  const { showChat, showEffect } = useShow();
  const chatList = useChat({ channelData: props });

  //
  const [chatConfig, setChatConfig] = useState<Config>(CONFIG.chat);
  const [effectConfig, setEffectConfig] = useState<Config>(CONFIG.effect);
  //

  const config = useMemo(
    () => ({
      "chat": {
        data: chatConfig,
        setData: setChatConfig,
      },
      "effect": {
        data: effectConfig,
        setData: setEffectConfig,
      },
    }),
    [chatConfig, effectConfig]
  );

  return (
    <ConfigContext.Provider value={config}>
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
