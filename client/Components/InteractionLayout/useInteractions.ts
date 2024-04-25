import { useContext } from "react";
import { ConfigContext } from "../../context/config";
import { ChangeHandler } from "./type";

function useConfigValues() {
  const values = useContext(ConfigContext);
  if (!values) throw new Error("context api error");
  return values;
}

export function useInteractions(type: "chat" | "effect") {
  const {
    data: { x, y, width, height, MIN_WIDTH, MIN_HEIGHT },
    setData,
  } = useConfigValues()[type];

  // move
  const handleMove: ChangeHandler = (deltaX, deltaY) => {
    setData((prev) => ({
      ...prev,
      x: x + deltaX,
      y: y + deltaY,
    }));
  };

  // resize
  const handleResize: ChangeHandler = (
    deltaX,
    deltaY,
    deltaWidth,
    deltaHeight
  ) => {
    setData((prev) => ({
      ...prev,
      x: Math.min(x + deltaX, x + width - MIN_WIDTH),
      y: Math.min(y + deltaY, y + height - MIN_HEIGHT),
      width: Math.max(width + deltaWidth!, MIN_WIDTH),
      height: Math.max(height + deltaHeight!, MIN_HEIGHT),
    }));
  };

  return { x, y, width, height, handleMove, handleResize };
}
