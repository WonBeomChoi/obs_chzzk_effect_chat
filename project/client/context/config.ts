import { Dispatch, SetStateAction, createContext } from 'react';

export interface IConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  MIN_WIDTH: number;
  MIN_HEIGHT: number;
}

interface IConfigGeneric<T> {
  chat: T;
  effect: T;
}

interface IConfigData {
  data: IConfig;
  setData: Dispatch<SetStateAction<IConfig>>;
}

export type Configs = IConfigGeneric<IConfig>;
type ContextValues = IConfigGeneric<IConfigData>;

export const ConfigContext = createContext<ContextValues | undefined>(undefined);
