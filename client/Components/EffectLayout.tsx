import React, { useEffect } from "react";
import { ChannelData } from "../types/chatProps.type";
import useChat from "../hooks/useChat";
import styled from "styled-components";
import { EffectType } from "../types/effect.type";

const EffectLayout = (props: EffectType) => {
  return (
    <>
      {props.effect || (
        <Effect
          effect={"http://localhost:3000/effects/" + props.effectName + ".gif"}
        />
      )}
    </>
  );
};
const EffectSpan = styled.span`
  color: white;
`;
const Effect = styled.span<{ effect: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  background-image: url(${(props) => props.effect});
  opacity: 0.6;

  background-size: 100% 100%;
`;

export default EffectLayout;
