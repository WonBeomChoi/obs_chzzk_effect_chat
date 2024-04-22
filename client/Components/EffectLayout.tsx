import React, { useCallback, useEffect, useState } from "react";
import { ChannelData } from "../types/chatProps.type";
import useChat from "../hooks/useChat";
import styled from "styled-components";
import { EffectType } from "../types/effect.type";

const EffectLayout = (props: EffectType) => {
  const [{ x, y }, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const mouseDownHandler = useCallback(
    (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
      const mouseMoveHandler = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.pageX - clickEvent.pageX;
        const deltaY = moveEvent.pageY - clickEvent.pageY;

        setPosition({
          x: x + deltaX,
          y: y + deltaY,
        });
      };

      const mouseUpHandler = (e: MouseEvent) => {
        document.removeEventListener("mousemove", mouseMoveHandler);
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler, { once: true });
      // mouseup 이벤트는 한번만 실행되면 되기에 { once: true } 옵션을 추가해준다.
    },
    [x, y]
  );

  return (
    <CustomLayout
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
      onMouseDown={mouseDownHandler}
    >
      {props.effect || (
        <Effect
          effect={"http://localhost:3000/effects/" + props.effectName + ".gif"}
        />
      )}
      <ResizeButton />
    </CustomLayout>
  );
};

const CustomLayout = styled.div`
  border: 1px dashed red;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 240px;
  height: 240px;
  cursor: move;
`;

const Effect = styled.div<{ effect: string }>`
  width: 100%;
  height: 100%;
  opacity: 0.6;

  background-image: url(${(props) => props.effect});

  background-size: 100% 100%;
`;

const ResizeButton = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 1rem;
  width: 1rem;
  background-color: #12121250;
  cursor: se-resize;
`;

export default EffectLayout;
