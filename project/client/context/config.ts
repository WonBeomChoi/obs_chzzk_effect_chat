import { Dispatch, SetStateAction, createContext } from 'react';

export interface LayoutConfig {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface StateGeneric<T> {
  state: T;
  setState: Dispatch<SetStateAction<T>>;
}

export type AppConfigs = {
  chat: LayoutConfig;
  effect: LayoutConfig;
  onSetting: boolean;
};

type LayoutState = StateGeneric<LayoutConfig>;
type onSettingState = StateGeneric<boolean>;
type ContextValues = {
  chat: LayoutState;
  effect: LayoutState;
  onSetting: onSettingState;
};

export const ConfigContext = createContext<ContextValues | undefined>(undefined);
