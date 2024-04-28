import { useEffect, useMemo, useState } from 'react';
import { Config } from '../context/config';
import { DEFAULT_CONFIG } from '../constants/constants';
import { getConfig, setConfig } from '../utils/storage';

export function useConfig() {
  // chat config : 채팅 레이아웃 세팅값
  // effect config : 이펙트 레이아웃 세팅값
  const [chatConfig, setChatConfig] = useState<Config>(DEFAULT_CONFIG.chat);
  const [effectConfig, setEffectConfig] = useState<Config>(DEFAULT_CONFIG.effect);

  // 초기 세팅값 불러오기
  useEffect(() => {
    const CONFIG = getConfig();

    setChatConfig(CONFIG.chat);
    setEffectConfig(CONFIG.effect);
  }, []);

  // mouse up 시 저장
  // 먼가 로직을 여기 두지 말고 Interaction Layout 에 넣는게 낫나?
  useEffect(() => {
    const handler = () => {
      setConfig({
        chat: chatConfig,
        effect: effectConfig,
      });
    };

    window.addEventListener('mouseup', handler);

    return () => {
      window.removeEventListener('mouseup', handler);
    };
  }, [chatConfig, effectConfig]);

  // 리렌더링시 불필요하게 재생성 되는 일 방지
  const contextValue = useMemo(
    () => ({
      chat: {
        data: chatConfig,
        setData: setChatConfig,
      },
      effect: {
        data: effectConfig,
        setData: setEffectConfig,
      },
    }),
    [chatConfig, effectConfig],
  );

  return contextValue;
}
