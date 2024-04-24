import { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../../context/config";
import { ChangeHandler } from "./type";

export function useConfigValues() {
  const values = useContext(ConfigContext);
  if (!values) throw new Error("context api error");
  return values;
}

export function useInteractions(type: "chat" | "effect") {
  const CONFIG = useConfigValues()[type];

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

  const handleMove: ChangeHandler = (deltaX, deltaY) => {
    setPosition({
      x: x + deltaX,
      y: y + deltaY,
    });
  };

  const handleResize: ChangeHandler = (
    deltaX,
    deltaY,
    deltaWidth,
    deltaHeight
  ) => {
    setPosition({
      x: Math.min(x + deltaX, x + w - MIN_WIDTH),
      y: Math.min(y + deltaY, y + h - MIN_HEIGHT),
    });
    setSize({
      w: Math.max(MIN_WIDTH, w + deltaWidth!),
      h: Math.max(MIN_HEIGHT, h + deltaHeight!),
    });
  };

  return { x, y, w, h, handleMove, handleResize };
}
