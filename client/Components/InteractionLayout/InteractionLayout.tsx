import React, { ReactNode, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { registMouseDownDrag } from "./util";
import { ConfigContext } from "../context/config";

interface InteractionLayoutProps {
  children: ReactNode;
  type: "chat" | "effect";
}

function InteractionLayout({ children, type }: InteractionLayoutProps) {
  const CONFIG = useContext(ConfigContext)[type];

  const { MIN_WIDTH, MIN_HEIGHT } = CONFIG;

  const [{ x, y }, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [{ w, h }, setSize] = useState({
    w: 0,
    h: 0,
  });

  useEffect(() => {
    const { DEFAULT_X, DEFAULT_Y, DEFAULT_WIDTH, DEFAULT_HEIGHT } = CONFIG;
    setPosition({
      x: DEFAULT_X,
      y: DEFAULT_Y,
    });
    setSize({
      w: DEFAULT_WIDTH,
      h: DEFAULT_HEIGHT,
    });
  }, []);

  const handleMove = (deltaX: number, deltaY: number) => {
    setPosition({
      x: x + deltaX,
      y: y + deltaY,
    });
  };

  const handleResize = (
    deltaX: number,
    deltaY: number,
    deltaWidth: number,
    deltaHeight: number
  ) => {
    setPosition({
      x: Math.min(x + deltaX, x + w - MIN_WIDTH),
      y: Math.min(y + deltaY, y + h - MIN_HEIGHT),
    });
    setSize({
      w: Math.max(MIN_WIDTH, w + deltaWidth),
      h: Math.max(MIN_HEIGHT, h + deltaHeight),
    });
  };

  return (
    <Layout
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
        width: w,
        height: h,
      }}
      onMouseDown={registMouseDownDrag(handleMove, {}, "move")}
    >
      <N onMouseDown={registMouseDownDrag(handleResize, { V: "N" })} />
      <S onMouseDown={registMouseDownDrag(handleResize, { V: "S" })} />
      <W onMouseDown={registMouseDownDrag(handleResize, { H: "W" })} />
      <E onMouseDown={registMouseDownDrag(handleResize, { H: "E" })} />
      <NW onMouseDown={registMouseDownDrag(handleResize, { V: "N", H: "W" })} />
      <NE onMouseDown={registMouseDownDrag(handleResize, { V: "N", H: "E" })} />
      <SW onMouseDown={registMouseDownDrag(handleResize, { V: "S", H: "W" })} />
      <SE onMouseDown={registMouseDownDrag(handleResize, { V: "S", H: "E" })} />
      {children}
    </Layout>
  );
}

export default InteractionLayout;

const Layout = styled.div`
  border: 1px dashed red;
  position: absolute;
  cursor: move;
`;

const ResizeDefault = styled.div`
  position: absolute;
  height: 0.5rem;
  width: 0.5rem;
  background-color: #12121230;

  &.top {
    top: -0.5rem;
  }

  &.bottom {
    bottom: -0.5rem;
  }

  &.left {
    left: -0.5rem;
  }

  &.right {
    right: -0.5rem;
  }
`;

const DiagnalResize = styled(ResizeDefault)`
  height: 1rem;
  width: 1rem;
  background-color: red;
`;

const VerticalResize = styled(ResizeDefault)`
  width: 0.5rem;
  height: 100%;
  cursor: ew-resize;
`;

const HorizonResize = styled(ResizeDefault)`
  height: 0.5rem;
  width: 100%;
  cursor: ns-resize;
`;

const DiagnalNESW = styled(DiagnalResize)`
  cursor: nesw-resize;
`;

const DiagnalNWSE = styled(DiagnalResize)`
  cursor: nwse-resize;
`;

const NW = styled(DiagnalNWSE).attrs({ className: "top left" })``;
const SE = styled(DiagnalNWSE).attrs({ className: "bottom right" })``;
const NE = styled(DiagnalNESW).attrs({ className: "top right" })``;
const SW = styled(DiagnalNESW).attrs({ className: "bottom left" })``;

const N = styled(HorizonResize).attrs({ className: "top" })``;
const S = styled(HorizonResize).attrs({ className: "bottom" })``;
const W = styled(VerticalResize).attrs({ className: "left" })``;
const E = styled(VerticalResize).attrs({ className: "right" })``;
