import { ChangeHandler, Direction } from './type';

export function registMouseDownDrag(
  onDragChange: ChangeHandler,
  direction: Direction,
  behavior: 'move' | 'resize' = 'resize',
) {
  // React.MouseEvent<T,U>
  // T : 이벤트가 발생한 요소의 타입
  // U : 이벤트 타입
  return (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
    clickEvent.stopPropagation();

    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      // delta = 마우스 이동 위치 - 클릭 위치
      // H : horizon
      // V : Vertical
      const deltaH = moveEvent.pageX - clickEvent.pageX;
      const deltaV = moveEvent.pageY - clickEvent.pageY;

      // 동작 분기 처리
      if (behavior === 'move') {
        onDragChange(deltaH, deltaV, 0, 0);
      } else if (behavior === 'resize') {
        const delta = getDelta(deltaH, deltaV, direction);

        onDragChange(delta.x, delta.y, delta.width, delta.height);
      }
    };

    // mouse up 시에 mouse move 핸들러 제거
    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler, { once: true });
  };
}

function getDelta(deltaH: number, deltaV: number, direction: Direction) {
  const { V, H } = direction;

  const delta = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  if (H === 'W') {
    delta.x = deltaH;
    delta.width = -deltaH;
  } else if (H === 'E') {
    delta.width = deltaH;
  }

  if (V === 'N') {
    delta.y = deltaV;
    delta.height = -deltaV;
  } else if (V === 'S') {
    delta.height = deltaV;
  }

  return delta;
}
