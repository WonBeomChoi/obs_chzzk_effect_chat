import { useConfigValues } from '../../context/config';
import { ChangeHandler } from './type';

const MIN = {
  chat: {
    width: 100,
    height: 100,
  },
  effect: {
    width: 100,
    height: 100,
  },
};

export function useInteractions(type: 'chat' | 'effect') {
  const { states, setStates } = useConfigValues();
  const { x, y, width, height } = states[type];
  const setState = setStates[type];

  const { onSetting } = states;

  const { width: MIN_WIDTH, height: MIN_HEIGHT } = MIN[type];

  // move
  const handleMove: ChangeHandler = (deltaX, deltaY) => {
    const newX = x + deltaX;
    const newY = y + deltaY;
    setState((prev) => ({
      ...prev,
      x: newX,
      y: newY,
    }));
  };

  // resize
  const handleResize: ChangeHandler = (deltaX, deltaY, deltaWidth, deltaHeight) => {
    const newX = Math.min(x + deltaX, x + width - MIN_WIDTH);
    const newY = Math.min(y + deltaY, y + height - MIN_HEIGHT);
    const newWidth = Math.max(width + deltaWidth!, MIN_WIDTH);
    const newHeight = Math.max(height + deltaHeight!, MIN_HEIGHT);
    setState((prev) => ({
      ...prev,
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight,
    }));
  };

  return { x, y, width, height, handleMove, handleResize, onSetting };
}
