import { useEffect, useMemo, useState } from 'react';
import { EffectInfos, LayoutConfig } from '../context/config';
import { DEFAULT_CONFIG } from '../constants/constants';
import { getConfig } from '../utils/storage';

export function useConfig() {
  // chat config : 채팅 레이아웃 세팅값
  // effect config : 이펙트 레이아웃 세팅값
  const [chatConfig, setChatConfig] = useState<LayoutConfig>(DEFAULT_CONFIG.chat);
  const [effectConfig, setEffectConfig] = useState<LayoutConfig>(DEFAULT_CONFIG.effect);
  const [onSetting, setOnSetting] = useState(DEFAULT_CONFIG.onSetting);
  const [effectInfos, setEffectInfos] = useState<EffectInfos>(DEFAULT_CONFIG.effectInfos);

  // 초기 세팅값 불러오기
  useEffect(() => {
    const { chat, effect, onSetting, effectInfos } = getConfig();

    setChatConfig(chat);
    setEffectConfig(effect);
    setOnSetting(onSetting);
    setEffectInfos(effectInfos);
  }, []);

  // 리렌더링시 불필요하게 재생성 되는 일 방지
  const contextValues = useMemo(
    () => ({
      states: {
        chat: chatConfig,
        effect: effectConfig,
        onSetting: onSetting,
        effectInfos: effectInfos,
      },

      setStates: {
        chat: setChatConfig,
        effect: setEffectConfig,
        onSetting: setOnSetting,
        effectInfos: setEffectInfos,
      },
    }),
    [chatConfig, effectConfig, onSetting, effectInfos],
  );

  return contextValues;
}
