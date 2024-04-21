import React, { useEffect, useState } from "react";
import useChat from "./hooks/useChat";
import ChatLayout from "./Components/ChatLayout";

import { ChannelData } from "./types/chatProps.type";
import EffectLayout from "./Components/EffectLayout";
import { EffectType } from "./types/effect.type";

function App(props: ChannelData) {
  const [effect, setEffect] = useState<EffectType>({
    effect: true,
    effectName: "",
  });
  useEffect(() => {
    window.addEventListener("차태경", () => {
      if (effect) {
        setEffect({ effect: false, effectName: "이지툰" });
        setTimeout(() => {
          setEffect({ effect: true, effectName: "" });
        }, 2000);
      }
    });
    window.addEventListener("사출", () => {
      if (effect) {
        setEffect({ effect: false, effectName: "사출" });
        setTimeout(() => {
          setEffect({ effect: true, effectName: "" });
        }, 3000);
      }
    });
  }, []);
  const chatList = useChat({ channelData: props });

  return (
    <>
      {/* <ChatLayout chatList={chatList} /> */}
      <EffectLayout effect={effect.effect} effectName={effect.effectName} />;
    </>
  );
}

export default App;
