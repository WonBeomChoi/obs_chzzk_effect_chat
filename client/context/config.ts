import { createContext } from "react";

interface Config {
  DEFAULT_X: number;
  DEFAULT_Y: number;
  DEFAULT_WIDTH: number;
  DEFAULT_HEIGHT: number;
  MIN_WIDTH: number;
  MIN_HEIGHT: number;
}

interface ContextValues {
  chat: Config;
  effect: Config;
}

export const ConfigContext = createContext<ContextValues | undefined>(
  undefined
);
