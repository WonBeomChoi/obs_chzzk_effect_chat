import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export interface LayoutConfig {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface EffectInfo {
  eventName: string;
  keywords: string[];
  url: string;
  runningTime: number;
}

export type EffectInfos = Record<string, EffectInfo>;

export type AppConfigs = {
  chat: LayoutConfig;
  effect: LayoutConfig;
  onSetting: boolean;
  effectInfos: Record<string, EffectInfo>;
};

type ContextValues = {
  states: {
    chat: LayoutConfig;
    effect: LayoutConfig;
    onSetting: boolean;
    effectInfos: EffectInfos;
  };
  setStates: {
    chat: Dispatch<SetStateAction<LayoutConfig>>;
    effect: Dispatch<SetStateAction<LayoutConfig>>;
    onSetting: Dispatch<SetStateAction<boolean>>;
    effectInfos: Dispatch<SetStateAction<EffectInfos>>;
  };
};

export const ConfigContext = createContext<ContextValues | undefined>(undefined);

export function useConfigValues() {
  const values = useContext(ConfigContext);
  if (!values) throw new Error('context api error');
  return values;
}
