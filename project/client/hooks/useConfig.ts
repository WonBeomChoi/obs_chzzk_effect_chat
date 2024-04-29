import { useEffect, useMemo, useState } from 'react';
import { LayoutConfig } from '../context/config';
import { DEFAULT_CONFIG } from '../constants/constants';
import { getConfig, setConfig } from '../utils/storage';

export function useConfig() {
  // chat config : 채팅 레이아웃 세팅값
  // effect config : 이펙트 레이아웃 세팅값
  const [chatConfig, setChatConfig] = useState<LayoutConfig>(DEFAULT_CONFIG.chat);
  const [effectConfig, setEffectConfig] = useState<LayoutConfig>(DEFAULT_CONFIG.effect);
  const [onSetting, setOnSetting] = useState(DEFAULT_CONFIG.onSetting);

  // 초기 세팅값 불러오기
  useEffect(() => {
    const { chat, effect, onSetting } = getConfig();

    setChatConfig(chat);
    setEffectConfig(effect);
    setOnSetting(onSetting);
  }, []);

  // 이벤트 잠금
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'k' || e.key === 'ㅏ')) {
        setOnSetting((prev) => {
          setConfig({
            onSetting: !prev,
          });
          return !prev;
        });
      }
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);

  // 리렌더링시 불필요하게 재생성 되는 일 방지
  const contextValues = useMemo(
    () => ({
      states: {
        chat: chatConfig,
        effect: effectConfig,
        onSetting: onSetting,
      },
      setStates: {
        chat: setChatConfig,
        effect: setEffectConfig,
        onSetting: setOnSetting,
      },
    }),
    [chatConfig, effectConfig, onSetting, setChatConfig, setEffectConfig, setOnSetting],
  );

  return contextValues;
}
