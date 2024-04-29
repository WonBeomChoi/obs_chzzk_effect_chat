import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export interface LayoutConfig {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type AppConfigs = {
  chat: LayoutConfig;
  effect: LayoutConfig;
  onSetting: boolean;
};

type ContextValues = {
  states: {
    chat: LayoutConfig;
    effect: LayoutConfig;
    onSetting: boolean;
  };
  setStates: {
    chat: Dispatch<SetStateAction<LayoutConfig>>;
    effect: Dispatch<SetStateAction<LayoutConfig>>;
    onSetting: Dispatch<SetStateAction<boolean>>;
  };
};

export const ConfigContext = createContext<ContextValues | undefined>(undefined);

export function useConfigValues() {
  const values = useContext(ConfigContext);
  if (!values) throw new Error('context api error');
  return values;
}
