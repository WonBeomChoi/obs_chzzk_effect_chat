import { useEffect } from 'react';
import { useConfigValues } from '../context/config';
import { setConfig } from '../utils/storage';

function useSaveLayoutConfig(type: 'chat' | 'effect') {
  const { states } = useConfigValues();

  const config = states[type];

  useEffect(() => {
    const handler = () => {
      const newConfig = {
        [type]: config,
      };

      setConfig(newConfig);
    };

    window.addEventListener('mouseup', handler);
    return () => {
      window.removeEventListener('mouseup', handler);
    };
  }, [config, type]);
}

export default useSaveLayoutConfig;
