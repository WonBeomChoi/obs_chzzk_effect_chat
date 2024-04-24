import { ChangeHandler, Direction } from "./type";

export function registMouseDownDrag(
  onDragChange: ChangeHandler,
  direction: Direction,
  behavior: "move" | "resize" = "resize"
) {
  return (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
    clickEvent.stopPropagation();

    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      // delta = 마우스 이동 위치 - 클릭 위치
      // H : horizon
      // V : Vertical
      const deltaH = moveEvent.pageX - clickEvent.pageX;
      const deltaV = moveEvent.pageY - clickEvent.pageY;

      // 동작 분기 처리
      if (behavior === "move") {
        onDragChange(deltaH, deltaV, 0, 0);
      } else if (behavior === "resize") {
        const { deltaX, deltaY, deltaWidth, deltaHeight } = getDelta(
          deltaH,
          deltaV,
          direction
        );

        onDragChange(deltaX, deltaY, deltaWidth, deltaHeight);
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
  const { V, H } = direction;

  const delta = {
    deltaX: 0,
    deltaY: 0,
    deltaWidth: 0,
    deltaHeight: 0,
  };

  if (H === "W") {
    delta.deltaX = deltaH;
    delta.deltaWidth = -deltaH;
  } else if (H === "E") {
    delta.deltaWidth = deltaH;
  }

  if (V === "N") {
    delta.deltaY = deltaV;
    delta.deltaHeight = -deltaV;
  } else if (V === "S") {
    delta.deltaHeight = deltaV;
  }

  return delta;
}
