type Direction = {
  V?: string;
  H?: string;
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

function getDelta(deltaH: number, deltaV: number, direction: Direction) {
  let dx = 0,
    dy = 0,
    dw = 0,
    dh = 0;

  const { V, H } = direction;

  switch (H) {
    case "W":
      dx = deltaH;
      dw = -deltaH;
      break;
    case "E":
      dw = deltaH;
      break;
  }

  switch (V) {
    case "N":
      dy = deltaV;
      dh = -deltaV;
      break;
    case "S":
      dh = deltaV;
      break;
  }

  return { dx, dy, dw, dh };
}
