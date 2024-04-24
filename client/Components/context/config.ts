import { createContext } from "react";

const INITIAL_VALUES = {
  DEFAULT_X: 0,
  DEFAULT_Y: 0,
  DEFAULT_WIDTH: 0,
  DEFAULT_HEIGHT: 0,
  MIN_WIDTH: 100,
  MIN_HEIGHT: 100,
};

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

export const ConfigContext = createContext<ContextValues>({
  chat: INITIAL_VALUES,
  effect: INITIAL_VALUES,
});
