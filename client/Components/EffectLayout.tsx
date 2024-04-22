import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChannelData } from "../types/chatProps.type";
import useChat from "../hooks/useChat";
import styled from "styled-components";
import { EffectType } from "../types/effect.type";

export function registMouseDownDrag(
  onDragChange: (deltaX: number, deltaY: number) => void,
  stopPropagation?: boolean
) {
  return (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
    if (stopPropagation) clickEvent.stopPropagation();
    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.pageX - clickEvent.pageX;
      const deltaY = moveEvent.pageY - clickEvent.pageY;
      onDragChange(deltaX, deltaY);
    };

    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler, { once: true });
  };
}

const EffectLayout = (props: EffectType) => {
  const [{ x, y, w, h }, setConfig] = useState({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  });

  useEffect(() => {
    const DEFAULT_W = 240;
    const DEFAULT_H = 120;
    setConfig((prev) => ({
      ...prev,
      w: DEFAULT_W,
      h: DEFAULT_H,
    }));
  }, []);

  return (
    <CustomLayout
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
        width: w,
        height: h,
      }}
      onMouseDown={registMouseDownDrag((deltaX: number, deltaY: number) => {
        setConfig((prev) => ({
          ...prev,
          x: x + deltaX,
          y: y + deltaY,
        }));
      })}
    >
      {/* 북서 */}
      <NW
        onMouseDown={registMouseDownDrag((deltaX, deltaY) => {
          setConfig({
            x: x + deltaX,
            y: y + deltaY,
            w: w - deltaX,
            h: h - deltaY,
          });
        }, true)}
      />
      {/* 북동 */}
      <NE
        onMouseDown={registMouseDownDrag((deltaX, deltaY) => {
          setConfig({
            x,
            y: y + deltaY,
            w: w + deltaX,
            h: h - deltaY,
          });
        }, true)}
      />
      {/* 남서 */}
      <SW
        onMouseDown={registMouseDownDrag((deltaX, deltaY) => {
          setConfig({
            x: x + deltaX,
            y,
            w: w - deltaX,
            h: h + deltaY,
          });
        }, true)}
      />
      <SE
        onMouseDown={registMouseDownDrag((deltaX, deltaY) => {
          setConfig({
            x,
            y,
            w: w + deltaX,
            h: h + deltaY,
          });
        }, true)}
      />
      <N
        onMouseDown={registMouseDownDrag((_, deltaY) => {
          setConfig({
            x,
            y: y + deltaY,
            w,
            h: h - deltaY,
          });
        }, true)}
      />
      <S
        onMouseDown={registMouseDownDrag((_, deltaY) => {
          setConfig({
            x,
            y,
            w,
            h: h + deltaY,
          });
        }, true)}
      />
      <W
        onMouseDown={registMouseDownDrag((deltaX) => {
          setConfig({
            x: x + deltaX,
            y,
            w: w - deltaX,
            h,
          });
        }, true)}
      />
      <E
        onMouseDown={registMouseDownDrag((deltaX) => {
          setConfig({
            x,
            y,
            w: w + deltaX,
            h,
          });
        }, true)}
      />
      {props.effect || (
        <Effect
          effect={"http://localhost:3000/effects/" + props.effectName + ".gif"}
        />
      )}
    </CustomLayout>
  );
};

const CustomLayout = styled.div`
  border: 1px dashed red;
  position: absolute;
  top: 0;
  left: 0;
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
  height: 0.5rem;
  width: 0.5rem;
  background-color: #12121250;
`;

const NW = styled(ResizeButton)`
  top: -0.5rem;
  left: -0.5rem;
  cursor: nwse-resize;
`;

const NE = styled(ResizeButton)`
  top: -0.5rem;
  right: -0.5rem;
  cursor: nesw-resize;
`;

const SW = styled(ResizeButton)`
  bottom: -0.5rem;
  left: -0.5rem;
  cursor: nesw-resize;
`;

const SE = styled(ResizeButton)`
  bottom: -0.5rem;
  right: -0.5rem;
  cursor: nwse-resize;
`;

const N = styled(ResizeButton)`
  top: -0.5rem;
  width: 100%;
  background-color: #12121230;
  cursor: ns-resize;
`;

const S = styled(ResizeButton)`
  bottom: -0.5rem;
  width: 100%;
  background-color: #12121230;
  cursor: ns-resize;
`;

const W = styled(ResizeButton)`
  left: -0.5rem;
  height: 100%;
  background-color: #12121230;
  cursor: ew-resize;
`;

const E = styled(ResizeButton)`
  right: -0.5rem;
  height: 100%;
  background-color: #12121230;
  cursor: ew-resize;
`;

export default EffectLayout;
