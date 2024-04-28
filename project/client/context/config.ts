import { Dispatch, SetStateAction, createContext } from 'react';

export interface Config {
  x: number;
  y: number;
  width: number;
  height: number;
  MIN_WIDTH: number;
  MIN_HEIGHT: number;
}

interface ConfigData {
  data: Config;
  setData: Dispatch<SetStateAction<Config>>;
}

interface ContextValues {
  chat: ConfigData;
  effect: ConfigData;
}

export const ConfigContext = createContext<ContextValues | undefined>(undefined);
