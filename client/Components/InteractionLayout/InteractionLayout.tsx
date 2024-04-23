import { log } from "console";
import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { getDelta } from "./util";

type Direction = {
  V?: "N" | "S";
  H?: "W" | "E";
};

export function registMouseDownDrag(
  onDragChange: (dx: number, dy: number, dw: number, dh: number) => void,
  direction: Direction,
  behavior: "move" | "resize" = "resize"
) {
  return (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
    clickEvent.stopPropagation();
    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      // 이동위치 - 클릭위치
      const deltaH = moveEvent.pageX - clickEvent.pageX;
      const deltaV = moveEvent.pageY - clickEvent.pageY;
      if (behavior === "move") {
        onDragChange(deltaH, deltaV, 0, 0);
      } else if (behavior === "resize") {
        const { dx, dy, dw, dh } = getDelta(deltaH, deltaV, direction);

        onDragChange(dx, dy, dw, dh);
      }
    };

    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler, { once: true });
  };
}

const MIN_WIDTH = 60;
const MIN_HEIGHT = 30;

function InteractionLayout({ children }: { children: ReactNode }) {
  const [{ x, y }, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [{ w, h }, setSize] = useState({
    w: 0,
    h: 0,
  });

  useEffect(() => {
    const DEFAULT_X = 500;
    const DEFAULT_Y = 500;
    const DEFAULT_W = 240;
    const DEFAULT_H = 120;
    setPosition({
      x: DEFAULT_X,
      y: DEFAULT_Y,
    });
    setSize({
      w: DEFAULT_W,
      h: DEFAULT_H,
    });
  }, []);

  const handleDrag = (dx: number, dy: number, dw: number, dh: number) => {
    setPosition({
      x: x + dx,
      y: y + dy,
    });
    setSize({
      w: MIN_WIDTH > w + dw ? MIN_WIDTH : w + dw,
      h: MIN_HEIGHT > h + dh ? MIN_HEIGHT : h + dh,
    });
  };

  return (
    <Layout
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
        width: w,
        height: h,
      }}
      onMouseDown={registMouseDownDrag(handleDrag, {}, "move")}
    >
      <N onMouseDown={registMouseDownDrag(handleDrag, { V: "N" })} />
      <S onMouseDown={registMouseDownDrag(handleDrag, { V: "S" })} />
      <W onMouseDown={registMouseDownDrag(handleDrag, { H: "W" })} />
      <E onMouseDown={registMouseDownDrag(handleDrag, { H: "E" })} />
      <NW onMouseDown={registMouseDownDrag(handleDrag, { V: "N", H: "W" })} />
      <NE onMouseDown={registMouseDownDrag(handleDrag, { V: "N", H: "E" })} />
      <SW onMouseDown={registMouseDownDrag(handleDrag, { V: "S", H: "W" })} />
      <SE onMouseDown={registMouseDownDrag(handleDrag, { V: "S", H: "E" })} />
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
  /* height: 100%; */
  height: 0.5rem;
  cursor: ew-resize;
`;

const HorizonResize = styled(ResizeDefault)`
  height: 0.5rem;
  /* width: 100%; */
  width: 0.5rem;
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
