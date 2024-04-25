import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { registMouseDownDrag } from "./util";
import { useInteractions } from "./hooks";
import { InteractionLayoutProps } from "./type";

function InteractionLayout({ children, type }: InteractionLayoutProps) {
  const { x, y, width, height, handleMove, handleResize } =
    useInteractions(type);
  const [onSetting, setOnSetting] = useState(true);

  // 이벤트 잠금
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && (e.key === "k" || e.key === "ㅏ")) {
        setOnSetting((prev) => !prev);
      }
    });
  }, []);

  return (
    <Layout
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
        width: width,
        height: height,
      }}
      onMouseDown={
        onSetting ? registMouseDownDrag(handleMove, {}, "move") : undefined
      }
    >
      {onSetting && (
        <>
          <N onMouseDown={registMouseDownDrag(handleResize, { V: "N" })} />
          <S onMouseDown={registMouseDownDrag(handleResize, { V: "S" })} />
          <W onMouseDown={registMouseDownDrag(handleResize, { H: "W" })} />
          <E onMouseDown={registMouseDownDrag(handleResize, { H: "E" })} />
          <NW
            onMouseDown={registMouseDownDrag(handleResize, { V: "N", H: "W" })}
          />
          <NE
            onMouseDown={registMouseDownDrag(handleResize, { V: "N", H: "E" })}
          />
          <SW
            onMouseDown={registMouseDownDrag(handleResize, { V: "S", H: "W" })}
          />
          <SE
            onMouseDown={registMouseDownDrag(handleResize, { V: "S", H: "E" })}
          />
        </>
      )}
      {children}
    </Layout>
  );
}

export default InteractionLayout;

// cursor style : 추후 삭제 (obs에선 안쓰임)

const Layout = styled.div`
  position: absolute;
  cursor: move;
`;

const ResizeDefault = styled.div`
  position: absolute;
  height: 0.5rem;
  width: 0.5rem;
  background-color: #ff000050;

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
